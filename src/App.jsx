import React from "react";
import Tabs from "./components/Tabs";
import ImageContent from "./components/ApngContent";
import VideoContent from "./components/AlphaVideoContent";
import WebmContent from "./components/WebmContent";
import ThreeAlphaVideoContent from "./components/ThreeAlphaVideoContent";
import "./App.css";

function App() {
  const tabs = [
    {
      key: "images",
      label: "图片展示",
      content: <ImageContent />,
    },
    {
      key: "video",
      label: "视频播放",
      content: <VideoContent />,
    },
    {
      key: "webm",
      label: "WebM视频",
      content: <WebmContent />,
    },
    {
      key: "three-video",
      label: "Three.js视频",
      content: <ThreeAlphaVideoContent />,
    },
  ];

  return (
    <div className="app">
      <Tabs tabs={tabs} defaultActiveKey="images" />
    </div>
  );
}

export default App;
