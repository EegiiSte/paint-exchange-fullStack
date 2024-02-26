import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const ProfileContext = createContext();

export const ProfileContextProvider = (props) => {
  const { children } = props;
  const { currentUser } = useUserContext();

  const [allUsersData, setAllUsersData] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);

  // console.log("ProfileContextProvider-allUserData ", allUsersData);

  useEffect(() => {
    setLoadingUsers(true);
    const getUsersData = async () => {
      try {
        const usersData = await axios.get(
          `https://paint-exchange-fullstack-1.onrender.com/users/`,
          // "http://localhost:8080/users/",
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const allUsersData = await usersData.data;
        setAllUsersData(allUsersData);

        setLoadingUsers(false);

        // console.log("ProfilePage-data", data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersData();

    return () => {
      getUsersData();
    };
  }, [currentUser]);

  const Update_Profile = async (updatedUser) => {
    const updatedUsers = allUsersData.map((user) => {
      if (user._id === updatedUser._id) {
        return updatedUser;
      } else {
        return user;
      }
    });
    setAllUsersData(updatedUsers);
  };

  // console.log("ProfilePage-singleUser2", singleUserData);

  return (
    <ProfileContext.Provider
      value={{
        allUsersData,
        Update_Profile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
