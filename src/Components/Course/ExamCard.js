import React, { useState } from "react";
import "../../Styles/Course/Course.css";

import courseexams from "../../Images/courseexams.svg";
import dropdown from "../../Images/dropdownarrow.svg";

function ExamCard({ exams }) {
  const [expandedCard, setExpandedCard] = useState(null); // Track expanded card index

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <>
      {exams.map((exam, index) => (
        <div key={index} className="course-item">
          <div className="card-header" onClick={() => toggleCard(index)}>
            {/* Card Header */}
            <div className="course-item-right">
              <div className="courseiconcont">
                <img src={courseexams} alt="examIcon" className="courseicon" />
              </div>
              <div className="course-details">
                <div className="course-title">{exam.title}</div>
                <span className="lecture-number">
                  {exam.attempts
                    ? `عدد المحاولات: ${exam.attempts}`
                    : "وصف الاختبار"}
                </span>
              </div>
            </div>
            <img
              src={dropdown}
              alt="dropdown"
              className={`course-dropdownarrow ${
                expandedCard === index ? "rotated" : ""
              }`}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default ExamCard;
