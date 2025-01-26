// Components/Course/TextLessonContent.js
import React from "react";
import { apiUrl } from "../../API";

const TextLessonContent = ({ textLesson }) => {
  // const imageUrl = `${apiUrl.replace(/\/$/, "")}/${textLesson?.image?.replace(/^\//, "")}`;

  const createdAt = textLesson?.created_at
    ? new Date(textLesson.created_at * 1000).toLocaleString() // Convert timestamp to readable format
    : "Timestamp Not Provided";
  return (
    <div className="text-lesson-content">
      <h3>title {textLesson?.translations?.[0]?.title || "Text Lesson Title"}</h3>
      <p>summary {textLesson?.translations?.[0]?.summary || "Text Lesson summary"}</p>
      <p>created at: {createdAt}</p>
      {/* <p>
        <strong>Study Time:</strong>{" "}
        {textLesson.study_time ? `${textLesson.study_time} mins` : "N/A"}
      </p> */}
      <button className="exam-action-btn border-none">المحتوى</button>
    </div>
  );
};

export default TextLessonContent;
