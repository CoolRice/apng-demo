import React from "react";
import VideoPlayer from "./AlphaVideoPlayer";

function AlphaVideoContent() {
  return (
    <div className="video-container">
      {Array.from({ length: 15 }, (_, index) => (
        <VideoPlayer key={index} index={index + 1} />
      ))}
    </div>
  );
}

export default AlphaVideoContent;

