import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { NotificationProvider } from "./context/NotificationContext";
import { ProductContexProvider } from "./context/ProductsContext";
import { ProfileIconContextProvider } from "./context/ProfileIconContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import "./mobileStyle.css";
import "./tabletStyle.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <NotificationProvider>
        <UserProvider>
          <ProfileIconContextProvider>
            <ProductContexProvider>
              <App />
            </ProductContexProvider>
          </ProfileIconContextProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
