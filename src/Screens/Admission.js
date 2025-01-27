import React, { useState, useContext } from "react";
import { apiUrl } from "../API";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

import "../Styles/Admission/Admission.css";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>{message}</p>
        <button onClick={onClose}>إغلاق</button>
      </div>
    </div>
  );
};

function Admission() {
  const { categories, appliedPrograms, setAppliedPrograms } =
    useContext(UserContext); // Access userData from context

  const [selectedProgramType, setSelectedProgramType] = useState(
    "اختر نوع البرنامج الذي تود دراسته"
  );
  const [selectedProgramName, setSelectedProgramName] = useState(
    "اختر التخصص الذي تود دراسته"
  );
  const [isFirstCheckboxChecked, setIsFirstCheckboxChecked] = useState(false);
  const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(false);
  const [isProgramTypeDropdownOpen, setIsProgramTypeDropdownOpen] =
    useState(false);
  const [isProgramNameDropdownOpen, setIsProgramNameDropdownOpen] =
    useState(false);

  const [data, setData] = useState({ category_id: "", bundle_id: "" });
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Get program names based on the selected type
  const selectedCategory =
    categories.find((category) => category.title === selectedProgramType) || {};
  const programNames = selectedCategory.activeBundles || [];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedProgramType,
      selectedProgramName,
      agreeTerms: isFirstCheckboxChecked && isSecondCheckboxChecked,
    });
  };

  const isSubmitDisabled = !(
    isFirstCheckboxChecked &&
    isSecondCheckboxChecked &&
    selectedProgramType !== "اختر نوع البرنامج الذي تود دراسته" &&
    selectedProgramName !== "اختر التخصص الذي تود دراسته"
  );

  const applyToProgram = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": "1234",
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(apiUrl + "/panel/programs/apply", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success === true) {
        navigate("/finances/program");
      } else {
        const errorMessages = [];
        if (result.errors) {
          if (result.errors.category_id) {
            errorMessages.push(`${result.errors.category_id[0]}`);
          }
          if (result.errors.bundle_id) {
            errorMessages.push(`${result.errors.bundle_id[0]}`);
          }
        } else {
          errorMessages.push("Failed to register. Please try again.");
        }
        setError(errorMessages.join(" و "));
      }
    } catch (error) {
      console.error("Error applying to program:", error);
      setError("حدث خطأ أثناء التسجيل. يرجى المحاولة لاحقًا.");
    }
  };

  const goToProgram = (id) => {
    navigate(`/classes/${id}/page-1`); // Default to page-1 when navigating to a specific program
  };
  
  return (
    <>
      <div className="admission-container">
        {/* Registered Programs Section */}
        {appliedPrograms.length > 0 ? (
          <div className="registered-admission">
            <h3 className="section-title">البرامج المسجلة</h3>
            <div className="applied-programs-list">
              {appliedPrograms.map((program, index) => (
                <div key={index} className="admission-card">
                  <div className="admission-details">
                    <h4 className="admission-title">{program.category}</h4>
                    <p className="admission-subtitle">{program.title}</p>
                    <p className="admission-status">
                      حالة البرنامج:{" "}
                      {program.status === "active"
                        ? "قيد الدراسة"
                        : program.status === "inactive"
                        ? "لم يبدأ بعد"
                        : program.status === "expired"
                        ? "انتهت الدراسة"
                        : "حالة غير معروفة"}
                    </p>
                  </div>
                  <div className="admission-actions">
                    <p className="payment-p">
                      {program.payment_type === "cache" ||
                      program.installment_complete
                        ? "تم الشراء"
                        : "جارى دفع الأقساط"}
                    </p>
                    <button
                      className="go-to-program-button"
                      onClick={() => {
                        goToProgram(program.id); // Navigate to the specific program page
                      }}
                    >
                      الذهاب للبرنامج
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>لا يوجد برامج مسجلة حاليا.</p>
        )}

        {/* New Admission Request Section */}
        <div className="new-admission-request">
          <h3 className="section-title">التسجيل ببرنامج جديد</h3>
          <form onSubmit={handleFormSubmit} className="admission-form">
            <label className="form-label">نوع البرنامج الدراسي:</label>
            <div
              className="custom-dropdown"
              onClick={() =>
                setIsProgramTypeDropdownOpen(!isProgramTypeDropdownOpen)
              }
            >
              <div className="dropdown-header">{selectedProgramType}</div>
              {isProgramTypeDropdownOpen && (
                <ul className="dropdown-list">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedProgramType(category.title);
                        setSelectedProgramName("اختر التخصص الذي تود دراسته");
                        setIsProgramTypeDropdownOpen(false);
                        setData({ ...data, category_id: category.id });
                      }}
                    >
                      {category.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className="form-label">أسم البرنامج / الدورة :</label>
            <div
              className={`custom-dropdown ${
                !programNames.length && "disabled"
              }`}
              onClick={() =>
                programNames.length &&
                setIsProgramNameDropdownOpen(!isProgramNameDropdownOpen)
              }
            >
              <div className="dropdown-header">{selectedProgramName}</div>
              {isProgramNameDropdownOpen && (
                <ul className="dropdown-list">
                  {programNames.map((bundle) => (
                    <li
                      key={bundle.id}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedProgramName(bundle?.title);
                        setIsProgramNameDropdownOpen(false);
                        setData({ ...data, bundle_id: bundle?.id });
                      }}
                    >
                      {bundle?.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-checkbox-group">
              <input
                type="checkbox"
                id="checkbox1"
                checked={isFirstCheckboxChecked}
                onChange={(e) => setIsFirstCheckboxChecked(e.target.checked)}
              />
              <label htmlFor="checkbox1">
                أقر بأن لدي خبرة عملية ومعرفة جيدة بالبرامج التي سأتقدم للاختبار
                بها، وأفهم أن الدورة تؤهل للاختبار فقط ولا تعلم البرامج من الصفر
              </label>
            </div>

            <div className="form-checkbox-group">
              <input
                type="checkbox"
                id="checkbox2"
                checked={isSecondCheckboxChecked}
                onChange={(e) => setIsSecondCheckboxChecked(e.target.checked)}
              />
              <label htmlFor="checkbox2">
                إقرار بعدم تجاوز المتدرب فترة 30 يوم للتقدم للاختبار متضمنة فترة
                التأهيل
              </label>
            </div>

            <button
              type="submit"
              className="form-submit-button"
              disabled={isSubmitDisabled}
              onClick={applyToProgram}
            >
              التسجيل
            </button>
          </form>
        </div>
      </div>
      {error && <Popup message={error} onClose={() => setError(null)} />}
    </>
  );
}

export default Admission;
