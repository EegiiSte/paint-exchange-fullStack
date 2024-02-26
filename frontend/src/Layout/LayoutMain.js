import {
  CopyrightOutlined,
  createFromIconfontCN,
  HomeOutlined,
  InstagramOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProductOutlined,
  SignatureOutlined,
  UserOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Image, Layout, Menu, Popover, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useNotificationContext,
  useProductsContext,
  useResponsiveContext,
  useThemeContext,
  useUserContext,
} from "../context";

export const LayoutMain = (props) => {
  const { currentUser, signOut, userContextLoading } = useUserContext();
  const { setTheme, theme, textStyle, backgroundStyle } = useThemeContext();
  const { mobile, tablet, desktop } = useResponsiveContext();
  const { setProducts } = useProductsContext();
  const { successNotification } = useNotificationContext();

  const [selectedMenusKeys, setSelectedMenusKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [signUpModalShow, setSignUpModalShow] = useState(false);

  useEffect(() => {
    // console.log("location", location);
    if (location) {
      setSelectedMenusKeys([location.pathname]);
    }
  }, [location]);

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });

  const handleLogOut = () => {
    signOut();
    setProducts([]);
    navigate("/");
    successNotification("You have been logged out.");
  };

  const navbarItems = [
    {
      key: "/",
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
    },
  ];

  if (currentUser) {
    navbarItems.push({
      key: "/products",
      label: <Link to="/products">Products</Link>,
      icon: <ProductOutlined />,
    });
    navbarItems.push({
      key: "/profile",
      label: (
        <Link onClick={() => navigate(`/profile/${currentUser.user._id}`)}>
          Profile
        </Link>
      ),
      icon: <UserOutlined />,
    });
    navbarItems.push({
      label: <Link onClick={handleLogOut}>Sign Out</Link>,
      key: "Sign out",
      icon: <LogoutOutlined />,
    });
  } else {
    navbarItems.push({
      label: "Sign in",
      key: "4",
      icon: <LoginOutlined />,
    });

    navbarItems.push({
      label: "Sign Up",
      key: "5",
      icon: <SignatureOutlined />,
    });
  }
  const handleChangeTheme = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  const handleChange = (checked) => {
    checked ? handleChangeTheme("dark") : handleChangeTheme("light");
  };

  return (
    <Layout>
      <Layout.Header
        theme={theme === "light" ? "light" : "dark"}
        className="d-flex align-c"
        style={{
          gap: 15,
          flexWrap: "nowrap",
        }}
      >
        <div style={{ ...textStyle, fontSize: "20px" }}>
          <Image
            preview={false}
            height={"40px"}
            style={{
              borderRadius: "50%",
              border: "1px solid black",
              backgroundColor: theme === "light" ? "whte" : "white",
            }}
            src={
              theme === "light"
                ? "https://firebasestorage.googleapis.com/v0/b/fullstack-leap.appspot.com/o/B98FC9C9-A603-44B7-B4AA-568942F44225.PNG?alt=media&token=d1a6a0ba-d0aa-4848-925a-740a6bf7dfe0"
                : "https://firebasestorage.googleapis.com/v0/b/fullstack-leap.appspot.com/o/4C884CB0-7FA6-49F5-91E2-EF94CE7AD167.PNG?alt=media&token=675700ab-d8b5-430f-b1fa-c175b559889c"
              // ? "https://firebasestorage.googleapis.com/v0/b/fullstack-leap.appspot.com/o/red-logo.jpeg?alt=media&token=d92b73b7-f416-486b-b9cd-897e529bf7b2"
            }
          />
          P2Paint
        </div>
        <div
          className="d-flex align-c gap-15 width-100pr just-space-between"
          style={{
            flexWrap: "nowrap",
          }}
        >
          <Menu
            className="LayoutMenu"
            theme={theme === "light" ? "light" : "dark"}
            mode="horizontal"
            selectedKeys={selectedMenusKeys}
            items={navbarItems}
            style={{ width: "100vw" }}
          />
          <div>
            <Switch
              checkedChildren="Black Theme"
              unCheckedChildren="Light Theme"
              checked={theme === "dark" ? true : false}
              onChange={handleChange}
              // size="small"
            />
          </div>
        </div>
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
      <Layout.Footer
        className="d-flex just-c align-c flex-direction-c"
        style={{ backgroundColor: "lightGray", height: "20px" }}
      >
        <Space>
          <IconFont type="icon-facebook" />
          <IconFont type="icon-twitter" />
          <YoutubeOutlined />
          <InstagramOutlined />
        </Space>
        <div className="d-flex  flex-direction-row">
          <CopyrightOutlined />
          Copyrigth 2024
        </div>
      </Layout.Footer>
    </Layout>
  );
};
