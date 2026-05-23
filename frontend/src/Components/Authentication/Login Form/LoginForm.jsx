/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import "./LoginForm.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { apiUrl } from "../../../config/runtime";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const { access_token } = tokenResponse;
        const { data: userInfo } = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
    
        const response = await axios.post(apiUrl('/api/Auth/google-login'), userInfo);
    
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("email", response.data.email);
        sessionStorage.setItem("name", response.data.name);

        navigate("/");
      } catch (error) {
        console.error('Google login error:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await axios.post(apiUrl('/api/Auth/login'), {
        email,
        password,
      });
  
      const { token, email: userEmail, name } = response.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", userEmail);
      sessionStorage.setItem("name", name);     
  
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data) {
        setErrorMsg(err.response.data);
      } else {
        setErrorMsg("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="loginFormSection">
      <div className="loginFormTitle">
        <span>Login</span>
      </div>
      <div className="loginFormField">
        <form onSubmit={handleLogin}>
          <div className="logininputField">
            <div className="inputGroup">
              <MdEmail className="inputIcon" />
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <RiLockPasswordFill className="inputIcon" />
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMsg && <p className="errorMessage">{errorMsg}</p>}

          <div className="checkBoxField">
            <div className="rememberMeSection">
              <input type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <div className="forgorPasswordSection">
              <Link to={"/forgetPw"}><a>Forgot Password?</a></Link>
            </div>
          </div>

          <div className="loginbuttonField">
            <Button className="loginButton" type="submit" disabled={isLoading}>
               {isLoading ? <div className="spinner"></div>:<p>Log in to My Account</p>}
            </Button>
            <div className="loginDivider">
              <hr />
              <span>or continue with</span>
              <hr />
            </div>
            <Button className="googleLoginButton" type="button" onClick={() => googleLogin()}>
              <span className="googleButtonContent">
                <FcGoogle size={24} />
                <span>Log in with Google</span>
              </span>
            </Button>
          </div>
          <div className="bottomText">
            <span>
              New to Pinklet?{" "}
              <Link to="/register">
                <a>Create an Account</a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
