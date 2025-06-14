import React, { useState } from "react";
import "./ThreeDCakeCustomizerPage.css";
import axios from "axios";
import ThreeDCustomizerHeader from "../../Components/3D Customizer Header/ThreeDCustomizerHeader";
import CustomizerSettingsSection from "../../Components/Customizer Settings Section/CustomizerSettingsSection";
import SingleOptionSelector from "../../Components/Single Option Selector/SingleOptionSelector";
import CakeLayerCustomizeSection from "../../Components/Cake Layer Customize Section/CakeLayerCustomizeSection";
import ThreeDCakeViewer from "../../Components/3D Cake Viewer/ThreeDCakeViewer";

function ThreeDCakeCustomizer() {
  const [openSection, setOpenSection] = useState(null);
  const [occation, setOccasion] = useState("");
  const [baseShape, setBaseShape] = useState("");
  const [baseShapeSize, setBaseShapeSize] = useState("");
  const [NoLayers, setNoLayers] = useState("1 Layer");
  const [layersShape, setLayersShape] = useState("");
  const [icingType, setIcingType] = useState("");
  const [LayerData, setLayerData] = useState(
    Array.from({ length: parseInt(NoLayers.split(" ")[0]) }).map(
      (_, index) => ({
        LayerNo: index + 1,

        LayerFlavor: "vanilla",
        LayerHeight: "normal",
        LayerColorizeType: "solid",
        LayerSoidColor: "#ffffff",
        LayerGradientColor1: "#ffffff",
        LayerGradientColor2: "#000000",
        LayerGradientDirection: "to right",
        LayerPatternType: "stripes",
        LayerPatternColor: "#ff0000",
        LayerPatternBGColor: "#ffffff",
      })
    )
  );
  const handleToggle = (sectionTitle) => {
    setOpenSection(openSection === sectionTitle ? null : sectionTitle);
  };
  const handleOccasionChange = (occasion) => {
    setOccasion(occasion);
  };
  const handleBaseShapeChange = (shape) => {
    setBaseShape(shape);
    setBaseShapeSize('6"'); // Reset base shape size when base shape changes
  };
  const handleBaseShapeSizeChange = (size) => {
    setBaseShapeSize(size);
  };
  const handleNoLayersChange = (layers) => {
    const newLayerCount = parseInt(layers.split(" ")[0]);
    setNoLayers(layers);

    setLayerData((prevLayerData) => {
      const newLayerData = [];
      for (let i = 0; i < newLayerCount; i++) {
        newLayerData[i] = prevLayerData[i] || {
          LayerNo:i+1,
          LayerFlavor: "vanilla",
          LayerHeight: "normal",
          LayerColorizeType: "solid",
          LayerSoidColor: "#ffffff",
          LayerGradientColor1: "#ffffff",
          LayerGradientColor2: "#000000",
          LayerGradientDirection: "to right",
          LayerPatternType: "stripes",
          LayerPatternColor: "#ff0000",
          LayerPatternBGColor: "#ffffff",
        };
      }
      return newLayerData;
    });
  };
  const handleLayersShapeChange = (shape) => {
    setLayersShape(shape);
  };
  const handleIcingTypeChange = (type) => {
    setIcingType(type);
  };
  const handleLayerDataChange = (index, key, value) => {
    const updatedLayerData = [...LayerData];
    updatedLayerData[index][key] = value;
    setLayerData(updatedLayerData);
    // console.log("Updated Layer Data:", updatedLayerData);
  };
  const SaveCake = async(e) => {
    e.preventDefault();
    const cakeData = {
      UserId: 0,
      Occation: occation,
      BaseShape: baseShape,
      BaseShapeSize: baseShapeSize,
      NoLayers:  parseInt(NoLayers.split(" ")[0]),
      LayerShape: layersShape,
      IcingType: icingType,
      CakeLayers: LayerData,
    };

    console.log("Cake Data:", cakeData);
    console.log(JSON.stringify(LayerData, null, 2));
    try{
      await axios.post("http://localhost:5159/api/CakeModel/",cakeData
    ).then((response) => {
        console.log("Cake data saved successfully:", response.data);
      });
    }catch(error){
      console.error("Error saving cake data:", error);
      alert("Failed to save cake data. Please try again.");
      return;
    }

    alert("Cake has been added successfully!");
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
                option={icingType}
              />
              <p>Build Your Cake – Layer by Layer</p>
              {Array.from({ length: parseInt(NoLayers.split(" ")[0]) }).map(
                (_, index) => (
                  <CakeLayerCustomizeSection
                    key={index}
                    layerIndex={index + 1}
                    LayerData={LayerData}
                    handleLayerDataChange={handleLayerDataChange}
                  />
                )
              )}
            </CustomizerSettingsSection>
            <CustomizerSettingsSection
              title="Toppers"
              isOpen={openSection === "Toppers"}
              onToggle={() => handleToggle("Toppers")}
            >
              <div className="topperSectionContainer">
                <div className="topperSectionHeader">
                  <p>Decorate with Fun Toppers</p>
                  <div className="topperSectionSearchContainer">
                    <input
                      type="text"
                      placeholder="Search for toppers..."
                      className="topperSearchInput"
                    />
                  </div>
                </div>
                <div className="topperSection">
                  <div className="topperItem">
                    
                  </div>
                  <div className="topperItem">

                  </div>
                  <div className="topperItem">

                  </div>
                  <div className="topperItem">

                  </div>
                  <div className="topperItem">

                  </div>
                </div>
              </div>
            </CustomizerSettingsSection>
            <button onClick={SaveCake} className="saveCakeBtn">Add Cake</button>
          </div>
          <div className="CustomizerWindow">
            <ThreeDCakeViewer
              baseShape={baseShape}
              baseShapeSize={baseShapeSize}
              NoLayers={NoLayers}
              layersShape={layersShape}
              icingType={icingType}
              LayerData={LayerData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreeDCakeCustomizer;
