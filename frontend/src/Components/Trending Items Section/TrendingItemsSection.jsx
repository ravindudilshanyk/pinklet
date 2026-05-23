import React, { useState } from 'react'
import './TrendingItemsSection.css'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import PinkletItemCard from '../Pinklet Item Card/PinkletItemCard'

function TrendingItemsSection({title,para,Img, ItemType}) {

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    if( startIndex === 0) {
      setStartIndex(0);
    }else {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if( startIndex === 2) {
      setStartIndex(2);
    }else {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className='TrendingItemsSection'>
      <div className="TrendingItemsSectionContainer">
        <div className="TrendingItemSectionLeft">
          <div className="TrendingItemSectionLeftContent">
            <h3>{title}</h3>
            <p>{para}</p>
          </div>
          <div className="TrendingItemSectionNavi">
            <div className="TrendingItemSectionNaviLeft TrendingItemSectionNaviBtn" onClick={handlePrev}>
              <IoIosArrowDropleftCircle />
            </div>
            <div className="TrendingItemSectionNaviRight TrendingItemSectionNaviBtn" onClick={handleNext}>
              <IoIosArrowDroprightCircle />
            </div>
          </div>
        </div>

        <div className="TrendingItemSectionRight">
          <div className="TrendingCardsWrapper">
            <div className={startIndex===0?"PinkletCardVisible":startIndex===1?"PinkletCardHidden":"PinkletCardHidden2"}>
                  <PinkletItemCard Img={Img} ItemType={ItemType}/>
            </div>
            <div className={startIndex===1?"PinkletCardVisible":startIndex===0?"PinkletCardHidden":"PinkletCardHidden"}>
                  <PinkletItemCard Img={Img} ItemType={ItemType}/>
            </div>
            <div className={startIndex===2?"PinkletCardVisible":startIndex===0?"PinkletCardHidden2":"PinkletCardHidden"}>
                  <PinkletItemCard Img={Img} ItemType={ItemType}/>
            </div>
              
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingItemsSection;
