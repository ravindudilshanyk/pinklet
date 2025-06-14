import React, { useState } from 'react'
import RegisterImg from "../../assets/RegisterImg.png";
import LoginForm from "../../Components/Authentication/Login Form/LoginForm";
import "../Login Page/LoginPage.css";
import RegisterForm from '../../Components/Authentication/Register Form/RegisterForm';
import EmailVerificationForm from '../../Components/Authentication/Email Verification Form/EmailVerificationForm';
import PasswordResetForm from '../../Components/Authentication/Password Reset Form/PasswordResetForm';

function ForgetPasswordPage() {
    const [isOTPverified, setIsOTPverified] = useState(false);
  return (
    <div className="LoginPageContainer">
      <div className="LoginPageImage">
        <img src={RegisterImg} alt="Login" className="LoginImg"/>
      </div>
      <div className="LoginPageFormContainer">
        {!isOTPverified ? (
            <EmailVerificationForm setIsOTPverified={setIsOTPverified}/>
        ):(
            <PasswordResetForm/>
        )}
        
      </div>
    </div>
  )
}

export default ForgetPasswordPage
