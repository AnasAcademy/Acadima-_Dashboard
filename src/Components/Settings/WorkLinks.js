import React, { useState } from "react";
import { apiUrl } from "../../API";

import editLinkimg from "../../Images/editLink.svg";
import deleteLinkimg from "../../Images/deleteLink.svg";

function WorkLinks({ onNext, links, setLinks }) {
  const [activeLinkIndex, setActiveLinkIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [tempLink, setTempLink] = useState(""); // Only handles the URL field
  const token = localStorage.getItem("token");

  const handleInputChange = (value) => {
    setTempLink(value);
  };

  const addLinkForm = () => {
    setIsAdding(true);
    setTempLink(""); // Reset the input for a new link
  };

  const handleAddLink = async () => {
    if (!tempLink.trim()) {
      alert("يرجى إدخال رابط صحيح.");
      return;
    }

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

        // Ensure the savedLink object has the expected structure
        const newLink = {
          id: savedLink.id, // Backend-assigned ID
          value: savedLink.value || tempLink.trim(), // Fallback to the submitted value
        };

        setLinks((prev) => [...prev, newLink || savedLink.value]); // Append the new link to the list
        console.log("Link added:", newLink);
      }
    } catch (error) {
      console.error("Error adding link:", error);
      alert("حدث خطأ أثناء إضافة الرابط.");
    }

    setIsAdding(false);
    setTempLink("");
  };

  const handleEditLink = (index) => {
    setActiveLinkIndex(index);
    setTempLink(links[index]?.value || ""); // Only the URL is loaded for editing
  };

  const handleUpdateLink = async () => {
    if (!tempLink.trim()) {
      alert("يرجى إدخال رابط صحيح.");
      return;
    }

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
      }
    } catch (error) {
      console.error("Error updating link:", error);
    }

    setActiveLinkIndex(null);
  };

  const handleCancel = () => {
    setActiveLinkIndex(null);
    setIsAdding(false);
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
      }
    } catch (error) {
      console.error("Error deleting link:", error);
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
            <span>روابط الأعمال</span>
          </h2>
          <button
            type="button"
            className="add-experience"
            onClick={addLinkForm}
          >
            إضافة رابط <span className="add">+</span>
          </button>
        </div>

        {/* Add Link Form */}
        {isAdding && (
          <div className="link-card">
            <label>الرابط</label>
            <input
              type="text"
              placeholder="أدخل الرابط هنا"
              value={tempLink}
              onChange={(e) => handleInputChange(e.target.value)}
              autoFocus
            />
            <div className="link-actions">
              <button
                type="button"
                className="save-button"
                onClick={handleAddLink}
              >
                إضافة
              </button>
            </div>
          </div>
        )}

        {/* Existing Links */}
        {links.length > 0 ? (
          links.map((link, index) => (
            <div key={link.id || index} className="link-card">
              {activeLinkIndex === index ? (
                <>
                  <label>الرابط</label>
                  <input
                    type="text"
                    value={tempLink} // Use tempLink for the edit mode
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                  <div className="link-actions">
                    <button
                      type="button"
                      className="save-button"
                      onClick={handleUpdateLink}
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
                </>
              ) : (
                <>
                  <label>الرابط</label>
                  <input type="text" value={link.value} readOnly />
                  <div className="link-actions">
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => handleEditLink(index)}
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
                </>
              )}
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
