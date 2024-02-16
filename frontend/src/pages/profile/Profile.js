import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Modal, Skeleton } from "antd";
import React, { useState } from "react";
import {
  useProfileContext,
  useThemeContext,
  useUserContext,
} from "../../context";
import { ProfileEditModal } from "./ProfileEditModal";

export const Profile = (props) => {
  const { user, loagingUsers } = props;

  // console.log("Profile-user", user);

  const { theme } = useThemeContext();
  const { currentUser } = useUserContext();

  const { allUsersData } = useProfileContext();

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
      <Skeleton loading={loagingUsers} avatar active>
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

        <ProfileEditModal
          handleClose={handleClose}
          open={open}
          currentUser={user}
        />
      </Skeleton>
    </Flex>
  );
};
