import React, { useState } from "react";
import "./Tabs.css";

function Tabs({ tabs, defaultActiveKey }) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0]?.key);

  const handleTabClick = (key) => {
    setActiveKey(key);
  };

  const activeTab = tabs.find((tab) => tab.key === activeKey);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`tab-item ${activeKey === tab.key ? "tab-item-active" : ""}`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tabs-content">
        {activeTab && activeTab.content}
      </div>
    </div>
  );
}

export default Tabs;

