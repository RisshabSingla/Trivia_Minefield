import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Option({ choice, index, handleOptionClick, selectedOption }) {
  return (
    <div className="w-full">
      <button
        onClick={() => handleOptionClick(index)}
        className={`text-left m-2 w-full p-3 ${
          index === selectedOption ? "bg-slate-200" : "bg-slate-400"
        } rounded-xl`}
      >
        <span className="font-bold">{index + 1} </span> : {choice}
      </button>
    </div>
  );
}

function Question({ question, choices, handleOptionClick, selectedOption }) {
  return (
    <div>
      <div className="m-2 p-3 w-full bg-slate-400 rounded-xl ">
        <span className="font-bold	">Question: </span>
        {question}
      </div>

      <div>
        {choices.map((choice, index) => (
          <Option
            key={index}
            choice={choice}
            index={index}
            handleOptionClick={handleOptionClick}
            selectedOption={selectedOption}
          />
        ))}
      </div>
    </div>
  );
}

function Quiz({ loggedInID, quizData }) {
  const navigate = useNavigate();
  // console.log("Data");
  // console.log(quizData);
  const questions = quizData.questions;
  useEffect(() => {
    questions.sort(() => Math.random() - 0.5);
  }, []);
  const [currQ, setCurrQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [currScore, setCurrScore] = useState(0);
  const [checkDisable, setCheckDisable] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [userSettings, setUserSettings] = useState([]);

  // console.log(quiz);
  const [message, setMessage] = useState("");
  function handleOptionClick(index) {
    if (!checkDisable) {
      setSelectedOption(index);
      setMessage("");
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `https://triviaminefieldbackend-risshab-singlas-projects.vercel.app/api/user/${loggedInID}`
        );
        // console.log(res.data);
        setUserSettings(res.data.data);
      } catch (err) {
        // console.log(err);
        navigate("/");
      }
    }
    getData();
  }, []);

  function checkCorrect() {
    if (selectedOption === -1) {
      setMessage("Kindly select an option");
      return;
    }
    setCheckDisable(true);
    // console.log(questions[currQ].choices[selectedOption]);
    // console.log(questions[currQ].correct);
    if (questions[currQ].choices[selectedOption] === questions[currQ].correct) {
      setCurrScore(() => currScore + 1);
      setMessage("Correct");
    } else {
      setMessage(`The correct ans is: ${questions[currQ].correct} `);
    }
  }
  function handleNextQuestion() {
    if (selectedOption === -1) {
      setMessage("Kindly select an option");
      return;
    }
    if (!checkDisable) {
      setMessage("Kindly check your answer");
      return;
    }
    setMessage("");
    if (currQ + 1 === questions.length) {
      setCompleted(true);
    }
    setCurrQ(() => (currQ + 1 < questions.length ? currQ + 1 : currQ));
    setSelectedOption(-1);
    setCheckDisable(false);
  }

  return (
    <div className="bg-black h-screen">
      <div className="sticky top-0 bg-black">
        <NavBar userSettings={userSettings} />
      </div>
      <div className="rounded-xl m-1 p-1 md:m-4 md:p-4 bg-slate-900">
        <div className="rounded-xl m-1 p-1 md:m-4 md:p-4 bg-slate-800 h-full">
          <div className="rounded-xl m-1 p-1 md:m-2 md:p-2 bg-slate-700 h-full">
            {!completed ? (
              <div>
                <div className="flex p-4 pb-0 justify-between">
                  <div className="m-2 p-3 bg-slate-300 rounded-xl">
                    <span className="font-bold">
                      Question {currQ + 1} / {questions.length}{" "}
                    </span>
                  </div>
                  <div className="m-2 p-3 bg-slate-300 rounded-xl">
                    <span className="font-bold">
                      {" "}
                      Score {currScore} / {questions.length}
                    </span>
                  </div>
                </div>
                <div className="p-4 pb-0">
                  <Question
                    question={questions[currQ].question}
                    choices={questions[currQ].choices}
                    handleOptionClick={handleOptionClick}
                    selectedOption={selectedOption}
                  />
                </div>
                {message !== "" ? (
                  <div className="p-4 pb-0">
                    <div className="text-center p-4 w-full bg-slate-400 rounded-xl">
                      {" "}
                      {message}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex p-4">
                  <button
                    disabled={checkDisable}
                    onClick={checkCorrect}
                    className={`m-2 p-4 w-full bg-slate-400 rounded-xl 
                `}
                  >
                    Check Answer
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="m-2 p-4 w-full bg-slate-400 rounded-xl"
                  >
                    Next Question
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full m-2 p-3 bg-slate-500 rounded-xl text-xl font-bold text-white text-center ">
                <div className="flex h-full items-center justify-center ">
                  <div>
                    <p>Congratulations</p>
                    <p> You have completed the quiz </p>
                    <p>
                      Your Final Score {currScore} / {questions.length}
                    </p>
                    <p className="p-2">
                      <button
                        className="p-2 text-slate-200 bg-slate-800 rounded-xl"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
