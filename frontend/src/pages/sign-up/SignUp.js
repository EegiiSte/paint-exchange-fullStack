import { Button, Checkbox, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component";
import { useResponsiveContext } from "../../context";
import { useNotificationContext } from "../../context/NotificationContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import { uploadImage } from "../../utils";
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
  const { mobile, tablet, desktop } = useResponsiveContext();

  // console.log("SugnUp: signUp", signUp);

  const [signinLoading, setSigninLoading] = useState(false);
  const { setTheme, theme, textStyle } = useThemeContext();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [file, setFile] = useState();

  const onFinish = async (values) => {
    setSigninLoading(true);

    try {
      // throw new Error("test error");
      if (!file) {
        errorNotification("Please choose a profile image");
        setSigninLoading(false);
      }
      const imageUrl = await uploadImage(file);

      const response = await axios.post(
        "https://paint-exchange-fullstack-1.onrender.com/users/sign-up",
        // "http://localhost:8080/users/sign-up",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          profilePicUrl: imageUrl,
        }
      );

      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data));

      console.log("SignUp-data", data);

      if (data) {
        signUp(data);

        successNotification(`Sign Up successfully, Hello ${data.user.email}`);
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
        // errorNotification("Unkown error");
        setSigninLoading(false);
      }

      console.log("SignUpModal-->onFinish ", err);
    }
  };
  return (
    <div className="d-flex align-c flex-direction-c just-c">
      <Header />
      <div
        className="signupBox"
        style={{
          backgroundImage:
            theme === "light"
              ? "url(https://romandecoratingproducts.com/wp-content/uploads/2021/01/Paint-Painting-Wall-1024x445.jpeg)"
              : "url(https://firebasestorage.googleapis.com/v0/b/foodrev-crud.appspot.com/o/SignUpGray.PNG?alt=media&token=f79a659b-40c9-4943-a280-a5895c2bbe6b)",

          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="d-flex just-c align-c flex-direction-c "
          style={
            (textStyle,
            {
              height: mobile ? "100%" : "60%",
              width: mobile ? "100%" : "60%",
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
                paddingTop: mobile ? "0px" : "100px",
                paddingBottom: "10px",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Sign Up
            </h1>
            <Form.Item
              label={
                <span
                  style={{
                    color: theme === "light" ? "black" : "white",
                  }}
                >
                  Profile Picture
                </span>
              }
              name="image"
              style={{
                color: theme === "light" ? "black" : "white",
              }}
            >
              <input
                name="Image"
                onChange={handleFileChange}
                placeholder="choose file"
                type="file"
              ></input>
            </Form.Item>
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
