import React from "react";
import BuildQuiz from "./BuildQuiz";
import { QuizesMade } from "./QuizesMade";
import { QuizesAttended } from "./QuizesAttended";
import { AttendQuiz } from "./AttendQuiz";
import { Submissions } from "./Submissions";

export function DashBoardOverlay({ overlay, setOverlay }) {
  return (
    <div className="overflow-auto	 w-screen fixed h-screen z-10  flex justify-center items-center">
      <div className="h-5/6 overflow-auto rounded-xl">
        <div>
          <div className="flex justify-end text-white p-2">
            <button className="p-2" onClick={() => setOverlay("")}>
              <img width="20px " src="./images/cross.svg" alt="X"></img>
            </button>
          </div>
          <div className="h-full bg-slate-700 rounded-2xl">
            {overlay === "made" ? <QuizesMade /> : ""}
            {overlay === "attended" ? <QuizesAttended /> : ""}
            {overlay === "submissions" ? <Submissions /> : ""}
            {overlay === "build" ? <BuildQuiz setOverlay={setOverlay} /> : ""}
            {overlay === "attend" ? <AttendQuiz /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
