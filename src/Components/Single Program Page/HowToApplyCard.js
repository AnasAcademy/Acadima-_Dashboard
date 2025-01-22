import React from 'react';
import '../../Styles/Program Details/HowToApply.css';

function HowToApplyCard({ step, title, description, buttonText, highlight }) {
  return (
    <div className={`step-card ${highlight ? "highlight" : ""}`}>
      <div className={`step-number ${highlight ? "highlight" : ""}`}>Step {step}</div>
      <h3 className={`step-title ${highlight ? "highlight" : ""}`}>{title}</h3>
      <p className={`step-desc ${highlight ? "highlight" : ""}`}>{description}</p>
      <button className={`step-button ${highlight ? "highlight" : ""}`}>
        {buttonText}
      </button>
    </div>
  );
}

export default HowToApplyCard;
