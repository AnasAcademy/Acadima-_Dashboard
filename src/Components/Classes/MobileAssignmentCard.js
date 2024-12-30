import React, { useState } from "react";
import "../../Styles/Classes/MobileAssignmentCard.css";

function ProgramCard({ course, goToLec }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`mobile-program-card ${isExpanded ? "expanded" : ""}`}>
      <div
        className="mobile-program-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4>{course?.title}</h4>
        <span className="toggle-icon">{isExpanded ? "▲" : "▼"}</span>
      </div>
      {isExpanded && (
        <div className="mobile-program-details">
          <p className="mobile-program-detail-item">
            تاريخ البدء:<span> {course?.start_date}</span>
          </p>
          <p className="mobile-program-detail-item">
            عدد المهام: <span>{course?.assignments_count}</span>
          </p>
          <p className="mobile-program-detail-item">
            عدد التسليمات:{" "}
            <span>
              {course?.delivered_assignments_count === 0
                ? "لا يوجد تسليمات بعد"
                : course?.delivered_assignments_count === 1
                ? `تم ادراج  ${course?.assignments_count} تسليم `
                : course?.delivered_assignments_count > 1
                ? `تم ادراج  ${course?.assignments_count} تسليمات `
                : "بيانات غير متوفرة"}
            </span>
          </p>
          <div className="mobile-button">
            <button className="assignment-action" onClick={goToLec}>
              المحاضرات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgramCard;
