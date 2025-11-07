import React from "react";

function ImageContent() {
  // 生成图片数组
  const images = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="image-container">
      {images.map((i) => (
        <div key={i} className="image-item">
          <img src={`./images/pv${i}.png`} alt={`图片 ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default ImageContent;
