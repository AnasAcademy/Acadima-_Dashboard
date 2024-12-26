import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../API";
import "../Styles/Classes/Classes.css";

import MainPageContainer from "../Components/Main/MainPageContainer";
import ProgramCard from "../Components/Classes/ProgramCard";
import AssignmentCard from "../Components/Classes/AssignmentCard";

import noevents from "../Images/noEvents.svg";

function Classes() {
  const navigate = useNavigate();
  function HandlegoToLec() {
    navigate("/course");
  }

  const [selectedCard, setSelectedCard] = useState(null);
 
  console.log(selectedCard?.courses);

  const [classesData, setClassesData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchClassesData = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/programs/purchases", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });

      const result = await response.json();
      console.log(result);
      setClassesData(result?.data?.bundles);
      console.log(result?.data?.bundles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClassesData();
  });

  return (
    <MainPageContainer>
      <div className="classes-container">
        <div className="classes-top">
          <h3 className="classes-top-title">البرامج المسجلة</h3>
          <div className="classes-programs-container">
            {classesData.map((item) => (
              <ProgramCard
                // key={item?.id}
                item={item}
                isSelected={selectedCard?.id === item?.id}
                onClick={() => setSelectedCard(item)} // Set this card as selected
              />
            ))}
          </div>
        </div>
        <div className="classes-bottom-main">
          <div className="classes-bottom">
            {selectedCard === null ? (
              <div className="default-view">
                <img
                  src={noevents}
                  alt="noevents"
                  className="icon-placeholder"
                />
                <p className="default-text">
                  قم باختيار أحد البرامج لإظهار جدول المقررات
                </p>
              </div>
            ) : (
              <>
                <h3 className="classes-top-title"> جدول المقررات </h3>
                <h3 className="classes-top-title">
                  عدد الساعات للبرنامج:{" "}
                  <span className="hours-span">
                    {selectedCard?.hours_of_active} ساعة
                  </span>
                </h3>
                <div className="assignments-table">
                  {selectedCard?.courses?.length > 0 ? (
                    <>
                      <div className="assignments-table-header">
                        <p className="assignments-table-item1">رقم المقرر</p>
                        <p className="assignments-table-item2">أسم المقرر</p>
                        <p className="assignments-table-item3">تاريخ البدء</p>
                        <p className="assignments-table-item3">عدد المهام</p>
                        <p className="assignments-table-item4">عدد التسليمات</p>
                        <p className="assignments-table-item2">الإجراءات</p>
                      </div>
                      <div className="classes-assignments-container">
                        {selectedCard.courses.map((course, index) => (
                          <AssignmentCard
                            id={index + 1}
                            course={course}
                            goToLec={HandlegoToLec}
                          />
                        ))}
                      </div>
                      <div className="new-classes-info">
                        <button className="download-schedule">
                          تحميل جدول المحاضرات
                        </button>
                        <p className="new-classes-p">
                          ترغب بالانضمام إلى برنامج أخر ؟{" "}
                          <a className="new-classes-link">طلب تسجيل جديد</a>{" "}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="no-assignments">
                      <p>لا توجد أي مقررات متاحة حاليًا.</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainPageContainer>
  );
}

export default Classes;
