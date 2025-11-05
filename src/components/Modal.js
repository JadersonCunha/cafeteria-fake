import React from 'react';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-sobre" 
      style={{display: 'flex'}}
      onClick={handleBackdropClick}
    >
      <div className="modal-sobre-content">
        <button 
          className="btn" 
          style={{float: 'right', marginBottom: '16px'}}
          onClick={onClose}
        >
          Fechar
        </button>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;