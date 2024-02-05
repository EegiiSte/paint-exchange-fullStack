import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import { useThemeContext, useUserContext } from "../../context";
import { Profile } from "./Profile";

const ProfilePage = () => {
  const { id } = useParams();
  // const userId = id;
  const { theme } = useThemeContext();
  const { currentUser } = useUserContext();
  const [singleUserData, setSingleUserData] = useState(null);

  console.log("ProfilePage-id", id);

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

        const data = await response.data;
        setSingleUserData(data);

        console.log("ProfilePage-data", data);
      } catch (error) {
        console.log(error);
      }
      if (currentUser) {
        getSingleUserData();
      }

      return () => {};
    };
  }, [currentUser]);
  console.log("ProfilePage-singleUser", singleUserData);

  return (
    <div
      className="align-c d-flex "
      style={{
        flexDirection: "column",
        backgroundColor: theme === "light" ? "#f8fc03" : "#cbdaf0a8",
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
          backgroundImage:
            // "url(https://www.paintingcontractorsneworleansla.com/cloud/Slideshow/3b.jpg)",
            // "url(https://assets-global.website-files.com/5f3ba8af4d346a5337f0d782/604f6599c1ed39f645f71787_footer-back.jpg)",
            "url(https://img.freepik.com/premium-photo/top-view-paint-can_23-2149705374.jpg)",
          // "url(https://img.freepik.com/premium-photo/cans-paints-brushes-yellow-surface_185193-11722.jpg?size=626&ext=jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "calc(100vh - 80px)",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "98%",
            display: "flex",
            justifyContent: "center",
            // margin: "20px",
            gap: "10px",
          }}
        >
          <section
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              padding: "20px",
              width: "76vw",
            }}
          >
            <Profile user={currentUser} />
          </section>
          <section
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              padding: "20px",
              width: "76vw",
              backdropFilter: "saturate(180%) blur(15px)",
            }}
          ></section>
          <section
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              padding: "20px",
              width: "76vw",
              backdropFilter: "saturate(180%) blur(15px)",
            }}
          ></section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
