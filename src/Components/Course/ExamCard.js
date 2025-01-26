import React, { useState } from "react";
import "../../Styles/Course/Course.css";

import courseexams from "../../Images/courseexams.svg";
import dropdown from "../../Images/dropdownarrow.svg";
import lectureIcon from "../../Images/lecture-icon.svg";

function ExamCard({ exams = [], setActiveExam }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <>
      {exams.map((exam, index) => (
        <div key={exam.id || index} className="course-item">
          {/* Card Header */}
          <div className="card-header" onClick={() => toggleCard(index)}>
            <div className="course-item-right">
              <div className="courseiconcont">
                <img src={courseexams} alt="Exam Icon" className="courseicon" />
              </div>
              <div className="course-details">
                <div className="course-title">
                  {exam.translations?.[0]?.title || "No Title"}
                </div>
                <div className="course-more-details">
                  <span className="lecture-number">
                    Attempts Allowed: {exam.attempt || "N/A"}
                  </span>
                  <span className="exam-duration">
                    Duration: {exam?.time || "N/A"} minutes
                  </span>
                </div>
              </div>
            </div>
            <img
              src={dropdown}
              alt="Dropdown"
              className={`course-dropdownarrow ${
                expandedCard === index ? "rotated" : ""
              }`}
            />
          </div>

          {/* Expanded Card Content */}
          {expandedCard === index && (
            <div className="course-content">
              <div className="lectures-list">
                <div
                  className="lecture-item"
                  onClick={() => setActiveExam(exam)} // Set the selected exam
                >
                  <img
                    src={lectureIcon}
                    alt="Lecture Icon"
                    className="lectureIcon"
                  />
                  <div className="lecture-item-left">
                    <span className="lecture-title">
                      {exam.translations?.[0]?.title || "No Title"}
                    </span>
                    {/* <span className="lecture-duration">
                      Pass Mark: {exam.pass_mark || "N/A"}%
                    </span>
                    <span className="lecture-duration">
                      Can Try: {exam.can_try ? "Yes" : "No"}
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default ExamCard;
