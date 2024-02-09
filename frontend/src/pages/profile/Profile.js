import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Modal } from "antd";
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
    <Flex align="start">
      <Flex align="center" justify="center">
        <Flex
          align="center"
          justify="center"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            // height: "100%",
            // // width: "100%",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "100%",
              margin: "1%",
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
                // borderRadius: "20%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                preview={false}
                height={"200px"}
                style={
                  {
                    // borderRadius: "50%",
                    // border:
                    //   theme === "light" ? " 1px solid black" : " 1px solid white",
                  }
                }
                src={user.user?.profilePicUrl}
              />
            </div>
          </div>
          <div
            style={{
              // border: "1px solid black",
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
        </Flex>
      </Flex>
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
    </Flex>
  );
};
