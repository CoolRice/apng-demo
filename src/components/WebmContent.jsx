import React from "react";

function WebmContent() {
  // 生成15个视频
  const videos = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="video-grid-container">
      {videos.map((i) => (
        <div key={i} className="video-grid-item">
          <video
            className="webm-video"
            controls
            loop
            muted
            autoPlay
            playsInline
          >
            <source src={`./webm/p${i}.webm`} type="video/webm" />
            您的浏览器不支持 video 标签。
          </video>
          <div className="video-label">视频 {i + 1}</div>
        </div>
      ))}
    </div>
  );
}

export default WebmContent;
