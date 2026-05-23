import React from "react";
import "./PinkletItemCard.css";
import { FaStoreAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdStarRate } from "react-icons/md";

function PinkletItemCard({ Img, ItemType }) {
  return (
    <div className="PinkletItemCardContainer">
      <div className="PinkletItemImg">
        <div className="trandingSection">Trending</div>
        <img src={Img} alt="Pinklet Item" />
      </div>
      <div className="PinkletItemCardContent">
        <div className="PinkletCardPricing">
          <hr />
          <p>from Rs. 5800/=</p>
          <hr />
        </div>
        <p className="PinkletCardTitle">Watch</p>
        <div className="PinkletCardTagContainer">
          <div className="PinkletCardTagSection">
            <div className="PinkletCardTag">Tag 1</div>
            <div className="PinkletCardTag">Tag 2</div>
            <div className="PinkletCardTag">Tag 3</div>
          </div>
          <div className="PinkletCardTag">{">"}</div>
        </div>
        {ItemType === "item" && (
          <div className="ItemMartketHouse">
            <FaStoreAlt />
            <p>Diamond Brothers</p>
          </div>
        )}

        <div className="PinkletCardDeliverRateSection">
          <div className="PinkletCardDelivery">
            <TbTruckDelivery />
            {ItemType === "cake" ? (
              <p>Galle only</p>
            ):(
              <p>Island wide</p>
            )}
            
          </div>
          <div className="PinkletCardRate">
            <MdStarRate />
            <p>4.5</p>
            <p>{"(" + 120 + " reviews)"}</p>
          </div>
        </div>
        <div className="PinkletAddToPackage">
          <div className="PinkletAddToPackageBtn">Add to Gift Package</div>
        </div>
      </div>
    </div>
  );
}

export default PinkletItemCard;
