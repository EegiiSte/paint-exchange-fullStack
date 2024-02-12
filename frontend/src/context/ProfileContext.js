import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const ProfileContext = createContext();

export const ProfileContextProvider = (props) => {
  const { children } = props;
  const { currentUser } = useUserContext();

  const [selectedUserId, setSelectedUserId] = useState(currentUser?.user?._id);
  // console.log("ProfileContextProvider-selectedUserId ", selectedUserId);

  const [singleUserData, setSingleUserData] = useState({});
  // console.log("ProfileContextProvider-singleUserData ", singleUserData);

  const [loagingUsers, setLoagingUsers] = useState(true);
  // console.log("ProfileContextProvider-loagingUsers ", loagingUsers);

  const [allUsersData, setAllUsersData] = useState([]);
  // console.log("ProfileContextProvider-allUserData ", allUsersData);

  useEffect(() => {
    setLoagingUsers(true);
    const getSingleUserData = async () => {
      try {
        const response = await axios.get(
          // `https://fullstack-backend-pm5t.onrender.com/users/${id}`,
          `http://localhost:8080/users/${selectedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const usersData = await axios.get(
          // `https://fullstack-backend-pm5t.onrender.com/users/`,
          "http://localhost:8080/users/",
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const data = await response.data;
        setSingleUserData(data);
        localStorage.setItem("singleUserDataLocal", JSON.stringify(data));

        // setProfilePicUrl(data.user.profilePicUrl);

        const allUsersData = await usersData.data;
        setAllUsersData(allUsersData);
        localStorage.setItem("allUsers", JSON.stringify(allUsersData));

        setLoagingUsers(false);

        // console.log("ProfilePage-data", data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleUserData();

    return () => {
      getSingleUserData();
    };
  }, [selectedUserId]);

  // console.log("ProfilePage-singleUser2", singleUserData);

  return (
    <ProfileContext.Provider
      value={{
        setSelectedUserId,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
