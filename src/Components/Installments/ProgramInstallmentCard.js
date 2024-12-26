import React from "react";
import "../../Styles/Installments/ProgramInstallmentCard.css";

const ProgramInstallmentCard = ({ program, isSelected, onClick }) => {
  return (
    <div
      className={`program-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <p className="program-card-type">{program?.orderItem?.type}</p>
      <h3 className="program-card-title">{program?.orderItem?.title}</h3>
      <button className={`program-card-button ${isSelected ? "selected" : ""}`}>عرض تفاصيل الأقساط</button>
    </div>
  );
};

export default ProgramInstallmentCard;
