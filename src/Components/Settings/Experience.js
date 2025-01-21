import React, { useState, useEffect } from "react";
import { apiUrl } from "../../API";

import editLinkimg from "../../Images/editLink.svg";
import deleteLinkimg from "../../Images/deleteLink.svg";

function Experience({ onNext, experience, id, updateProgress }) {
  const parsedExperience = Array.isArray(experience)
    ? experience.map((exp) => {
        const pattern = /title:\s*([^,]+),\s*year:\s*(.+)/;
        const match = exp.value.match(pattern);

        if (match) {
          const name = match[1].trim();
          const value = match[2].trim();
          return { id: exp.id, name: name || "", value: value || "" };
        }

        return { id: exp.id || null, name: exp.value, value: "" };
      })
    : [];

  const [experienceForms, setExperienceForms] = useState(parsedExperience);
  const [activeFormIndex, setActiveFormIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tempExperience, setTempExperience] = useState({ name: "", value: "" });
  const token = localStorage.getItem("token");

  const handleInputChange = (key, value) => {
    setTempExperience((prev) => ({ ...prev, [key]: value }));
  };

  const openPopupForAdd = () => {
    setIsPopupOpen(true);
    setTempExperience({ name: "", value: "" });
    setActiveFormIndex(null);
  };

  const openPopupForEdit = (index) => {
    setIsPopupOpen(true);
    setActiveFormIndex(index);
    setTempExperience(experienceForms[index]);
  };

  const handleAddOrUpdateExperience = async () => {
    const { name, value } = tempExperience;

    if (!name || !value) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }

    const formattedExperience = `title: ${name || ""}, year: ${value || ""}`;

    if (activeFormIndex !== null) {
      // Edit mode
      try {
        const response = await fetch(
          `${apiUrl}/panel/profile-setting/metas/${experienceForms[activeFormIndex].id}/update`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ` + token,
              "ngrok-skip-browser-warning": true,
              "x-api-key": "1234",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: "experience",
              value: formattedExperience,
            }),
          }
        );

        if (response.ok) {
          const updatedExperience = {
            ...experienceForms[activeFormIndex],
            ...tempExperience,
          };
          setExperienceForms((prev) =>
            prev.map((item, index) =>
              index === activeFormIndex ? updatedExperience : item
            )
          );
          calculateProgress();
        }
      } catch (error) {
        console.error("Error updating experience:", error);
      }
    } else {
      // Add mode
      try {
        const response = await fetch(apiUrl + `/panel/profile-setting/metas`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ` + token,
            "ngrok-skip-browser-warning": true,
            "x-api-key": "1234",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: "experience",
            value: formattedExperience,
          }),
        });

        if (response.ok) {
          const savedExperience = await response.json();
          const newExperience = {
            id: savedExperience.id,
            name: name,
            value: value,
          };
          setExperienceForms((prev) => [...prev, newExperience]);
          calculateProgress();
        }
      } catch (error) {
        console.error("Error adding experience:", error);
      }
    }

    setIsPopupOpen(false);
    setTempExperience({ name: "", value: "" });
  };

  const handleDeleteExperience = async (index) => {
    const experienceToDelete = experienceForms[index];

    if (!experienceToDelete.id) {
      setExperienceForms((prev) => prev.filter((_, i) => i !== index));
      calculateProgress();
      return;
    }

    try {
      const response = await fetch(
        apiUrl + `/panel/profile-setting/metas/${experienceToDelete.id}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ` + token,
            "ngrok-skip-browser-warning": true,
            "x-api-key": "1234",
            "content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        setExperienceForms((prev) => prev.filter((_, i) => i !== index));
        calculateProgress();
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setActiveFormIndex(null);
    setTempExperience({ name: "", value: "" });
  };

  const calculateProgress = () => {
    if (experienceForms.length === 0) {
      updateProgress(100);
      return;
    }

    const completedFields = experienceForms.filter(
      (exp) => exp.name && exp.value
    ).length;
    const progress = Math.round(
      (completedFields / (experienceForms.length || 1)) * 100
    );
    updateProgress(progress);
  };

  useEffect(() => {
    calculateProgress();
  }, [experienceForms]);

  return (
    <div className="user-profile-container">
      <form className="user-form">
        <div className="experience-header">
          <h2 className="my-program-title">
            <span>الخبرات</span>
          </h2>
          <button
            type="button"
            className="add-experience"
            onClick={openPopupForAdd}
          >
            إضافة خبرة <span className="add">+</span>
          </button>
        </div>

        {/* Popup for Add or Edit */}
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content" style={{height: "300px"}}>
              <h3>
                {activeFormIndex !== null ? "تعديل الخبرة" : "إضافة خبرة جديدة"}
              </h3>
              <div className="popup-form-container">
                <input
                  type="text"
                  placeholder="مجال الخبرة"
                  value={tempExperience.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="عدد سنوات الخبرة"
                  value={tempExperience.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                />
              </div>
              <div className="settings-popup-buttons">
                <button
                  type="button"
                  className="popup-button"
                  onClick={handleAddOrUpdateExperience}
                >
                  {activeFormIndex !== null ? "تحديث" : "إضافة"}
                </button>
                <button
                  type="button"
                  className="popup-button"
                  onClick={handleCancel}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Experiences */}
        {experienceForms.map((exp, index) => (
          <div key={index} className="link-card">
            <p>{exp.name || "مجال غير متوفر"}</p>
            <p>
              {exp.value
                ? `${exp.value} ${
                    exp.value === "1"
                      ? "سنة"
                      : exp.value === "2"
                      ? "سنتان"
                      : exp.value <= 10
                      ? "سنوات"
                      : "سنة"
                  }`
                : "سنوات غير متوفرة"}
            </p>

            <div className="link-actions">
              <button
                type="button"
                className="link-button"
                onClick={() => openPopupForEdit(index)}
              >
                <img src={editLinkimg} alt="edit" />
              </button>
              <button
                type="button"
                className="link-button"
                onClick={() => handleDeleteExperience(index)}
              >
                <img src={deleteLinkimg} alt="delete" />
              </button>
            </div>
          </div>
        ))}
        <button type="submit" className="save-button" onClick={onNext}>
          حفظ
        </button>
      </form>
    </div>
  );
}

export default Experience;
