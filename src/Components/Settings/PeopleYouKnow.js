import React, { useState } from "react";
import { apiUrl } from "../../API";

import editLinkimg from "../../Images/editLink.svg";
import deleteLinkimg from "../../Images/deleteLink.svg";

function PeopleYouKnow({ onNext, references, setReferences }) {
  const [activeReferenceIndex, setActiveReferenceIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
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

  const addReferenceForm = () => {
    setIsAdding(true);
    setTempReference({
      name: "",
      email: "",
      workplace: "",
      relationship: "",
      job_title: "",
    });
  };

  const handleAddReference = async () => {
    const { name, email, workplace, relationship, job_title } = tempReference;

    if (!name || !email || !workplace || !relationship || !job_title) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }

    try {
      const response = await fetch(
        apiUrl + "/panel/profile-setting/references",
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
        setReferences((prev) => [...prev, savedReference]); // Update references state
        setTempReference({
          name: "",
          email: "",
          workplace: "",
          relationship: "",
          job_title: "",
        }); // Clear the form
        setIsAdding(false);
        alert("تمت إضافة المعرف بنجاح.");
      } else {
        const errorData = await response.json();
        console.error("Error adding reference:", errorData);
        alert("فشل في إضافة المعرف. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Error adding reference:", error);
      alert("حدث خطأ أثناء إضافة المعرف.");
    }
  };

  const handleEditReference = (index) => {
    setActiveReferenceIndex(index);
    setTempReference(references[index]);
  };

  const handleUpdateReference = async () => {
    const { name, email, workplace, relationship, job_title } = tempReference;

    if (!name || !email || !workplace || !relationship || !job_title) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }

    try {
      const response = await fetch(
        apiUrl +
          `/panel/profile-setting/references/${references[activeReferenceIndex]?.id}/update`,
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
          prev.map((reference, i) =>
            i === activeReferenceIndex
              ? { ...reference, ...tempReference }
              : reference
          )
        );
        alert("تم تحديث المعرف بنجاح.");
      } else {
        const errorData = await response.json();
        console.error("Error updating reference:", errorData);
        alert("فشل في تحديث المعرف. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Error updating reference:", error);
      alert("حدث خطأ أثناء تحديث المعرف.");
    }

    setActiveReferenceIndex(null);
  };

  const handleCancel = () => {
    setActiveReferenceIndex(null);
    setIsAdding(false);
    setTempReference({
      name: "",
      email: "",
      workplace: "",
      relationship: "",
      job_title: "",
    });
  };

  const handleDeleteReference = async (index) => {
    const referenceToDelete = references[index];

    try {
      const response = await fetch(
        apiUrl +
          `/panel/profile-setting/references/${referenceToDelete.id}/delete`,
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
        alert("تم حذف المعرف بنجاح.");
      } else {
        const errorData = await response.json();
        console.error("Error deleting reference:", errorData);
        alert("فشل في حذف المعرف. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Error deleting reference:", error);
      alert("حدث خطأ أثناء حذف المعرف.");
    }
  };

  const handleSubmit = (e) => {
    onNext();
  };

  return (
    <div className="user-profile-container">
      <form className="user-form">
        <div className="experience-header">
          <h2 className="my-program-title">
            <span>المعرفون</span>
          </h2>
          <button
            type="button"
            className="add-experience"
            onClick={addReferenceForm}
          >
            إضافة معرف <span className="add">+</span>
          </button>
        </div>

        {/* Add Reference Form */}
        {isAdding && (
          <div className="link-card">
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
              onChange={(e) => handleInputChange("workplace", e.target.value)}
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
              onChange={(e) => handleInputChange("job_title", e.target.value)}
            />
            <button
              type="button"
              className="save-button"
              onClick={handleAddReference}
            >
              إضافة
            </button>
          </div>
        )}

        {/* Existing References */}
        {references.length > 0 ? (
          references.map((reference, index) => (
            <div key={reference.id || index} className="full-width">
              <div className="link-card">
                {activeReferenceIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={tempReference.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                    <input
                      type="email"
                      value={tempReference.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={tempReference.workplace}
                      onChange={(e) =>
                        handleInputChange("workplace", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={tempReference.relationship}
                      onChange={(e) =>
                        handleInputChange("relationship", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={tempReference.job_title}
                      onChange={(e) =>
                        handleInputChange("job_title", e.target.value)
                      }
                    />
                  </>
                ) : (
                  <>
                    <p>{reference.name || "اسم المعرف"}</p>
                    <p>{reference.email || "البريد الإلكتروني"}</p>
                    <p>{reference.workplace || "مكان العمل"}</p>
                    <p>{reference.relationship || "العلاقة"}</p>
                    <p>{reference.job_title || "المسمى الوظيفي"}</p>
                  </>
                )}
                {/* Buttons with images inside link-card */}
                <div className="link-actions">
                  {activeReferenceIndex === index ? null : (
                    <>
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => handleEditReference(index)}
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
                    </>
                  )}
                </div>
              </div>
              {/* Save and cancel buttons outside link-card */}
              {activeReferenceIndex === index && (
                <div className="actions">
                  <button
                    type="button"
                    className="save-button"
                    onClick={handleUpdateReference}
                  >
                    حفظ
                  </button>
                  <button
                    type="button"
                    className="save-button"
                    onClick={handleCancel}
                  >
                    إلغاء
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>لا توجد معرفون حالياً.</p>
        )}

        <button className="save-button" onClick={handleSubmit}>
          حفظ{" "}
        </button>
      </form>
    </div>
  );
}

export default PeopleYouKnow;
