import React from "react";
import "../../Styles/Course/Course.css";

import examCont from "../../Images/examCont.svg";
import leftarrow from "../../Images/leftarrow.svg";

function ExamContent({ exam }) {
  // Extract important fields with fallbacks
  const title = exam?.translations?.[0]?.title || "No Title Available";
  const time = exam?.time || "N/A";
  const passMark = exam?.pass_mark || "N/A";
  const attempts = exam?.attempt || "N/A";
  const expiry_days = exam?.expiry_days || "N/A";
  const canTry = exam?.can_try ? "Yes" : "No";
  const certificateStatus = exam?.can_download_certificate
    ? "Available"
    : "Not Available";
  const createdAt = exam?.created_at
    ? new Date(exam.created_at * 1000).toLocaleString() // Convert timestamp to readable format
    : "Timestamp Not Provided";

  return (
    <div className="exam-content" style={{ color: "green" }}>
      <img src={examCont} alt="ExamContent" className="examcontimg" />
      <div className="exam-header">
        <h2 className="exam-title">{title}</h2>
        <p className="exam-duration">Duration: {time} minutes</p>
        <p className="exam-pass-mark">Pass Mark: {passMark}%</p>
        <p className="exam-attempts">Attempts Allowed: {attempts}</p>
      </div>
      <div className="exam-description">
        <p>Can Try: {canTry}</p>
        <p>Certificate Status: {certificateStatus}</p>
      </div>
      <button className="exam-action-btn">
        {/* <img src={leftarrow} alt="leftarrow" className="leftarrow" /> */}
        Start Quiz
      </button>
    </div>
  );
}

export default ExamContent;
