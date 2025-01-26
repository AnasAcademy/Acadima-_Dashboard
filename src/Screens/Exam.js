import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { UserContext } from "../Context/UserContext"; // Import UserContext
import anasAcadlogo from "../Images/AcadimaLogo.png";

function Exam() {
  const location = useLocation();

  const { userBriefData } = useContext(UserContext); // Consume userBriefData from context
  const exam = location.state?.exam; // Retrieve the exam data from the state
  const teacher = location.state?.teacher; // Retrieve the exam data from the state

  return (
    <div className="exam-screen">
      <header className="consultation-form-header">
        <img
          src={anasAcadlogo}
          alt="Anas Academy Logo"
          className="consultation-logo"
        />
        <div className="consultant-user-info">
          <p className="student-name">{userBriefData?.full_name}</p>
          <img
            src={userBriefData?.avatar}
            alt="User Avatar"
            className="user-logo"
          />
        </div>
      </header>
      <div className="exam-screen-content">
        <h3 className="exam-title">{exam?.translations?.[0]?.title}</h3>
        <p className="exam-subtitle">
          {exam?.translations?.[0]?.title} | بواسطة {teacher?.full_name}
        </p>
        <div className="assignment-details-section">
          {/* <div className="assignment-detail-item">
          <img src={deadline} alt="deadline" className="assignment-icon" />
          <p className="assigment-detail">
            {  || "N/A"}
          </p>
          <p className="assignemnt-detail-title">الحد الأقصى للتسليم</p>
        </div> */}

          <div className="assignment-detail-item">
            {/* <img src={attempts} alt="attempts" className="assignment-icon" /> */}
            <p className="exam-detail">{exam?.pass_mark || "N/A"}</p>
            <p className="assignemnt-detail-title">المحاولات</p>
          </div>

          <div className="assignment-detail-item">
            {/* <img src={grade} alt="grade" className="assignment-icon" /> */}
            <p className="exam-detail">
              {exam?.quiz_questions.length || "N/A"}
            </p>
            <p className="assignemnt-detail-title">أسئلة</p>
          </div>

          <div className="assignment-detail-item">
            {/* <img src={passGrade} alt="passGrade" className="assignment-icon" /> */}
            <p className="exam-detail">{exam?.time || "N/A"}</p>
            <p className="assignemnt-detail-title">الوقت المتبقى</p>
          </div>
        </div>
        <div className="assignment-submittal-section">
            
        </div>
      </div>
    </div>
  );
}

export default Exam;
