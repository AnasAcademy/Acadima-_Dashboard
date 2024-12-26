import React, { useState } from "react";
import { apiUrl } from "../../API";

function Experience({ onNext, experience, id }) {
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
    

    const formattedExperience = `title: ${newExperience.name || ""}, year: ${newExperience.value || ""}`;

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
      console.log("Experience submitted successfully:", result);

      if (response.ok) {
        // Update the experience with the server-assigned ID
        setExperienceForms((prev) =>
          prev.map((exp) =>
            exp === newExperience ? { ...exp, id: result.id } : exp
          )
        );
        alert("Experience added successfully");
      } else {
        alert("Error adding experience: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting education data:", error);
      alert("Error adding experience. Please try again.");
    }
  };

  const handleEditExperience = (index) => {
    setActiveFormIndex(index);
    setTempExperience(experienceForms[index]);
    console.log(experienceForms);
  };

  const handleUpdateExperience = async () => {
    const updatedExperience = { ...experienceForms[activeFormIndex], ...tempExperience };
    const formattedExperience = `title: ${updatedExperience.name || ""}, year: ${updatedExperience.value || ""}`;
    console.log(updatedExperience);
    try {
      const response = await fetch(
        apiUrl + `/panel/profile-setting/metas/${experienceForms[activeFormIndex].id}/update`,
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
      console.log("Experience updated successfully:", result);
  
      if (response.ok) {
        // Update the local state to reflect the changes
        setExperienceForms((prev) =>
          prev.map((item, index) =>
            index === activeFormIndex ? updatedExperience : item
          )
        );
        alert("Experience updated successfully");
      } else {
        alert("Error updating experience: " + result.message);
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      alert("Error updating experience. Please try again.");
    } finally {
      setActiveFormIndex(null); // Reset the active form index
    }
  };
  

  const handleDeleteExperience = async (index) => {
    const experienceToDelete = experienceForms[index];
  
    if (!experienceToDelete.id) {
      // If the experience has no ID (not saved to the server), just remove it locally
      setExperienceForms((prev) => prev.filter((_, i) => i !== index));
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
        alert("Experience deleted successfully");
        // Remove the experience locally after a successful API response
        setExperienceForms((prev) => prev.filter((_, i) => i !== index));
      } else {
        const result = await response.json();
        alert("Error deleting experience: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("Error deleting experience. Please try again.");
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
    console.log(experienceForms);
  };

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
              className="save-button experience-button"
              onClick={handleAddExperience}
            >
              إضافة
            </button>
            <button
              type="button"
              className="save-button experience-button"
              onClick={handleCancel}
            >
              إلغاء
            </button>
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
                  className="save-button experience-button"
                  onClick={handleUpdateExperience}
                >
                  حفظ
                </button>
                <button
                  type="button"
                  className="save-button experience-button"
                  onClick={handleCancel}
                >
                  إلغاء
                </button>
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
                  className="save-button experience-button"
                  onClick={() => handleEditExperience(index)}
                >
                  تعديل
                </button>
                <button
                  type="button"
                  className="save-button experience-button"
                  onClick={() => handleDeleteExperience(index)}
                >
                  حذف
                </button>
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
