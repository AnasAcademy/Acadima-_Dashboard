import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../Styles/Registration/LoginScreen.css";
import { apiUrl } from "../API";

import anasAcadlogo from "../Images/AcadimaLogo.png";
import hide from "../Images/Registration/Hide.svg";
import show from "../Images/Registration/Show.svg";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { token } = useParams(); // Get the dynamic segment from the URL
  const [searchParams] = useSearchParams(); // Get the query parameters
  const email = searchParams.get("email"); // Extract 'email' from query parameters

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Ensure password fields are filled and match
    if (!password || !confirmPassword) {
      setErrorMessage("كلمة المرور مطلوبة");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("كلمتا المرور غير متطابقتين");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    // Prepare the payload
    const payload = {
      email,
      password,
      password_confirmation: confirmPassword,
    };

    try {
      // Send request to the API
      const response = await fetch(`${apiUrl}/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Required for JSON body
          "x-api-key": "1234", // Include your API key
        },
        body: JSON.stringify(payload), // Correctly stringify the payload
      });

      const data = await response.json();

      // Check for server-side errors
      if (!response.ok || data.success === false) {
        setErrorMessage(data.message || "حدث خطأ أثناء إستعادة كلمة المرور");
        console.log("Server Error:", data);
        return;
      }

      // Successful response
      setSuccessMessage("تم تغيير كلمة المرور بنجاح");
      console.log("Success:", data);
    } catch (error) {
      // Catch and handle unexpected errors
      setErrorMessage("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى");
      console.log("Error:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="form-one">
          <a className="login-logo-container" href="https://anasacademy.uk">
            <img src={anasAcadlogo} alt="anasAcadlogo" className="anasAcadlogo" />
          </a>
        </div>
        <div className="form-two">
          <span className="form-title" style={{ width: "fit-content" }}>
            إستعادة كلمة المرور
          </span>
        </div>

        <form className="form-three" onSubmit={handleResetPassword}>
          <div className="input-group">
            <input
              value={email}
              type="email"
              placeholder="البريد الإلكتروني"
              required
              style={{ paddingRight: "1rem" }}
              readOnly
            />
          </div>

          <div className="input-group">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="كلمة المرور"
              required
              value={password}
              name="new_password"
              style={{ paddingRight: "1rem" }}
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

          <div className="input-group">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="تأكيد كلمة المرور"
              required
              value={confirmPassword}
              name="confirm_password"
              style={{ paddingRight: "1rem" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="icon2" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <img src={hide} alt="hide" className="icon2" />
              ) : (
                <img src={show} alt="show" className="icon2" />
              )}
            </span>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <div className="buttons-container">
            <button className="login-button" type="submit" disabled={loading}>
              <span className="login-button-text">
                {loading ? "جارٍ الإرسال..." : "إستعادة كلمة المرور"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
