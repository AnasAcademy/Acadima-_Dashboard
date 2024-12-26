import React, { useState } from "react";
import "../Styles/Course/Course.css";

import Header from "../Components/Course/Header";
import CourseCard from "../Components/Course/CourseCard";
import ExamCard from "../Components/Course/ExamCard";
import VideoContent from "../Components/Course/VideoContent";

import Activecoursecontent from "../Images/Activecoursecontent.svg";
import coursecontent from "../Images/coursecontent.svg";
import Activecourseexams from "../Images/Activecourseexams.svg";
import courseexams from "../Images/courseexams.svg";

function Course() {
  const [activeTab, setActiveTab] = useState("content"); // "content" or "exams"
  const [isCompact, setIsCompact] = useState(false); // Track layout mode

  const toggleLayout = () => {
    setIsCompact((prev) => !prev);
  };

  const courses = [
    {
      title: "المقرر 1",
      description:
        "هنا نص عشوائي يُستخدم لملء الفراغات في التصميم. هذا النص لا يحمل معنى محدد بل يُستخدم لأغراض العرض فقط. يمكنك استخدامه لتجربة توزيع النصوص وتنسيقها في التصميم. النص يتكرر هنا بدون محتوى فعلي لإظهار الشكل النهائي للصفحة.",
    },
    {
      title: "المقرر 2",
      lectures: [
        { title: "المحاضرة 1", duration: "ساعة واحدة" },
        { title: "المحاضرة 2", duration: "45 دقيقة" },
      ],
    },
    {
      title: "المقرر 3",
      lectures: [
        { title: "المحاضرة 1", duration: "30 دقيقة" },
        { title: "المحاضرة 2", duration: "50 دقيقة" },
      ],
    },
    {
        title: "المقرر 3",
        lectures: [
          { title: "المحاضرة 1", duration: "30 دقيقة" },
          { title: "المحاضرة 2", duration: "50 دقيقة" },
        ],
      },{
        title: "المقرر 3",
        lectures: [
          { title: "المحاضرة 1", duration: "30 دقيقة" },
          { title: "المحاضرة 2", duration: "50 دقيقة" },
        ],
      },{
        title: "المقرر 3",
        lectures: [
          { title: "المحاضرة 1", duration: "30 دقيقة" },
          { title: "المحاضرة 2", duration: "50 دقيقة" },
        ],
      },{
        title: "المقرر 3",
        lectures: [
          { title: "المحاضرة 1", duration: "30 دقيقة" },
          { title: "المحاضرة 2", duration: "50 دقيقة" },
        ],
      },{
        title: "المقرر 3",
        lectures: [
          { title: "المحاضرة 1", duration: "30 دقيقة" },
          { title: "المحاضرة 2", duration: "50 دقيقة" },
        ],
      },{
        title: "المقرر 3",
        lectures: [
          { title: "المحاضرة 1", duration: "30 دقيقة" },
          { title: "المحاضرة 2", duration: "50 دقيقة" },
        ],
      },{
        title: "المقرر 3",
        lectures: [
          { title: "المحاضرة 1", duration: "30 دقيقة" },
          { title: "المحاضرة 2", duration: "50 دقيقة" },
        ],
      },{
        title: "المقرر 3",
        lectures: [
          { title: "المحاضرة 1", duration: "30 دقيقة" },
          { title: "المحاضرة 2", duration: "50 دقيقة" },
        ],
      },
  ];

  const exams = [
    {
      title: "اختبار الوحدة 1",
      grade: 3,
    },
    {
      title: "اختبار الوحدة 2",
      grade: 2,
    },
  ];

  return (
    <div className="course-screen">
      <Header toggleLayout={toggleLayout}/>
      <div className={`course-main-container ${isCompact ? "compact" : ""}`}>
        {/* Courses List - Conditionally Render */}
        {!isCompact && (
          <div className="courses-list">
            <div className="courses-info-selection-cont">
              <div
                className={`selection ${
                  activeTab === "content" ? "active" : ""
                }`}
                onClick={() => setActiveTab("content")}
              >
                <img
                  src={
                    activeTab === "content" ? Activecoursecontent : coursecontent
                  }
                  alt="Activecoursecontent"
                  className="coursedetails-icon"
                />
                <span>المحتوى</span>
              </div>
              <div
                className={`selection ${
                  activeTab === "exams" ? "active" : ""
                }`}
                onClick={() => setActiveTab("exams")}
              >
                <img
                  src={
                    activeTab === "exams" ? Activecourseexams : courseexams
                  }
                  alt="courseexams"
                  className="coursedetails-icon"
                />
                <span>الإختبارات</span>
              </div>
            </div>

            <div className="courses-list-cont">
              {activeTab === "content" ? (
                <CourseCard courses={courses} />
              ) : (
                <ExamCard exams={exams} />
              )}
            </div>
          </div>
        )}

        {/* Lecture Container - Takes Full Screen If Compact */}
        <div
          className={`lecture-container ${
            isCompact ? "lecture-container-full" : ""
          }`}
        >
          <VideoContent videoSrc={null} />
        </div>
      </div>
    </div>
  );
}

export default Course;
