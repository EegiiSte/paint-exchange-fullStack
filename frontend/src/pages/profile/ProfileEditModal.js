import { Button, Checkbox, Form, Image, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "../../component";
import {
  useNotificationContext,
  useThemeContext,
  useUserContext,
} from "../../context";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const ProfileEditModal = (props) => {
  const {
    handleClose,
    open,
    profilePicUrl,
    setProfilePicUrl,
    profileIcons,
    selectProfilePic,
  } = props;

  const { successNotification, errorNotification } = useNotificationContext();
  const [signinLoading, setSigninLoading] = useState(false);
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const { theme } = useThemeContext();
  const { currentUser, updateUser } = useUserContext();

  const [form] = Form.useForm();

  const inputPress = (e) => {
    const { value, name } = e.target;
    setDisabledSubmitButton(value === currentUser.user[name]);
  };

  const onFinish = async (values) => {
    setSigninLoading(true);
    try {
      const response = await axios.put(
        // "https://fullstack-backend-pm5t.onrender.com/users/sign-up",
        "http://localhost:8080/account/changeProfile",
        {
          name: values.name,
          email: currentUser.user.email,
          password: values.password,
          newEmail: values.email,
          newPassword: values.newPassword,
          profilePicUrl: profilePicUrl,
          phoneNumber: values.phoneNumber,
          address: values.address,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data));

      console.log("ProfileEditModal--data", data);

      if (data) {
        successNotification(
          `Edit Profile successfully, Thank you ${data.user.email}`
        );
        setSigninLoading(false);
        updateUser(data);
        handleClose();
      } else {
        errorNotification("Edit Profile failed, please try again");
        setSigninLoading(false);
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        errorNotification(err.response.data);
        setSigninLoading(false);
      } else {
        errorNotification("Unkown error");
        setSigninLoading(false);
      }
    }
  };

  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: "10px",
          }}
        >
          <div>
            <Image preview={false} height={"80px"} src={profilePicUrl} />
            <p>Profile Pic</p>
          </div>
          <div
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "60%",
            }}
          >
            {profileIcons.map((profileIcon) => (
              <div>
                <Image
                  preview={false}
                  height={"60px"}
                  src={profileIcon.url}
                  onClick={() => selectProfilePic(profileIcon.url)}
                />
              </div>
            ))}
          </div>
        </div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: "1",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={
              <span
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Name
              </span>
            }
            // initialValue={"test13"}
            initialValue={
              currentUser.user
                ? currentUser.user.name
                : currentUser.newUser.name
            }
            rules={[
              {
                required: false,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input onChange={inputPress} />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <span
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Current E-mail
              </span>
            }
            initialValue={
              currentUser.user
                ? currentUser.user.email
                : currentUser.newUser.email
            }
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: false,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input disabled={false} onChange={inputPress} />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label={
              <span
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Phone number
              </span>
            }
            // initialValue={"test13"}
            initialValue={
              currentUser.user
                ? currentUser.user.phoneNumber
                : currentUser.newUser.phoneNumber
            }
            rules={[
              {
                required: false,
                message: "Please input your phone number!",
                whitespace: true,
              },
            ]}
          >
            <Input onChange={inputPress} />
          </Form.Item>
          <Form.Item
            name="address"
            label={
              <span
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Address
              </span>
            }
            // initialValue={"test13"}
            initialValue={
              currentUser.user
                ? currentUser.user.address
                : currentUser.newUser.address
            }
            rules={[
              {
                required: false,
                message: "Please input your address!",
                whitespace: true,
              },
            ]}
          >
            <Input onChange={inputPress} />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <span
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Current Password
              </span>
            }
            // initialValue={"12345678aaa$$R"}
            initialValue={
              process.env.NODE_ENV === "development" ? "12345678aaa$$R" : ""
            }
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                simbols: true,
                message: "must included simbols!",
              },
              {
                minlength: 6,
                message: "minimium must include 6 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={
              <span
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                New Password
              </span>
            }
            // initialValue={"12345678aaa$$R"}
            initialValue={
              process.env.NODE_ENV === "development" ? "12345678aaa$$R" : ""
            }
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                simbols: true,
                message: "must included simbols!",
              },
              {
                minlength: 6,
                message: "minimium must include 6 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label={
              <span
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Confirm Password
              </span>
            }
            dependencies={["password"]}
            hasFeedback
            // initialValue={"12345678aaa$$R"}
            initialValue={
              process.env.NODE_ENV === "development" ? "12345678aaa$$R" : ""
            }
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              loading={signinLoading}
              type="primary"
              htmlType="submit"
              block
              style={{ width: "100%" }}
              disabled={disabledSubmitButton}
            >
              Submit
            </Button>
            <Button
              block
              onClick={() => {
                handleClose();
                setDisabledSubmitButton(true);
                setProfilePicUrl(currentUser.user.profilePicUrl);
              }}
              style={{ width: "100%" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
        <div className="d-flex just-s-evenly margin-top-10 gap-10"></div>
      </Modal>
    </div>
  );
};
