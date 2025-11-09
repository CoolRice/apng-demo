import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeAlphaVideoPlayer({ index, videoUrl, loop = true, autoplay = true }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let videoTexture = null;
    let material = null;
    let geometry = null;
    let mesh = null;

    // 创建视频元素
    const video = document.createElement("video");
    video.src = videoUrl || `./images/p_width_3000_${index}.mp4`;
    video.loop = loop;
    video.muted = true; // 必须静音才能自动播放
    video.crossOrigin = "anonymous";
    videoRef.current = video;

    // 创建场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 创建相机
    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 300;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 等待视频加载完成后再创建纹理和开始渲染
    const initVideoTexture = () => {
      // 创建视频纹理
      videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;

      // 自定义着色器材质
      material = new THREE.ShaderMaterial({
        uniforms: {
          videoTexture: { value: videoTexture }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D videoTexture;
          varying vec2 vUv;

          void main() {
            // 先读取右边部分（x >= 0.5）的Alpha信息
            vec2 alphaUv = vec2(0.5 + vUv.x * 0.5, vUv.y);
            float alpha = texture2D(videoTexture, alphaUv).r;

            // 如果alpha值很小（接近透明），直接返回透明，避免采样RGB
            if (alpha < 0.01) {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
              return;
            }

            // 只有在不透明时才读取左边部分（x < 0.5）的RGB信息
            vec2 rgbUv = vec2(vUv.x * 0.5, vUv.y);
            vec3 rgb = texture2D(videoTexture, rgbUv).rgb;

            // 组合成RGBA
            gl_FragColor = vec4(rgb, alpha);
          }
        `,
        transparent: true
      });

      // 创建平面几何体
      geometry = new THREE.PlaneGeometry(2, 2);
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // 渲染循环
      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);
        if (videoTexture && video.readyState >= 2) {
          videoTexture.needsUpdate = true;
        }
        renderer.render(scene, camera);
      };
      animate();

      // 播放视频
      if (autoplay) {
        video.play().catch(err => {
          console.error("视频自动播放失败:", err);
        });
      }
    };

    // 监听视频加载完成事件
    const handleLoadedMetadata = () => {
      initVideoTexture();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // 如果视频已经加载完成，立即初始化
    if (video.readyState >= 1) {
      initVideoTexture();
    } else {
      // 开始加载视频
      video.load();
    }

    // 清理函数
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (video) {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.pause();
        video.src = "";
      }
      if (videoTexture) {
        videoTexture.dispose();
      }
      if (material) {
        material.dispose();
      }
      if (geometry) {
        geometry.dispose();
      }
      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, [index, videoUrl, loop, autoplay]);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && rendererRef.current) {
        const width = containerRef.current.clientWidth || 400;
        const height = containerRef.current.clientHeight || 300;
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="three-video-wrapper">
      <div ref={containerRef} className="three-video-canvas"></div>
    </div>
  );
}

export default ThreeAlphaVideoPlayer;

