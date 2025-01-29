import React, { useState, useEffect } from "react";
import { apiUrl } from "../../API";

function Extrainfo({ onNext, additionalData, updateProgress }) {
  const token = localStorage.getItem("token");

  const [employmentStatus, setEmploymentStatus] = useState(
    additionalData?.job_details?.work_status || false
  );
  const [hasHealthIssue, setHasHealthIssue] = useState(
    additionalData?.healthy_details?.healthy || false
  );

  const [submit_formdata, setSubmitFormData] = useState({
    ...additionalData?.job_details,
    ...additionalData?.healthy_details,
    ...additionalData?.referral,
  });

  const calculateProgress = () => {
    const requiredFields = [
      "referral_person",
      "relation",
      "referral_phone",
      "healthy",
      "disabled",
      "deaf",
    ];

    if (employmentStatus) {
      requiredFields.push("job", "job_type");
    }

    if (hasHealthIssue) {
      requiredFields.push("healthy_problem");
    }

    const completedFields = requiredFields.filter(
      (field) => submit_formdata[field] && submit_formdata[field] !== ""
    ).length;

    const progress = Math.round((completedFields / requiredFields.length) * 100);
    updateProgress(progress); // Notify parent component
  };

  useEffect(() => {
    calculateProgress();
  }, [submit_formdata, employmentStatus, hasHealthIssue]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setSubmitFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(
        apiUrl + "/panel/profile-setting/addtional_details",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "1234",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submit_formdata),
        }
      );

      const result = await response.json();

      if (result.success) {
        onNext();
      } else {
        // console.log("Error response:", result);
      }
    } catch (error) {
      // console.log("Error saving data:", error);
    }
  };

  return (
    <div className="user-profile-container settings-container">
      <div className="settings-content">
        <form className="user-form" onSubmit={handleSubmit}>
          {/* Professional Information Section */}
          <h2 className="form-section-title">
            <span className="my-program-title">بيانات المهنة</span>
          </h2>
          <div className="form-grid">
            <div className="form-group">
              <label>
                الحالة العملية الآن<span className="asterisk">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="work_status"
                    defaultValue={true}
                    defaultChecked={employmentStatus === true}
                    onChange={(e) => {
                      setEmploymentStatus(true);
                      handleInputChange(e);
                    }}
                  />
                  أعمل
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="work_status"
                    defaultValue={false}
                    defaultChecked={employmentStatus === false}
                    onChange={(e) => {
                      setEmploymentStatus(false);
                      handleInputChange(e);
                    }}
                  />
                  لا أعمل
                </label>
              </div>
            </div>
          </div>

          {employmentStatus && (
            <div className="form-grid">
              <div className="form-group">
                <label>
                  الوظيفة <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="job"
                  value={submit_formdata.job || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  جهة العمل <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="job_type"
                  value={submit_formdata.job_type || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          {/* Emergency Contact Section */}
          <h2 className="form-section-title">
            <span className="my-program-title">
              معلومات الأقارب في حال الطوارئ
            </span>
          </h2>
          <div className="form-grid">
            <div className="form-group">
              <label>
                أسم الشخص للتواصل معه عند الضرورة
                <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="referral_person"
                value={submit_formdata.referral_person || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                القرابة<span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="relation"
                value={submit_formdata.relation || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                رقم الجوال<span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="referral_phone"
                value={submit_formdata.referral_phone || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <input
                type="text"
                name="referral_email"
                value={submit_formdata.referral_email || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Health Status Section */}
          <h2 className="form-section-title">
            <span className="my-program-title">الحالة الصحية</span>
          </h2>
          <div className="form-grid">
            <div className="form-group">
              <label>
                هل أنت أصم أو من ضعاف السمع ؟<span className="asterisk">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="deaf"
                    defaultValue={true} // Actual boolean value
                    defaultChecked={submit_formdata.deaf === true}
                    onChange={handleInputChange}
                    required
                  />
                  نعم
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="deaf"
                    defaultValue={false} // Actual boolean value
                    defaultChecked={submit_formdata.deaf === false}
                    onChange={handleInputChange}
                  />
                  لا
                </label>
              </div>
            </div>

            {/* Disabled Section */}
            <div className="form-group">
              <label>
                هل أنت من ذوي الإعاقة :<span className="asterisk">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="disabled"
                    defaultValue={true}
                    defaultChecked={submit_formdata.disabled === true}
                    onChange={handleInputChange}
                  />
                  نعم
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="disabled"
                    defaultValue={false}
                    defaultChecked={submit_formdata.disabled === false}
                    onChange={handleInputChange}
                  />
                  لا
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>
                هل لديك مشكلة صحية؟<span className="asterisk">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="healthy"
                    defaultValue={true}
                    defaultChecked={hasHealthIssue === true}
                    onChange={(e) => {
                      setHasHealthIssue(true);
                      handleInputChange(e);
                    }}
                  />
                  نعم
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="healthy"
                    defaultValue={false}
                    defaultChecked={hasHealthIssue === false}
                    onChange={(e) => {
                      setHasHealthIssue(false);
                      handleInputChange(e);
                    }}
                  />
                  لا
                </label>
              </div>
            </div>

            {hasHealthIssue && (
              <div className="form-group">
                <label>
                  أدخل المشكلة الصحية<span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="healthy_problem"
                  defaultValue={submit_formdata.healthy_problem || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
          </div>

          {/* Save Button */}
          <button type="submit" className="save-button">
            حفظ
          </button>
        </form>
      </div>
    </div>
  );
}

export default Extrainfo;