import React, { useState, useEffect } from "react";
import { apiUrl } from "../API";
import { useNavigate } from "react-router-dom";

import MainPageContainer from "../Components/Main/MainPageContainer";
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
  const [categories, setCategories] = useState([]);
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
  const [error, setError] = useState(null); // For error messages

  const [last_program, setLastProgram] = useState(null);

  const token = localStorage.getItem("token");

  const [payment_status, setPaymentStatus] = useState(null); // For error messages
 const [program_status, setProgramStatus] = useState(null);

  // Fetch program data
  const fetchProgramData = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/programs/apply", {
        method: "GET",
        headers: {
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });

      const result = await response.json();
      console.log(result.data.categories); // Log fetched data
      setCategories(result.data.categories);
      setLastProgram(result.data.last_program);

      if(result?.data?.last_program?.payment_type === "cache"){
        setPaymentStatus("تم الشراء");
      } else {
        if (result?.data?.last_program?.installment_complete) {
          setPaymentStatus("تم الشراء");
        } else {
          setPaymentStatus("جارى دفع الأقساط"); 
        }
      }

      if (result?.data?.last_program?.status === "active"){
        setProgramStatus("قيد الدراسة");
      }else if(result?.data?.last_program?.status === "inactive"){
        setProgramStatus("لم يبدأ بعد");
      }else {
        setProgramStatus("انتهت الدراسة");
      }


    } catch (error) {
      console.error("Error fetching program data:", error);
    }
  };

  useEffect(() => {
    fetchProgramData();
  }, []);

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

  const navigate = useNavigate();

  const applyToProgram = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/programs/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      console.log(result);
      if (result.success === true) {
        navigate("/program");
        // alert(result.message);
      } else {
        if (result.errors) {
          const errorMessages = [];
          if (result.errors.category_id) {
            errorMessages.push(`${result.errors.category_id[0]}`);
          }
          if (result.errors.bundle_id) {
            errorMessages.push(`${result.errors.bundle_id[0]}`);
          }

          setError(errorMessages.join(" و "));
        } else {
          setError("Failed to register. Please try again.");
        }
        return;
      }
    } catch (error) {}
  };

  return (
    <MainPageContainer>
      <div className="admission-container">
        {/* Registered Programs Section */}
        {last_program !== null && (
          <div className="registered-admission">
            <h3 className="section-title">البرامج المسجلة</h3>
            <div className="admission-card">
              <div className="admission-details">
                <h4 className="admission-title">دورة تدربيبة مسجلة</h4>
                <p className="admission-subtitle">
                {last_program?.title} 
                </p>
                <p className="admission-status">حالة البرنامج : {program_status} </p>
              </div>
              <div className="admission-actions">
                {/* if paid تم اكمال عمليات الدفع */}
                <p className="payment-p">{payment_status}</p>
                <button className="go-to-program-button">
                  الذهاب للبرنامج
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Admission Request Section */}
        <div className="new-admission-request">
          <h3 className="section-title">التسجيل ببرنامج جديد</h3>
          <form onSubmit={handleFormSubmit} className="admission-form">
            {/* Program Type Dropdown */}
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
                        setSelectedProgramName("اختر التخصص الذي تود دراسته"); // Reset program name
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

            {/* Program Name Dropdown */}
            <label className="form-label">أسم البرنامج / الدورة : </label>
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

            {/* Terms and Checkboxes */}
            <div className="form-checkbox-group">
              <input
                type="checkbox"
                id="checkbox1"
                checked={isFirstCheckboxChecked}
                onChange={(e) => setIsFirstCheckboxChecked(e.target.checked)}
              />
              <label htmlFor="checkbox1">
                .أقر بأن لدي خبرة عملية ومعرفة جيدة بالبرامج التي سأتقدم
                للاختبار بها، وأفهم أن الدورة تؤهل للاختبار فقط ولا تعلم البرامج
                من الصفر
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
                .إقرار بعدم تجاوز المتدرب فترة 30 يوم للتقدم للاختبار متضمنة
                فترة التأهيل
              </label>
            </div>

            <button
              type="submit"
              className="form-submit-button"
              disabled={isSubmitDisabled}
              onClick={applyToProgram} // Navigate on button click
            >
              التسجيل
            </button>
          </form>
        </div>
      </div>
      {error && (
        <Popup
          message={error}
          onClose={() => setError(null)} // Close the popup
        />
      )}
    </MainPageContainer>
  );
}

export default Admission;
