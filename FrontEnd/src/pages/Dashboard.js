import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { DashBoardOverlay } from "../components/overlays/DashBoardOverlay";

function Dashboard() {
  const navigate = useNavigate();
  const [userSettings, setUserSettings] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [overlay, setOverlay] = useState("");

  // User Details
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/users/getme`,
          {
            withCredentials: true,
          }
        );
        setUserSettings(res.data.data.user);
      } catch (err) {
        navigate("/");
      }
    }
    getData();
  }, [overlay]);

  useEffect(() => {
    async function getQuizes() {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/quiz/`);
        setQuizes(res.data.data.quizs);
      } catch (err) {
        navigate("/");
      }
    }
    getQuizes();
  }, []);

  return (
    <>
      {overlay !== "" ? (
        <DashBoardOverlay
          userSettings={userSettings}
          overlay={overlay}
          setOverlay={setOverlay}
        />
      ) : (
        ""
      )}
      <div
        className={`bg-black h-screen ${overlay !== "" ? "opacity-20" : ""}`}
      >
        <div>
          <NavBar userSettings={userSettings} />
        </div>
        <div className="rounded-xl m-1 p-1 md:m-4 md:p-4 bg-slate-900 ">
          <div className="rounded-xl m-1 p-1 md:m-4 md:p-4 bg-slate-800 h-full">
            <div className="rounded-xl m-1 p-1 md:m-2 md:p-2 bg-slate-700 h-full overflow-auto">
              {/* {User Details & Quiz Tools} */}

              <div className="m-5 p-3">
                {/* {User Details & Quiz Tools} */}

                <div className="block md:flex justify-around">
                  {/* {User Details} */}

                  <div className="bg-slate-300 rounded-lg p-2 font-bold text-lg m-2 ">
                    <div className="truncate px-3">{userSettings?.name}</div>
                    <div className="truncate px-3 ">{userSettings?.email}</div>

                    <div className="sm:flex">
                      <button onClick={() => setOverlay("made")}>
                        <div className="p-2">
                          <div className=""> Quizzes Made</div>
                          <div className="">
                            {userSettings?.createdQuizes?.length}
                          </div>
                        </div>
                      </button>
                      <button onClick={() => setOverlay("attended")}>
                        <div className="p-2">
                          <div className=""> Quizzes Attended</div>
                          <div className="">
                            {" "}
                            {userSettings?.givenQuizes?.length}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* {Quiz Tools} */}
                  <div className="bg-slate-300 rounded-lg p-2 font-bold text-lg m-2">
                    <div className="p-2 text-center">Quiz Tools</div>
                    <div className="sm:flex justify-around	">
                      <button onClick={() => setOverlay("build")}>
                        <div className="m-2 p-3 bg-slate-400 rounded-xl">
                          Build Quiz
                        </div>
                      </button>
                      <button onClick={() => setOverlay("attend")}>
                        <div className="m-2 p-3 bg-slate-400 rounded-xl">
                          Attend Quiz
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* All the quizes */}

              <div className="font-bold text-xl rounded-xl bg-slate-300 m-5 p-3">
                <div className="">
                  {/* Quiz Details Header */}
                  <div className="grid grid-cols-8 p-2 gap-3">
                    <div className="col-span-1">
                      <p className="truncate"> Serial No.</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Name</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Description</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Unique Code</p>
                    </div>
                  </div>
                  {/* {All the quizes } */}
                  {quizes &&
                    quizes.map((quiz, index) => (
                      <div key={index} className="grid grid-cols-8 p-2 gap-3">
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
                            <img
                              width="22px "
                              src="./images/magnet.svg"
                              alt=""
                            />
                            {"  "}
                            <p className="truncate	">{quiz._id} </p>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
