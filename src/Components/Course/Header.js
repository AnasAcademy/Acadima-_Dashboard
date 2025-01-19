import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../Styles/Course/Course.css";

import logo from "../../Images/AcadimaLogo.png";
import changelayout from "../../Images/changelayout.svg";

function Header({ toggleLayout, title }) {
  const navigate = useNavigate();
  const { classId } = useParams(); // Use the correct param name: classId

  const goToProgram = () => {
    if (classId) {
      navigate(`/classes/${classId}`); // Navigate to `/classes/:classId`
    } else {
      console.log("Class ID is missing in the URL");
    }
  };

  return (
    <div className="course-header">
      <div className="course-header-left">
        <img
          src={changelayout}
          alt="changelayout"
          className="changelayout"
          onClick={toggleLayout} // Toggle layout on click
          style={{ cursor: "pointer" }}
        />
        <button className="schedule-button" onClick={goToProgram}>
          جدول المقررات
        </button>
      </div>
      <div className="course-header-right">
        <div className="course-progress-details">
          <h2 className="course-name">
            {title}
          </h2>
          <div className="course-progress-container">
            <div className="course-progress-bar-container">
              <div
                className="course-progress-bar"
                style={{ width: `30%` }}
              ></div>
            </div>
            <div className="course-progress-percentage">30% تم إكمال </div>
          </div>
        </div>
        <img src={logo} alt="logo" className="courselogo" />
      </div>
    </div>
  );
}

export default Header;
