import React from 'react'
import './SingleOptionSelector.css'

function SingleOptionSelector({options,handleOptionChange,option}) {

  return (
    <div className='SingleOptionSelectorContainer'>
      {options.map((opt, index) => (
        <div className={option===opt?"optionContainerSelected":"optionContainer"} key={index} onClick={()=>handleOptionChange(opt)}>
          {opt}
        </div>
      ))}
    </div>
  )
}

export default SingleOptionSelector