import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "../Styles/Student Platform/StudentPlatform.css";

import teams from "../Images/teams.svg";
import office365 from "../Images/office365.svg";
import pdfIcon from "../Images/pdf.svg";
import liveIcon from "../Images/live.svg";
import recordedIcon from "../Images/recorded.svg";

import ContentCard from "../Components/Main/ContentCard";
import Calendar from "../Components/Student Platform/Calendar/Calendar";

function StudentPlatform() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { userData, notifications } = useContext(UserContext); // Access userData from context

  useEffect(() => {
    // Check for new notifications
    if (notifications?.length > 0) {
      const unreadNotification = notifications.find(
        (notification) => notification.status === "unread" // Check for unread status
      );

      if (unreadNotification) {
        setPopupMessage(unreadNotification.message || "لديك إشعار جديد!");
        setShowPopup(true);

        // Optionally store the ID if needed later
        setUnreadNotificationId(unreadNotification.id);
      }
    }
  }, [notifications]);

  const [unreadNotificationId, setUnreadNotificationId] = useState(null);

  const showNotification = (notificationId) => {
    navigate(`/notifications/${notificationId}`);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const [selectedLectureType, setSelectedLectureType] =
    useState("المحاضرات المسجلة");

  const lectures = {
    "المحاضرات المسجلة": [
      
    ],
    "المحاضرات المباشرة": [
     
    ],
  };

  return (
    <div className="student-platform-container">
      <div className="student-right-container">
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content-notification">
              <p>{popupMessage}</p>
              <div className="popup-buttons">
                <button
                  className="save-button margin-0"
                  style={{ marginTop: "0" }}
                  onClick={closePopup}
                >
                  إغلاق
                </button>
                <button
                  className="save-button margin-0"
                  style={{ marginTop: "0" }}
                  onClick={() => showNotification(unreadNotificationId)} // Use an arrow function
                >
                  إظهار
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Student Card */}
        <ContentCard>
          <div className="student-info-card">
            <div className="student-info">
              <h1 className="name">أهلاً {userData?.user?.full_name}</h1>
              <h3 className="course-name">{userData?.last_program}</h3>
              <p className="details-title">البيانات الأكاديمية :</p>
              <ul className="details-list">
                <li className="details-item">
                  رقم الطالب : {userData?.user?.user_code}
                </li>
                <li className="details-item">
                  <span> البريد اللأكاديمى: </span>
                  <span>{userData?.user?.email}</span>
                </li>
              </ul>
            </div>
          </div>
        </ContentCard>

        <div className="student-right-bottom-container">
          {/* Apps */}
          <div className="general-info">
            <div className="apps">
              {/* Teams */}
              <ContentCard>
                <div className="app-card">
                  <img src={teams} alt="teams" className="app-icon" />
                  <span className="app-name">Microsoft Teams</span>
                  <span className="app-desc">منصة الحضور لجميع المحاضرات</span>
                  <button
                    className="app-button"
                    onClick={() =>
                      (window.location.href =
                        "https://go.microsoft.com/fwlink/?linkid=2187217&clcid=0x409&culture=en-us&country=us")
                    }
                  >
                    تنزيل التطبيق
                  </button>
                </div>
              </ContentCard>
              {/* Office365 */}
              <ContentCard>
                <div className="app-card">
                  <img src={office365} alt="office365" className="app-icon" />
                  <span className="app-name">Microsoft Office365</span>
                  <span className="app-desc">
                    الوصول لجميع برامج الأوفيس الخاصة بك
                  </span>
                  <button
                    className="app-button"
                    onClick={() =>
                      (window.location.href = "https://portal.office.com/")
                    }
                  >
                    تسجيل الدخول
                  </button>
                </div>
              </ContentCard>
            </div>
            {/* Pdfs */}
            <ContentCard>
              <div className="pdfs-card">
                <span className="pdf-card-title">ملفات مهمة :</span>
                <ul className="pdfs-list">
                  <li className="pdf-item">
                    <img src={pdfIcon} alt="pdfIcon" className="pdf-icon" />
                    <a
                      className="pdf-name"
                      href="https://lms.anasacademy.uk/store/1162/%D9%85%D9%84%D9%81%D8%A7%D8%AA%20%D8%B4%D8%B1%D8%AD%20%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%85%D8%AC/Microsoft%20Teams%20Arabic.pdf"
                    >
                      {" "}
                      دليل استخدام مايكروسفت تيمز{" "}
                    </a>
                  </li>
                  <li className="pdf-item">
                    <img src={pdfIcon} alt="pdfIcon" className="pdf-icon" />
                    <a
                      className="pdf-name"
                      href="https://lms.anasacademy.uk/store/1162/%D9%85%D9%84%D9%81%D8%A7%D8%AA%20%D8%B4%D8%B1%D8%AD%20%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%85%D8%AC/Microsoft%20Teams%20English.pdf"
                    >
                      Download Microsoft Teams-EN{" "}
                    </a>
                  </li>
                  <li className="pdf-item">
                    <img src={pdfIcon} alt="pdfIcon" className="pdf-icon" />
                    <a
                      className="pdf-name"
                      href="https://lms.anasacademy.uk/store/1162/%D9%85%D9%84%D9%81%D8%A7%D8%AA%20%D8%B4%D8%B1%D8%AD%20%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%85%D8%AC/Outlook%20Arabic.pdf"
                    >
                      دليل برنامج أوتلوك Outlook{" "}
                    </a>
                  </li>
                  <li className="pdf-item">
                    <img src={pdfIcon} alt="pdfIcon" className="pdf-icon" />
                    <a
                      className="pdf-name"
                      href="https://lms.anasacademy.uk/store/1162/%D9%85%D9%84%D9%81%D8%A7%D8%AA%20%D8%B4%D8%B1%D8%AD%20%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%85%D8%AC/Outlook%20English.pdf"
                    >
                      {" "}
                      Outlook Guidance-EN{" "}
                    </a>
                  </li>
                  <li className="pdf-item">
                    <img src={pdfIcon} alt="pdfIcon" className="pdf-icon" />
                    <a
                      className="pdf-name"
                      href="https://lms.anasacademy.uk/store/1162/%D9%85%D9%84%D9%81%D8%A7%D8%AA%20%D8%B4%D8%B1%D8%AD%20%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%85%D8%AC/OneDrive%20English.pdf"
                    >
                      دليل استخدام ون درايف One Drive
                    </a>
                  </li>
                  <li className="pdf-item">
                    <img src={pdfIcon} alt="pdfIcon" className="pdf-icon" />
                    <a
                      className="pdf-name"
                      href="https://lms.anasacademy.uk/store/1162/%D9%85%D9%84%D9%81%D8%A7%D8%AA%20%D8%B4%D8%B1%D8%AD%20%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%85%D8%AC/OneDrive%20Arabic.pdf"
                    >
                      One Drive Guidance-EN
                    </a>
                  </li>
                </ul>
              </div>
            </ContentCard>
          </div>
          {/* Calendar */}
          <ContentCard>
            <div className="calendar-card">
              <Calendar />
            </div>
          </ContentCard>
        </div>
      </div>

      <div className="student-left-container">
        {/* Schedule */}
        <ContentCard>
          <div className="schedule-card">
            <p className="schedule-title">الجدول الأسبوعي</p>
            <div className="lecture-types">
              {/* Lecture Type Tabs */}
              {Object.keys(lectures).map((type) => (
                <p
                  key={type}
                  className={`lecture-type ${
                    type === selectedLectureType ? "active" : ""
                  }`}
                  onClick={() => setSelectedLectureType(type)}
                >
                  {type}
                </p>
              ))}
            </div>
            {/* Lecture List */}
            <div className="dashboard-lecture-list-container">
              <ul className="dashboard-lecture-list">
                {lectures[selectedLectureType].map((lecture, index) => (
                  <li key={index} className="dashboard-lecture-item">
                    <div className="lecture-info">
                      <img
                        src={lecture.type === "live" ? liveIcon : recordedIcon}
                        alt={lecture.type}
                        className="lecture-icon"
                      />
                      <div className="lecture-details">
                        <span className="lecture-order">{`${lecture.order}`}</span>
                        <span className="lecture-course">{`${lecture.courseName}`}</span>
                      </div>
                    </div>
                    <button className="lecture-button">الذهاب للمحاضرة</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentCard>

        {/* Support */}
        <ContentCard>
          <div className="support-card">
            <div className="support-details">
              <span className="support-title">واجهتك مشكلة في المنصة ؟</span>
              <span className="support-desc">
                لا تتردد بالتواصل معنا وفريقينا جاهز لمساعدتك بأي شي تحتاجه
              </span>
              <div className="support-buttons-container">
                <button
                  className="support-button"
                  onClick={() =>
                    (window.location.href =
                      "https://anasacademy.com/new-request")
                  }
                  // onClick={() =>
                  //   (window.location.href =
                  //     "https://support.anasacademy.uk")
                  // }
                >
                  تقديم طلب جديد
                </button>
                <button
                  className="support-button"
                  onClick={() =>
                    (window.location.href = "https://anasacademy.com/follow-up")
                  }
                  //   onClick={() =>
                  //     (window.location.href = "https://support.anasacademy.uk/search")
                  //   }
                >
                  متابعة طلب سابق
                </button>
              </div>
            </div>
          </div>
        </ContentCard>
      </div>
    </div>
  );
}

export default StudentPlatform;
