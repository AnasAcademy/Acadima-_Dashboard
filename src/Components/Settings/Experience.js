import React, { useState, useEffect } from "react";
import { apiUrl } from "../../API";

function Experience({ onNext, experience, id, updateProgress }) {
  // Ensure experience is an array before parsing
  const parsedExperience = Array.isArray(experience)
    ? experience.map((exp) => {
        // Use regex to extract title and year
        const pattern = /title:\s*([^,]+),\s*year:\s*(.+)/;
        const match = exp.value.match(pattern);

        if (match) {
          const name = match[1].trim(); // Extracted title
          const value = match[2].trim(); // Extracted year
          return { id: exp.id, name: name || "", value: value || "" };
        }

        return { id: exp.id || null, name: exp.value, value: "" };
      })
    : [];

  const [experienceForms, setExperienceForms] = useState(parsedExperience);
  const [activeFormIndex, setActiveFormIndex] = useState(null); // Tracks the form being edited or added
  const [isAdding, setIsAdding] = useState(false); // Tracks if we're adding a new experience
  const [tempExperience, setTempExperience] = useState({
    name: "",
    value: "",
  });

  const handleInputChange = (key, value) => {
    setTempExperience((prev) => ({ ...prev, [key]: value }));
  };

  const addExperienceForm = () => {
    setIsAdding(true);
    setTempExperience({ name: "", value: "" });
  };

  const token = localStorage.getItem("token");

  const handleAddExperience = async (e) => {
    e.preventDefault();

    const newExperience = { id: null, ...tempExperience };
    setExperienceForms((prev) => [...prev, newExperience]);
    setIsAdding(false);

    const formattedExperience = `title: ${newExperience.name || ""}, year: ${
      newExperience.value || ""
    }`;

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

      const result = await response.json();

      if (response.ok) {
        // Update the experience with the server-assigned ID
        setExperienceForms((prev) =>
          prev.map((exp) =>
            exp === newExperience ? { ...exp, id: result.id } : exp
          )
        );
        calculateProgress(); // Recalculate progress
      } else {
      }
    } catch (error) {
      console.log("Error submitting education data:", error);
    }
  };

  const handleEditExperience = (index) => {
    setActiveFormIndex(index);
    setTempExperience(experienceForms[index]);
    console.log(experienceForms);
  };

  const handleUpdateExperience = async () => {
    const updatedExperience = {
      ...experienceForms[activeFormIndex],
      ...tempExperience,
    };
    const formattedExperience = `title: ${
      updatedExperience.name || ""
    }, year: ${updatedExperience.value || ""}`;
    console.log(updatedExperience);
    try {
      const response = await fetch(
        apiUrl +
          `/panel/profile-setting/metas/${experienceForms[activeFormIndex].id}/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ` + token,
            "ngrok-skip-browser-warning": true,
            "x-api-key": "1234",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: experienceForms[activeFormIndex],
            user_id: id,
            name: "experience",
            value: formattedExperience,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Update the local state to reflect the changes
        setExperienceForms((prev) =>
          prev.map((item, index) =>
            index === activeFormIndex ? updatedExperience : item
          )
        );
        calculateProgress(); // Recalculate progress
      } else {
      }
    } catch (error) {
      console.log("Error updating experience:", error);
    } finally {
      setActiveFormIndex(null); // Reset the active form index
    }
  };

  const handleDeleteExperience = async (index) => {
    const experienceToDelete = experienceForms[index];

    if (!experienceToDelete.id) {
      // If the experience has no ID (not saved to the server), just remove it locally
      setExperienceForms((prev) => prev.filter((_, i) => i !== index));
      calculateProgress(); // Recalculate progress
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
        // Remove the experience locally after a successful API response
        setExperienceForms((prev) => prev.filter((_, i) => i !== index));
        calculateProgress(); // Recalculate progress
      } else {
        const result = await response.json();
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const handleCancel = () => {
    setActiveFormIndex(null);
    setIsAdding(false);
    console.log(experienceForms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const calculateProgress = () => {
    if (experienceForms.length === 0) {
      updateProgress(100); // If no experience is added, consider it 100% complete
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
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="experience-header">
          <h2 className="my-program-title">
            <span>الخبرات</span>
          </h2>
          <button
            type="button"
            className="add-experience"
            onClick={(e) => {
              e.preventDefault();
              addExperienceForm();
            }}
          >
            إضافة خبرة <span className="add">+</span>
          </button>
        </div>

        {/* Add Experience Form */}
        {isAdding && (
          <div className="form-grid">
            <div className="form-group">
              <label>مجال الخبرة</label>
              <input
                type="text"
                placeholder="أدخل مجال الخبرة"
                value={tempExperience.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>عدد سنوات الخبرة</label>
              <input
                type="text"
                placeholder="أدخل عدد السنوات"
                value={tempExperience.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
              />
            </div>
            <button
              type="button"
              className="save-button experience-button wide-screen-button"
              onClick={handleAddExperience}
            >
              إضافة
            </button>
            <button
              type="button"
              className="save-button experience-button wide-screen-button"
              onClick={handleCancel}
            >
              إلغاء
            </button>
            <div className="experience-buttons-container">
              <button
                type="button"
                className="save-button experience-button mobile-view"
                onClick={handleAddExperience}
              >
                إضافة
              </button>
              <button
                type="button"
                className="save-button experience-button mobile-view"
                onClick={handleCancel}
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* Existing Experiences */}
        {experienceForms.map((exp, index) => (
          <div key={index} className="form-grid">
            {activeFormIndex === index ? (
              <>
                <div className="form-group">
                  <label>مجال الخبرة</label>
                  <input
                    type="text"
                    value={tempExperience.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>عدد سنوات الخبرة</label>
                  <input
                    type="text"
                    value={tempExperience.value}
                    onChange={(e) => handleInputChange("value", e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="save-button experience-button wide-screen-button"
                  onClick={handleUpdateExperience}
                >
                  حفظ
                </button>
                <button
                  type="button"
                  className="save-button experience-button wide-screen-button"
                  onClick={handleCancel}
                >
                  إلغاء
                </button>
                <div className="experience-buttons-container">
                  <button
                    type="button"
                    className="save-button experience-button mobile-view"
                    onClick={handleUpdateExperience}
                  >
                    حفظ
                  </button>
                  <button
                    type="button"
                    className="save-button experience-button mobile-view"
                    onClick={handleCancel}
                  >
                    إلغاء
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>مجال الخبرة</label>
                  <input type="text" value={exp.name} readOnly />
                </div>
                <div className="form-group">
                  <label>عدد سنوات الخبرة</label>
                  <input type="text" value={exp.value} readOnly />
                </div>
                <button
                  type="button"
                  className="save-button experience-button wide-screen-button"
                  onClick={() => handleEditExperience(index)}
                >
                  تعديل
                </button>
                <button
                  type="button"
                  className="save-button experience-button wide-screen-button"
                  onClick={() => handleDeleteExperience(index)}
                >
                  حذف
                </button>
                <div className="experience-buttons-container">
                  <button
                    type="button"
                    className="save-button experience-button mobile-view"
                    onClick={() => handleEditExperience(index)}
                  >
                    تعديل
                  </button>
                  <button
                    type="button"
                    className="save-button experience-button mobile-view"
                    onClick={() => handleDeleteExperience(index)}
                  >
                    حذف
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        <button type="submit" className="save-button">
          حفظ{" "}
        </button>
      </form>
    </div>
  );
}

export default Experience;
