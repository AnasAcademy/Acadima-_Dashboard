import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Student Platform/StudentPlatform.css";
import { apiUrl } from "../API";

import MainPageContainer from "../Components/Main/MainPageContainer";
import ContentCard from "../Components/Main/ContentCard";

// import fadedlogo from '../Images/FadedLogo.png';
// import show from "../Images/show.svg";
// import hide from "../Images/hide.svg";
import teams from "../Images/teams.svg";
import office365 from "../Images/office365.svg";
import pdfIcon from "../Images/pdf.svg";
import liveIcon from "../Images/live.svg";
import recordedIcon from "../Images/recorded.svg";
// import supportImage from '../Images/support.svg';

import Calendar from "../Components/Student Platform/Calendar/Calendar";

function StudentPlatform() {
  // const [password] = useState("1234566"); // Example password
  // const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  // let [sessionId, setSessionId] = useState("");

  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    try {
      const response = await fetch(apiUrl + "/panel", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });

      const result = await response.json();
      // console.log(result);
      setUserData(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  const [selectedLectureType, setSelectedLectureType] =
    useState("المحاضرات المسجلة");

  // const togglePasswordVisibility = () => {
  //   setIsPasswordVisible((prevState) => !prevState);
  // };

  // const renderPassword = isPasswordVisible
  //   ? password
  //   : "-".repeat(password.length);

  const lectures = {
    "المحاضرات المسجلة": [
      {
        order: "المحاضرة الخامسة",
        type: "recorded",
        courseName: "تصميم تجربة المستخدم",
      },
      {
        order: "المحاضرة الخامسة",
        type: "recorded",
        courseName: "تصميم واجهات المستخدم",
      },
      {
        order: "المحاضرة الخامسة",
        type: "recorded",
        courseName: "إدارة الأعمال",
      },
      {
        order: "المحاضرة الخامسة",
        type: "recorded",
        courseName: "تحليل البيانات",
      },
      {
        order: "المحاضرة الخامسة",
        type: "recorded",
        courseName: "تحليل البيانات",
      },
      {
        order: "المحاضرة الخامسة",
        type: "recorded",
        courseName: "تحليل البيانات",
      },
      {
        order: "المحاضرة الخامسة",
        type: "recorded",
        courseName: "تحليل البيانات",
      },
      {
        order: "المحاضرة الخامسة",
        type: "recorded",
        courseName: "تحليل البيانات",
      },
    ],
    "المحاضرات المباشرة": [
      {
        order: "المحاضرة الخامسة",
        type: "live",
        courseName: "تصميم الجرافيك",
      },
      {
        order: "المحاضرة الخامسة",
        type: "live",
        courseName: "تحليل البيانات",
      },
    ],
  };

  // if (!userData) {
  //   // Show a loading state until paymentData is available
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <MainPageContainer>
        <div className="student-platform-container">
          <div className="student-right-container"> 
            {/* Student Card */}
            <ContentCard>
              <div className="student-info-card">
                {/* <img src={fadedlogo} alt='fadedlogo' className='fadedlogo'/> */}
                <div className="student-info">
                  <h1 className="name">أهلاً {userData?.user?.full_name} </h1>
                  <h3 className="course-name">{userData?.last_program}</h3>
                  {/* <p className='student-details-title'>البيانات الأكاديمية :</p> */}
                  <ul className="details-list">
                    <li className="details-item">
                      رقم الطالب : {userData?.user?.user_code}
                    </li>
                    <li className="details-item">
                      <span> البريد اللأكاديمى: </span>
                      <span>{userData?.user?.email}</span>
                    </li>
                    {/* <li className="details-item">
                      <span>كلمة المرور : </span>
                      <span>{renderPassword}</span>
                      <span className="eye" onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? (
                          <img src={hide} alt="hide" className="eye" />
                        ) : (
                          <img src={show} alt="show" className="eye" />
                        )}
                      </span>
                    </li> */}
                  </ul>
                </div>
              </div>
            </ContentCard>
            <div className="student-right-bottom-container">
              <div className="general-info">
                <div className="apps">
                  {/* Teams */}
                  <ContentCard>
                    <div className="app-card">
                      <img src={teams} alt="teams" className="app-icon" />
                      <span className="app-name">Microsoft teams</span>
                      <span className="app-desc">
                        منصة الحضور لجميع المحاضرات
                      </span>
                      <button
                        className="app-button"
                        onClick={() =>
                          (window.location.href =
                            "https://go.microsoft.com/fwlink/?linkid=2187217&amp;clcid=0x409&amp;culture=en-us&amp;country=us")
                        }
                      >
                        تنزيل التطبيق
                      </button>
                    </div>
                  </ContentCard>
                  {/* Office365 */}
                  <ContentCard>
                    <div className="app-card">
                      <img
                        src={office365}
                        alt="office365"
                        className="app-icon"
                      />
                      <span className="app-name">Microsoft office365</span>
                      <span className="app-desc">
                        {" "}
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
                            src={
                              lecture.type === "live" ? liveIcon : recordedIcon
                            }
                            alt={lecture.type}
                            className="lecture-icon"
                          />
                          <div className="lecture-details">
                            <span className="lecture-order">{`${lecture.order}`}</span>
                            <span className="lecture-course">{`${lecture.courseName}`}</span>
                          </div>
                        </div>
                        <span className="course-name">{lecture.course}</span>
                        <button className="lecture-button">
                          الذهاب للمحاضرة
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ContentCard>
            {/* Support */}
            <ContentCard>
              <div className="support-card">
                {/* <img src={supportImage} alt='supportImage' className='support-image' /> */}
                <div className="support-details">
                  <span className="support-title">
                    واجهتك مشكلة في المنصة ؟{" "}
                  </span>
                  <span className="support-desc">
                    لا تتردد بالتواصل معنا وفريقينا جاهز لمساعدتك بأي شي تحتاجه
                  </span>
                  <div className="support-buttons-container">
                    <button
                      className="support-button"
                      onClick={() =>
                        (window.location.href =
                          "قم بتعبئة النموذج ادناه لإنشاء طلب خدمة - Anas Academy")
                      }
                    >
                      تقديم طلب جديد
                    </button>
                    <button
                      className="support-button"
                      onClick={() =>
                        (window.location.href =
                          "بحث التذكرة الخاصة بك - Anas Academy")
                      }
                    >
                      متابعة طلب سابق
                    </button>
                  </div>
                </div>
              </div>
            </ContentCard>
          </div>
        </div>
      </MainPageContainer>
    </>
  );
}

export default StudentPlatform;
