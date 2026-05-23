/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../UI/Button/Button";
import "../Login Form/LoginForm.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../config/runtime";

function PasswordResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    repassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { password, repassword } = formData;

    if (password && !validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters, include a number and a special character."
      );
    } else if (repassword && password !== repassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage("");
    }
  }, [formData.password, formData.repassword]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleRepasswordVisibility = () => {
    setShowRepassword((prev) => !prev);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, repassword } = formData;
    const email = localStorage.getItem("Email");

    if (!email) {
      setErrorMessage("No email found. Please restart password reset process.");
      return;
    }

    if (errorMessage) return;

    try {
      const response = await axios.post(
        apiUrl('/api/Auth/fpwd/reset'),
        {
          Email: email,
          Password: password,
        }
      );

      navigate("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="PasswordResetFormSection">
      <div className="loginFormTitle">
        <span>Reset Password</span>
      </div>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      <div className="loginFormField">
        <form onSubmit={handleSubmit}>
          <div className="logininputField">
            <div className="RegiinputGroup">
              <RiLockPasswordFill className="inputIcon" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="showPasswordToggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
              </button>
            </div>

            <div className="RegiinputGroup">
              <RiLockPasswordFill className="inputIcon" />
              <input
                name="repassword"
                type={showRepassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={formData.repassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="showPasswordToggle"
                onClick={toggleRepasswordVisibility}
              >
                {showRepassword ? <BiHide size={20} /> : <BiShow size={20} />}
              </button>
            </div>
          </div>
          <div className="PasswordResetbuttonField">
            <Button type="submit" className="loginButton">
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetForm;
