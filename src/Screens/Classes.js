import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "../Styles/Classes/Classes.css";

import ProgramCard from "../Components/Classes/ProgramCard";
import AssignmentCard from "../Components/Classes/AssignmentCard";
import MobileAssignmentCard from "../Components/Classes/MobileAssignmentCard";

import noevents from "../Images/noEvents.svg";

function Classes() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the `id` from the URL if it exists

  const { classesData } = useContext(UserContext); // Fetch data from UserContext

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (id) {
      const selectedProgram = classesData.find(
        (bundle) => bundle.id === Number(id) // Match `id` as a number
      );      
      
      if (selectedProgram) {
        setSelectedCard(selectedProgram); // Select the matching program
      }
    }
  }, [id, classesData]); // Run this effect whenever `id` or `classesData` changes

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
              key={item.id}
              item={item}
              isSelected={selectedCard?.id === item.id} // Highlight if selected
              onClick={() => handleCardSelect(item)} // Handle card click
            />
          ))}
        </div>
      </div>
      <div className="classes-bottom-main">
        <div className="classes-bottom">
          {selectedCard === null ? (
            <div className="default-view">
              <img src={noevents} alt="noevents" className="icon-placeholder" />
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
                  {selectedCard?.hours_of_active === 0
                    ? "0 ساعة"
                    : selectedCard?.hours_of_active === 1
                    ? ` ${selectedCard?.hours_of_active} ساعة`
                    : selectedCard?.hours_of_active > 1
                    ? `${selectedCard?.hours_of_active} ساعات `
                    : "بيانات غير متوفرة"}
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
                          goToLec={() =>
                            navigate(
                              `/classes/${selectedCard.id}/course/${course.id}`
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="default-view">
                    <p className="default-text">
                        لا يوجد مقررات للبرنامج
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
