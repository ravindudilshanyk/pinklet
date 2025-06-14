import React from "react";
import "./ThreeDCustomizerHeader.css";
import ThreeDBackImg from "../../assets/3dCustomizerImg.jpeg";

function ThreeDCustomizerHeader() {
  return (
    <div className="ThreeDCustomizerHeaderContainer">
      <img
        src={ThreeDBackImg}
        alt="3D Customizer Background"
        className="ThreeDCustomizerHeaderImg"
      />
      <div className="ThreeDCustomizerHeaderOverlay">
        <h1>Design Your Dream Cake in 3D 🍰</h1>
        <p>
          Build your own cake layer by layer, pick your theme, and customize
          every detail.<br/> What you see is what we bake!
        </p>
      </div>
    </div>
  );
}

export default ThreeDCustomizerHeader;
