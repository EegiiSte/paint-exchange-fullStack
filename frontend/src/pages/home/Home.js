import React from "react";
import { Header } from "../../component";
import { useResponsiveContext } from "../../context";
import { useThemeContext } from "../../context/ThemeContext";
import "./Home.css";

export const Home = () => {
  const { setTheme, theme } = useThemeContext();
  const { mobile, tablet, desktop } = useResponsiveContext();

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
        className=" mainBox"
        zIndex="1"
        style={{
          backgroundImage:
            theme === "light"
              ? "url(https://www.lightson.co.nz/wp-content/uploads/2018/11/ama3-1.jpg)"
              : "url(https://firebasestorage.googleapis.com/v0/b/foodrev-crud.appspot.com/o/homeGray.PNG?alt=media&token=51457bba-f84a-482a-ac0f-514a304d869c)",
          backgroundSize: mobile ? "650px" : "cover",
          backgroundPosition: mobile ? "center" : "",
          backgroundPositionY: mobile ? "0px" : "",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "start",
          backgroundColor: theme === "light" ? "#F6F9FD" : "#BFBFBF",
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
            Welcome to our platform where you can easily exchange leftover
            paints with others and find great deals on quality paints at
            discounted prices. Don't let your unused paints collect dust in the
            garage; sell or exchange them with fellow users and contribute to a
            sustainable community while saving money!
          </h1>
        </div>
      </div>
    </div>
  );
};
