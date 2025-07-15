// TabsComponent.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import URLKeeper from "../URLKeeper/URLKeeper";
import UrlEncoderDecoder from "../UrlEncoderDecoder/UrlEncoderDecoder";
import GuidGenerator from "../GuidGenerator/GuidGenerator";
import './TabsComponent.css';

const TabsComponent = () => {
  const { tabIndex } = useParams();  // Get the tab index from the URL
  const [activeTab, setActiveTab] = useState(Number(tabIndex) || 0);
  const navigate = useNavigate();

  const tabs = [
    { label: "URL Keeper", content: <URLKeeper /> },
    { label: "URL Encoder Decoder", content: <UrlEncoderDecoder /> },
    { label: "GUID Generator & Validator", content: <GuidGenerator /> }
  ];

  useEffect(() => {
    if (tabIndex !== undefined) {
      setActiveTab(Number(tabIndex));
    }
  }, [tabIndex]);

  const handleTabChange = (index) => {
    setActiveTab(index);
    navigate(`/tab/${index}`); // Update the URL with the tab index
  };

  return (
    <>
      <ul className="tab-header">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`tab-item ${index === activeTab ? "active" : ""}`}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </>
  );
};

export default TabsComponent;
