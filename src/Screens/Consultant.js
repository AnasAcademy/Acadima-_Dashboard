import React, { useState } from "react";
import "../Styles/Consultant/Consultant.css"; // Add custom styles for the form

function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    meetingDate: "",
    region: "",
    phoneNumber: "",
    companyAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your form submission logic here (API integration, etc.)
  };

  return (
    <div className="consultation-form-container">
      <header className="consultation-form-header">
        <img
          src="/path/to/logo.png" // Replace with your logo path
          alt="Anas Academy Logo"
          className="consultation-logo"
        />
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
          placeholder="إيميل"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="اسم الشركة"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="meetingDate"
          placeholder="ميعاد الاجتماع"
          value={formData.meetingDate}
          onChange={handleChange}
          required
        />
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        >
          <option value="">المنطقة الزمنية</option>
          <option value="region1">المنطقة 1</option>
          <option value="region2">المنطقة 2</option>
          <option value="region3">المنطقة 3</option>
        </select>
        <input
          type="text"
          name="phoneNumber"
          placeholder="رقم الهاتف"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyAddress"
          placeholder="عنوان مقر الشركة"
          value={formData.companyAddress}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          تأكيد طلب الاستشارة
        </button>
      </form>
    </div>
  );
}

export default ConsultationForm;
