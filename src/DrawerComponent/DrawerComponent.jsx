// DrawerComponent.js
import React from 'react';
import './DrawerComponent.css';
import { useNavigate } from 'react-router-dom';

const DrawerComponent = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <ul>
          <li onClick={() => { navigate("/tab/0"); onClose(); }}>URL Keeper</li>
          <li onClick={() => { navigate("/tab/1"); onClose(); }}>URL Encoder Decoder</li>
          <li onClick={() => { navigate("/tab/2"); onClose(); }}>GUID Generator & Validator</li>
        </ul>
      </div>
    </div>
  );
};

export default DrawerComponent;
