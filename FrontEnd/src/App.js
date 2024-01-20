import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Quiz from "./pages/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WrongPage from "./pages/WrongPage";

function App() {
  const [loggedInID, setLoggedInID] = useState("");
  const [userXAuth, setUserXAuth] = useState("");
  const [quizData, setQuiz] = useState("");
  const [backendActive, setBackEndActive] = useState(false);
  useEffect(() => {
    async function invokeBackend() {
      try {
        const res = await axios.get(
          "https://trivia-minefield.onrender.com/api"
        );
        console.log(res.data);
        setBackEndActive(true);
      } catch (err) {}
    }
    invokeBackend();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setLoggedInID={setLoggedInID}
              setUserXAuth={setUserXAuth}
              backendActive={backendActive}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              loggedInID={loggedInID}
              userXAuth={userXAuth}
              setQuiz={setQuiz}
            />
          }
        />
        <Route
          path="/quiz"
          element={
            <Quiz
              quizData={quizData}
              loggedInID={loggedInID}
              userXAuth={userXAuth}
            />
          }
        />
        <Route path="*" element={<WrongPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
