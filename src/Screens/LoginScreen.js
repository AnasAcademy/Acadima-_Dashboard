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

const Popup = ({ message, onClose }) => (
  <div className="popup-container">
    <div className="popup">
      <p>{message}</p>
      <button onClick={onClose}>إغلاق</button>
    </div>
  </div>
);

const ForgotPasswordPopup = ({ onClose, onSend }) => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (email.trim()) {
      onSend(email); // Trigger the forgot password API
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h3>نسيت كلمة المرور؟</h3>
        <input
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="popup-buttons">
          <button className="send-button" onClick={handleSend}>
            إرسال
          </button>
          <button className="cancel-button" onClick={onClose}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

function LoginScreen() {
  const { refreshUserData } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false); // New state for popup
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const loginData = { email, password };

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
        setError("Wrong email or password");
        return;
      }

      const token = data.data.token;
      localStorage.setItem("token", token);

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

  const handleForgotPassword = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        setError(data.message || "Failed to send password reset email.");
      } else {
        setShowForgotPasswordPopup(false); // Close popup on success
        setError("تم إرسال بريد إلكتروني لاستعادة كلمة المرور");
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
            <img src={anasAcadlogo} alt="anasAcadlogo" className="anasAcadlogo" />
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

          <a className="forgot-password" onClick={() => setShowForgotPasswordPopup(true)}>
            نسيت كلمة المرور؟
          </a>

          <div className="buttons-container">
            <button className="login-button" type="submit" disabled={loading}>
              <span className="login-button-text">تسجيل دخول</span>
            </button>
          </div>
        </form>

        {/* Social Login */}
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

      {/* Support Links */}
      <div className="post-form">
        <a href="https://anasacademy.uk/certificate/certificate-check.php" className="post-form-text">
          التحقق من الشهادات
        </a>
        <a href="https://support.anasacademy.uk/" className="post-form-text">
          فريق الدعم والتواصل
        </a>
      </div>

      {/* Error Popup */}
      {error && <Popup message={error} onClose={() => setError(null)} />}

      {/* Forgot Password Popup */}
      {showForgotPasswordPopup && (
        <ForgotPasswordPopup
          onClose={() => setShowForgotPasswordPopup(false)}
          onSend={handleForgotPassword}
        />
      )}
    </div>
  );
}

export default LoginScreen;
