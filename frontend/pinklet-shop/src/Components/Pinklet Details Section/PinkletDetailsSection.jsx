import React from "react";
import "./PinkletDetailsSection.css";
import { TbTiltShift } from "react-icons/tb";
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";

function PinkletDetailsSection({ children, Img = null, title, para }) {
  const navigate = useNavigate();
  return (
    <div className="PinkletDetailsSectionContainer">
      <div className="PinkletDetailsSection">
        <div className="PinkletDetailsSectionLeft">
          {Img === null ? (
            <div>
              <h3 className="PinkletDetailsSectionTitle">{title}</h3>
              <p className="PinkletDetailsSectionPara">{para}</p>
              <Button
                variant="outline"
                className="RegsiterBtn"
                onClick={() => navigate("/register")}
              >
                Register Now - It's Free
              </Button>
            </div>
          ) : (
            <img src={Img} alt="Pinklet" />
          )}
        </div>
        <div className="PinkletDetailsSectionRight">
          {Img === null ? (
            <div></div>
          ) : (
            <div>
              <h3 className="PinkletDetailsSectionTitle">{title}</h3>
              <p className="PinkletDetailsSectionPara">{para}</p>
            </div>
          )}

          <div className="PinkletDetailsSectionContent">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default PinkletDetailsSection;
