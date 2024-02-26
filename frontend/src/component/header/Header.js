import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProductOutlined,
  SignatureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Image, Switch } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useResponsiveContext } from "../../context";
import { useNotificationContext } from "../../context/NotificationContext";
import { useProductsContext } from "../../context/ProductsContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import "./Header.css";

export const Header = () => {
  // console.log(`Header:user --> ${user}`);

  const { currentUser, signOut, userContextLoading } = useUserContext();
  const { successNotification } = useNotificationContext();

  // console.log(`Header: user`, currentUser);

  const { setProducts } = useProductsContext();

  const { setTheme, theme, textStyle, backgroundStyle } = useThemeContext();
  const { mobile, tablet, desktop } = useResponsiveContext();

  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut();
    setProducts([]);
    navigate("/");
    successNotification("You have been logged out.");
  };

  const handleChangeTheme = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  const handleChange = (checked) => {
    checked ? handleChangeTheme("dark") : handleChangeTheme("light");
  };

  if (userContextLoading) {
    return <div>Loading</div>;
  }

  if (!userContextLoading) {
    return (
      <div
        className="Header box-shadow-gray"
        style={(textStyle, backgroundStyle)}
      >
        <div style={{ ...textStyle, fontSize: "20px" }}>
          <Image
            preview={false}
            height={"40px"}
            style={{
              borderRadius: "50%",
              border: "1px solid black",
              backgroundColor: theme === "light" ? "" : "white",
            }}
            src={
              theme === "light"
                ? "https://firebasestorage.googleapis.com/v0/b/fullstack-leap.appspot.com/o/B98FC9C9-A603-44B7-B4AA-568942F44225.PNG?alt=media&token=d1a6a0ba-d0aa-4848-925a-740a6bf7dfe0"
                : "https://firebasestorage.googleapis.com/v0/b/fullstack-leap.appspot.com/o/4C884CB0-7FA6-49F5-91E2-EF94CE7AD167.PNG?alt=media&token=675700ab-d8b5-430f-b1fa-c175b559889c"
            }
          />
          <br />
          P2Paint
        </div>
        <div className="HeaderMenuBox">
          <Flex horizental="true" gap="30px">
            <div className="Header-Left">
              <Link to="/" style={textStyle}>
                {mobile ? <HomeOutlined /> : "Home"}
              </Link>
            </div>
            {currentUser ? (
              <div
                className="HeaderMenuLeft"
                style={(textStyle, backgroundStyle)}
              >
                <div className="Header-Right">
                  <div className="Header-Right_Item">
                    <Link to="/products" style={textStyle}>
                      {mobile ? <ProductOutlined /> : "Products"}
                    </Link>
                  </div>
                </div>

                <div className="Header-Right">
                  <div className="Header-Right_Item">
                    <div
                      onClick={() =>
                        navigate(`/profile/${currentUser.user._id}`)
                      }
                      style={{ ...textStyle, cursor: "pointer" }}
                    >
                      {mobile ? <UserOutlined /> : currentUser.user.email}
                    </div>
                  </div>
                </div>
                <div className="Header-Right">
                  <div className="Header-Right_Item">
                    <Link onClick={handleLogOut} style={textStyle}>
                      {mobile ? <LogoutOutlined /> : " Sign Out"}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="HeaderMenuLeft"
                style={(textStyle, backgroundStyle)}
              >
                <div className="Header-Right">
                  <div className="Header-Right_Item">
                    <Link to="/sign-in" style={textStyle}>
                      {mobile ? <LoginOutlined /> : "Sign In"}
                    </Link>
                  </div>
                </div>

                <div className="Header-Right">
                  <div className="Header-Right_Item">
                    <Link to="/sign-up" style={textStyle}>
                      {mobile ? <SignatureOutlined /> : "Sign Up"}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Flex>

          <Switch
            checkedChildren={mobile ? "" : "Black Theme"}
            unCheckedChildren={mobile ? "" : "Light Theme"}
            checked={theme === "dark" ? true : false}
            onChange={handleChange}
            // size="small"
          />
        </div>
      </div>
    );
  }
};
