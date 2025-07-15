// HeaderComponent.js
import React , { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Importing icon for menu
import './HeaderComponent.css'; // Custom CSS for styling
import DrawerComponent from "../DrawerComponent/DrawerComponent";


const HeaderComponent = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    
  return (
    <header className="header">
      <div className="menu-icon">
        <FaBars  onClick={toggleDrawer}/>
        <DrawerComponent isOpen={drawerOpen} onClose={toggleDrawer} />

      </div>
      <div className="title">
      DevTools Pro <span className="version">v1.0.1</span>
      </div>
      <div className="options">
        <a href="#" className="option-link">Help</a>
        <a href="#" className="option-link">Request Feature</a>
      </div>
    </header>
    
  );
};

export default HeaderComponent;
