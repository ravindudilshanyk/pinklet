/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import Button from "../../UI/Button/Button";
import "../Login Form/LoginForm.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

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

  // Real-time validation
  const validate = () => {
    const newErrors = {};

    if (!formData.fName.trim()) newErrors.fName = "First name is required.";
    if (!formData.lName.trim()) newErrors.lName = "Last name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required.";

    const password = formData.password;
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (!/[!@#$%^&*]/.test(password)) newErrors.password = "Include at least one special character.";
    if (!/[0-9]/.test(password)) newErrors.password = "Include at least one number.";

    if (formData.password !== formData.repassword)
      newErrors.repassword = "Passwords do not match.";

    if (!formData.terms) newErrors.terms = "You must agree to the terms.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors(validate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    try {
      const response = await axios.post("http://localhost:5159/api/Auth/register", {
        FirstName: formData.fName,
        LastName: formData.lName,
        Email: formData.email,
        Password: formData.password,
        PhoneNumber:"",
        Role: "",
        Availability:""
      });

      alert("Registered successfully!");
      // Optionally redirect or clear form
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="RegsiterFormSection">
      <div className="loginFormTitle">
        <span>Signup</span>
      </div>
      <div className="loginFormField">
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
            {errors.fName && <span className="error">{errors.fName}</span>}

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
            {errors.lName && <span className="error">{errors.lName}</span>}

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
            {errors.email && <span className="error">{errors.email}</span>}

            <div className="RegiinputGroup">
              <RiLockPasswordFill className="inputIcon" />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <span className="error">{errors.password}</span>}

            <div className="RegiinputGroup">
              <RiLockPasswordFill className="inputIcon" />
              <input
                name="repassword"
                type="password"
                placeholder="Re-Enter your password"
                value={formData.repassword}
                onChange={handleChange}
              />
            </div>
            {errors.repassword && <span className="error">{errors.repassword}</span>}
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
            {errors.terms && <span className="error">{errors.terms}</span>}
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
            <Button className="googleLoginButton">
              <span className="googleButtonContent">
                <FcGoogle size={24} />
                <span>Sign up with Google</span>
              </span>
            </Button>
          </div>

          <div className="bottomText">
            <span>
              Already have an account?{" "}
              <Link to="/login">
                <a>Sign in</a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
