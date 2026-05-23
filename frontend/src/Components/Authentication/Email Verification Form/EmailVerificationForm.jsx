import React, { useState, useEffect } from "react";
import Button from "../../UI/Button/Button";
import "../Login Form/LoginForm.css";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { apiUrl } from "../../../config/runtime";

function EmailVerificationForm({ setIsOTPverified }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [OTPsending, setOTPsending] = useState(false);
  const [OTPsended, setOTPsended] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" | "success"

  const isEmailValid = email.trim() !== "" && /\S+@\S+\.\S+/.test(email);
  const isOtpValid = otp.trim().length === 6; // adjust length as per your OTP logic

  const handleOTPSending = async (e) => {
    e.preventDefault();
    if (!isEmailValid) return;

    setOTPsending(true);
    console.log("Sending OTP to:", email);
    try {
      await axios.post(apiUrl('/api/Auth/fpwd'), { Email: email });

      setOTPsended(true);
      setCountdown(300);
      setMessage("OTP has been sent successfully.");
      setMessageType("success");
    } catch (error) {
      console.error("OTP send failed", error.response.data);
      setMessage(error.response?.data || "Failed to send OTP. Please try again.");
      setMessageType("error");
    } finally {
      setOTPsending(false);
    }
  };

  const handleOTPVerification = async () => {
    try {
      const response = await axios.post(
        apiUrl('/api/Auth/fpwd/verify'),
        {
          Email: email,
          Otp: otp,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("Email", email);
        setMessage("OTP verified successfully!");
        setMessageType("success");
        setIsOTPverified(true);
      } else {
        setMessage("Invalid OTP. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
      setMessage(error.response?.data || "OTP verification failed. Please try again.");
      setMessageType("error");
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && OTPsended) {
      setOTPsended(false);
    }

    return () => clearInterval(timer);
  }, [countdown, OTPsended]);

  return (
    <div className="loginFormSection">
      <div className="loginFormTitle">
        <span>Email Verify</span>
      </div>
      <div className="loginFormField">
        {message && (
          <div className={`form-message ${messageType}`}>{message}</div>
        )}
        <form onSubmit={handleOTPSending}>
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
          </div>

          <div className="loginbuttonField">
            <Button
              className="sendOTPButton"
              type="submit"
              disabled={!isEmailValid || OTPsending || OTPsended}
            >
              {OTPsending ? (
                <span className="spinner"></span>
              ) : OTPsended ? (
                `Resend in ${Math.floor(countdown / 60)}:${String(
                  countdown % 60
                ).padStart(2, "0")}`
              ) : (
                "Request OTP"
              )}
            </Button>
          </div>

          {OTPsended && (
            <div className="otpVerificationSection">
              <p className="otpSentMessage">
                OTP has been sent to {email}. Please check your inbox.
              </p>
              <div className="inputGroup">
                <input
                  name="otp"
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="loginbuttonField">
                <Button
                  className="verifyOTPButton"
                  type="button"
                  onClick={handleOTPVerification}
                  disabled={!isOtpValid}
                >
                  Verify OTP
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EmailVerificationForm;
