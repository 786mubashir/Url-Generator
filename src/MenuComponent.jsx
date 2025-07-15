// MenuComponent.js
import React, { useState } from "react";

const MenuComponent = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    { label: "Home" },
    { label: "Profile" },
    { label: "Settings" },
    { label: "Logout" }
  ];

  const handleMenuClick = (index) => {
    setActiveMenu(index === activeMenu ? null : index);
  };

  return (
    <div>
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${index === activeMenu ? "active" : ""}`}
            onClick={() => handleMenuClick(index)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuComponent;
