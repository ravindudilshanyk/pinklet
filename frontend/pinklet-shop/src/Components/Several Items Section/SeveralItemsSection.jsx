import React from 'react'
import './SeveralItemsSection.css'
import HorizontalItemSlider from '../Horizontal Item Slider/HorizontalItemSlider'


function SeveralItemsSection({title,para,items,ItemType,watchImg}) {
  return (
    <div className='SeveralItemsSectionContainer'>
        <h2>{title}</h2>
        <p className='SeveralItemsSectionPara'>{para}</p>
        <HorizontalItemSlider items={items} watchImg={watchImg} ItemType={ItemType}/>
    </div>
  )
}


export default SeveralItemsSection