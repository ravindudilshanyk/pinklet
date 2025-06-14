import React from 'react';
import './CustomizerSettingsSection.css';
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";

function CustomizerSettingsSection({ children, title, isOpen, onToggle }) {
  return (
    <div className='CustomizerSettingsSectionContainer'>
      <div className="TitleSection" onClick={onToggle}>
        {title && <h2 className="SettingsTitle">{title}</h2>}
        {isOpen ? 
          <IoIosArrowDropup className='SettingsArrow' /> : 
          <IoIosArrowDropdown className='SettingsArrow' />
        }
      </div>
      <div className={isOpen ? "SettingsSectionOpen" : "SettingsSectionClosed"}>
        {children}
      </div>
    </div>
  );
}

export default CustomizerSettingsSection;