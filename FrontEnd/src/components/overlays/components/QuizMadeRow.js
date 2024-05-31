import React from "react";
// import { useNavigate } from "react-router-dom";

function QuizMadeRow({ quiz, index }) {
  // const navigate = useNavigate();

  function handleEditQuiz(e, quizId) {
    // navigate(`/editQuiz/${quizId}`);
  }

  return (
    <div className=" grid grid-cols-8 p-2 gap-2 border-2 rounded-xl border-slate-800 m-1">
      <div
        className="col-span-5 cursor-pointer"
        onClick={(e) => {
          handleEditQuiz(e, quiz._id);
        }}
      >
        <div className="grid grid-cols-5">
          <div className="col-span-1">
            <p className="truncate"> {index + 1}</p>
          </div>
          <div className="col-span-2">
            <p className="truncate"> {quiz.name}</p>
          </div>
          <div className="col-span-2">
            <p className="truncate"> {quiz.description}</p>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <button
          className="flex w-full"
          onClick={() => {
            navigator.clipboard.writeText(quiz._id);
          }}
        >
          <img width="22px" src="./images/magnet.svg" alt="" />
          <p className="truncate">{quiz._id} </p>
        </button>
      </div>
      {/* <div>
          <button className="w-full">
            <img width="30px" src="./images/edit.svg" alt="Edit"></img>
          </button>
        </div> */}
    </div>
  );
}

export default QuizMadeRow;
