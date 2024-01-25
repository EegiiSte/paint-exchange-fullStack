import { EditOutlined } from "@ant-design/icons";
import { Button, Image, Modal } from "antd";
import React, { useState } from "react";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix";
import { useThemeContext, useUserContext } from "../../context";
import { ProfileEditModal } from "./ProfileEditModal";

const Profile = () => {
  const { theme } = useThemeContext();
  const { currentUser } = useUserContext();
  // console.log("Profile-currentUser", currentUser);

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

  const [editProfilePicModal, setEditProfilePicModal] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(
    currentUser.user.profilePicUrl
  );

  const showModal = () => {
    setEditProfilePicModal(true);
  };

  const handleCancelEditPic = () => {
    setEditProfilePicModal(false);
  };

  const selectProfilePic = (pic) => {
    setProfilePicUrl(pic);
  };

  //state for edit modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className="align-c d-flex "
      style={{
        flexDirection: "column",
        // backgroundColor: theme === "light" ? "#cbdaf0a8" : "#cbdaf0a8",
      }}
    >
      <Header />
      {theme === "light" ? (
        <div style={{ backgroundColor: "#cbdaf0a8" }} />
      ) : (
        <MatrixBG />
      )}
      <div
        className="padding-top-10 "
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <div
          // className="box-shadow-gray"
          style={{
            border: "1px solid white",
            backgroundColor: theme === "light" ? "white" : "#0000007c",
            height: "70vh",
            width: "55%",
            borderRadius: "10px",
            padding: "20px",
            margin: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              //   border: "1px solid red",
              height: "40%",
              width: "100%",
              display: "flex",
              direction: "row",
            }}
          >
            <div
              style={{
                // border: "1px solid black",
                height: "90%",
                width: "40%",
                margin: "1%",
                borderRadius: "5px",
                display: "flex",
                direction: "row",
              }}
            >
              <div
                style={{
                  //   border: "1px solid black",
                  height: "90%",
                  width: "90%",
                  margin: "1%",
                  borderRadius: "5px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  preview={false}
                  height={"100%"}
                  // width={"100%"}
                  style={{
                    borderRadius: "50%",
                    border:
                      theme === "light"
                        ? " 1px solid black"
                        : " 1px solid white",
                  }}
                  src={profilePicUrl}
                />
              </div>
              <Button icon={<EditOutlined />} onClick={showModal} />
            </div>
            <div
              style={{
                border: "1px solid black",
                height: "90%",
                width: "60%",
                margin: "1%",
                borderRadius: "5px",
                display: "flex",
                direction: "row",
              }}
            >
              <div
                style={{
                  //   border: "1px solid pink",
                  height: "90%",
                  width: "96%",
                  margin: "2%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  Name :{" "}
                  {currentUser.user
                    ? currentUser.user.name
                    : currentUser.newUser.name}
                </div>
                <div>
                  Email :{" "}
                  {currentUser.user
                    ? currentUser.user.email
                    : currentUser.newUser.email}
                </div>
                <div>Password : *******</div>
                <div>
                  Phone Number :{" "}
                  {currentUser.user
                    ? currentUser.user.phoneNumber
                    : currentUser.newUser.phoneNumber}
                </div>
                <div>
                  Address :
                  {currentUser.user
                    ? currentUser.user.address
                    : currentUser.newUser.address}
                </div>
              </div>
              <Button icon={<EditOutlined />} onClick={handleOpen} />
            </div>
          </div>
          <div
            style={{
              border: "1px solid  blue",
              borderRadius: "5px",
              height: "60%",
              width: "100%",
            }}
          >
            <div
              style={{
                // border: "1px solid pink",
                height: "90%",
                width: "96%",
                margin: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <div>Your items : 3</div>
              <div>You have : 7 gallons paint</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={editProfilePicModal}
        // onOk={handleOkEditPic}
        onCancel={handleCancelEditPic}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {profileIcons.map((profileIcon) => (
            <div>
              <Image
                preview={false}
                height={"100px"}
                src={profileIcon.url}
                onClick={() => (
                  selectProfilePic(profileIcon.url), handleCancelEditPic()
                )}
              />
            </div>
          ))}
        </div>
      </Modal>
      <ProfileEditModal
        handleClose={handleClose}
        open={open}
        profilePicUrl={profilePicUrl}
        profileIcons={profileIcons}
        setProfilePicUrl={setProfilePicUrl}
        selectProfilePic={selectProfilePic}
      />
    </div>
  );
};

export default Profile;
