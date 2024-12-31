import React, { useState, useEffect } from "react";
import { apiUrl } from "../../API";
import "../../Styles/Settings/SettingsMainCont.css";
import x from "../../Images/x.png";
import ln from "../../Images/ln.png";
import ig from "../../Images/ig.png";
import edit from "../../Images/edit.svg";

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

function BasicData({ onNext, allUserData, setAllUserData, updateProgress }) {
  const [timezone, setTimezone] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState(null);

  // Fetch timezones
  const fetchTimezone = async () => {
    try {
      const response = await fetch(apiUrl + "/timezone", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
        },
      });
      const result = await response.json();
      setTimezone(result.data || []);
    } catch (error) {
      console.log("Error fetching timezones:", error);
    }
  };

  const calculateProgress = () => {
    const fields = Object.values(allUserData);
    const completedFields = fields.filter(
      (field) => field && field!= ""
    ).length;
    const progress = Math.round((completedFields / fields.length) * 100) ;
    updateProgress(progress);
  };

  useEffect(() => {
    fetchTimezone();
    calculateProgress();
  }, [allUserData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAllUserData((prev) => ({ ...prev, [name]: value || "" }));
    setTimeout(calculateProgress, 0); // Recalculate after the state updates
  };

  // Handle checkbox toggle
  const handleToggleChange = (name) => {
    setAllUserData((prev) => ({ ...prev, [name]: !prev[name] }));
    setTimeout(calculateProgress, 0); // Recalculate after the state updates
  };

  // Show or hide the popup for updating avatar
  const showPopUp = () => setIsPopupVisible(true);
  const hidePopUp = () => {
    setIsPopupVisible(false);
    setNewAvatar(null);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    // if (file && !allowedTypes.includes(file.type)) {
    //   alert("يجب أن تكون الصورة من النوع: jpeg, jpg, png");
    //   return;
    // }
    setNewAvatar(file);
  };

  // Save new avatar
  const handleSaveAvatar = async () => {
    if (!newAvatar) {
      alert("يرجى تحميل صورة.");
      return;
    }
    console.log(newAvatar);

    const formData = new FormData();
    formData.append("profile_image", newAvatar);

    try {
      const response = await fetch(apiUrl + "/panel/profile-setting/images", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": true,
          "x-api-key": "1234",
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok && result.success) {
        alert("تم تحديث الصورة الشخصية بنجاح.");
        setAllUserData((prev) => ({ ...prev, avatar: result?.data?.avatar }));
        hidePopUp();
        console.log(allUserData);
      } else {
        setErrors(result.errors);
        console.log(result.errors);
      }
    } catch (error) {
      console.log("Error updating avatar:", error);
      alert("حدث خطأ أثناء تحديث الصورة الشخصية.");
    }
  };

  // Submit updated data to the API
  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    setErrors(null); // Reset errors before submission

    if (
      allUserData.new_password &&
      allUserData.confirm_password &&
      allUserData.new_password !== allUserData.confirm_password
    ) {
      setErrors("كلمات المرور غير متطابقة. الرجاء التأكد من تطابقهما.")
      return;
    }

    const updatedData = { ...allUserData };
    if (!allUserData.new_password) {
      delete updatedData.new_password;
    }

    try {
      const response = await fetch(
        apiUrl + "/panel/profile-setting/basic_information",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "1234",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (result.success) {
        onNext();
      } else {
        if (result.errors) {
          const errorMessages = [];
          if (result.errors.email) {
            errorMessages.push(result.errors.email[0]);
          }
          if (result.errors.full_name) {
            errorMessages.push(result.errors.full_name[0]);
          }
          setErrors(errorMessages.join(" و "));
        } else {
          setErrors("حدث خطأ أثناء التحديث. الرجاء المحاولة لاحقاً.");
        }
      }
    } catch (error) {
      // console.log("Error:", error);
      setErrors("حدث خطأ غير معروف.");
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="profile-header-right">
          <span className="picture-frame">
            <img
              src={allUserData?.avatar}
              className="basicdatalogo"
              alt="avatar"
              value={allUserData?.avatar}
            />
          </span>
          <div className="profile-info">
            <h3 className="student-name">{allUserData.full_name || ""}</h3>
            <p className="student-code">{allUserData.code || ""}</p>
            <div className="profile-social-icons">
              <img src={x} alt="x" className="social-personal-icon" />
              <img src={ln} alt="ln" className="social-personal-icon" />
              <img src={ig} alt="ig" className="social-personal-icon" />
            </div>
          </div>
        </div>
        <button className="edit-button" onClick={showPopUp}>
          تعديل
          <img src={edit} alt="edit" className="edit-button-icon" />
        </button>
      </div>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>تحديث الصورة الشخصية</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className="popup-buttons">
              <button
                className="save-button margin-0"
                onClick={handleSaveAvatar}
              >
                حفظ
              </button>
              <button className="save-button  margin-0" onClick={hidePopUp}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <form className="user-form" onSubmit={handleSubmitInfo}>
        <h3 className="form-section-title">
          البينات الأكاديمية <span className="asterisk">*</span>
        </h3>

        <div className="form-grid">
          <div className="form-group">
            <label>
              الكود الأكاديمي <span className="asterisk">*</span>
            </label>
            <input type="text" name="code" value={allUserData.code} readOnly />
          </div>

          <div className="form-group">
            <label>
              الاسم الكامل <span className="asterisk">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              value={allUserData.full_name || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              البريد الإلكتروني <span className="asterisk">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={allUserData.email || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              رقم الجوال <span className="asterisk">*</span>
            </label>
            <input
              type="text"
              name="mobile"
              value={allUserData.mobile || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              name="new_password"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>تأكيد كلمة المرور</label>
            <input
              type="password"
              name="confirm_password"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>الوحدة الزمنية</label>
            <select
              name="timezone"
              value={allUserData.timezone || ""}
              onChange={handleInputChange}
            >
              {timezone.length > 0 ? (
                timezone.map((zone, index) => (
                  <option key={index} value={zone}>
                    {zone}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  جاري التحميل...
                </option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>اللغة</label>
            <select
              name="language"
              value={allUserData.language || ""}
              onChange={handleInputChange}
            >
              <option value="العربية">العربية</option>
              <option value="الإنجليزية">الإنجليزية</option>
            </select>
          </div>
        </div>

        <div className="toggle-group">
          <label>اضف للقائمة البريدية</label>
          <input
            type="checkbox"
            checked={allUserData.newsletter}
            onChange={() => handleToggleChange("newsletter")}
          />
        </div>

        <div className="toggle-group">
          <label>تفعيل رسائل الملف الشخصي</label>
          <input
            type="checkbox"
            checked={allUserData.public_message}
            onChange={() => handleToggleChange("public_message")}
          />
        </div>

        <button type="submit" className="save-button">
          حفظ
        </button>
      </form>
      {errors && (
        <Popup
          message={errors}
          onClose={() => setErrors(null)} // Close the popup
        />
      )}
    </div>
  );
}

export default BasicData;
