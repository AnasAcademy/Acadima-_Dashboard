import React from "react";
import "../../Styles/Classes/ProgramCard.css";

function ProgramCard({item, isSelected, onClick }) {
  return (
    <div
      className={`classes-program-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="program-title">{item?.category}</div>
      <div className="program-subtitle">{item?.title}</div>
      <div className="progress-container">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${item?.progress}%` }}></div>
        </div>
        <div className="progress-percentage">{item?.progress}%</div>
      </div>
    </div>
  );
}

export default ProgramCard;
