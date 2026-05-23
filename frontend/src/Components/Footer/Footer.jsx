import React from "react";
import "./Footer.css";
import Button from "../UI/Button/Button";
import PinkletLogo from "../../assets/PINKLET.png";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";

function Footer() {
  return (
    <div className="FooterContainer">
      <div className="FooterSection">
        <div className="FooterColoumn1">
          <h3>Don't Miss Out!</h3>
          <p>
            Get exclusive gift ideas, new item alerts, and seasonal discounts
            directly to your inbox.
          </p>
          <div className="emailSubscribe">
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
            />
            <Button variant="primary">Subscribe</Button>
          </div>
          <img src={PinkletLogo} alt="Pinklet Logo" className="FooterLogo" />
          <p>
            Batapola Rd,
            <br />
            Ambalangoda, Galle.
          </p>
        </div>
        <div className="FooterColoumn2">
          <h4>Pinklet Cakes & Café</h4>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Private Policy</p>
          <p>Terms of Use</p>

          <h4>For Venders</h4>
          <p>Be a Venodo</p>
          <p>Terms & Condition</p>
        </div>
        <div className="FooterColoumn3">
          <h4>Quick Links</h4>
          <p>Gift Package Builder</p>
          <p>3D Cake Designer</p>
          <p>Shop Cakes</p>
          <p>Shop Gifts</p>

          <h4>Social Links</h4>
          <p className="SocialLinks">
            <FaFacebook size={35} className="SocialLink" />{" "}
            <FaSquareInstagram size={35} className="SocialLink" />{" "}
            <FaWhatsapp size={35} className="SocialLink" />{" "}
            <AiFillTikTok size={35} className="SocialLink" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
