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
          paddingTop: "30px",
          paddingLeft: "30px",
        }}
      >
        <QRCode
          zIndex="100"
          color={theme === "light" ? "black" : "white"}
          bgColor={theme === "light" ? "white" : "black"}
          value={
            theme === "light"
              ? "https://fullstack-leap-frontend-six.vercel.app"
              : "https://fullstack-leap-frontend-six.vercel.app"
          }
        />
      </div>
    </div>
  );
};

// <div>
//           <MatrixBG />

//           <div
//             zIndex="1"
//             className="padding-top-10"
//             style={{
//               width: "100%",
//               height: "100vh",
//               display: "flex",
//               justifyContent: "center",
//               paddingTop: "30px",
//             }}
//           >
//             <QRCode
//               zIndex="100"
//               color={theme === "light" ? "black" : "white"}
//               bgColor={theme === "light" ? "white" : "black"}
//               value="https://fullstack-leap-frontend-six.vercel.app"
//             />
//           </div>
//         </div>
