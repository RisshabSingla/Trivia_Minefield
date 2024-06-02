import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function displayCorrectSubmission({ correct }) {
  return (
    <div>
      <div className="p-2"> {correct.question}</div>
      <div className="p-2">
        {correct.choices.map((choice) => {
          return (
            <div>
              {choice} {choice === correct.correct[0] ? "✅" : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function displayInCorrectSubmission(incorrect) {
  // console.log(incorrect);
  const submission = incorrect.questionID;
  // console.log(submission);
  // console.log(incorrect.choiceAnswered);
  return (
    <div>
      <div className="p-2"> {submission.question}</div>
      <div className="p-2">
        {submission.choices.map((choice, id) => {
          return (
            <div className="px-2 ">
              {choice} {choice === submission.correct[0] ? "✅" : ""}
              {id == incorrect.choiceAnswered ? "✋" : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SubmissionView() {
  const navigate = useNavigate();
  const [userSettings, setUserSettings] = useState([]);
  const [submission, setSubmission] = useState([]);
  const params = useParams();
  const submissionId = params.id;

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `https://triviaminefieldbackend-risshab-singlas-projects.vercel.app/api/v1/users/getme`,
          {
            headers: {
              Authorization: `Bearer ${document.cookie.substring(4)}`,
            },
            withCredentials: true,
          }
        );
        setUserSettings(res.data.data.user);
      } catch (err) {
        navigate("/");
      }
    }

    async function getSubmission() {
      try {
        const res = await axios.get(
          `https://triviaminefieldbackend-risshab-singlas-projects.vercel.app/api/v1/submission/${submissionId}`,
          {
            headers: {
              Authorization: `Bearer ${document.cookie.substring(4)}`,
            },
            withCredentials: true,
          }
        );
        // console.log(res);
        setSubmission(res.data.data.submission);
        // setUserSettings(res.data.data.user);
      } catch (err) {
        console.log(err);
        // navigate("/");
      }
    }
    if (sessionStorage.getItem("userData") !== null) {
      setUserSettings(JSON.parse(sessionStorage.getItem("userData")));
    } else {
      getData();
    }
    getSubmission();
  }, []);

  // console.log(submission);
  // console.log(submission.length);
  return (
    <div>
      <div>
        <NavBar userSettings={userSettings} />
      </div>
      {/* <div className="text-white p-4">Submission Id: {submissionId}</div> */}
      <div className="h-screen text-white text-2xl">
        <div className="flex justify-center">
          <div className="">Submission View</div>
        </div>
        <div className="p-2">Total Score : {submission.score}</div>
        <div>
          <div className="p-3 text-white">
            <span className="p-2 bg-green-800 rounded-xl">
              Correct Questions
            </span>
          </div>
          <div className="text-white">
            {submission.length !== 0 &&
              submission.correctQuestions.map((correct) => {
                return displayCorrectSubmission((correct = { correct }));
              })}
          </div>
        </div>
        <div>
          <div className="p-3 text-white">
            <span className="p-2 bg-red-800 rounded-xl">
              Incorrect Questions
            </span>
          </div>
          <div className="text-white">
            {submission.length !== 0 &&
              submission.inCorrectQuestions.map((incorrect) => {
                return displayInCorrectSubmission(incorrect);
              })}
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            className="bg-slate-800 rounded-xl p-2"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmissionView;
