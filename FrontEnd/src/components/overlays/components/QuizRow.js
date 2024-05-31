import React from "react";

export function QuizRow({ quiz, index }) {
  return (
    <div className="w-full grid grid-cols-8 p-2 gap-2 border-2 rounded-xl border-slate-800 m-1">
      <div className="col-span-1">
        <p className="truncate"> {index + 1}</p>
      </div>
      <div className="col-span-2">
        <p className="truncate"> {quiz.name}</p>
      </div>
      <div className="col-span-2">
        <p className="truncate"> {quiz.description}</p>
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
