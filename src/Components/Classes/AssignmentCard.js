import React from "react";
import "../../Styles/Classes/AssignmentCard.css";

function AssignmentCard({ id, course, goToLec }) {
  return (
    <div className="assignment-card">
      <span className="assignment-id">0{id}</span>
      <span className="assignment-data">{course?.title}</span>
      <span className="assignment-data">{course?.start_date}</span>
      <span className="assignment-task"> {course?.assignments_count}</span>
      <span className="assignment-data">
        {course?.delivered_assignments_count === 0
          ? "لا يوجد تسليمات بعد"
          : course?.delivered_assignments_count === 1
          ? `تم ادراج  ${course?.assignments_count} تسليم `
          : course?.delivered_assignments_count > 1
          ? `تم ادراج  ${course?.assignments_count} تسليمات `
          : "بيانات غير متوفرة"}
      </span>
      <button className="assignment-action" onClick={goToLec}>
        المحاضرات
      </button>
    </div>
  );
}

export default AssignmentCard;
