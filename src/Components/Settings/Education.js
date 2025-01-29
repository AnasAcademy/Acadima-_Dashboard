import React, { useState, useEffect } from "react";
import { apiUrl } from "../../API";

function Education({ onNext, education, setEducation, updateProgress }) {
  const [high_education, setHighEducation] = useState(
    education?.high_education || {}
  );
  const [secondary_education, setSecondaryEducation] = useState(
    education?.secondary_education || {}
  );
  const [submit_education, setSubmitEducation] = useState({
    ...high_education,
    ...secondary_education,
    high_certificate_img:
      education?.high_education?.high_certificate_img ,
    secondary_certificate_img:
      education?.secondary_education?.secondary_certificate_img,
    certificate_type: education?.certificate_type,
  });

  const [showOtherInput, setShowOtherInput] = useState(false);

  const [fileName, setFileName] = useState({});

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
    "أخرى",
  ];

  const calculateProgress = () => {
    const requiredFields = [
      "certificate_type",
      "educational_qualification_country",
      "university",
      "faculty",
      "education_specialization",
      "graduation_year",
      "gpa",
      "high_certificate_img",
      "secondary_educational_qualification_country",
      "educational_area",
      "secondary_graduation_year",
      "school",
      "secondary_school_gpa",
      "secondary_certificate_img",
    ];

    const completedFields = requiredFields.filter(
      (field) => submit_education[field] && submit_education[field] !== ""
    ).length;

    const progress = Math.round((completedFields / requiredFields.length) * 100);
    updateProgress(progress); // Update parent with progress percentage
  };

  useEffect(() => {
    calculateProgress();
  }, [submit_education]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }))
    setSubmitEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [certificate_type, setCertificateType] = useState(
    education.certificate_type
  );

  const handleCertificateRadioChange = (e) => {
    const { value } = e.target;
    setCertificateType(value); // Update local state
    setSubmitEducation((prev) => ({
      ...prev,
      certificate_type: value, // Update submit_education
    }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  
    if (file && !allowedTypes.includes(file.type)) {
      alert("الملف يجب أن يكون من النوع: jpeg, jpg, png.");
      return;
    }
  
    setFileName((prev) => ({
      ...prev,
      [fileType]: file ? file.name : null,
    }));
  
    setSubmitEducation((prev) => ({
      ...prev,
      [fileType === "universityCertificate"
        ? "high_certificate_img"
        : "secondary_certificate_img"]: file || prev[fileType === "universityCertificate"
        ? "high_certificate_img"
        : "secondary_certificate_img"], // Retain existing file if no new file
    }));
  };
  
  

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      // Append all fields, including certificate_type
      for (const [key, value] of Object.entries(submit_education)) {
        if (value instanceof File || typeof value === "string") {
          formData.append(key, value);
        }
      }
  
      // // Debugging log to ensure certificate_type is included
      // for (const pair of formData.entries()) {
      //   // console.log(`${pair[0]}:`, pair[1]);
      // }
  
      const response = await fetch(apiUrl + `/panel/profile-setting/education`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": true,
          "x-api-key": "1234",
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        onNext();
      } else {
        alert(`حدث خطأ: ${result.message}`);
      }
    } catch (error) {
      // console.log("Error submitting education data:", error);
    }
  };
  
  

  return (
    <div className="user-profile-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2 className="form-section-title">التعليم الجامعي</h2>

        <div className="form-group form-group1">
          <label>
            آخر شهادة جامعية حصلت عليها <span className="asterisk">*</span>
          </label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="certificate_type"
                value="PhD"
                defaultChecked={education?.certificate_type === "PhD"}
                onChange={(e) => handleCertificateRadioChange(e)}
              />
              دكتوراه
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="certificate_type"
                value="master"
                defaultChecked={education?.certificate_type === "master"}
                onChange={(e) => handleCertificateRadioChange(e)}
              />
              ماجستير
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="certificate_type"
                value="bachelor"
                defaultChecked={education?.certificate_type === "bachelor"}
                onChange={(e) => handleCertificateRadioChange(e)}
              />
              بكالوريوس
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="certificate_type"
                value="diploma"
                defaultChecked={education?.certificate_type === "diploma"}
                onChange={(e) => handleCertificateRadioChange(e)}
              />
              دبلوم
            </label>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>
              بلد مصدر الشهادة<span className="asterisk">*</span>
            </label>
            <select
              name="educational_qualification_country"
              defaultValue={
                education?.high_education?.educational_qualification_country ||
                ""
              }
              onChange={(e) => {
                handleInputChange(e);
                setShowOtherInput(e.target.value === "أخرى");
              }}
              required
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {showOtherInput && (
            <div className="form-group">
              <label>
                ادخل مصدر شهادة البكالوريوس <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="other_educational_qualification_country"
                defaultValue={
                  high_education?.other_educational_qualification_country || ""
                }
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>
              الجامعة<span className="asterisk">*</span>
            </label>
            <input
              type="text"
              name="university"
              defaultValue={high_education?.university || ""}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              الكلية<span className="asterisk">*</span>
            </label>
            <input
              type="text"
              name="faculty"
              defaultValue={high_education?.faculty || ""}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>التخصص</label>
            <input
              type="text"
              name="education_specialization"
              defaultValue={high_education?.education_specialization || ""}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>سنة التخرج</label>
            <input
              type="number"
              name="graduation_year"
              defaultValue={high_education?.graduation_year || ""}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>المعدل</label>
            <input
              type="number"
              name="gpa"
              defaultValue={high_education?.gpa || ""}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>صورة شهادة التخرج</label>
            <div className="custom-file-upload">
              <input
                type="file"
                id="GraduationFile1"
                onChange={(e) => handleFileChange(e, "universityCertificate")}
              />
              <label htmlFor="GraduationFile1">
                اختر ملف
              </label>
            </div>
          </div>
        </div>

        <h2 className="form-section-title">التعليم الثانوي</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>
              بلد مصدر شهادة الثانوية<span className="asterisk">*</span>
            </label>
            <select
              name="secondary_educational_qualification_country"
              defaultValue={
                secondary_education?.secondary_educational_qualification_country ||
                ""
              }
              onChange={(e) => handleInputChange(e)}
              required={!secondary_education?.highSchoolCertificate}
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>المنطقة التعليمية</label>
            <input
              type="text"
              name="educational_area"
              defaultValue={secondary_education?.educational_area || ""}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              سنة الحصول على الشهادة الثانوية<span className="asterisk">*</span>
            </label>
            <input
              type="number"
              name="secondary_graduation_year"
              defaultValue={
                secondary_education?.secondary_graduation_year || ""
              }
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              المدرسة<span className="asterisk">*</span>
            </label>
            <input
              type="text"
              name="school"
              defaultValue={secondary_education?.school || ""}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>معدل المرحلة الثانوية</label>
            <input
              type="number"
              name="secondary_school_gpa"
              defaultValue={secondary_education?.secondary_school_gpa || ""}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>صورة شهادة الثانوية</label>
            <div className="custom-file-upload">
              <input
                type="file"
                id="GraduationFile2"
                onChange={(e) => handleFileChange(e, "highSchoolCertificate")}
              />
              <label htmlFor="GraduationFile2">
              اختر ملف

              </label>
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

export default Education;