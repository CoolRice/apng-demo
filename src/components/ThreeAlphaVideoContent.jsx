import React from "react";
import ThreeAlphaVideoPlayer from "./ThreeAlphaVideoPlayer";

function ThreeAlphaVideoContent() {
  return (
    <div className="video-container">
      {Array.from({ length: 15 }, (_, index) => (
        <ThreeAlphaVideoPlayer key={index} index={index} />
      ))}
    </div>
  );
}

export default ThreeAlphaVideoContent;

