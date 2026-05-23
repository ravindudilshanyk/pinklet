import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from '../../assets/Logo.png'
import "./ConfirmMailPage.css";
import Button from "../../Components/UI/Button/Button";

function ConfirmMailPage() {
  const [message, setMessage] = useState("Verifying...");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setMessage("Invalid or missing verification token.");
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`https://pinklet20250616095532-e9esbjhtfbbhfrfe.canadacentral-01.azurewebsites.net/api/Auth/verify-email`, {
          params: { token },
        });

        if (response.status === 200) {
          setMessage("Email successfully verified!");
          setStatus("success");
        } else {
          setMessage(response.data.message || "Email verification failed.");
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification error:", error);
        if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage("An error occurred. Please try again later.");
        }
        setStatus("error");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="email-confirmation">
    <div className="email-confirmation-header">
        <img src={logo} alt="Logo"/>
    </div>
      <h2>Email Confirmation</h2>
      <p className={status}>{message}</p>
      <Button className="DashBtn" onClick={() => window.location.href = "/"} disabled={status === "loading"}>
        Go to Dashboard
      </Button>
    </div>
  );
}

export default ConfirmMailPage;
