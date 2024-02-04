import { createContext, useContext, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useUserContext } from "./UserContext";

const ProfileIconContext = createContext();

export const ProfileIconContextProvider = (props) => {
  const { children } = props;
  const { currentUser } = useUserContext();

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
    { name: "painterMan", url: "" },
  ];

  const [profilePicUrl, setProfilePicUrl] = useState();

  const selectProfilePic = (pic) => {
    setProfilePicUrl(pic);
  };

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
