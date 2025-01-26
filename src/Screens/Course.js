import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "../Styles/Course/Course.css";

import Header from "../Components/Course/Header";
import CourseCard from "../Components/Course/CourseCard";
import ExamCard from "../Components/Course/ExamCard";
import VideoContent from "../Components/Course/VideoContent";
import ExamContent from "../Components/Course/ExamContent";
import AssignmentContent from "../Components/Course/AssignmentContent";
import TextLessonContent from "../Components/Course/TextLessonContent";

import Activecoursecontent from "../Images/Activecoursecontent.svg";
import coursecontent from "../Images/coursecontent.svg";
import Activecourseexams from "../Images/Activecourseexams.svg";
import courseexams from "../Images/courseexams.svg";

function Course() {
  const { fetchCourseData, fetchClassesData, courseData, chapters, quizzes, teacher } =
    useContext(UserContext);

  const [activeTab, setActiveTab] = useState("content"); // "content" or "exams"
  const [isCompact, setIsCompact] = useState(false); // Track layout mode
  const [activeLecture, setActiveLecture] = useState(null); // Track active lecture
  const [activeExam, setActiveExam] = useState(null); // Track active exam
  const [activeAssignment, setActiveAssignment] = useState(null); // Track active assignment
  const [activeTextLesson, setActiveTextLesson] = useState(null); // Track active text lesson

  const { classId, courseId } = useParams(); // Get the `id` from the URL

  // Fetch course data and classes data when the classId or courseId changes
  useEffect(() => {
    // Clear previous state before fetching new data
    setActiveLecture(null);
    setActiveExam(null);
    setActiveAssignment(null);
    setActiveTextLesson(null);

    // Fetch the updated data
    fetchClassesData();
    fetchCourseData(classId, courseId);
  }, [classId, courseId, fetchCourseData, fetchClassesData]);

  const toggleLayout = () => {
    setIsCompact((prev) => !prev);
  };

  const hasContent = activeTab === "content" && chapters?.length > 0;

  return (
    <div className="course-screen">
      <Header toggleLayout={toggleLayout} title={courseData?.pageTitle} />
      <div className={`course-main-container ${isCompact ? "compact" : ""}`}>
        {!isCompact && (
          <div className="courses-list">
            <div className="courses-info-selection-cont">
              <div
                className={`selection ${
                  activeTab === "content" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("content");
                  setActiveLecture(null);
                  setActiveExam(null);
                  setActiveAssignment(null);
                  setActiveTextLesson(null);
                }}
              >
                <img
                  src={
                    activeTab === "content"
                      ? Activecoursecontent
                      : coursecontent
                  }
                  alt="Activecoursecontent"
                  className="coursedetails-icon"
                />
                <span>المحتوى</span>
              </div>
              <div
                className={`selection ${activeTab === "exams" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("exams");
                  setActiveLecture(null);
                  setActiveExam(null);
                  setActiveAssignment(null);
                  setActiveTextLesson(null);
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
                <CourseCard
                  chapters={chapters}
                  course={courseData}
                  setActiveLecture={setActiveLecture}
                  setActiveAssignment={setActiveAssignment}
                  setActiveTextLesson={setActiveTextLesson}
                  setActiveSession={setActiveLecture}
                />
              ) : (
                <ExamCard exams={quizzes || []} setActiveExam={setActiveExam} />
              )}
            </div>
          </div>
        )}

        <div
          className={`lecture-container ${
            isCompact
              ? "lecture-container-full"
              : activeLecture ||
                activeExam ||
                activeAssignment ||
                activeTextLesson
              ? "content-container"
              : "video-content-container"
          }`}
        >
          {activeLecture ? (
            <VideoContent videoSrc={activeLecture?.content || null} />
          ) : activeExam ? (
            <ExamContent exam={activeExam} teacher={teacher} />
          ) : activeAssignment ? (
            <AssignmentContent assignment={activeAssignment} />
          ) : activeTextLesson ? (
            <TextLessonContent textLesson={activeTextLesson} />
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
