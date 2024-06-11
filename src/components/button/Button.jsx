import React from 'react';
import './Button.css';

const Button = ({ loading, disabled, selected, onClick, onToggleDisable, onToggleSelected,text1,text2,type }) => {
  
  const buttonClass = `button ${type} ${selected ? 'button-selected' : ''}`;
  
  return (
    
      <button
        onClick={onClick}
        disabled={disabled}
        onToggleSelected={onToggleSelected}
        onToggleDisable={onToggleDisable}
        className={buttonClass}
        >{loading ? text1 : text2}
        
      </button>
  
  );
};

export default Button;
