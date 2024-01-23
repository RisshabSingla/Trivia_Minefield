import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Quiz from "./pages/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WrongPage from "./pages/WrongPage";

function App() {
  const [backendActive, setBackEndActive] = useState(false);
  useEffect(() => {
    async function invokeBackend() {
      try {
        const res = await axios.get("http://localhost:8080/api");
        console.log(res.data);
        setBackEndActive(true);
      } catch (err) {}
    }
    invokeBackend();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage backendActive={backendActive} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<WrongPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
