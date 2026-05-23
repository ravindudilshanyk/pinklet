import React from 'react'
import RegisterImg from "../../assets/RegisterImg.png";
import LoginForm from "../../Components/Authentication/Login Form/LoginForm";
import "../Login Page/LoginPage.css";
import RegisterForm from '../../Components/Authentication/Register Form/RegisterForm';

function RegisterPage() {
  return (
    <div className="LoginPageContainer">
      <div className="LoginPageImage">
        <img src={RegisterImg} alt="Login" className="LoginImg"/>
        <div className="LoginPageImageText">
          <h1>Join the Pinklet Family</h1>
          <p>Create your own gift packages, order beautiful cakes, or even sell your creations — all from one easy account.
          </p>
        </div>
      </div>
      <div className="LoginPageFormContainer">
        <RegisterForm/>
      </div>
    </div>
  )
}

export default RegisterPage
