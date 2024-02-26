import { Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import {
  useProfileContext,
  useResponsiveContext,
  useThemeContext,
  useUserContext,
} from "../../context";
import { Profile } from "./Profile";
import { ProfileAllUsers } from "./ProfileAllUsers";
import { ProfileProducts } from "./ProfileProducts";

const ProfilePage = () => {
  const { id } = useParams();

  const { theme } = useThemeContext();
  const { currentUser } = useUserContext();
  const { mobile, tablet, desktop } = useResponsiveContext();
  const { allUsersData } = useProfileContext();

  const [singleUserData, setSingleUserData] = useState(currentUser);
  console.log("ProfilePag:1-singleUserData ", singleUserData);

  const [selectedUserData, setSelectedUserData] = useState(currentUser);
  // console.log("ProfilePage:2-selectedUserData ", selectedUserData);

  const [singleUserId, setSingleUserId] = useState(id);

  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    setLoadingUsers(true);
    const selectedUser = allUsersData.filter((user) =>
      user._id.includes(singleUserId)
    );
    // console.log("ProfilePage:3-selectedUser ", { user: selectedUser[0] });

    setSelectedUserData({ user: selectedUser[0] });
    setSingleUserData({ user: selectedUser[0] });
    setLoadingUsers(false);
  }, [singleUserId]);

  useEffect(() => {
    setLoadingUsers(true);

    const getSingleUserData = async () => {
      try {
        const response = await axios.get(
          `https://paint-exchange-fullstack-1.onrender.com/users/${singleUserId}`,
          // `http://localhost:8080/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const data = await response.data;
        setSingleUserData(data);
        localStorage.setItem("singleUserDataLocal", JSON.stringify(data));

        setLoadingUsers(false);

        // console.log("ProfilePage-data", data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleUserData();

    return () => {
      getSingleUserData();
    };
  }, [id]);

  return (
    <div
      className="align-c d-flex "
      style={{
        backgroundColor: theme === "light" ? "" : "#2e3134",
        flexDirection: "column",
      }}
    >
      <Header />

      <div
        className="padding-top-10  "
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-evenly",
          color: theme === "light" ? "black" : "white",
          padding: "20px",
        }}
      >
        <Flex
          gap="middle"
          justify="center"
          style={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            width: "100%",
          }}
        >
          <Flex
            gap="middle"
            vertical
            style={{
              // border: "1px solid red",
              borderRadius: "10px",
            }}
          >
            <Profile
              id={id}
              loadingUsers={loadingUsers}
              user={singleUserData}
            />
            <section
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "20px",
                // backdropFilter: "saturate(180%) blur(15px)",
              }}
            >
              <ProfileAllUsers
                setSelectedUserData={setSelectedUserData}
                setSingleUserId={setSingleUserId}
                singleUserData={singleUserData}
                loadingUsers={loadingUsers}
              />
            </section>
          </Flex>
          <section
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              padding: "20px",
              width: mobile ? "90%" : "50%",
              // backdropFilter: "saturate(180%) blur(15px)",
            }}
          >
            {" "}
            <ProfileProducts
              id={id}
              singleUserId={singleUserId}
              singleUserData={singleUserData}
              loadingUsers={loadingUsers}
              setLoadingUsers={setLoadingUsers}
            />
          </section>
        </Flex>
      </div>
    </div>
  );
};

export default ProfilePage;
