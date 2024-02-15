import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { isTokenExpired } from "../utils";
import { useNotificationContext } from "./NotificationContext";

const userContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState(null);
  const [singleUser, setSingleUser] = useState(null);

  console.log("UserProvider-currentUser ", currentUser);
  // console.log("UserProvider-singleUser ", singleUser);

  const [userContextLoading, setUserContextLoading] = useState(true);
  const { errorNotification } = useNotificationContext();
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      setCurrentUser(user);

      if (!user) {
        // navigate("/sign-in");
        setUserContextLoading(false);
        return;
      }
      if (token && !isTokenExpired(token)) {
        setCurrentUser(user);
        setUserContextLoading(false);
      } else {
        signOut();
        errorNotification("Session expired. Please sign in again.");
        setUserContextLoading(false);
      }
    } catch (error) {
      errorNotification(error?.message);
    }
  }, []);

  const signUp = (userInfo) => {
    setCurrentUser(userInfo);
  };
  const signIn = (userInfo) => {
    setCurrentUser(userInfo);
  };
  const updateUser = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <userContext.Provider
      value={{
        // getSingleUser,
        singleUser,
        currentUser,
        signOut,
        signIn,
        signUp,
        updateUser,
        userContextLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
