import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState(null);
  const [singleUser, setSingleUser] = useState(null);

  // console.log("UserProvider-currentUser ", currentUser);
  // console.log("UserProvider-singleUser ", singleUser);

  const [userContextLoading, setUserContextLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setUserContextLoading(false);
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

  // const getSingleUser = async (id) => {
  //   const response = await axios.get(
  //     // "https://fullstack-backend-pm5t.onrender.com/products",
  //     `http://localhost:8080/users/${id}`
  //   );

  //   const data = await response.data;

  //   return data.user.email;
  // };

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
