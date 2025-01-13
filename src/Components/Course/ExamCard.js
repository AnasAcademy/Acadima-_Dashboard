import React, { useState } from "react";
import "../../Styles/Course/Course.css";

import courseexams from "../../Images/courseexams.svg";
import dropdown from "../../Images/dropdownarrow.svg";
import lectureIcon from "../../Images/lecture-icon.svg";

function ExamCard({ exams, setActiveExam }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <>
      {exams.map((exam, index) => (
        <div key={index} className="course-item">
          <div className="card-header" onClick={() => toggleCard(index)}>
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
          {expandedCard === index && (
            <div className="course-content">
              {exam.exam ? (
                <div className="lectures-list">
                  {exam.exam.map((item, idx) => (
                    <div
                      key={idx}
                      className="lecture-item"
                      onClick={() => setActiveExam(item)}
                    >
                      <img
                        src={lectureIcon}
                        alt="lectureIcon"
                        className="lectureIcon"
                      />
                      <div className="lecture-item-left">
                        <span className="lecture-title">{item.title}</span>
                        <span className="lecture-duration">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="course-description">
                  <h4 className="course-desc-title">تفاصيل الاختبار</h4>
                  <p className="course-desc">{exam.description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default ExamCard;
