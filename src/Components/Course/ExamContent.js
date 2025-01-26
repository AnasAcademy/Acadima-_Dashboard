import React from "react";
import "../../Styles/Course/QuizContent.css";

import examCont from "../../Images/examCont.svg";
import { useNavigate, useParams } from "react-router-dom";

function ExamContent({ exam, teacher }) {
  const navigate = useNavigate(); // Correct use of useNavigate hook
  const { classId, courseId } = useParams(); // Get route parameters from parent

  const handleStartQuiz = () => {
    // Dynamically navigate to the quiz page using parameters
    navigate(`/classes/${classId}/course/${courseId}/Quiz`, { state: { exam, teacher } });
  };

  return (
    <div className="exam-content">
      <img src={examCont} alt="Exam Content" className="examcontimg" />
      <div className="exam-content-info">
        <h2 className="exam-title">{exam?.translations?.[0]?.title}</h2>
        <p>انتقل الى صفحة الاختبار للحصول على مزيد من المعلومات</p>
        <p>The quiz will expire in {exam?.expiry_days} days.</p>
      </div>
      <button className="assignment-action-button" onClick={handleStartQuiz}>
        Start Quiz
      </button>
      
    </div>
  );
}

export default ExamContent;
