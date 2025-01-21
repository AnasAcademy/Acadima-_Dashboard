import React, { useState, useEffect } from "react";
import { apiUrl } from "../../API";

import editLinkimg from "../../Images/editLink.svg";
import deleteLinkimg from "../../Images/deleteLink.svg";

function PeopleYouKnow({ onNext, references, setReferences, updateProgress }) {
  const [activeReferenceIndex, setActiveReferenceIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tempReference, setTempReference] = useState({
    name: "",
    email: "",
    workplace: "",
    relationship: "",
    job_title: "",
  });
  const token = localStorage.getItem("token");

  const handleInputChange = (key, value) => {
    setTempReference((prev) => ({ ...prev, [key]: value }));
  };

  const openPopupForAdd = () => {
    setIsPopupOpen(true);
    setTempReference({
      name: "",
      email: "",
      workplace: "",
      relationship: "",
      job_title: "",
    });
    setActiveReferenceIndex(null);
  };

  const openPopupForEdit = (index) => {
    setIsPopupOpen(true);
    setActiveReferenceIndex(index);
    setTempReference(references[index]);
  };

  const handleAddOrUpdateReference = async () => {
    const { name, email, workplace, relationship, job_title } = tempReference;

    if (!name || !email || !workplace || !relationship || !job_title) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }

    if (activeReferenceIndex !== null) {
      // Edit mode
      try {
        const response = await fetch(
          `${apiUrl}/panel/profile-setting/references/${references[activeReferenceIndex]?.id}/update`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": true,
              "x-api-key": "1234",
              "content-type": "application/json",
            },
            body: JSON.stringify(tempReference),
          }
        );

        if (response.ok) {
          setReferences((prev) =>
            prev.map((ref, i) =>
              i === activeReferenceIndex ? { ...ref, ...tempReference } : ref
            )
          );
          calculateProgress();
        }
      } catch (error) {
        console.error("Error updating reference:", error);
      }
    } else {
      // Add mode
      try {
        const response = await fetch(
          `${apiUrl}/panel/profile-setting/references`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": true,
              "x-api-key": "1234",
              "content-type": "application/json",
            },
            body: JSON.stringify(tempReference),
          }
        );

        if (response.ok) {
          const savedReference = await response.json();
          const newReference = {
            id: savedReference.id,
            name: savedReference.name || tempReference.name,
            email: savedReference.email || tempReference.email,
            workplace: savedReference.workplace || tempReference.workplace,
            relationship:
              savedReference.relationship || tempReference.relationship,
            job_title: savedReference.job_title || tempReference.job_title,
          };
          setReferences((prev) => [...prev, newReference]);
          calculateProgress();
        }
      } catch (error) {
        console.error("Error adding reference:", error);
      }
    }

    setIsPopupOpen(false);
    setTempReference({
      name: "",
      email: "",
      workplace: "",
      relationship: "",
      job_title: "",
    });
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setActiveReferenceIndex(null);
    setTempReference({
      name: "",
      email: "",
      workplace: "",
      relationship: "",
      job_title: "",
    });
  };

  const calculateProgress = () => {
    const progress =
      references.length === 0 ? 0 : Math.min(references.length * 20, 100);
    updateProgress(progress);
  };

  useEffect(() => {
    calculateProgress();
  }, [references]);

  const handleDeleteReference = async (index) => {
    const referenceToDelete = references[index];

    try {
      const response = await fetch(
        `${apiUrl}/panel/profile-setting/references/${referenceToDelete.id}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": true,
            "x-api-key": "1234",
            "content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        setReferences((prev) => prev.filter((_, i) => i !== index));
        calculateProgress();
      }
    } catch (error) {
      console.error("Error deleting reference:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="user-profile-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="experience-header">
          <h2 className="my-program-title">
            <span>المعرفون</span>
          </h2>
          <button
            type="button"
            className="add-experience"
            onClick={openPopupForAdd}
          >
            إضافة معرف <span className="add">+</span>
          </button>
        </div>

        {/* Popup for Add or Edit */}
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>
                {activeReferenceIndex !== null
                  ? "تعديل المعرف"
                  : "إضافة معرف جديد"}
              </h3>
              <div className="popup-form-container">
                <input
                  type="text"
                  placeholder="اسم المعرف"
                  value={tempReference.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={tempReference.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="مكان العمل"
                  value={tempReference.workplace}
                  onChange={(e) =>
                    handleInputChange("workplace", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="العلاقة"
                  value={tempReference.relationship}
                  onChange={(e) =>
                    handleInputChange("relationship", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="المسمى الوظيفي"
                  value={tempReference.job_title}
                  onChange={(e) =>
                    handleInputChange("job_title", e.target.value)
                  }
                />
              </div>
              <div className="settings-popup-buttons">
                <button
                  type="button"
                  className="popup-button"
                  style={{ width: "105px" }}
                  onClick={handleAddOrUpdateReference}
                >
                  {activeReferenceIndex !== null ? "تحديث" : "إضافة"}
                </button>
                <button
                  type="button"
                  className="popup-button"
                  style={{ width: "105px" }}
                  onClick={handleCancel}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing References */}
        {references.length > 0 ? (
          references.map((reference, index) => (
            <div key={reference.id || index} className="link-card">
              <p>{reference.name}</p>
              <p>{reference.email}</p>
              <p>{reference.workplace}</p>
              <p>{reference.relationship}</p>
              <p>{reference.job_title}</p>
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
                  onClick={() => handleDeleteReference(index)}
                >
                  <img src={deleteLinkimg} alt="delete" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>لا توجد معرفون حالياً.</p>
        )}

        <button type="submit" className="save-button">
          حفظ
        </button>
      </form>
    </div>
  );
}

export default PeopleYouKnow;
