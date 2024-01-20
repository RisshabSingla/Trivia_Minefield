import { useState } from "react";

import Choice from "./Choice";

function NewQuestion({ questions, setQuestions, setAddQuestion, setMessage }) {
  const [isOpen, setIsOpen] = useState(true);
  const [choices, setChoices] = useState([]);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [newChoice, setNewChoice] = useState("");
  function handleChoiceChange(e) {
    setNewChoice(e.target.value);
  }
  function handleQuestionChange(e) {
    setQuestion(e.target.value);
  }

  function checkQuestion() {
    if (question.length < 5) {
      throw new Error("Invalid question length");
    }
    if (choices.length < 2) {
      throw new Error("Number of choices should be atleast 2");
    }
    if (correct === "" || correct === "Please select an option") {
      throw new Error("Please select the correct option");
    }
  }
  function handleQuestionAdd() {
    try {
      checkQuestion();
      setQuestions([
        ...questions,
        { question: question, choices: choices, correct: correct },
      ]);
      setAddQuestion(false);
    } catch (err) {
      // console.log(err.message);
      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }

  function handleCorrectChange(e) {
    setCorrect(e.target.value);
  }

  return (
    <div className="w-full col-span-3 ">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-2">
        {" "}
        New Question
      </button>
      {isOpen ? (
        <div>
          <div className="flex justify-evenly">
            <div className="p-4 w-full grid grid-cols-3 gap-2">
              {/* <span> Question: </span> */}
              <input
                value={question}
                onChange={handleQuestionChange}
                className="col-span-3 p-2 rounded-xl text-black"
                placeholder="Enter the question here"
              ></input>
              <span className="px-2 flex justify-evenly col-span-3">
                {" "}
                Choices:
              </span>
              <div className="grid grid-cols-3 justify-evenly  col-span-3 gap-2">
                <div className="col-span-2">
                  <input
                    value={newChoice}
                    onChange={handleChoiceChange}
                    className="text-black w-full rounded-xl p-2"
                  ></input>
                </div>
                <button
                  className="w-full rounded-xl p-2 bg-slate-600"
                  onClick={() => {
                    if (newChoice !== "") {
                      setChoices([...choices, newChoice]);
                      setNewChoice("");
                    }
                  }}
                >
                  Add Choice
                </button>
              </div>
              {choices.map((choice, index) => (
                <Choice
                  key={index}
                  index={index}
                  choice={choice}
                  choices={choices}
                  setChoices={setChoices}
                />
              ))}
            </div>
          </div>
          <div className="pb-3 flex justify-evenly text-black">
            <span className="text-white"> Choose the correct answer</span>
            <select
              className="max-w-[200px] truncate rounded-xl md:max-w-xl"
              onChange={handleCorrectChange}
            >
              <option> Please select an option</option>
              {choices.map((choice) => (
                <option className="truncate" value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-evenly">
            <button onClick={() => setAddQuestion(false)}>
              <div className="flex">
                <img width="20px" src="./images/cross.svg" />
                <span className="pl-2 pb-1"> Cancel </span>
              </div>
            </button>
            <button onClick={handleQuestionAdd}>
              {" "}
              <div className="flex">
                <img width="25px" src="./images/tickGreen.svg" />
                <span className="pl-2 "> Add this question </span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NewQuestion;
