import { QRCode } from "antd";
import React from "react";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix/MatrixBG.js";
import { useThemeContext } from "../../context/ThemeContext";
import "./Home.css";

export const Home = () => {
  const { setTheme, theme } = useThemeContext();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header />
      {theme === "light" ? <div /> : <MatrixBG />}
      <div
        className="padding-top-10"
        zIndex="1"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "start",
          backgroundColor: theme === "light" ? "" : "",
          backgroundImage:
            // "url(https://en.idei.club/uploads/posts/2023-03/thumbs/1679322173_en-idei-club-p-paint-can-design-dizain-krasivo-20.jpg)",
            "url(https://www.platinumpaintingfortworth.com/blog/wp-content/uploads/2022/01/AdobeStock_245457611__1641564239_93239.jpg)",
          // "url()",
          backgroundSize: "100vw",
          paddingTop: "30px",
          paddingLeft: "30px",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <h1
            style={{
              fontSize: "50px",
            }}
          >
            Do you have any left paint in your storage?
          </h1>
        </div>
      </div>
    </div>
  );
};
