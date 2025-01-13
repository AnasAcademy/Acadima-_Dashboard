import React from "react";
import "../../Styles/Course/Course.css";

import examCont from '../../Images/examCont.svg';
import leftarrow from '../../Images/leftarrow.svg';

function ExamContent({ exam }) {
  return (
    <div className="exam-content">
        <img src={examCont} alt="ExamContent" className="examcontimg" />
      <div className="exam-header">
        <h2 className="exam-title">{exam.title}</h2>
        <p className="exam-duration">{exam.duration}</p>
        <p className="exam-duration">الدرجة الكلية 5/5</p>
      </div>
      <div className="exam-description">
        <p>{exam.description}</p>
      </div>
      <button className="exam-action-btn"> <img src={leftarrow} alt="leftarrow" className="leftarrow"/>ابدأ الاختبار</button>
    </div>
  );
}

export default ExamContent;
