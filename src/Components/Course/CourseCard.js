import React, { useState } from "react";
import "../../Styles/Course/Course.css";

import courseicon from "../../Images/lecture.svg";
import dropdown from "../../Images/dropdownarrow.svg";
import lectureIcon from "../../Images/lecture-icon.svg";

function CourseCard({ courses, setActiveLecture }) {
  const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <>
      {courses.map((course, index) => (
        <div key={index} className="course-item">
          <div className="card-header" onClick={() => toggleCard(index)}>
            <div className="course-item-right">
              <div className="courseiconcont">
                <img src={courseicon} alt="courseicon" className="courseicon" />
              </div>
              <div className="course-details">
                <div className="course-title">{course.title}</div>
                <span className="lecture-number">
                  {course.lectures
                    ? `عدد المحاضرات : ${course.lectures.length}`
                    : "وصف المقرر"}
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
              {course.lectures ? (
                <div className="lectures-list">
                  {course.lectures.map((lecture, idx) => (
                    <div
                      key={idx}
                      className="lecture-item"
                      onClick={() => setActiveLecture(lecture)}
                    >
                      <img
                        src={lectureIcon}
                        alt="lectureIcon"
                        className="lectureIcon"
                      />
                      <div className="lecture-item-left">
                        <span className="lecture-title">{lecture.title}</span>
                        <span className="lecture-duration">
                          {lecture.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="course-description">
                  <h4 className="course-desc-title">تفاصيل المقرر</h4>
                  <p className="course-desc">{course.description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default CourseCard;

