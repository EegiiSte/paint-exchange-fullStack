import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ResponsiveContextProvider } from "./context";
import { NotificationProvider } from "./context/NotificationContext";
import { ProductContexProvider } from "./context/ProductsContext";
import {
  ProfileContextProvider,
  ProfileIconContextProvider,
} from "./context/ProfileContext";
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
          <ProductContexProvider>
            <ProfileContextProvider>
              <ResponsiveContextProvider>
                <App />
              </ResponsiveContextProvider>
            </ProfileContextProvider>
          </ProductContexProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
