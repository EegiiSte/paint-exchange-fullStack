import { Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import {
  useProfileContext,
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

  const [singleUserData, setSingleUserData] = useState(currentUser);
  const [singleUserId, setSingleUserId] = useState(id);
  // console.log("ProfilePage-singleUserData ", singleUserData);

  const [loagingUsers, setLoagingUsers] = useState(true);
  // console.log("ProfilePage-loagingUsers ", loagingUsers);

  const { allUsersData } = useProfileContext();

  // const [allUsersData, setAllUsersData] = useState([]);
  console.log("ProfilePage-allUserData ", allUsersData);

  useEffect(() => {
    setLoagingUsers(true);

    const getSingleUserData = async () => {
      try {
        const response = await axios.get(
          // `https://fullstack-backend-pm5t.onrender.com/users/${id}`,
          `http://localhost:8080/users/${singleUserId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        // const usersData = await axios.get(
        //   // `https://fullstack-backend-pm5t.onrender.com/users/`,
        //   "http://localhost:8080/users/",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${currentUser.token}`,
        //     },
        //   }
        // );

        const data = await response.data;
        setSingleUserData(data);
        localStorage.setItem("singleUserDataLocal", JSON.stringify(data));

        // setProfilePicUrl(data.user.profilePicUrl);

        // const allUsersData = await usersData.data;
        // setAllUsersData(allUsersData);
        // localStorage.setItem("allUsers", JSON.stringify(allUsersData));

        // const singleUserDataFiltered = allUsersData.filter((user) =>
        //   user._id.includes(id)
        // );
        // setSingleUserData(singleUserDataFiltered);

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
  }, [singleUserId]);

  // const singleUserDataFiltered = allUsersData.filter((user) =>
  //   user._id.includes(id)
  // );

  // console.log("ProfilePage-singleUser2", singleUserData);

  return (
    <div
      className="align-c d-flex "
      style={{
        flexDirection: "column",
      }}
    >
      <Header />

      <div
        className="padding-top-10  "
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          color: theme === "light" ? "black" : "white",
          // backgroundImage:
          //   // "url(https://www.paintingcontractorsneworleansla.com/cloud/Slideshow/3b.jpg)",
          //   // "url(https://assets-global.website-files.com/5f3ba8af4d346a5337f0d782/604f6599c1ed39f645f71787_footer-back.jpg)",
          //   "url(https://img.freepik.com/premium-photo/top-view-paint-can_23-2149705374.jpg)",
          // // "url(https://img.freepik.com/premium-photo/cans-paints-brushes-yellow-surface_185193-11722.jpg?size=626&ext=jpg)",
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // height: "calc(100vh - 80px)",
          padding: "20px",
        }}
      >
        <Flex
          gap="middle"
          justify="center"
          style={{
            width: "100%",
          }}
        >
          <Flex
            gap="middle"
            vertical
            style={{
              // border: "1px solid black",
              borderRadius: "10px",
              // padding: "20px",
              // width: "50%",
            }}
          >
            <Profile
              id={id}
              loagingUsers={loagingUsers}
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
                setSingleUserId={setSingleUserId}
                singleUserData={singleUserData}
                loagingUsers={loagingUsers}
              />
            </section>
          </Flex>
          <section
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              padding: "20px",
              width: "50%",
              // backdropFilter: "saturate(180%) blur(15px)",
            }}
          >
            {" "}
            <ProfileProducts
              id={id}
              singleUserId={singleUserId}
              singleUserData={singleUserData}
              loagingUsers={loagingUsers}
              setLoagingUsers={setLoagingUsers}
            />
          </section>
        </Flex>
      </div>
    </div>
  );
};

export default ProfilePage;
