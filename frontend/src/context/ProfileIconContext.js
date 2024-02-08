import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const ProfileIconContext = createContext();

export const ProfileIconContextProvider = (props) => {
  const { children } = props;
  const { currentUser } = useUserContext();
  // console.log("ProfileIconContextProvider- currentUser", currentUser);

  const profileIcons = [
    {
      name: "painterMan",
      url: "https://cdn-icons-png.flaticon.com/512/4315/4315116.png",
    },
    {
      name: "Merlin",
      url: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/marilyn_monroe_artist_avatar-1024.png",
    },
    {
      name: "artist",
      url: "https://cdn-icons-png.flaticon.com/512/6371/6371098.png",
    },
    {
      name: "einstein",
      url: "https://cdn-icons-png.flaticon.com/512/7314/7314372.png",
    },
    {
      name: "munhjin",
      url: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
    },
    {
      name: "facelessWomen",
      url: "https://cdn-icons-png.flaticon.com/512/4060/4060136.png",
    },
    {
      name: "painterMan",
      url: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706745600&semt=ais",
    },
  ];

  const [profilePicUrl, setProfilePicUrl] = useState("");

  const selectProfilePic = (pic) => {
    setProfilePicUrl(pic);
  };

  useEffect(() => {
    // setProfilePicUrl("");
  }, []);

  return (
    <ProfileIconContext.Provider
      value={{
        profileIcons,
        profilePicUrl,
        setProfilePicUrl,
        selectProfilePic,
      }}
    >
      {children}
    </ProfileIconContext.Provider>
  );
};

export const useProfileIconContext = () => {
  return useContext(ProfileIconContext);
};
