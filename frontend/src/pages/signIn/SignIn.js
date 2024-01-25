import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix";
import { useNotificationContext } from "../../context/NotificationContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";

export const SignIn = (props) => {
  const { signIn } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();
  const { setTheme, theme, textStyle, backgroundStyle } = useThemeContext();

  const [signinLoading, setSigninLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setSigninLoading(true);
    try {
      // throw new Error("test error");
      const response = await axios.post(
        // "https://fullstack-backend-pm5t.onrender.com/users/sign-in",
        "http://localhost:8080/users/sign-in",
        {
          email: values.email,
          password: values.password,
        }
      );

      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data));
      // console.log("SignIn-data", data);
      // console.log("SignIn-data.user", data.user);

      if (data) {
        console.log("SignIn", data.user);

        signIn(data);

        successNotification(`Sign in successfully`);

        navigate("/");

        setSigninLoading(false);
      } else {
        errorNotification("Sign in failed, please try again");
        setSigninLoading(false);
      }
    } catch (err) {
      errorNotification(err?.message);
      setSigninLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setSigninLoading(false);
  };

  return (
    <div className="d-flex align-c flex-direction-c just-c ">
      <Header />
      {theme === "light" ? (
        <div style={{ backgroundColor: "#cbdaf0a8" }} />
      ) : (
        <MatrixBG />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "calc(100vh - 80px)",
        }}
      >
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
          <h1 style={textStyle}>Sign in</h1>
          <Form
            className="padding-top-10"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={<span style={textStyle}>Email</span>}
              name="email"
              // initialValue={"test9@gmail.com"}
              initialValue={
                process.env.NODE_ENV === "development" ? "test9@gmail.com" : ""
              }
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<span style={textStyle}>Password</span>}
              name="password"
              // initialValue={"12345678aaa$$R"}
              initialValue={
                process.env.NODE_ENV === "development" ? "12345678aaa$$R" : ""
              }
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox style={textStyle}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button loading={signinLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
