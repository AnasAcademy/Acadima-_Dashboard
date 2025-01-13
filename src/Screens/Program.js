import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import "../Styles/Program/Program.css";

import ProgramCard from "../Components/Program/ProgramCard";

import payment from "../Images/Sidebar icons/payment.svg";

function Program() {
  const { programs } = useContext(UserContext);

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
