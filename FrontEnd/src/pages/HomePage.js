import { useState } from "react";
import useScreenSize from "../components/useScreenSize";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login({
  setOverlay,
  message,
  setMessage,
  setLoggedInID,
  setUserXAuth,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    // console.log(id, " ", value);

    setUser({
      ...user,
      [id]: value,
    });
  }

  function handleLoginUser(e) {
    e.preventDefault();
    axios
      .post("https://trivia-minefield.onrender.com/api/login", user)
      .then((res) => {
        // console.log(res);
        setUserXAuth(res.data.data);
        setLoggedInID(res.data.id);
        setMessage("Login Successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        // setMessageClassName("mb-4 pb-4");

        // <Navigate replace to="/dashboard" />;
      })
      .catch((res) => {
        // console.log(res);
        setMessage(res.response.data.message);
        // setMessageClassName("mb-4 pb-4 ");
      });
  }

  return (
    <div>
      <div className="p-4 text-2xl flex justify-evenly">
        <h1 className="text-white"> Login</h1>
      </div>

      <div className=" pt-4  pl-8 pr-8    shadow-md  w-96  lg:w-96">
        <form>
          <div className="mb-4 pb-4">
            <input
              required
              type="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className=" hover:scale-105 duration-200 w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 pb-4">
            <input
              required
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="hover:scale-105 duration-200 w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950"
              placeholder="Enter your password"
            />
          </div>
          <div>
            {message === "" ? (
              ""
            ) : (
              <div className="mb-4 pb-4">
                <center>
                  <label className="p-2 hover:scale-105 duration-200 w-full  border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950 text-center	">
                    {message}
                  </label>
                </center>
              </div>
            )}
          </div>
          <center>
            <button
              type="submit"
              className="w-1/2   text-center  hover:scale-105 duration-200 bg-blue-500 text-white p-2 mt-3 rounded-md hover:bg-orange-700 hover:text-cyan-300 font-bold focus:outline-none"
              onClick={handleLoginUser}
            >
              Sign In
            </button>
          </center>
        </form>
        <p className=" mt-4 text-sm pb-4 text-white text-center">
          Not registered?
          <button
            onClick={(e) => {
              e.preventDefault();
              setOverlay("register");
            }}
            className="text-cyan-400 px-1"
          >
            {"  Click here"}
          </button>
        </p>
      </div>
    </div>
  );
}

function SignUp({ setOverlay, message, setMessage }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value,
    });
  }

  function handleRegisterUser(e) {
    e.preventDefault();

    // console.log(data);
    axios
      .post("https://trivia-minefield.onrender.com/api/user", user)
      .then((res) => {
        // console.log(res);
        setMessage("Please login using your new credentials");
        setOverlay("login");
        // navigate("/");
      })
      .catch((res) => {
        // console.log(res);
        setMessage(res.response.data.message);
        // setMessageClassName("mb-4 pb-4 ");
      });
  }

  return (
    <div>
      <div className="p-4 text-2xl flex justify-evenly">
        <h1 className="text-white"> Register</h1>
      </div>
      <div className=" pt-4  pl-8 pr-8    shadow-md  w-96  lg:w-96">
        <form>
          <div className="mb-4 pb-4">
            <input
              required
              type="Name"
              id="name"
              value={user.name}
              onChange={handleChange}
              className=" hover:scale-105 duration-200 w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950"
              placeholder="Enter your Name"
            />
          </div>
          <div className="flex mb-4 pb-4">
            <input
              required
              type="radio"
              id="gender"
              value="male"
              name="gender"
              onChange={handleChange}
              className=" hover:scale-105 duration-200 w-full  border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950"
              placeholder="Enter your Name"
            />
            <label className=" hover:scale-105 duration-200 w-full  border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950 text-center	">
              {" "}
              Male
            </label>
            <input
              required
              type="radio"
              id="gender"
              name="gender"
              value="female"
              onChange={handleChange}
              className=" hover:scale-105 duration-200 w-full  border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950"
              placeholder="Enter your Name"
            />
            <label className=" hover:scale-105 duration-200 w-full  border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950 text-center	">
              {" "}
              Female
            </label>
          </div>
          <div className="mb-4 pb-4">
            <input
              required
              type="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className=" hover:scale-105 duration-200 w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 pb-4">
            <input
              required
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="hover:scale-105 duration-200 w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950"
              placeholder="Enter your password"
            />
          </div>
          <div>
            {message === "" ? (
              ""
            ) : (
              <div className="mb-4 pb-4">
                <center className="p-2 hover:scale-105 duration-200 w-full  border rounded-md focus:outline-none focus:border-blue-500 bg-cyan-100 placeholder:text-slate-700 text-blue-950 text-center">
                  {message}
                </center>
              </div>
            )}
          </div>
          <center>
            <button
              type="submit"
              className="w-1/2   text-center  hover:scale-105 duration-200 bg-blue-500 text-white p-2 mt-3 rounded-md hover:bg-orange-700 hover:text-cyan-300 font-bold focus:outline-none"
              onClick={handleRegisterUser}
            >
              Sign Up
            </button>
          </center>
        </form>

        <p className=" mt-4 text-sm pb-4 text-white text-center">
          Already Registered?
          <button
            onClick={() => setOverlay("login")}
            className="text-cyan-400
         px-1"
          >
            {" "}
            Click here
          </button>
        </p>
      </div>
    </div>
  );
}

