import { Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import { useThemeContext, useUserContext } from "../../context";
import { useProfileIconContext } from "../../context/ProfileIconContext";
import { Profile } from "./Profile";
import { ProfileAllUsers } from "./ProfileAllUsers";
import { ProfileProducts } from "./ProfileProducts";

const ProfilePage = () => {
  const { id } = useParams();

  const { theme } = useThemeContext();
  const { currentUser } = useUserContext();

  const [singleUserData, setSingleUserData] = useState({});

  const { setProfilePicUrl } = useProfileIconContext();

  // console.log("ProfilePage-singleUserData.user", singleUserData.user);
  // console.log(
  //   "ProfilePage-singleUserData.singleUser",
  //   singleUserData?.singleUser
  // );
  // console.log("ProfilePage-singleUserData", singleUserData);
  // console.log("ProfilePage-singleUserData.products", singleUserData?.products);
  // console.log("ProfilePage-id", id);

  // const singleUser = singleUserData;
  // const singleData = singleUserData?.user?.products;
  // console.log("ProfilePage-singleUser", singleUser);
  // console.log("ProfilePage-singleData", singleData);

  const [allUsersData, setAllUsersData] = useState([]);
  console.log("ProfilePage-allUserData ", allUsersData);

  useEffect(() => {
    const getSingleUserData = async () => {
      try {
        const response = await axios.get(
          // `https://fullstack-backend-pm5t.onrender.com/users/${id}`,
          `http://localhost:8080/users/${id}`,
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
        const allUsersData = await usersData.data;
        setSingleUserData(data);
        setAllUsersData(allUsersData);
        setProfilePicUrl(data.user.profilePicUrl);

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

  // console.log("ProfilePage-singleUser", singleUserData);

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
            <Profile user={singleUserData} />
            <section
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "20px",
                // backdropFilter: "saturate(180%) blur(15px)",
              }}
            >
              <ProfileAllUsers
                allUsersData={allUsersData}
                singleUser={singleUserData}
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
            <ProfileProducts singleUser={singleUserData} />
          </section>
        </Flex>
      </div>
    </div>
  );
};

export default ProfilePage;
