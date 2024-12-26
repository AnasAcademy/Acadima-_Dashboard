import React from "react";
import "../../Styles/Course/Course.css";

import logo from "../../Images/AcadimaLogo.png";
import changelayout from "../../Images/changelayout.svg";

function Header({ toggleLayout }) {
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
        <button className="schedule-button">جدول المقررات</button>
      </div>
      <div className="course-header-right">
        <div className="course-progress-details">
          <h2 className="course-name">
            الذكاء الاصطناعي Open IA للمبتدئين: التوجيه البرمجي
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
