import React, { useState, useEffect } from "react";
import { apiUrl } from "../../API";

import editLinkimg from "../../Images/editLink.svg";
import deleteLinkimg from "../../Images/deleteLink.svg";

function WorkLinks({ onNext, links, setLinks, updateProgress }) {
  const [activeLinkIndex, setActiveLinkIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tempLink, setTempLink] = useState(""); // Handles the link input field
  const token = localStorage.getItem("token");

  const handleInputChange = (value) => {
    setTempLink(value);
  };

  const openPopupForAdd = () => {
    setIsPopupOpen(true);
    setTempLink(""); // Reset the input field for a new link
    setActiveLinkIndex(null); // Ensure it's not in edit mode
  };

  const openPopupForEdit = (index) => {
    setIsPopupOpen(true);
    setActiveLinkIndex(index);
    setTempLink(links[index]?.value || ""); // Load the URL for editing
  };

  const handleAddOrUpdateLink = async () => {
    if (!tempLink.trim()) {
      alert("يرجى إدخال رابط صحيح.");
      return;
    }

    if (activeLinkIndex !== null) {
      // Edit mode
      try {
        const response = await fetch(
          apiUrl +
            `/panel/profile-setting/metas/${links[activeLinkIndex]?.id}/update`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ` + token,
              "ngrok-skip-browser-warning": true,
              "x-api-key": "1234",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: "link",
              value: tempLink.trim(),
            }),
          }
        );

        if (response.ok) {
          setLinks((prev) =>
            prev.map((link, i) =>
              i === activeLinkIndex ? { ...link, value: tempLink.trim() } : link
            )
          );
          calculateProgress(); // Update progress
        }
      } catch (error) {
        console.error("Error updating link:", error);
      }
    } else {
      // Add mode
      try {
        const response = await fetch(apiUrl + "/panel/profile-setting/metas", {
          method: "POST",
          headers: {
            Authorization: `Bearer ` + token,
            "ngrok-skip-browser-warning": true,
            "x-api-key": "1234",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: "link",
            value: tempLink.trim(),
          }),
        });

        if (response.ok) {
          const savedLink = await response.json();

          const newLink = {
            id: savedLink.id, // Backend-assigned ID
            value: savedLink.value || tempLink.trim(), // Fallback to the submitted value
          };

          setLinks((prev) => [...prev, newLink]); // Append the new link to the list
          calculateProgress(); // Update progress
        }
      } catch (error) {
        console.error("Error adding link:", error);
        alert("حدث خطأ أثناء إضافة الرابط.");
      }
    }

    setIsPopupOpen(false);
    setTempLink("");
  };

  const handleCancel = () => {
    setActiveLinkIndex(null);
    setIsPopupOpen(false);
    setTempLink("");
  };

  const handleDeleteLink = async (index) => {
    const linkToDelete = links[index];

    try {
      const response = await fetch(
        apiUrl + `/panel/profile-setting/metas/${linkToDelete.id}/delete`,
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
        setLinks((prev) => prev.filter((_, i) => i !== index));
        calculateProgress(); // Update progress
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const calculateProgress = () => {
    const progress = links.length === 0 ? 0 : 100;
    updateProgress(progress > 100 ? 100 : progress); // Cap progress at 100%
  };

  useEffect(() => {
    calculateProgress();
  }, [links]);

  return (
    <div className="user-profile-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="experience-header">
          <h2 className="my-program-title">
            <span>روابط الأعمال</span>
          </h2>
          <button
            type="button"
            className="add-experience"
            onClick={openPopupForAdd}
          >
            إضافة رابط <span className="add">+</span>
          </button>
        </div>

        {/* Popup for Add or Edit */}
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content" style={{height: "230px"}}>
              <h3>{activeLinkIndex !== null ? "تعديل الرابط" : "إضافة رابط جديد"}</h3>
              <div className="popup-form-container">
              <input
                type="text"
                placeholder="أدخل الرابط هنا"
                value={tempLink}
                onChange={(e) => handleInputChange(e.target.value)}
                autoFocus
              />
              </div>
              <div className="settings-popup-buttons">
                <button
                  type="button"
                  className="popup-button"
                  style={{width:"110px"}}
                  onClick={handleAddOrUpdateLink}
                >
                  {activeLinkIndex !== null ? "تحديث" : "إضافة"}
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

        {/* Existing Links */}
        {links.length > 0 ? (
          links.map((link, index) => (
            <div key={link.id || index} className="link-card">
              <label>الرابط</label>
              <input type="text" value={link.value} readOnly />
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
                  onClick={() => handleDeleteLink(index)}
                >
                  <img src={deleteLinkimg} alt="delete" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>لا توجد روابط متاحة.</p>
        )}

        <button type="submit" className="save-button">
          حفظ
        </button>
      </form>
    </div>
  );
}

export default WorkLinks;
