/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../UI/Button/Button";
import "../Login Form/LoginForm.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function RegisterForm() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    repassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get access token
        const { access_token } = tokenResponse;

        // Option 1: Get user info from Google directly
        const { data: userInfo } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        // Send user info to backend
        const response = await axios.post(
          "https://pinklet20250616095532-e9esbjhtfbbhfrfe.canadacentral-01.azurewebsites.net/api/Auth/google-login",
          userInfo
        );

        // Handle backend response
        console.log("Backend response:", response.data);

        // Optionally store token/user data in localStorage or context
        localStorage.setItem("token", response.data.token);
        setSuccessMessage("Your registration was successful");
        setFormData({
          fName: "",
          lName: "",
          email: "",
          password: "",
          repassword: "",
          terms: false,
        });
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } catch (error) {
        console.error("Google login error:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleRepasswordVisibility = () => {
    setShowRepassword((prev) => !prev);
  };

  const validate = (onlyPassword) => {
    const newErrors = {};

    if (onlyPassword) {
      const password = formData.password;
      if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters.";
      else if (!/[!@#$%^&*]/.test(password))
        newErrors.password = "Include at least one special character.";
      else if (!/[0-9]/.test(password))
        newErrors.password = "Include at least one number.";

      if (
        formData.password &&
        formData.repassword &&
        formData.password !== formData.repassword
      )
        newErrors.repassword = "Passwords do not match.";
      return newErrors;
    }

    if (!formData.fName.trim()) newErrors.fName = "First name is required.";
    if (!formData.lName.trim()) newErrors.lName = "Last name is required.";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required.";

    const password = formData.password;
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    else if (!/[!@#$%^&*]/.test(password))
      newErrors.password = "Include at least one special character.";
    else if (!/[0-9]/.test(password))
      newErrors.password = "Include at least one number.";

    // Only check password match if both fields have values
    if (
      formData.password &&
      formData.repassword &&
      formData.password !== formData.repassword
    )
      newErrors.repassword = "Passwords do not match.";

    if (!formData.terms) newErrors.terms = "You must agree to the terms.";

    return newErrors;
  };

  useEffect(() => {
    if (formData.password || formData.repassword) {
      const newErrors = validate(true);
      if (formData.password === formData.repassword && newErrors.repassword) {
        delete newErrors.repassword;
      }
      setErrors(newErrors);
    }
  }, [formData.password, formData.repassword]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(false);
    setSubmitted(true);
    setErrors(validationErrors);
    setServerError(""); // reset previous server error

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      await axios.post(
        "https://pinklet20250616095532-e9esbjhtfbbhfrfe.canadacentral-01.azurewebsites.net/api/Auth/register",
        {
          FirstName: formData.fName,
          LastName: formData.lName,
          Email: formData.email,
          Password: formData.password,
          PhoneNumber: "",
          Role: "",
          Availability: "",
        }
      );
      setSuccessMessage(
        "Your registration was successful. Please check your inbox for the verification email."
      );
      setFormData({
        fName: "",
        lName: "",
        email: "",
        password: "",
        repassword: "",
        terms: false,
      });
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setServerError(error.response.data || "Bad request.");
        setFormData((prev) => ({
          ...prev,
          email: "",
        }));
        setTimeout(() => {
          setServerError("");
        }, 5000);
      } else {
        setServerError("Registration failed. Please try again.");
      }
    }
  };

  const visibleErrors = {};
  if (submitted) {
    Object.assign(visibleErrors, errors);
  } else {
    if (errors.password) visibleErrors.password = errors.password;
    if (errors.repassword) visibleErrors.repassword = errors.repassword;
  }

  return (
    <div className="RegsiterFormSection">
      <div className="loginFormTitle">
        <span>Signup</span>
      </div>

      {Object.keys(visibleErrors).length > 0 && (
        <div className="form-errors">
          <ul>
            {Object.entries(visibleErrors).map(([field, message]) => (
              <li key={field} className="error">
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="loginFormField">
        {successMessage && (
          <div
            className={`success-banner ${
              successMessage ? "success-banner-show" : ""
            }`}
          >
            {successMessage}
          </div>
        )}
        {serverError && (
          <div
            className={`error-banner ${serverError ? "error-banner-show" : ""}`}
          >
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="logininputField">
            <div className="RegiinputGroup">
              <FaUserAlt className="inputIcon" />
              <input
                name="fName"
                type="text"
                placeholder="Enter your First Name"
                value={formData.fName}
                onChange={handleChange}
              />
            </div>

            <div className="RegiinputGroup">
              <FaUserAlt className="inputIcon" />
              <input
                name="lName"
                type="text"
                placeholder="Enter your Last Name"
                value={formData.lName}
                onChange={handleChange}
              />
            </div>

            <div className="RegiinputGroup">
              <MdEmail className="inputIcon" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="RegiinputGroup">
              <RiLockPasswordFill className="inputIcon" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
                placeholder="Re-Enter your password"
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

          <div className="RegicheckBoxField">
            <div className="rememberMeSection">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">I agree to Terms and Conditions</label>
            </div>
            <div className="termsSection">
              <a href="#">Read terms and conditions</a>
            </div>
          </div>

          <div className="loginbuttonField">
            <Button type="submit" className="loginButton">
              Register & Create My Account
            </Button>
            <div className="loginDivider">
              <hr />
              <span>or continue with</span>
              <hr />
            </div>
            <Button className="googleLoginButton" onClick={() => googleLogin()}>
              <span className="googleButtonContent">
                <FcGoogle size={24} />
                <span>Sign up with Google</span>
              </span>
            </Button>
          </div>

          <div className="bottomText">
            <span>
              Already have an account? <Link to="/login">Sign in</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
