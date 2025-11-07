import React, { useEffect, useRef, useState } from "react";
import { yyEva } from "yyeva";

function VideoContent() {
  const containerRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let player = null;

    const initVideo = async () => {
      if (!containerRef.current) return;

      try {
        // 创建yyEva实例
        player = await yyEva({
          container: containerRef.current,
          videoUrl: "./images/output_joined.mp4",
          loop: true,
          autoplay: true,
          renderType: "webgl",
        });

        videoPlayerRef.current = player;
        console.log("视频播放成功", player);
      } catch (err) {
        console.error("视频加载失败:", err);
        setError("视频加载失败，请检查视频文件路径");
      }
    };

    initVideo();

    // 清理函数
    return () => {
      if (videoPlayerRef.current) {
        try {
          videoPlayerRef.current.destroy();
        } catch (err) {
          console.error("销毁视频实例失败:", err);
        }
        videoPlayerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="video-container">
      <div className="video-wrapper">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div ref={containerRef} className="video-canvas"></div>
        )}
      </div>
    </div>
  );
}

export default VideoContent;

