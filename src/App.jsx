import React from "react";
import Tabs from "./components/Tabs";
import ImageContent from "./components/ImageContent";
import VideoContent from "./components/VideoContent";
import WebmContent from "./components/WebmContent";
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
  ];

  return (
    <div className="app">
      <Tabs tabs={tabs} defaultActiveKey="images" />
    </div>
  );
}

export default App;
