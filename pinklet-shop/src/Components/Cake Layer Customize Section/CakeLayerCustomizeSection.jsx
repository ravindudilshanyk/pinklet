import React from 'react'
import './CakeLayerCustomizeSection.css'

function CakeLayerCustomizeSection({ layerIndex, LayerData, handleLayerDataChange }) {
  const currentLayer = LayerData[layerIndex - 1];
  const colorizeType = currentLayer.LayerColorizeType;

  return (
    <div className='CakeLayerCustomizeSection'>
      <p className='layerTitle'>Layer {layerIndex}</p>
      <div className="cakeLayerCustomize">
        <div className="cakeLayerCustomize1cloumn">
          <p>Select Layer Flavor</p>
          <select 
            className='CakeSelectComp' 
            value={currentLayer.LayerFlavor} 
            onChange={(e) => handleLayerDataChange(layerIndex-1, 'LayerFlavor', e.target.value)}
          >
            <option value="vanilla">Vanilla</option>
            <option value="chocolate">Chocolate</option>
          </select>
          <p>Select Layer Height</p>
          <select 
            className='CakeSelectComp' 
            value={currentLayer.LayerHeight} 
            onChange={(e) => handleLayerDataChange(layerIndex-1, 'LayerHeight', e.target.value)}
          >
            <option value="tall">Tall</option>
            <option value="normal">Normal</option>
            <option value="short">Short</option>
          </select>
        </div>
        <div className="cakeLayerCustomize2cloumn">
          <p>Colorize Your Layer As you wish</p>
          <div className="LayerColor">
            <div 
              className={colorizeType === "solid" ? "LayerColorOptionSelected" : "LayerColorOption"} 
              onClick={() => handleLayerDataChange(layerIndex-1, 'LayerColorizeType', 'solid')}
            >
              Solid
            </div>
            <div 
              className={colorizeType === "gradiant" ? "LayerColorOptionSelected" : "LayerColorOption"} 
              onClick={() => handleLayerDataChange(layerIndex-1, 'LayerColorizeType', 'gradiant')}
            >
              Gradiant
            </div>
            <div 
              className={colorizeType === "pattern" ? "LayerColorOptionSelected" : "LayerColorOption"} 
              onClick={() => handleLayerDataChange(layerIndex-1, 'LayerColorizeType', 'pattern')}
            >
              Pattern
            </div>
          </div>
        </div>
        <div className="cakeLayerCustomize3cloumn">
          {colorizeType === "solid" && (
            <div className="solid-color-picker">
              <p>Select Solid Color</p>
              <input 
                type="color" 
                value={currentLayer.LayerSoidColor || '#ffffff'} 
                onChange={(e) => handleLayerDataChange(layerIndex-1, 'LayerSoidColor', e.target.value)}
              />
            </div>
          )}
          
          {colorizeType === "gradiant" && (
            <div className="gradient-color-picker">
              <p>Select Gradient Colors</p>
              <div className="gradient-inputs">
                <label>Color 1:
                  <input 
                    type="color" 
                    value={currentLayer.LayerGradientColor1 || '#ffffff'} 
                    onChange={(e) => handleLayerDataChange(layerIndex-1, 'LayerGradientColor1', e.target.value)}
                  />
                </label>
                <label>Color 2:
                  <input 
                    type="color" 
                    value={currentLayer.LayerGradientColor2 || '#000000'} 
                    onChange={(e) => handleLayerDataChange(layerIndex-1, 'LayerGradientColor2', e.target.value)}
                  />
                </label>
                <select
                  value={currentLayer.LayerGradientDirection || 'to right'}
                  onChange={(e) => handleLayerDataChange(layerIndex-1, 'LayerGradientDirection', e.target.value)}
                >
                  <option value="to right">Horizontal</option>
                  <option value="to bottom">Vertical</option>
                  <option value="to bottom right">Diagonal</option>
                </select>
              </div>
            </div>
          )}
          
          {colorizeType === "pattern" && (
            <div className="pattern-selector">
              <p>Select Pattern</p>
              <select
                value={currentLayer.LayerPatternType || 'stripes'}
                onChange={(e) => handleLayerDataChange(layerIndex-1, 'LayerPatternType', e.target.value)}
              >
                <option value="stripes">Stripes</option>
                <option value="polka-dots">Polka Dots</option>
                <option value="checkered">Checkered</option>
              </select>
              <div className="pattern-colors">
                <label>Pattern Color:
                  <input 
                    type="color" 
                    value={currentLayer.LayerPatternColor || '#ff0000'} 
                    onChange={(e) => handleLayerDataChange(layerIndex-1, 'LayerPatternColor', e.target.value)}
                  />
                </label>
                <label>Background Color:
                  <input 
                    type="color" 
                    value={currentLayer.LayerPatternBGColor || '#ffffff'} 
                    onChange={(e) => handleLayerDataChange(layerIndex-1, 'LayerPatternBGColor', e.target.value)}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CakeLayerCustomizeSection