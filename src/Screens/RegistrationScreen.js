import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Registration/RegistartionScreen.css";
import "../Styles/Registration/LoginScreen.css";
import { apiUrl } from "../API";

import anasAcadlogo from "../Images/Registration/acadimaLogo.png";
import user from "../Images/Registration/User_01.svg";
import lock2 from "../Images/Registration/Lock.svg";
import mail from "../Images/Registration/Mail.svg";
import hide from "../Images/Registration/Hide.svg";
import show from "../Images/Registration/Show.svg";
import phone from "../Images/Registration/Mobile.svg";

import appleLogo from "../Images/Registration/apple.svg";
import googleLogo from "../Images/Registration/google.svg";
import facebookLogo from "../Images/Registration/fb.svg";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>{message}</p>
        <button onClick={onClose}>إغلاق</button>
      </div>
    </div>
  );
};

function RegistrationScreen() {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [countryPrefix, setCountryPrefix] = useState("+1");
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error messages

  const navigate = useNavigate();

  const countryOptions = [
    { code: "+966", name: "KSA" },
    { code: "+20", name: "EGP" },
    // Add more countries as needed
  ];

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const registrationData = {
      full_name,
      email,
      password,
      mobile: countryPrefix + mobile,
    };

    try {
      const response = await fetch(
        apiUrl + "/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'x-api-key': '1234',
          },
          body: JSON.stringify(registrationData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle specific API errors
        if (data.errors) {
          const errorMessages = [];
          if (data.errors.email) {
            errorMessages.push(`${data.errors.email[0]}`);
          }
          if (data.errors.mobile) {
            errorMessages.push(`${data.errors.mobile[0]}`);
          }
          if (data.errors.password) {
            errorMessages.push(`${data.errors.password[0]}`);
          }
          console.log(errorMessages);
          console.log(data);
          setError(errorMessages.join(" و "));
        } else {
          setError("Failed to register. Please try again.");
        }
        return;
      }
      console.log("Registration successful:", data);

      const token = data.data.token;
      localStorage.setItem('token', token);
      navigate("/admission");
      // Navigate to login or home page on successful registration
      // navigate("/login");
    }  catch (err) {
      console.log(err);
      setError("An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainContainer">
      <div className="reg-formContainer">
        <div className="form-one">
          <a className="logo-container" href="https://anasacademy.uk">
            <img src={anasAcadlogo} alt="anasAcadlogo" className="anasAcadlogo" />
          </a>
        </div>

        <div className="form-two">
          <span className="form-title">إنشاء حساب</span>
        </div>

        <form className="form-three" onSubmit={handleSubmit}>
          <div className="input-group">
            <img src={user} alt="user" className="icon" />
            <input
              type="text"
              placeholder="الاسم "
              required
              value={full_name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <img src={mail} alt="mail" className="icon" />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="reg-2-input-group">
            <div className="phone-input-group">
              <select
                value={countryPrefix}
                onChange={(e) => setCountryPrefix(e.target.value)}
                className="country-select"
              >
                {countryOptions.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.code} {country.name}
                  </option>
                ))}
              </select>
              <div className="input-container">
                <img src={phone} alt="phone" className="icon" />
                <input
                  type="tel"
                  required
                  className="phone-input"
                  placeholder="رقم الجوال"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <img src={lock2} alt="lock2" className="icon" />
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="كلمة المرور"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon2" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <img src={hide} alt="hide" className="icon2" />
              ) : (
                <img src={show} alt="show" className="icon2" />
              )}
            </span>
          </div>

          <div className="reg-buttons-container">
            <button type="submit" className="login-button">
              <span className="login-button-text">
              إنشاء حساب
              </span>
            </button>
          </div>
        </form>

        <div className="social-login">
          <div className="social-login-divider">
            <span className="line"></span>
            <span className="text">أو أنشئ الحساب عبر</span>
            <span className="line"></span>
          </div>

          <div className="social-icons">
            <a href="">
              <img src={appleLogo} alt="Apple Login" />
            </a>
            <a href="">
              <img src={googleLogo} alt="Google Login" />
            </a>
            <a href="">
              <img src={facebookLogo} alt="Facebook Login" />
            </a>
          </div>
          <p className="register-link">
            لديك حساب بالفعل؟{" "}
            <a href="#" onClick={() => navigate("/login")}>
              تسجيل دخول
            </a>
          </p>
        </div>
      </div>
      {error && (
        <Popup
          message={error}
          onClose={() => setError(null)} // Close the popup
        />
      )}
    </div>
  );
}

export default RegistrationScreen;
