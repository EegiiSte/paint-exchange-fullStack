import { Button, Checkbox, Form, Image, Input, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix";
import { useNotificationContext } from "../../context/NotificationContext";
import { useProfileIconContext } from "../../context/ProfileIconContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import "./SignUp.css";

const { Option } = Select;

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
export const SignUp = () => {
  const { signUp } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();
  const { profileIcons, profilePicUrl, selectProfilePic } =
    useProfileIconContext();

  const [signinLoading, setSigninLoading] = useState(false);
  const { setTheme, theme, textStyle } = useThemeContext();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setSigninLoading(true);
    try {
      // throw new Error("test error");
      const response = await axios.post(
        // "https://fullstack-backend-pm5t.onrender.com/users/sign-up",
        "http://localhost:8080/users/sign-up",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          profilePicUrl: profilePicUrl,
        }
      );

      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data));

      // console.log("SignUp-data", data);
      // console.log("SignUp-data", data.newUser);

      if (data) {
        signUp(data);

        successNotification(
          `Sign Up successfully, Hello ${data.newUser.email}`
        );
        setSigninLoading(false);
        navigate("/");
      } else {
        errorNotification("Sign up failed, please try again");
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

      console.log("SignUpModal-->onFinish ", err);
    }
  };
  return (
    <div className="d-flex align-c flex-direction-c just-c">
      <Header />
      {theme === "light" ? (
        <div style={{ backgroundColor: "#cbdaf0a8" }} />
      ) : (
        <MatrixBG />
      )}
      <div className="signupBox">
        <div
          className="d-flex just-c align-c flex-direction-c "
          style={
            (textStyle,
            {
              height: "60%",
              width: "60%",
            })
          }
        >
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
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "100px",
                paddingBottom: "10px",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Sign Up
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginBottom: "10px",
                  width: "84%",
                }}
              >
                <div>
                  <Image preview={false} height={"80px"} src={profilePicUrl} />
                  <p>Profile Pic :</p>
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
                        style={{ cursor: "pointer" }}
                        height={"60px"}
                        src={profileIcon.url}
                        onClick={() => selectProfilePic(profileIcon.url)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                process.env.NODE_ENV === "development" ? "test13" : ""
              }
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label={
                <span
                  style={{
                    color: theme === "light" ? "black" : "white",
                  }}
                >
                  E-mail
                </span>
              }
              initialValue={
                process.env.NODE_ENV === "development" ? "test13@gmail.com" : ""
              }
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span
                  style={{
                    color: theme === "light" ? "black" : "white",
                  }}
                >
                  Password
                </span>
              }
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
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button loading={signinLoading} type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
