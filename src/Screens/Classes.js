import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "../Styles/Classes/Classes.css";

import ProgramCard from "../Components/Classes/ProgramCard";
import AssignmentCard from "../Components/Classes/AssignmentCard";

import noevents from "../Images/noEvents.svg";

function Classes() {
  const navigate = useNavigate();
  const { id, page } = useParams(); // Get `id` and `page` from URL

  const { fetchClassesData } = useContext(UserContext);
  const [classesData, setClassesData] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(Number(page?.replace("page-", "")) || 1); // Parse page number
  const [lastPage, setLastPage] = useState(1); // Total pages available

  useEffect(() => {
    let isMounted = true;

    const fetchClassesAndPages = async () => {
      try {
        const result = await fetchClassesData(currentPage);
        if (isMounted) {
          setClassesData(result.classes);
          setLastPage(result.lastPage);
        }
      } catch (error) {
        // console.log("Error fetching data:", error);
        if (isMounted)
          console.log("حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقًا.");
      }
    };

    fetchClassesAndPages();
    return () => (isMounted = false); // Cleanup
  }, [currentPage]);

  // useEffect(() => {
  //   if (id) {
  //     const selectedProgram = classesData.find(
  //       (bundle) => bundle.id === Number(id)
  //     );

  //     if (selectedProgram) {
  //       setSelectedCard(selectedProgram); // Set the selected card
  //     }
  //   }
  // }, [id, classesData]);

  const handleCardSelect = (program) => {
    setSelectedCard(program);
    navigate(`/classes/${program.id}/page-${currentPage}`);
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      navigate(`/classes/${id ? `${id}/` : ""}page-${page}`);
    }
  };

  return (
    <div className="classes-container">
      <div className="classes-top">
        <h3 className="classes-top-title">البرامج المسجلة</h3>
        <div className="classes-programs-container">
          {classesData.length > 0 ? (
            classesData.map((item) => (
              <ProgramCard
                key={item.id}
                item={item}
                isSelected={selectedCard?.id === item.id}
                onClick={() => handleCardSelect(item)}
              />
            ))
          ) : (
            <p>لا توجد برامج مسجلة حالياً.</p>
          )}
        </div>
      </div>
      {/* Pagination Buttons */}
      <div className="pagination-container">
        {Array.from({ length: lastPage }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`pagination-button ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
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
              <div className="classes-wide-screen-view">
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
                    <p className="default-text">لا يوجد مقررات للبرنامج</p>
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
