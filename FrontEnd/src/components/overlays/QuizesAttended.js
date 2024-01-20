import React from "react";

export function QuizesAttended({ attended = [] }) {
  return (
    <div>
      <div>
        <div className="p-4 text-2xl flex justify-evenly">
          <h1 className="text-white"> Quizes Attended By You</h1>
        </div>
        <div className="p-4 pt-0 text-xl flex justify-evenly text-white">
          {attended?.length === 0 ? (
            "You have attended 0 quizes"
          ) : (
            <div>
              <div className="text-black font-bold text-xl rounded-xl bg-slate-300 m-5 p-3">
                <div className="">
                  <div className="grid grid-cols-8 p-2">
                    <div className="col-span-1">
                      <p className="truncate"> Serial No.</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Name</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Description</p>
                    </div>
                    <div className="col-span-3">
                      <p className="truncate"> Unique Code</p>
                    </div>
                  </div>
                  {attended?.map((quiz, index) => (
                    <div className=" grid grid-cols-8 p-2">
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
                          <img width="22px " src="./images/magnet.svg" alt="" />
                          {"  "}
                          <p className="truncate	">{quiz._id} </p>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
