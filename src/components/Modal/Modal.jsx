import React from 'react';
import './Modal.scss';

const Modal = ({ show, handleClose, handleSignOut }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Logout</h5>
          <button type="button" className="close-button" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>Do you really want to logout?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSignOut}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
