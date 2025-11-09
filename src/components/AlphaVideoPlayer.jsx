import React, { useEffect, useRef, useState } from "react";
import { yyEva } from "yyeva";

function AlphaVideoPlayer({ index }) {
  const containerRef = useRef(null);
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    let player = null;
    const initVideo = async () => {
      if (!containerRef.current) return;
        // 创建yyEva实例
        player = await yyEva({
          container: containerRef.current,
          videoUrl: `./images/car${index}.mp4`,
          "alphaDirection": "right",
          // videoUrl: `./images/p${index}.mp4`,
          loop: true,
          autoplay: true,
          renderType: "webgpu",
        });

        videoPlayerRef.current = player;
        console.log(`视频播放器 ${index} 播放成功`, player);
    };

    initVideo();

    // 清理函数
    return () => {
      if (videoPlayerRef.current) {
        try {
          videoPlayerRef.current.destroy();
        } catch (err) {
          console.error(`销毁视频播放器 ${index} 实例失败:`, err);
        }
        videoPlayerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="video-wrapper">
        <div ref={containerRef} className="video-canvas"></div>
    </div>
  );
}

export default AlphaVideoPlayer;

