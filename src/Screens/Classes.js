import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../API";
import "../Styles/Classes/Classes.css";

import ProgramCard from "../Components/Classes/ProgramCard";
import AssignmentCard from "../Components/Classes/AssignmentCard";
import MobileAssignmentCard from "../Components/Classes/MobileAssignmentCard";

import noevents from "../Images/noEvents.svg";

function Classes() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the `id` from the URL if it exists

  const [selectedCard, setSelectedCard] = useState(null);
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
      setClassesData(result?.data?.bundles);

      // Auto-select a card if an `id` exists in the URL
      if (id) {
        const selectedProgram = result?.data?.bundles?.find(
          (bundle) => bundle.id === id
        );
        setSelectedCard(selectedProgram || null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClassesData();
  }, [id]); // Refetch when the `id` changes

  const handleCardSelect = (program) => {
    setSelectedCard(program); // Update the selected program
    navigate(`/classes/${program.id}`); // Change the route dynamically
  };

  

  return (
    <div className="classes-container">
      <div className="classes-top">
        <h3 className="classes-top-title">البرامج المسجلة</h3>
        <div className="classes-programs-container">
          {classesData.map((item) => (
            <ProgramCard
              key={item?.id}
              item={item}
              isSelected={selectedCard?.id === item?.id}
              onClick={() => handleCardSelect(item)} // Handle selection and route update
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
              <div className="wide-screen-view">
                {selectedCard?.courses?.length > 0 ? (
                  <div className="assignments-table">
                    <div className="assignments-table-header">
                      <p className="assignments-table-item1 assignments-table-item">
                        رقم المقرر
                      </p>
                      <p className="assignments-table-item2 assignments-table-item">
                        أسم المقرر
                      </p>
                      <p className="assignments-table-item3 assignments-table-item">
                        تاريخ البدء
                      </p>
                      <p className="assignments-table-item3 assignments-table-item">
                        عدد المهام
                      </p>
                      <p className="assignments-table-item4 assignments-table-item">
                        عدد التسليمات
                      </p>
                      <p className="assignments-table-item2 assignments-table-item">
                        الإجراءات
                      </p>
                    </div>
                    <div className="classes-assignments-container">
                      {selectedCard.courses.map((course, index) => (
                        <AssignmentCard
                          key={index}
                          id={index + 1}
                          course={course}
                          goToLec={() => navigate(`/classes/${selectedCard.id}/course/${course.id}`)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="default-view">
                    <p className="default-text">
                      قم باختيار أحد البرامج لإظهار جدول المقررات
                    </p>
                    <img
                      src={noevents}
                      alt="noEvents"
                      className="noAssignment-image"
                    />
                  </div>
                )}
              </div>
              <div className="mobile-screen-view">
                {selectedCard?.courses?.length > 0 ? (
                  selectedCard.courses.map((course, index) => (
                    <MobileAssignmentCard key={index} course={course} />
                  ))
                ) : (
                  <div className="default-view">
                    <p className="default-text">
                      قم باختيار أحد البرامج لإظهار جدول المقررات
                    </p>
                    <img
                      src={noevents}
                      alt="noEvents"
                      className="noAssignment-image"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Classes;
