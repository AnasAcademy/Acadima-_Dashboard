import React, { useState, useEffect } from "react";
import "../Styles/Program/Program.css";
import { apiUrl } from "../API";

import MainPageContainer from "../Components/Main/MainPageContainer";
import ProgramCard from "../Components/Program/ProgramCard";

import payment from "../Images/Sidebar icons/payment.svg";

function Program() {
  

  const [programs, setPrograms] = useState([]);

  const token = localStorage.getItem("token");

  const fetchProgramsData = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/programs/applieds", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      });

      const result = await response.json();
      // console.log(result);
      setPrograms(result.data);
      // console.log(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProgramsData();
  }, []);

  return (
    <>
      <div className="programs-container">
        <div className="programs-top">
          <div className="section">
            <img
              src={payment}
              alt="payment"
              className="payment-icon"
              style={{ width: "30px", height: "30px" }}
            />
            <p className="section-p">دفع رسوم البرنامج</p>
          </div>
        </div>
        <div className="programs-list">
          {programs?.length > 0 ? (
            programs?.map((program) => (
              <ProgramCard key={program?.id} program={program} />
            ))
          ) : (
            <p className="no-programs">لا توجد برامج متاحة حالياً</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Program;
