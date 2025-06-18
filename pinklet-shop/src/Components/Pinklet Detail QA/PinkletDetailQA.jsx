import React, { useState } from "react";
import "./PinkletDetailQA.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function PinkletDetailQA({ title, para }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="PinkletDetailQAContainer">
      <div className={isOpen?"PinkletDetailQAHeaderOpen":"PinkletDetailQAHeader"}>
        <h3>{title}</h3>
        <div className="PinkletDetailIcon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaMinus /> : <FaPlus />}
        </div>
      </div>
      <div
        className={
          isOpen ? "PinkletDetailQAContentOpen" : "PinkletDetailQAContent"
        }
      >
        <p>{para}</p>
      </div>

      <hr />
    </div>
  );
}

export default PinkletDetailQA;
