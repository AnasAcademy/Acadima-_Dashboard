import React, { useState } from "react";
import "../Styles/Course/Course.css";

import Header from "../Components/Course/Header";
import CourseCard from "../Components/Course/CourseCard";
import ExamCard from "../Components/Course/ExamCard";
import VideoContent from "../Components/Course/VideoContent";
import ExamContent from "../Components/Course/ExamContent";

import Activecoursecontent from "../Images/Activecoursecontent.svg";
import coursecontent from "../Images/coursecontent.svg";
import Activecourseexams from "../Images/Activecourseexams.svg";
import courseexams from "../Images/courseexams.svg";

function Course() {
  const [activeTab, setActiveTab] = useState("content"); // "content" or "exams"
  const [isCompact, setIsCompact] = useState(false); // Track layout mode
  const [activeLecture, setActiveLecture] = useState(null); // Track active lecture
  const [activeExam, setActiveExam] = useState(null); // Track active exam

  const toggleLayout = () => {
    setIsCompact((prev) => !prev);
  };

  const courses = [
    {
      title: "المقرر 1",
      description: "هنا نص عشوائي يُستخدم لملء الفراغات في التصميم.",
      lectures: [
        { title: "المحاضرة 1", duration: "ساعة واحدة" },
        { title: "المحاضرة 2", duration: "45 دقيقة" },
      ],
    },
  ];

  const exams = [
    {
      title: "اختبار الوحدة 1",
      grade: 3,
      exam: [
        { title: "عنـــوان الإختبار", duration: "ساعة واحدة", description: "هنا وصف للاختبار يمكن تعديله حسب الحاجة.",
        },
      ],
    },
  ];

  return (
    <div className="course-screen">
      <Header toggleLayout={toggleLayout} />
      <div className={`course-main-container ${isCompact ? "compact" : ""}`}>
        {!isCompact && (
          <div className="courses-list">
            <div className="courses-info-selection-cont">
              <div
                className={`selection ${activeTab === "content" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("content");
                  setActiveLecture(null); // Reset active lecture
                  setActiveExam(null); // Reset active exam
                }}
              >
                <img
                  src={activeTab === "content" ? Activecoursecontent : coursecontent}
                  alt="Activecoursecontent"
                  className="coursedetails-icon"
                />
                <span>المحتوى</span>
              </div>
              <div
                className={`selection ${activeTab === "exams" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("exams");
                  setActiveLecture(null); // Reset active lecture
                  setActiveExam(null); // Reset active exam
                }}
              >
                <img
                  src={activeTab === "exams" ? Activecourseexams : courseexams}
                  alt="courseexams"
                  className="coursedetails-icon"
                />
                <span>الإختبارات</span>
              </div>
            </div>

            <div className="courses-list-cont">
              {activeTab === "content" ? (
                <CourseCard courses={courses} setActiveLecture={setActiveLecture} />
              ) : (
                <ExamCard exams={exams} setActiveExam={setActiveExam} />
              )}
            </div>
          </div>
        )}

        <div
          className={`lecture-container ${
            isCompact
              ? "lecture-container-full"
              : activeLecture || activeExam
              ? "content-container"
              : "video-content-container"
          }`}
        >
          {activeLecture ? (
            <VideoContent videoSrc={null} />
          ) : activeExam ? (
            <ExamContent exam={activeExam} />
          ) : (
            <div className="placeholder-content">
              <p>اختر محتوى أو اختبار لعرض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Course;
