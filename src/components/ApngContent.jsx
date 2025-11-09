import React from "react";

function ApngContent() {
  // 生成图片数组
  const images = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="image-container">
      {images.map((i) => (
        <div key={i} className="image-item">
          <img src={`./images/p_width_1500/${i}.png`} alt={`图片 ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default ApngContent;
