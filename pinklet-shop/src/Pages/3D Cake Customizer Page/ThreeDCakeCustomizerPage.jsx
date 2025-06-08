import React, { useState } from "react";
import "./ThreeDCakeCustomizerPage.css";
import ThreeDCustomizerHeader from "../../Components/3D Customizer Header/ThreeDCustomizerHeader";
import CustomizerSettingsSection from "../../Components/Customizer Settings Section/CustomizerSettingsSection";
import SingleOptionSelector from "../../Components/Single Option Selector/SingleOptionSelector";
import CakeLayerCustomizeSection from "../../Components/Cake Layer Customize Section/CakeLayerCustomizeSection";

function ThreeDCakeCustomizer() {
  const [openSection, setOpenSection] = useState(null);
  const [occation, setOccasion] = useState("");
  const [baseShape, setBaseShape] = useState("");
  const [baseShapeSize, setBaseShapeSize] = useState("");
  const [NoLayers, setNoLayers] = useState("1 Layer");
  const [layersShape, setLayersShape] = useState("");
  const [icingType, setIcingType] = useState("");

  const handleToggle = (sectionTitle) => {
    setOpenSection(openSection === sectionTitle ? null : sectionTitle);
  };
  const handleOccasionChange = (occasion) => {
    setOccasion(occasion);
  };
  const handleBaseShapeChange = (shape) => {
    setBaseShape(shape);
  };
  const handleBaseShapeSizeChange = (size) => {
    setBaseShapeSize(size);
  };
  const handleNoLayersChange = (layers) => {
    setNoLayers(layers);
  };
  const handleLayersShapeChange = (shape) => {
    setLayersShape(shape);
  };
  const handleIcingTypeChange = (type) => {
    setIcingType(type);
  };

  return (
    <div className="ThreeDCakeCustomizerContainer">
      <div className="ThreeDNavBar"></div>
      <div className="ThreeDCustomizerSection">
        <ThreeDCustomizerHeader />
        <div className="CustomizerSection">
          <div className="CustomizerSettings">
            <CustomizerSettingsSection
              title="What's the Occasion?"
              isOpen={openSection === "What's the Occasion?"}
              onToggle={() => handleToggle("What's the Occasion?")}
            >
              <p>
                Select a theme or occasion to help us recommend the best cake
                style.
              </p>
              <SingleOptionSelector
                options={[
                  "Birthday",
                  "Baby Shower",
                  "Love",
                  "Anniversary",
                  "Graduation",
                  "Fantasy",
                  "Christmas",
                  "Mother's Day",
                  "Father's Day",
                  "Get Together",
                  "Bride to be",
                ]}
                handleOptionChange={handleOccasionChange}
                option={occation}
              />
            </CustomizerSettingsSection>

            <CustomizerSettingsSection
              title="Pick Your Cake’s Base Shape & Size"
              isOpen={openSection === "Pick Your Cake’s Base Shape & Size"}
              onToggle={() =>
                handleToggle("Pick Your Cake’s Base Shape & Size")
              }
            >
              <p>
                Choose your cake’s base shape and board size. We’ll build from
                here!
              </p>
              <SingleOptionSelector
                options={[
                  "⭕ Round",
                  "🟥 Square",
                  "❤ Heart",
                  "Hexagon",
                  "Rectangle",
                ]}
                handleOptionChange={handleBaseShapeChange}
                option={baseShape}
              />
              <SingleOptionSelector
                options={['6"', '8"', '10"', '12"', '14"']}
                handleOptionChange={handleBaseShapeSizeChange}
                option={baseShapeSize}
              />
            </CustomizerSettingsSection>
            <CustomizerSettingsSection
              title="Cake Layers & Flavor Customization"
              isOpen={openSection === "Cake Layers & Flavor Customization"}
              onToggle={() =>
                handleToggle("Cake Layers & Flavor Customization")
              }
            >
              <p>Select the Number of layers</p>
              <SingleOptionSelector
                options={["1 Layer", "2 Layers", "3 Layers", "4 Layers"]}
                handleOptionChange={handleNoLayersChange}
                option={NoLayers}
              />
              <p>Select the Layers Shape</p>
              <SingleOptionSelector
                options={[
                  "⭕ Round",
                  "🟥 Square",
                  "❤ Heart",
                  "Hexagon",
                  "Rectangle",
                ]}
                handleOptionChange={handleLayersShapeChange}
                option={layersShape}
              />
              <p>Select Cake Icing Type</p>
              <SingleOptionSelector
                options={["Buttercream", "Fondant", "Whipped Cream", "Ganache"]}
                handleOptionChange={handleIcingTypeChange}
                option={icingType}/>
              <p>Build Your Cake – Layer by Layer</p>
              <CakeLayerCustomizeSection/>
            </CustomizerSettingsSection>
          </div>
          <div className="CustomizerWindow"></div>
        </div>
      </div>
    </div>
  );
}

export default ThreeDCakeCustomizer;
