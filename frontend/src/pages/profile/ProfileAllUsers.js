import { Avatar, Card, Divider, Flex, Image, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext, useUserContext } from "../../context";

export const ProfileAllUsers = (props) => {
  const { singleUser, allUsersData } = props;

  //   console.log("ProfileProducts-singleUser", singleUser);

  const { theme, textStyle } = useThemeContext();
  const navigate = useNavigate();
  const { currentUser } = useUserContext();

  const [filteredArray, setFilteredArray] = useState(allUsersData);

  const handleInputSearch = (e) => {
    const value = e.target.value.toLowerCase();

    // If search input is empty, set filteredArray to the original allUsersData
    const newUsers = value
      ? allUsersData.filter((user) => user.name.toLowerCase().includes(value))
      : allUsersData;

    setFilteredArray(newUsers);
  };

  return (
    <div>
      <Flex
        vertical
        gap="middle"
        align="center"
        justify="center"
        style={{
          padding: 20,
        }}
      >
        <div className=" d-flex flex-direction-c just-c align-c">
          <Input
            onChange={handleInputSearch}
            placeholder="Search by name"
            style={{
              height: "45px",
            }}
          ></Input>
        </div>
        {filteredArray?.map((user, index) => (
          <Flex
            key={index}
            style={{ cursor: "pointer" }}
            horizental
            align="center"
            justify="start"
            gap="middle"
            onClick={() => navigate(`/profile/${user._id}`)}
          >
            <Avatar src={user.profilePicUrl} />
            <Flex vertical>
              <Flex>{user.name}</Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

/*

<div
            className=" d-flex flex-direction-c just-s-evenly "
            key={index}
            style={{
              ...textStyle,
              border: "1px solid white",
              width: 240,
              height: 320,
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: theme === "light" ? "white" : "",
            }}
          >
            <div
              style={{
                height: "40%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image height={"100%"} src={user.profilePicUrl} />
            </div>
            <div
              className="d-flex align-c just-start"
              // style={{ height: "10%" }}
            ></div>
            <div
              className="d-flex flex-direction-c just-c"
              style={{ height: "30%", overflow: "hidden" }}
            >
              <div className="d-flex flex-direction-c just-c align-c">
                <div
                  style={{
                    width: "80%",

                    justifyContent: "space-between",
                  }}
                  onClick={() => navigate(`/users/${user._id}`)}
                >
                  <p>Name : {user.name}</p>
                  <p>Email : ${user.email}</p>
                </div>
              </div>
            </div>
          </div>*/
