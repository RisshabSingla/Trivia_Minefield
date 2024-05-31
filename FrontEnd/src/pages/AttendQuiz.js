import NavBar from "../components/NavBar";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./attendQuiz.css";

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const submission = {
  correctQuestions: [],
  inCorrectQuestions: [],
  score: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "newAnswer":
      const question = state.questions.at(state.index);
      // console.log(question);
      if (question.choices[action.payload] === question.correct[0]) {
        // correct answer
        submission.score += question.score;
        submission.correctQuestions.push(question._id);
      } else {
        // incorrect answer
        submission.inCorrectQuestions.push({
          questionID: question._id,
          choiceAnswered: action.payload,
        });
      }
      // console.log(submission);
      return {
        ...state,
        answer: action.payload,
        points:
          question.choices[action.payload] === question.correct[0]
            ? state.points + question.score
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      console.log("Hello from here");
      // console.log(submission);
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      if (state.status === "finished") {
        return {
          ...state,
        };
      }
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}

function QuizLoading() {
  return <div>Kindly wait your quiz is loading</div>;
}

function QuizStartPage({ quiz, setState }) {
  submission.correctQuestions = [];
  submission.inCorrectQuestions = [];
  submission.score = 0;

  return (
    <>
      <h1 className="text-center text-5xl"> {quiz.name}</h1>
      <h1 className="pt-5 text-center text-3xl"> {quiz.description}</h1>

      <h1 className="pt-5 text-center text-3xl">
        Total Number of Questions: {quiz.questions && quiz.questions.length}
      </h1>

      <div className="flex justify-center m-3 p-3">
        <button
          className="ease-in duration-300 align-center p-3 text-xl bg-slate-700 rounded-xl hover:bg-slate-600"
          onClick={() => setState("question")}
        >
          Let's Start
        </button>
      </div>
    </>
  );
}

function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <div className="flex justify-center">
      <header className="w-4/6">
        <div className="progress">
          <progress
            className="w-full bg-slate-900 rounded-lg w3-round"
            max={numQuestions}
            value={index + Number(answer !== null)}
          />
        </div>

        <div className="pt-2 flex justify-around">
          <span>
            <strong> Question: {index + 1}</strong> / {numQuestions}
          </span>

          <span>
            <strong>Score: {points}</strong> / {maxPossiblePoints}
          </span>
        </div>
      </header>
    </div>
  );
}

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options ">
      {question !== undefined &&
        question.choices.map((option, index) => (
          <button
            className={`m-2 bg-slate-800 rounded-xl p-2 btn btn-option ${
              index === answer ? "answer" : ""
            } ${
              hasAnswered
                ? option === question.correct[0]
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
    </div>
  );
}

function Question({ question, dispatch, answer }) {
  return (
    <div className="m-2 flex justify-center">
      <div className="w-4/6">
        <h4>{question.question}</h4>
        <Options question={question} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  );
}

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer p-3">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

function NextButton({ dispatch, answer, index, numQuestions, setState }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui p-1 px-4"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui p-1 px-4"
        onClick={() => {
          dispatch({ type: "finish" });
          setState("finished");
        }}
      >
        Finish
      </button>
    );
}

function QuizQuestions({ ques, setState }) {
  initialState.questions = ques;
  initialState.secondsRemaining = ques && ques.length * 30;
  const numQuestions = ques && ques.length;
  const maxPossiblePoints =
    ques && ques.reduce((prev, cur) => prev + cur.score, 0);
  const [{ questions, index, answer, points, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);
  return (
    <>
      <Progress
        index={index}
        numQuestions={numQuestions}
        points={points}
        maxPossiblePoints={maxPossiblePoints}
        answer={answer}
      />
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
      <div className="m-2 flex justify-around">
        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
        <NextButton
          dispatch={dispatch}
          answer={answer}
          numQuestions={numQuestions}
          index={index}
          setState={setState}
        />
      </div>
    </>
  );
}

async function MakeNewSubmission({ quizID }) {
  const navigate = useNavigate();
  try {
    const res = await axios.post(
      `http://localhost:8080/api/v1/submission/${quizID}`,
      submission,
      {
        withCredentials: true,
      }
    );
    console.log(res);
    navigate(`/submission/${res.data.data.submission._id}`);
  } catch (err) {
    console.log(err);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  }
}

function QuizFinished({ quizID }) {
  // console.log(submission);
  const navigate = useNavigate();

  submission.correctQuestions = [...new Set(submission.correctQuestions)];
  submission.inCorrectQuestions = submission.inCorrectQuestions.reduce(
    (acc, item) => {
      if (!acc.some((obj) => obj.questionID === item.questionID)) {
        acc.push(item);
      }
      return acc;
    },
    []
  );
  console.log(submission);
  MakeNewSubmission((quizID = { quizID }));
  return <div className="flex justify-center h-screen">Submission View</div>;
}

function QuizFound({ quiz }) {
  // console.log(quiz);
  const [state, setState] = useState("start");
  console.log(quiz);
  return (
    <div className="h-screen flex justify-center ">
      <div className="h-4/6 content-evenly w-screen">
        {state === "start" && (
          <div className="">
            <QuizStartPage quiz={quiz} setState={setState} />
          </div>
        )}
        {state === "question" && (
          <QuizQuestions ques={quiz.questions} setState={setState} />
        )}
        {state === "finished" && <QuizFinished quizID={quiz._id} />}
      </div>
    </div>
  );
}

function QuizNotAvailable() {
  return <div>Quiz not found</div>;
}

function AttendQuiz() {
  const navigate = useNavigate();
  const [userSettings, setUserSettings] = useState([]);
  const [foundQuiz, setFoundQuiz] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/users/getme`,
          {
            withCredentials: true,
          }
        );
        setUserSettings(res.data.data.user);
      } catch (err) {
        navigate("/");
      }
    }
    getData();
  }, []);

  const params = useParams();
  // console.log(params);

  useEffect(() => {
    async function getQuiz() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:8080/api/v1/quiz/${params.id}`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data.data.quiz);
        setQuiz(res.data.data.quiz);
        setFoundQuiz(true);
      } catch (err) {
        setFoundQuiz(false);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getQuiz();
  }, []);
  return (
    <div>
      <div>
        <NavBar userSettings={userSettings} />
      </div>

      <div className="text-white">
        {isLoading ? (
          <QuizLoading />
        ) : foundQuiz ? (
          <QuizFound quiz={quiz} />
        ) : (
          <QuizNotAvailable />
        )}
      </div>
    </div>
  );
}

export default AttendQuiz;
