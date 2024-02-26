import { Avatar, Card, Divider, Flex, Image, Input, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext, useUserContext } from "../../context";
import { useProfileContext } from "../../context/ProfileContext";

export const ProfileAllUsers = (props) => {
  const { loagingUsers, setSingleUserId } = props;

  //   console.log("ProfileProducts-singleUser", singleUser);
  const navigate = useNavigate();

  const { theme, textStyle } = useThemeContext();
  const { currentUser } = useUserContext();
  const { allUsersData } = useProfileContext();
  // console.log("ProfileAllUsers-allUserData ", allUsersData);

  const [filteredUsers, setFilteredUsers] = useState(allUsersData);

  const [searchUserValue, setSearchUserValue] = useState("");

  const handleInputSearch = (e) => {
    const value = e.target.value;

    setSearchUserValue(value);
  };

  useEffect(() => {
    const newUsers = allUsersData.filter((user) =>
      user.name.toLowerCase().includes(searchUserValue.toLowerCase())
    );

    setFilteredUsers(newUsers);
  }, [searchUserValue, currentUser]);

  return (
    <div>
      <Flex align="center" justify="center">
        <Flex
          vertical
          gap="middle"
          align="start"
          justify="start"
          style={{
            padding: 20,
          }}
        >
          <Flex>
            <Input
              onChange={handleInputSearch}
              value={searchUserValue}
              placeholder="Search by name"
              style={{
                height: "45px",
              }}
            />
          </Flex>
          <Flex
            overflow="hidden"
            scroll="true"
            vertical
            gap="middle"
            align="start"
            justify="start"
          >
            {filteredUsers.map((user, index) => (
              <Skeleton
                key={index}
                loading={loagingUsers}
                avatar
                active
                style={{}}
              >
                <Flex
                  key={index}
                  style={{
                    cursor: "pointer",
                    // display:
                    //   singleUserData?.user?._id === user._id ? "none" : "flex",
                  }}
                  horizental="true"
                  align="center"
                  justify="start"
                  gap="middle"
                  onClick={() => setSingleUserId(user._id)}
                  // onClick={() => navigate(`/profile/${user._id}`)}
                >
                  <Avatar src={user.profilePicUrl} />
                  <Flex vertical>
                    <Flex>{user.name}</Flex>
                  </Flex>
                </Flex>
              </Skeleton>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};
