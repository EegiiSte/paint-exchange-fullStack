import React, { useEffect, useRef } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import "./matrixBG.css";

export const MatrixBG = () => {
  const canvasRef = useRef(null);

  const { setTheme, theme } = useThemeContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set the canvas size
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const matrix =
      // "||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||";
      // "っっさわかだゔぁばそせあ";
      "10";
    // "ㄷㅂㅇㅠㄱ라ㅂㄱㅁㅓㅗㅁㅁㅓㄴㅊㅁㅐㅜᇁ";
    // "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const font_size = 10;
    const columns = canvas.width / font_size;
    const drops = Array.from({ length: columns }, () => 1);

    function draw() {
      // Black BG for the canvas
      // Translucent BG to show trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ctx.fillStyle = "#f4427d"; // pink text
      ctx.fillStyle = "#30c37a6c"; // Green text
      ctx.font = font_size + "px arial";

      // Looping over drops
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    const intervalId = setInterval(draw, 35);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <canvas
        ref={canvasRef}
        id="c"
        style={{ display: "block", position: "absolute", top: 0, left: 0 }}
      ></canvas>
    </div>
  );
};
