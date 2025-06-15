import React, { useState } from "react";
import "./NavBar.css";
import Logo from "../../assets/Logo.png";
import Button from "../UI/Button/Button";
import { VscThreeBars } from "react-icons/vsc";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [isNavBoxOpen, setIsNavBoxOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="NavBarContainer">
      <div className="NavBarLogoImg">
        <img src={Logo} alt="Logo" onClick={()=>navigate("/")}/>
      </div>
      <div className="NavBarLinks">
        <a href="#" className="NavLinks">
          Home
        </a>
        <a href="#" className="NavLinks">
          Cakes
        </a>
        <a href="#" className="NavLinks">
          Wedding Cakes
        </a>
        <a href="#" className="NavLinks">
          Gift Packages
        </a>
        <div
          className="NavThreeBar"
          onClick={() => setIsNavBoxOpen(!isNavBoxOpen)}
        >
            <VscThreeBars className="ThreeBarIcon" />
        </div>
        <Button onClick={()=> navigate("/login")}>Join the Cake Club</Button>
      </div>
      {isNavBoxOpen && (
        <div className="NavBoxContainer">
          <div className="NavBox">
            <div
              className="NavBoxCloseIcon"
              
            >
              <MdCancel onClick={() => setIsNavBoxOpen(false)}/>
            </div>
            <a href="#" className="">
              Home
            </a>
            <a href="#" className="">
              Cakes
            </a>
            <a href="#" className="">
              Wedding Cakes
            </a>
            <a href="#" className="">
              Gift Packages
            </a>
            <Button onClick={()=> navigate("/login")}>Join the Cake Club</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
