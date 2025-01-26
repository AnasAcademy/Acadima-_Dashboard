import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import "../../Styles/Course/AssignmentContent.css";

import deadlinePassed from "../../Images/Course/deadlinePassed.svg";
import deadline from "../../Images/Course/assignmentDeadline.svg";
import attempts from "../../Images/Course/assignmentSubmital.svg";
import grade from "../../Images/Course/assignmentGrade.svg";
import passGrade from "../../Images/Course/assignmentPass.svg";
import nosubmit from "../../Images/Course/notsubmitted.svg";
import nosubmissionsyet from "../../Images/Course/nosubmissionyet.svg";

const AssignmentContent = ({ assignment }) => {
  const { userBriefData } = useContext(UserContext);

  if (!assignment) {
    return <p>No assignment selected.</p>;
  }

  const isDeadlinePassed = new Date().getTime() > assignment.deadline * 1000;
  const hasSubmission =
    assignment.submission && assignment.submission.length > 0;

  const renderSubmissionState = () => {
    if (isDeadlinePassed) {
      return (
        <div className="no-submission-state">
          <img
            src={deadlinePassed}
            alt="deadlinePassed"
            className="state-icon"
          />
          <p className="state-message">تم بلوغ الموعد النهائي! </p>
          <p className="state-detail">لم يعد يمكنك إرسال ملفات ...</p>
        </div>
      );
    } else if (hasSubmission) {
      return (
        <>
          {/* Submission Form */}
          <div className="assignment-submittal-item">
            <h3 className="assignment-submittal-header">إضافة تسليم</h3>
            <label className="assignment-action-title">أضف وصفاً لمشروعك</label>
            <input type="text" className="input-paragraph" />
            <label className="assignment-action-title">عنوان الملف</label>
            <input type="text" className="input-title" />
            <label className="assignment-action-title">إرفاق الملف</label>
            <div className="assignment-action-container">
              <input
                type="file"
                className="input-file"
                placeholder="إرفاق الملف"
                aria-label="Upload file"
              />
              <button className="assignment-action-button">إرسال</button>
            </div>
          </div>
          {/* Submission State */}
          <div className="submission-state">
            <div className="submission-details">
              <img src={userBriefData?.avatar} className="user-logo" />
              <div className="submission-details-info">
                <h3>{userBriefData?.full_name}</h3>
                <p>
                  تاريخ ووقت التسليم:{" "}
                  {new Date(assignment.submissionDate * 1000).toLocaleString()}
                </p>
                <p>عدد الملفات المرفقة: {assignment.submission?.length || 0}</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="assignment-submittal-item">
            <h3 className="assignment-submittal-header">إضافة تسليم</h3>
            <label className="assignment-action-title">أضف وصفاً لمشروعك</label>
            <input type="text" className="input-paragraph" />
            <label className="assignment-action-title">عنوان الملف</label>
            <input type="text" className="input-title" />
            <label className="assignment-action-title">إرفاق الملف</label>
            <div className="assignment-action-container">
              <input
                type="file"
                className="input-file"
                placeholder="إرفاق الملف"
                aria-label="Upload file"
              />
              <button className="assignment-action-button">إرسال</button>
            </div>
          </div>
          <div className="no-assignment-submission-state">
            <img
              src={nosubmissionsyet}
              alt="nosubmissionsyet"
              className="state-icon"
            />
            <p className="state-message">لم يتم رفع أي ملفات بعد!</p>
            <p className="state-detail">
              سارع برفع متطلبات البرنامج لإكماله بنجاح.
            </p>
          </div>
        </>
      );
    }
  };

  return (
    <div className="assignment-content">
      <h2 className="course-section-header">تفاصيل الواجب</h2>
      <div className="assignment-details-section">
        <div className="assignment-detail-item">
          <img src={deadline} alt="deadline" className="assignment-icon" />
          <p className="assigment-detail">
            {assignment.deadline
              ? new Date(assignment.deadline * 1000).toLocaleString()
              : "N/A"}
          </p>
          <p className="assignemnt-detail-title">الحد الأقصى للتسليم</p>
        </div>

        <div className="assignment-detail-item">
          <img src={attempts} alt="attempts" className="assignment-icon" />
          <p className="assigment-detail">{assignment.attempts || "N/A"}</p>
          <p className="assignemnt-detail-title">مرات التسليم</p>
        </div>

        <div className="assignment-detail-item">
          <img src={grade} alt="grade" className="assignment-icon" />
          <p className="assigment-detail">{assignment.grade || "N/A"}</p>
          <p className="assignemnt-detail-title">درجة الطالب</p>
        </div>

        <div className="assignment-detail-item">
          <img src={passGrade} alt="passGrade" className="assignment-icon" />
          <p className="assigment-detail">{assignment.pass_grade || "N/A"}</p>
          <p className="assignemnt-detail-title">درجة النجاح</p>
        </div>

        <div className="assignment-detail-item">
          <img src={nosubmit} alt="nosubmit" className="assignment-icon" />
          <p className="assigment-detail">{assignment.status || "N/A"}</p>
          <p className="assignemnt-detail-title">حالة التسليم</p>
        </div>
      </div>

      <h2 className="course-section-header">إضافة تسليم</h2>
      <div className="assignment-submittal-section">
        {renderSubmissionState()}
      </div>
    </div>
  );
};

export default AssignmentContent;
