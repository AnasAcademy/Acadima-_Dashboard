import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Registration/LoginScreen.css";
import { UserContext } from "../Context/UserContext";
import { apiUrl } from "../API";

import anasAcadlogo from "../Images/AcadimaLogo.png";
import lock from "../Images/Registration/Lock.svg";
import mail from "../Images/Registration/Mail.svg";
import hide from "../Images/Registration/Hide.svg";
import show from "../Images/Registration/Show.svg";

import appleLogo from "../Images/Registration/apple.svg";
import googleLogo from "../Images/Registration/google.svg";
import facebookLogo from "../Images/Registration/fb.svg";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>Wrong email or password</p>
        <button onClick={onClose}>إغلاق</button>
      </div>
    </div>
  );
};

function LoginScreen() {
  const {refreshUserData} = useContext(UserContext); // Access userData from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error messages
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch(apiUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        // Check if there is a message in the response
        if (data.message) {
          setError("Wrong email or password"); // Display the message from the API
        } else {
          setError("Failed to login. Please try again."); // Fallback error
        }
        return;
      }

      const token = data.data.token;
      localStorage.setItem("token", token); // Example: saving token

      await refreshUserData();

      if (data?.data?.user?.role === "user") {
        navigate("/");
      } else if (data?.data?.user?.user_code) {
        navigate("/finances/program");
      } else {
        navigate("/admission");
      }
    } catch (err) {
      setError("An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="form-one">
          <a className="logo-container" href="https://anasacademy.uk">
            <img
              src={anasAcadlogo}
              alt="anasAcadlogo"
              className="anasAcadlogo"
            />
          </a>
        </div>
        <div className="form-two">
          <span className="form-title">تسجيل دخول</span>
        </div>

        <form className="form-three" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              value={email}
              type="email"
              placeholder="البريد الإلكتروني"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <img src={mail} alt="mail" className="icon" />
          </div>

          <div className="input-group">
            <img src={lock} alt="lock" className="icon" />
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

          <a href="" className="forgot-password">
            نسيت كلمة المرور؟
          </a>

          <div className="buttons-container">
            <button className="login-button" type="submit" disabled={loading}>
              <span className="login-button-text">تسجيل دخول</span>
            </button>
          </div>
        </form>

        <div className="social-login">
          <div className="social-login-divider">
            <span className="line"></span>
            <span className="text" style={{ color: "white" }}>
              سجل الدخول عبر
            </span>
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
            <span style={{ color: "white" }}>ليس لديك حساب؟ </span>{" "}
            <a href="#" onClick={() => navigate("/register")}>
              إنشاء حساب
            </a>
          </p>
        </div>
      </div>

      <div className="post-form">
        <a
          href="https://anasacademy.uk/certificate/certificate-check.php"
          className="post-form-text"
        >
          التحقق من الشهادات
        </a>
        <a href="https://support.anasacademy.uk/" className="post-form-text">
          فريق الدعم والتواصل
        </a>
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

export default LoginScreen;
