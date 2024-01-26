import { Switch } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useNotificationContext } from "../../context/NotificationContext";
import { useProductsContext } from "../../context/ProductsContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import "./Header.css";

export const MobileHeader = () => {
  // console.log(`Header:user --> ${user}`);

  const { currentUser, signOut, userContextLoading } = useUserContext();
  const { successNotification } = useNotificationContext();

  const { setProducts } = useProductsContext();

  const { setTheme, theme, textStyle, backgroundStyle } = useThemeContext();

  console.log("Header", theme);

  const handleLogOut = () => {
    signOut();
    setProducts([]);
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

  if (!userContextLoading && currentUser) {
    return (
      <div
        className="Header box-shadow-gray"
        style={(textStyle, backgroundStyle)}
      >
        <Switch
          checkedChildren="Black Theme"
          unCheckedChildren="Light Theme"
          checked={theme === "dark" ? true : false}
          onChange={handleChange}
          // size="small"
        />

        <div className="Header-Left">
          <Link to="/" style={textStyle}>
            Home
          </Link>
        </div>
        <div className="Header-Right">
          <div className="Header-Right_Item">
            <Link to="/products" style={textStyle}>
              Products
            </Link>
          </div>
        </div>
        <div className="Header-Right">
          <div className="Header-Right_Item">
            <Link to="/notes" style={textStyle}>
              Notes
            </Link>
          </div>
        </div>

        <div className="Header-Right">
          <div className="Header-Right_Item">
            <div style={textStyle}>
              {currentUser.user
                ? currentUser.user.email
                : currentUser.newUser.email}
            </div>
          </div>
        </div>
        <div className="Header-Right">
          <div className="Header-Right_Item">
            <Link onClick={handleLogOut} style={textStyle}>
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="Header box-shadow-gray"
      style={(textStyle, backgroundStyle)}
    >
      <Switch
        checkedChildren="Black Theme"
        unCheckedChildren="Light Theme"
        checked={theme === "dark" ? true : false}
        onChange={handleChange}
        // size="small"
      />
      <div className="Header-Left">
        <Link to="/" style={textStyle}>
          Home
        </Link>
      </div>

      <div className="Header-Right">
        <div className="Header-Right_Item">
          <Link to="/sign-in" style={textStyle}>
            Sign In
          </Link>
        </div>
      </div>

      <div className="Header-Right">
        <div className="Header-Right_Item">
          <Link to="/sign-up" style={textStyle}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
