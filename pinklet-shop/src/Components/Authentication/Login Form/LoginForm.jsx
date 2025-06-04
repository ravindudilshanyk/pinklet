import React from "react";
import Button from "../../UI/Button/Button";
import "./LoginForm.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <div className="loginFormSection">
        <div className="loginFormTitle">
          <span>Login</span>
        </div>
        <div className="loginFormField">
          <form action="">
            <div className="logininputField">
              <div className="inputGroup">
                <MdEmail className="inputIcon" />
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="inputGroup">
                <RiLockPasswordFill className="inputIcon" />
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="checkBoxField">
              <div className="rememberMeSection">
                <input type="checkbox" name="rememberMe" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <div className="forgorPasswordSection">
                <a>Forgot Password?</a>
              </div>
            </div>
            <div className="loginbuttonField">
              <Button className="loginButton">Log in to My Account</Button>
              <div className="loginDivider">
                <hr />
                <span>or continue with</span>
                <hr />
              </div>
              <Button className="googleLoginButton">
                <span className="googleButtonContent">
                  <FcGoogle size={24} />
                  <span>Log in with Google</span>
                </span>
              </Button>
            </div>
            <div className="bottomText">
              <span>
                New to Pinklet? <Link to={"/register"}><a>Create an Account</a></Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
