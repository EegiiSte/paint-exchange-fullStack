import React from "react";
import { Header } from "../../component";
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
      <div
        className="padding-top-10 mainBox"
        zIndex="1"
        style={{
          width: "100vw",
          height: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "start",
          backgroundColor: theme === "light" ? "" : "",
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
            Do you have paint?
          </h1>
        </div>
      </div>
    </div>
  );
};
