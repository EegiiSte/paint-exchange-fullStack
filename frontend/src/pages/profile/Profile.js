import { EditOutlined } from "@ant-design/icons";
import { Button, Image, Modal } from "antd";
import React, { useState } from "react";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix";
import { useThemeContext, useUserContext } from "../../context";
import { useProfileIconContext } from "../../context/ProfileIconContext";
import { ProfileEditModal } from "./ProfileEditModal";

export const Profile = (props) => {
  const { user } = props;

  // console.log("Profile-user", user);
  // console.log("Profile-user.name", user.user?.name);
  // console.log("Profile-user.products", user.user.products);

  const { theme } = useThemeContext();
  const { currentUser } = useUserContext();

  const { profileIcons, profilePicUrl, setProfilePicUrl, selectProfilePic } =
    useProfileIconContext();

  //   selectProfilePic(currentUser.user.profilePicUrl);
  // console.log("Profile-currentUser", currentUser);

  const [editProfilePicModal, setEditProfilePicModal] = useState(false);

  const showModal = () => {
    setEditProfilePicModal(true);
  };

  const handleCancelEditPic = () => {
    setEditProfilePicModal(false);
  };

  //state for edit modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div
        // className="box-shadow-gray"
        style={{
          border: "1px solid black",
          //   backgroundColor: theme === "light" ? "#e4e5e5d5" : "#0000007c",
          //   height: "50%",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "column",
          width: "90%",
          backdropFilter: "saturate(180%) blur(15px)",
        }}
      >
        <div
          style={{
            border: "1px solid red",
            height: "100%",
            // width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "100%",
              margin: "1%",
              borderRadius: "5px",
              display: "flex",
              direction: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "100%",
                margin: "1%",
                borderRadius: "5px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                preview={false}
                // height={"100%"}
                height={"400px"}
                // width={"100%"}
                style={{
                  borderRadius: "50%",
                  border:
                    theme === "light" ? " 1px solid black" : " 1px solid white",
                }}
                src={user.user?.profilePicUrl}
              />
            </div>
          </div>
          <div
            style={{
              border: "1px solid black",
              width: "80%",
              margin: "1%",
              borderRadius: "5px",
              display: "flex",
              direction: "row",
            }}
          >
            <div
              style={{
                //   border: "1px solid pink",
                width: "100%",
                margin: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div>Name : {user.user?.name}</div>
              <div>Email : {user.user?.email}</div>
              <div>Phone Number : {user.user?.phoneNumber}</div>
              <div>Address :{user.user?.address}</div>
            </div>
            {user.user?.email === currentUser.user.email ? (
              <Button icon={<EditOutlined />} onClick={handleOpen} />
            ) : (
              <div />
            )}
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
          {profileIcons.map((profileIcon, index) => (
            <div key={index}>
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
        currentUser={user}
        profilePicUrl={profilePicUrl}
        profileIcons={profileIcons}
        setProfilePicUrl={setProfilePicUrl}
        selectProfilePic={selectProfilePic}
      />
    </div>
  );
};
