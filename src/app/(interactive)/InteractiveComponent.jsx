"use client";

import React, { useEffect, useRef } from "react";

function ActionButton({ width = 400, height = 500 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const fireColors = [
      { r: 255, g: 140, b: 0 },
      { r: 255, g: 165, b: 0 },
      { r: 255, g: 69, b: 0 },
      { r: 255, g: 200, b: 100 },
      { r: 200, g: 50, b: 0 },
      { r: 255, g: 180, b: 50 },
    ];

    const numBlobs = 50;
    const w = width;
    const h = height;

    // clear
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < numBlobs; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const radius = 100 + Math.random() * 40;

      const color = fireColors[Math.floor(Math.random() * fireColors.length)];
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    // blur the canvas
    ctx.filter = "blur(8px)";
    // draw the current canvas onto itself to apply the blur
    const temp = document.createElement("canvas");
    temp.width = canvas.width;
    temp.height = canvas.height;
    const tctx = temp.getContext("2d");
    tctx.scale(dpr, dpr);
    tctx.drawImage(canvas, 0, 0, w, h);
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(temp, 0, 0, w, h);
    ctx.filter = "none";

    // add grain
    try {
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 18;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);
    } catch (err) {
      // if CORS or security prevents getImageData, silently skip grain
      // (shouldn't happen for same-origin canvas)
      // console.warn(err);
    }
  }, [width, height]);

  return (
    <div
      style={{ position: "relative", width, height, display: "inline-block" }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          borderRadius: 5,
        }}
      />
    </div>
  );
}

export default ActionButton;
