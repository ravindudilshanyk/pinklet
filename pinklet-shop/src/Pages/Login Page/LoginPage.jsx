import React from "react";
import LoginForm from "../../Components/Authentication/Login Form/LoginForm";
import "./LoginPage.css";
import LoginImg from "../../assets/LoginImg.png";

function LoginPage() {
  return (
    <div className="LoginPageContainer">
      <div className="LoginPageImage">
        <img src={LoginImg} alt="Login" className="LoginImg"/>
        <div className="LoginPageImageText">
          <h1>Welcome Back!</h1>
          <p>Manage your orders, create beautiful gift packages, and even sell your own creations — all in one place.</p>
        </div>
      </div>
      <div className="LoginPageFormContainer">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
