import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export function Submissions() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    async function getMySubmissions() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/submission/getsubmissions`,
          {
            withCredentials: true,
          }
        );
        setSubmissions(res.data.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    getMySubmissions();
  }, []);
  return (
    <div>
      <div>
        <div className="p-4 text-2xl flex justify-evenly">
          <h1 className="text-white"> Your Submissions </h1>
        </div>
        <div className="p-4 pt-0 text-xl flex justify-evenly text-white">
          {submissions?.length === 0 ? (
            "You have made 0 submissions"
          ) : (
            <div>
              <div className="text-black font-bold text-center text-xl rounded-xl bg-slate-300 m-5 p-3">
                <div className="">
                  <div className="grid grid-cols-10 p-2">
                    <div className="col-span-1">
                      <p className="truncate"> Serial No.</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Quiz Name</p>
                    </div>
                    <div className="col-span-1">
                      <p className="truncate"> Score</p>
                    </div>
                    <div className="col-span-3">
                      <p className="truncate"> Given Date</p>
                    </div>
                    <div className="col-span-3">
                      <p className="truncate"> Quiz Unique Code</p>
                    </div>
                  </div>
                  {submissions?.map((submission, index) => (
                    <div>
                      <button
                        className="border-2 rounded-xl m-1 border-slate-900 w-full"
                        onClick={() => {
                          navigate(`/submission/${submission._id}`);
                        }}
                      >
                        <div className=" grid grid-cols-10 p-2">
                          <div className="col-span-1">
                            <p className="truncate"> {index + 1}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="truncate"> {submission.quizName}</p>
                          </div>
                          <div className="col-span-1">
                            <p className="truncate"> {submission.score}</p>
                          </div>
                          <div className="col-span-3">
                            <p className="truncate">
                              {new Date(submission.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="col-span-3">
                            <button
                              className="flex w-full"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  submission.quizID
                                );
                              }}
                            >
                              <img
                                width="22px "
                                src="./images/magnet.svg"
                                alt=""
                              />
                              {"  "}
                              <p className="truncate	">{submission.quizID} </p>
                            </button>
                          </div>
                        </div>
                      </button>
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
