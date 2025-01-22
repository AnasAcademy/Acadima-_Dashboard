import React from "react";
import "../../Styles/SingleProgramPage/AdditionalInfoSection.css";

import rightArrow from "../../Images/Single Program Page/rightArrow.png";
import chatIcon from "../../Images/Single Program Page/chat.svg";
import questionmark from "../../Images/Single Program Page/questionmark.svg";

function AdditionalInfoSection({sectionId}) {
  return (
    <div className="additional-info-section">
      <div className="additional-info-top">
        <h2 id={sectionId} className="single-program-section-title">FAQ</h2>
        <h2 className="add-info-title">Check out frequently asked questions</h2>
        <p className="add-info-p">
          From software engineering to AI, data analytics to business analysis.
          Gain the knowledge and skills of the future – and the confidence to
          transform your career.
        </p>
      </div>
      <div className="additional-info-container">
        <div className="add-info-left">
          <div className="info-left-items">
            <img src={rightArrow} alt="rightArrow" className="rightArrowInfo" />
            <p className="left-items-p">Basic Study Information</p>
          </div>
          <div className="info-left-items">
            <img src={rightArrow} alt="rightArrow" className="rightArrowInfo" />
            <p className="left-items-p">Program Degree Requirements</p>
          </div>
          <div className="info-left-items">
            <img src={rightArrow} alt="rightArrow" className="rightArrowInfo" />
            <p className="left-items-p">How can I obtain financial Aid ?</p>
          </div>
        </div>
        <div className="add-info-right">
          <img src={questionmark} alt="questionmark" className="questionmark" />
          <h3 className="more-ques">More questions ?</h3>
          <p className="more-ques-p">Don't hesitate to contact us.</p>
          <div className="need-help-button">
            <img src={chatIcon} alt="chatIcon" className="chatIcon" />
            <div className="button-text"> I Need a help </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfoSection;
