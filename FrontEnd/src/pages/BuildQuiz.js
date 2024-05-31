import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewQuestion from "../components/overlays/components/NewQuestion";
import { Question } from "../components/overlays/components/Question";

function BuildQuiz() {
  const navigate = useNavigate();
  const [dispMessage, setDispMessage] = useState(false);
  const [userSettings, setUserSettings] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [addQuestion, setAddQuestion] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (dispMessage) {
      setMessage("List of questions updated");
    }
    setTimeout(() => {
      setMessage("");
    }, 1000);
    setDispMessage(true);
  }, [questions]);

  function handleQuizName(e) {
    setQuizName(e.target.value);
  }
  function handleQuizDesc(e) {
    setQuizDesc(e.target.value);
  }

  async function sendQuiz() {
    try {
      const quiz = {
        name: quizName,
        description: quizDesc,
        questions: questions,
      };
      const res = await axios.post("http://localhost:8080/api/v1/quiz", quiz, {
        withCredentials: true,
      });
      console.log(res);
      setMessage("Quiz made successfully");
      setTimeout(() => {
        setMessage("");
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
        navigate("/dashboard");
      }, 2000);
    }
  }

  function handleAddQuiz(e) {
    console.log("pressed");
    if (questions.length < 1) {
      setMessage("Please add a few questions before submitting");
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }
    sendQuiz();
  }

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
  return (
    <div className="h-full  overflow-auto">
      <div>
        <NavBar userSettings={userSettings} />
      </div>
      <div>
        <div className="p-4 text-2xl flex justify-evenly">
          <div>
            <h1 className="text-white"> Let's make a new Quiz!</h1>
          </div>
        </div>
        <div>
          <div className="pt-0 text-xl flex justify-evenly text-white">
            <div className="p-2">
              <div className="grid grid-cols-3 ">
                <div className="p-4">Quiz Name</div>
                <div className="p-2 col-span-2">
                  <input
                    value={quizName}
                    onChange={handleQuizName}
                    className="rounded-xl p-2 text-black w-full "
                  ></input>
                </div>
                <div className="p-4">Quiz Description</div>
                <div className="p-2 col-span-2">
                  <input
                    value={quizDesc}
                    onChange={handleQuizDesc}
                    className="rounded-xl p-2 text-black w-full"
                  ></input>
                </div>
                {addQuestion ? (
                  <NewQuestion
                    questions={questions}
                    setQuestions={setQuestions}
                    setAddQuestion={setAddQuestion}
                    setMessage={setMessage}
                  />
                ) : (
                  ""
                )}

                <button
                  onClick={() => setAddQuestion(true)}
                  className="mt-2 col-span-3 w-full rounded-xl p-2 bg-slate-600"
                >
                  Add a new Question
                </button>
                {message !== "" ? (
                  <div className="col-span-3 p-2 flex justify-evenly text-white font-bold">
                    {message}
                  </div>
                ) : (
                  ""
                )}
                {questions.map((question, index) => (
                  <Question
                    questions={questions}
                    setQuestions={setQuestions}
                    question={question.question}
                    choices={question.choices}
                    correct={question.correct}
                    key={index}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" p-2 flex justify-evenly">
            <button
              onClick={(e) => handleAddQuiz(e)}
              className="w-2/6 hover:bg-slate-400 rounded-xl p-2 bg-slate-600"
            >
              Add Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildQuiz;
