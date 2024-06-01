import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizMadeRow from "./components/QuizMadeRow";

export function QuizesMade() {
  const [made, setMade] = useState([]);

  useEffect(() => {
    async function getMyMade() {
      try {
        const res = await axios.get(
          `https://triviaminefieldbackend-risshab-singlas-projects.vercel.app/api/v1/quiz/getmade`,
          {
            headers: {
              Authorization: `Bearer ${document.cookie.substring(4)}`,
            },
            withCredentials: true,
          }
        );
        setMade(res.data.data);
        // console.log(res);
      } catch (err) {
        // console.log(err);
      }
    }
    getMyMade();
  }, []);

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
                  <QuizMadeRow key={index} quiz={quiz} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
