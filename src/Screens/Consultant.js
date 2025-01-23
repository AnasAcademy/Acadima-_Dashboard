import React, { useState, useContext, useEffect } from "react";
import "../Styles/Consultant/Consultant.css"; // Add custom styles for the form
import { UserContext } from "../Context/UserContext"; // Import UserContext
import { apiUrl } from "../API";

import anasAcadlogo from "../Images/AcadimaLogo.png";

function Consultant() {
  const { userBriefData } = useContext(UserContext); // Consume userBriefData from context
  const [timezone, setTimezone] = useState([]);
  const [meetingTimes, setMeetingTimes] = useState([]); // Fetch meeting times
  const [webinars, setWebinars] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [popupMessage, setPopupMessage] = useState(""); // For popup message
  const [isPopupVisible, setIsPopupVisible] = useState(false); // To control popup visibility

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    meeting_time: "", // Store meeting time ID
    timezone: "",
    phone: "",
    items: [], // Added for selected webinars and bundles
  });

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

  // Fetch meeting times
  const fetchMeetingTimes = async () => {
    try {
      const response = await fetch(apiUrl + "/consultation/meeting_times", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
        },
      });
      const result = await response.json();
      setMeetingTimes(result.times || []);
    } catch (error) {
      console.log("Error fetching meeting times:", error);
    }
  };

  // Fetch webinars
  const fetchWebinars = async () => {
    try {
      const response = await fetch(apiUrl + "/consultation/webinars", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
        },
      });
      const result = await response.json();
      setWebinars(result.webinars || []);
    } catch (error) {
      console.log("Error fetching webinars:", error);
    }
  };

  // Fetch bundles
  const fetchBundles = async () => {
    try {
      const response = await fetch(apiUrl + "/consultation/bundles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
        },
      });
      const result = await response.json();
      setBundles(result.bundles);
    } catch (error) {
      console.log("Error fetching bundles:", error);
    }
  };

  useEffect(() => {
    fetchTimezone();
    fetchMeetingTimes();
    fetchWebinars();
    fetchBundles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemSelect = (e) => {
    const selectedId = e.target.value;
    const selectedTitle = e.target.options[e.target.selectedIndex].text;

    if (!selectedItems.some((item) => item.id === selectedId)) {
      setSelectedItems((prevItems) => [...prevItems, { id: selectedId, title: selectedTitle }]);
    }
  };

  const handleItemRemove = (id) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      items: selectedItems.map((item) => item.id), // Extract only the IDs
    };

    try {
      const response = await fetch(apiUrl + "/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success === false && result.errors) {
        // Parse error messages for popup
        const errorMessages = [];
        for (const [field, messages] of Object.entries(result.errors)) {
          errorMessages.push(`${messages.join(", ")}`);
        }
        setPopupMessage(errorMessages.join("\n")); // Combine error messages
        setIsPopupVisible(true); // Show popup
      } else {
        console.log("Form submitted successfully:", result);
        // Perform additional success actions (if needed)
      }
    } catch (err) {
      console.log("Error submitting form:", err);
      setPopupMessage("حدث خطأ أثناء إرسال الطلب."); // Generic error message
      setIsPopupVisible(true); // Show popup
    }
  };

  return (
    <div className="consultation-form-container">
      <header className="consultation-form-header">
        <img src={anasAcadlogo} alt="Anas Academy Logo" className="consultation-logo" />
        <div className="consultant-user-info">
          <p className="student-name">{userBriefData?.full_name}</p>
          <img src={userBriefData?.avatar} alt="User Avatar" className="user-logo" />
          <p>استشارة</p>
        </div>
      </header>

      <form className="consultation-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="الاسم"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="البريد الإلكترونى"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Meeting Time Dropdown */}
        <select
          name="meeting_time"
          value={formData.meeting_time}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            اختر ميعاد الاجتماع
          </option>
          {meetingTimes.length > 0 ? (
            meetingTimes.map((time) => (
              <option key={time.id} value={time.id}>
                {`${time.day} ${time.start_time} ${time.date || ""}`}
              </option>
            ))
          ) : (
            <option value="" disabled>
              جاري التحميل...
            </option>
          )}
        </select>

        <select 
          name="timezone" 
          value={formData.timezone} 
          onChange={handleChange} 
          required
        >
          <option value="" disabled>
            الوحدة الزمنية
          </option>
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

        <input
          type="number"
          name="phone"
          placeholder="رقم الهاتف"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Multi-select dropdown */}
        <select 
          onChange={handleItemSelect} 
          defaultValue=""
          required
        >
          <option value="" disabled>
            اختر الندوات أو الحزم
          </option>
          {webinars.map((webinar) => (
            <option key={webinar.webinar_id} value={webinar.webinar_id}>
              {webinar.translations[0]?.title || "ندوة بدون عنوان"}
            </option>
          ))}
          {bundles.map((bundle) => (
            <option key={bundle.bundle_id} value={bundle.bundle_id}>
              {bundle.translations[0]?.title || "حزمة بدون عنوان"}
            </option>
          ))}
        </select>

        {/* Display selected items */}
        <div className="selected-items">
          {selectedItems.map((item) => (
            <div key={item.id} className="selected-item">
              <span>{item.title}</span>
              <button type="button" onClick={() => handleItemRemove(item.id)}>
                إزالة
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button">
          تأكيد طلب الاستشارة
        </button>
      </form>

      {/* Popup for errors */}
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup">
            <p>{popupMessage}</p>
            <button onClick={() => setIsPopupVisible(false)}>
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Consultant;
