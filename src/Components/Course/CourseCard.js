import React, { useState } from "react";
import "../../Styles/Course/Course.css";

import courseicon from "../../Images/lecture.svg";
import dropdown from "../../Images/dropdownarrow.svg";
import lectureIcon from "../../Images/lecture-icon.svg";

function CourseCard({
  chapters,
  course,
  setActiveLecture,
  setActiveAssignment,
  setActiveTextLesson,
}) {
  const [expandedCard, setExpandedCard] = useState(null);
  const [itemContent, setItemContent] = useState({});

  const toggleCard = (chapter, course) => {
    if (expandedCard === chapter.id) {
      setExpandedCard(null);
      setItemContent({}); // Clear content when card collapses
    } else {
      setExpandedCard(chapter.id);

      const chapterItems = Array.isArray(chapter.chapter_items)
        ? chapter.chapter_items
        : [];
      const categorizedContent = {
        assignments: chapterItems
          .filter((item) => item.type === "assignment")
          .map((item) =>
            course?.course?.assignments?.find(
              (assignment) => assignment.id === item.item_id
            )
          )
          .filter(Boolean), // Remove undefined results
        text_lessons: chapterItems
          .filter((item) => item.type === "text_lesson")
          .map((item) =>
            course?.course?.text_lessons?.find(
              (lesson) => lesson.id === item.item_id
            )
          )
          .filter(Boolean), // Remove undefined results
        sessions: chapterItems
          .filter((item) => item.type === "session")
          .map((item) =>
            course?.course?.sessions?.find(
              (session) => session.id === item.item_id
            )
          )
          .filter(Boolean), // Remove undefined results
        files: chapterItems
          .filter((item) => item.type === "file")
          .map((item) =>
            course?.course?.files?.find((file) => file.id === item.item_id)
          )
          .filter(Boolean), // Remove undefined results
      };
      setItemContent(categorizedContent || {});
    }
  };

  const handleItemClick = (item, type) => {
    // Reset other active states when selecting a new type
    setActiveLecture(null);
    setActiveAssignment(null);
    setActiveTextLesson(null);

    switch (type) {
      case "assignment":
        setActiveAssignment(item);
        break;
      case "text_lesson":
        setActiveTextLesson(item);
        break;
      case "session":
        setActiveLecture(item); // Assume sessions are videos
        break;
      default:
        break;
    }
  };

  return (
    <>
      {chapters.map((chapter) => (
        <div key={chapter.id} className="course-item">
          <div
            className="card-header"
            onClick={() => toggleCard(chapter, course)}
          >
            <div className="course-item-right">
              <div className="courseiconcont">
                <img src={courseicon} alt="courseicon" className="courseicon" />
              </div>
              <div className="course-details">
                <div className="course-title">{chapter?.title}</div>
                <span className="lecture-number">
                  {Array.isArray(chapter?.chapter_items)
                    ? `عدد المهام : ${chapter?.chapter_items.length}`
                    : "No lectures"}
                </span>
              </div>
            </div>
            <img
              src={dropdown}
              alt="dropdown"
              className={`course-dropdownarrow ${
                expandedCard === chapter.id ? "rotated" : ""
              }`}
            />
          </div>

          {expandedCard === chapter.id && (
            <div className="course-content">
              {Object.keys(itemContent).length > 0 ? (
                <>
                  {itemContent.assignments?.length > 0 && (
                    <div className="assignments-list">
                      {itemContent.assignments.map((assignment, idx) => (
                        <div
                          key={`assignment-${idx}`}
                          className="lecture-item"
                          onClick={() =>
                            handleItemClick(assignment, "assignment")
                          }
                        >
                          <img
                            src={lectureIcon}
                            alt="lectureIcon"
                            className="lectureIcon"
                          />
                          <div className="lecture-item-left">
                            <span className="lecture-title">
                              {assignment?.translations?.[0]?.title ||
                                "No Title"}
                            </span>
                            <span className="lecture-duration">
                              {assignment?.grade
                                ? `Grade: ${assignment.grade}`
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {itemContent.text_lessons?.length > 0 && (
                    <div className="text-lessons-list">
                      {itemContent.text_lessons.map((lesson, idx) => (
                        <div
                          key={`lesson-${idx}`}
                          className="lecture-item"
                          onClick={() => handleItemClick(lesson, "text_lesson")}
                        >
                          <img
                            src={lectureIcon}
                            alt="lectureIcon"
                            className="lectureIcon"
                          />
                          <div className="lecture-item-left">
                            <span className="lecture-title">
                              {lesson?.translations?.[0]?.title || "No Title"}
                            </span>
                            <span className="lecture-duration">
                              {lesson?.study_time
                                ? `Study Time: ${lesson.study_time} mins`
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {itemContent.sessions?.length > 0 && (
                    <div className="sessions-list">
                      {itemContent.sessions.map((session, idx) => (
                        <div
                          key={`session-${idx}`}
                          className="lecture-item"
                          onClick={() => handleItemClick(session, "session")}
                        >
                          <img
                            src={lectureIcon}
                            alt="lectureIcon"
                            className="lectureIcon"
                          />
                          <div className="lecture-item-left">
                            <span className="lecture-title">
                              {session?.title || "No Title"}
                            </span>
                            <span className="lecture-duration">
                              {session?.duration || "N/A"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="no-content">
                  <p>No content available for this chapter.</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default CourseCard;