function Overlay({ overlay, setOverlay, setLoggedInID, setUserXAuth }) {
  const [message, setMessage] = useState("");
  return (
    <div className="w-screen fixed h-screen z-10  flex justify-center items-center">
      <div>
        <div className="flex justify-end text-white p-2">
          <button className="p-2" onClick={() => setOverlay("")}>
            <img width="20px " src="./images/cross.svg" alt="X"></img>
          </button>
        </div>
        <div className="bg-slate-700  rounded-2xl">
          {overlay === "login" ? (
            <Login
              setOverlay={setOverlay}
              message={message}
              setMessage={setMessage}
              setLoggedInID={setLoggedInID}
              setUserXAuth={setUserXAuth}
            />
          ) : (
            <SignUp
              setOverlay={setOverlay}
              message={message}
              setMessage={setMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function HomePage({ setLoggedInID, setUserXAuth, backendActive }) {
  const screenSize = useScreenSize();
  const [overlay, setOverlay] = useState("");

  return (
    <>
      {overlay !== "" ? (
        <Overlay
          overlay={overlay}
          setOverlay={setOverlay}
          setLoggedInID={setLoggedInID}
          setUserXAuth={setUserXAuth}
        />
      ) : (
        ""
      )}
      <div className={`h-screen ${overlay !== "" ? "opacity-20" : ""}`}>
        <div className="w-screen flex justify-between">
          <div className="flex h-20 p-4 center">
            <img width="50px" src="./images/logo.svg" alt="logo"></img>
            {screenSize.width > 650 ? (
              <p className="text-3xl text-white  font-mono font-extrabold mt-2 pl-2">
                Trivia MineField
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="text-white">
            <div className="p-2">
              <button
                onClick={() => setOverlay("register")}
                className="rounded-xl bg-slate-500 m-2 px-4 py-1"
              >
                Register
              </button>
              <button
                onClick={() => setOverlay("login")}
                className="rounded-xl bg-slate-800 m-2 px-4 py-1"
              >
                LogIn
              </button>
            </div>
          </div>
        </div>
        <div className="h-5/6">
          <div className="flex h-4/6 items-center justify-center ">
            <div>
              <div className="flex items-center justify-center">
                <img src="./images/logo.svg" alt="" />
              </div>
              <div className="flex justify-center p-3 text-white text-3xl">
                The Ultimate Quiz Builder
              </div>
              <div className="px-4 text-white text-2xl">
                Create quizes, share with people in a convenient way
              </div>
            </div>
          </div>
        </div>
      </div>
      {backendActive ? (
        ""
      ) : (
        <footer className="sticky bottom-0 text-zinc-700 p-2 flex justify-evenly">
          <div>
            <p> A kind request: Since the backend is hosted on Render</p>
            <p>Kindly wait for a few seconds for the server to start</p>
          </div>
        </footer>
      )}
    </>
  );
}

export default HomePage;
