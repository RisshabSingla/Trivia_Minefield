import React from "react";

function Quiz({ quiz, index }) {
  return (
    <div className=" grid grid-cols-8 p-2 gap-2">
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

          <p className="truncate	">{quiz._id} </p>
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

export function QuizesMade({ made = [] }) {
  return (
    <div>
      <div className="p-4 text-2xl flex justify-evenly">
        <h1 className="text-white"> Quizes Made By You</h1>
      </div>
      <div className="p-4 pt-0 text-xl flex justify-evenly text-white">
        {made?.length === 0 ? (
          "You have made 0 quizes"
        ) : (
          <div>
            <div className="text-black font-bold text-xl rounded-xl bg-slate-300 m-5 p-3">
              <div className="">
                <div className="grid grid-cols-8 p-2 gap-2">
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
                  {/* <div className="">
                    <p className="flex truncate"> Edit</p>
                  </div> */}
                </div>
                {made.map((quiz, index) => (
                  <Quiz key={index} quiz={quiz} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
