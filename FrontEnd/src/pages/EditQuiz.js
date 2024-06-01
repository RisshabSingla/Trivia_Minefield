import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditQuiz() {
  const navigate = useNavigate();
  const [userSettings, setUserSettings] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `https://triviaminefieldbackend-risshab-singlas-projects.vercel.app/api/v1/users/getme`,
          {
            headers: {
              Authorization: `Bearer ${document.cookie.substring(4)}`,
            },
            withCredentials: true,
          }
        );
        setUserSettings(res.data.data.user);
      } catch (err) {
        navigate("/");
      }
    }
    getData();
  }, []);

  const params = useParams();
  console.log(params);

  useEffect(() => {
    async function getQuiz() {
      const res = await axios.get(
        `https://triviaminefieldbackend-risshab-singlas-projects.vercel.app/api/v1/quiz/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${document.cookie.substring(4)}`,
          },
          withCredentials: true,
        }
      );
      console.log(res);
    }
    getQuiz();
  }, []);

  return (
    <div>
      <div>
        <NavBar userSettings={userSettings} />
      </div>
      <div></div>
    </div>
  );
}

export default EditQuiz;
