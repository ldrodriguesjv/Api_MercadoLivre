import React from 'react';
import './modal.css';

const Modal=({ isVisible, onClose, children})=>{
    if(!isVisible) return null;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close" onClick={onClose}>X</button>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
};
export default Modal;

