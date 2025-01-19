// Components/Course/AssignmentContent.js
import React from "react";

const AssignmentContent = ({ assignment }) => {
  if (!assignment) {
    return <p>No assignment selected.</p>;
  }

  return (
    <div className="assignment-content" style={{color: "white"}}>
      <h3>{assignment?.translations?.[0]?.title || "Assignment Title"}</h3>
      <p>{assignment?.translations?.[0]?.description || "No Description"}</p>
      <p>
        <strong>Grade:</strong> {assignment.grade || "N/A"}
      </p>
      <p>
        <strong>Pass Grade:</strong> {assignment.pass_grade || "N/A"}
      </p>
      <p>
        <strong>Deadline:</strong>{" "}
        {assignment.deadline
          ? new Date(assignment.deadline * 1000).toLocaleString()
          : "N/A"}
      </p>
    </div>
  );
};

export default AssignmentContent;
