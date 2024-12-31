import React, { useState, useEffect } from "react";
import { apiUrl } from "../../API";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-dark">
        <p>{message}</p>
        <button className="save-button" onClick={onClose}>إغلاق</button>
      </div>
    </div>
  );
};

function PersonalData({ onNext, allUserData, setAllUserData, updateProgress }) {
  const [fileName, setFileName] = useState("لم يتم إرفاق ملف");
    const [errors, setErrors] = useState(null);

  const countries = [
    "السعودية",
    "الامارات العربية المتحدة",
    "الاردن",
    "البحرين",
    "الجزائر",
    "العراق",
    "المغرب",
    "اليمن",
    "السودان",
    "الصومال",
    "الكويت",
    "جنوب السودان",
    "سوريا",
    "لبنان",
    "مصر",
    "تونس",
    "فلسطين",
    "جزرالقمر",
    "جيبوتي",
    "عمان",
    "موريتانيا",
  ];

  const nationalities = [
    "سعودي/ة",
    "اماراتي/ة",
    "اردني/ة",
    "بحريني/ة",
    "جزائري/ة",
    "عراقي/ة",
    "مغربي/ة",
    "يمني/ة",
    "سوداني/ة",
    "صومالي/ة",
    "كويتي/ة",
    "سوري/ة",
    "لبناني/ة",
    "مصري/ة",
    "تونسي/ة",
    "فلسطيني/ة",
    "جيبوتي/ة",
    "عماني/ة",
    "موريتاني/ة",
    "قطري/ة",
  ];

  const calculateProgress = () => {
    const requiredFields = [
      "ar_name",
      "en_name",
      "birthdate",
      "identifier_num",
      "nationality",
      "gender",
      "country",
      "town",
      "identity_img",
    ];

    const completedFields = requiredFields.filter(
      (field) => allUserData[field] && allUserData[field] !== ""
    ).length;

    const progress = Math.round((completedFields / requiredFields.length) * 100);
    updateProgress(progress); // Update parent with progress percentage
  };

  useEffect(() => {
    calculateProgress();
  }, [allUserData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAllUserData((prev) => ({ ...prev, [name]: value || "" }));
    setTimeout(calculateProgress, 0); // Recalculate progress

  };

  // Handle file changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName("تم إرفاق ملف");
      setAllUserData((prev) => ({ ...prev, identity_img: file }));
    } else {
      setFileName("لم يتم إرفاق ملف");
      setAllUserData((prev) => ({ ...prev, identity_img: null }));
    }
    setTimeout(calculateProgress, 0); // Recalculate progress

  };

  // Submit updated data to the API
  const token = localStorage.getItem("token");

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Add all fields to the FormData object
    Object.keys(allUserData).forEach((key) => {
      const value = allUserData[key];
      if (key === "identity_img" && value) {
        formData.append("identity_img", value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value)); // Ensure non-file fields are strings
      }
    });
    
    try {
      const response = await fetch(apiUrl + "/panel/profile-setting/personal_details", {
        method: "POST",
        headers: {
          "x-api-key": "1234", // Custom headers
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`, // Token for authentication
        },
        body: formData, // Use FormData directly
      });
  
      const result = await response.json();

      if (result.success) {
        onNext();
      } else {
        if (result.errors) {
          const errorMessages = [];
          if (result.errors.ar_name) {
            errorMessages.push(result.errors.ar_name[0]);
          }
          if (result.errors.en_name) {
            errorMessages.push(result.errors.en_name[0]);
          }
          if (result.errors.birthdate) {
            errorMessages.push(result.errors.birthdate[0]);
          }
          if (result.errors.identifier_num) {
            errorMessages.push(result.errors.identifier_num[0]);
          }
          if (result.errors.nationality) {
            errorMessages.push(result.errors.nationality[0]);
          }
          if (result.errors.gender) {
            errorMessages.push(result.errors.gender[0]);
          }
          if (result.errors.country) {
            errorMessages.push(result.errors.country[0]);
          }
          if (result.errors.town) {
            errorMessages.push(result.errors.town[0]);
          }
          setErrors(errorMessages.join(" و "));
        } else {
          setErrors("حدث خطأ أثناء التحديث. الرجاء المحاولة لاحقاً.");
        }
      }    
    } catch (error) {
      // console.error("Error submitting form:", error);
      setErrors("حدث خطأ غير معروف.");
      
    }
  };
  
  
  return (
    <div className="user-profile-container">
      <form className="user-form" onSubmit={handleSubmitInfo}>
        <h2 className="form-section-title">
          <span>البيانات الشخصية</span>
          <span className="asterisk"> *</span>
        </h2>
        <div className="form-grid">
          <div className="form-group">
            <label>
              الأسم الثلاثي باللغة العربية 
            </label>
            <input
              type="text"
              name="ar_name"
              value={allUserData.ar_name || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              الأسم الثلاثي باللغة الإنجليزية{" "}
            </label>
            <input
              type="text"
              name="en_name"
              value={allUserData.en_name || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              تاريخ الميلاد 
            </label>
            <input
              type="date"
              name="birthdate"
              value={allUserData.birthdate || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              رقم الهوية الوطنية أو جواز السفر{" "}
            </label>
            <input
              type="text"
              name="identifier_num"
              value={allUserData.identifier_num || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>الجنسية</label>
            <select
              name="nationality"
              value={allUserData.nationality || ""}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                اختر الجنسية
              </option>
              {nationalities.map((nationality, index) => (
                <option key={index} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>الجنس</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={allUserData.gender === "male"}
                  onChange={handleInputChange}
                />
                ذكر
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={allUserData.gender === "female"}
                  onChange={handleInputChange}
                />
                أنثى
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>بلد الإقامة</label>
            <select
              name="country"
              value={allUserData.country || ""}
              onChange={handleInputChange}
              required
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>مدينة الإقامة</label>
            <input
              type="text"
              name="town"
              value={allUserData.town || ""}
              onChange={handleInputChange}
              required
              
            />
          </div>
          <div className="form-group">
            <label>
              صورة من الهوية الوطنية أو جواز السفر{" "}
              <span className="asterisk">*</span>
            </label>
            <div className="custom-file-upload">
              <input
                type="file"
                id="passportFile"
                onChange={handleFileChange}
                // required
              />
              <label htmlFor="passportFile">{fileName}</label>
            </div>
          </div>
        </div>

        <button type="submit" className="save-button">
          حفظ
        </button>
      </form>
    </div>
  );
}

export default PersonalData;