import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AttendQuiz({ setQuiz }) {
  const navigate = useNavigate();
  const [quizID, setQuizID] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // console.log(navigator);
    async function Read() {
      const res = await navigator.clipboard.readText();
      // console.log(res);
      setQuizID(res);
    }
    setTimeout(() => {
      Read();
    }, 100);
  }, []);

  function handleInputChange(e) {
    // console.log(e.target.value);
    setQuizID(e.target.value);
  }
  function handleQuizAttend() {
    async function handle() {
      try {
        const res = await axios.get(
          `https://trivia-minefield.onrender.com/api/quiz/${quizID}`
        );
        // console.log("getting");
        setMessage("Quiz starting");
        // console.log(res.data.data);
        setQuiz(res.data.data);
        setTimeout(() => {
          navigate("/quiz");
        }, 1000);
      } catch (err) {
        setMessage(err?.response?.data?.message);
      }
    }

    // console.log("Hello");
    handle();
  }

  return (
    <div>
      <div>
        <div className="p-4 text-2xl flex justify-evenly">
          <h1 className="text-white"> Enter the Unique Code for the Quiz </h1>
        </div>
        {message !== "" ? (
          <div className="text-white pt-0 p-4 text-2xl flex justify-evenly ">
            {message}
          </div>
        ) : (
          ""
        )}

        <div className="p-4 pt-0 text-xl flex justify-evenly ">
          <input
            onChange={handleInputChange}
            value={quizID}
            className="p-4 rounded-xl"
          ></input>
          <button onClick={handleQuizAttend}>
            <img width="40px" src="./images/rightArrow.svg" alt="=>" />
          </button>
        </div>
      </div>
    </div>
  );
}
