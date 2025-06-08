import React from 'react'
import './CakeLayerCustomizeSection.css'

function CakeLayerCustomizeSection() {
  return (
    <div className='CakeLayerCustomizeSection'>
        <p className='layerTitle'>Layer 01</p>
        <div className="cakeLayerCustomize">
            <div className="cakeLayerCustomize1cloumn">
                <p>Select Layer Flavor</p>
                <select className='CakeSelectComp'>
                    <option value="vanilla">Vanilla</option>
                    <option value="chocolate">Chocolate</option>
                </select>
                <p>Select Layer Height</p>
                <select className='CakeSelectComp'>
                    <option value="tall">Tall</option>
                    <option value="short">Short</option>
                </select>
            </div>
            <div className="cakeLayerCustomize2cloumn">
                <p>Colorize Your Layer As you wish</p>
                <div className="LayerColor">
                    <div className="LayerColorOption">
                        Solid
                    </div>
                </div>
            </div>
            <div className="cakeLayerCustomize3cloumn">

            </div>

        </div>
    </div>
  )
}

export default CakeLayerCustomizeSection