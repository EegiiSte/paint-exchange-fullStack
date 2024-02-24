import { Avatar, Button, Card, Flex, Form } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../../../../context/ProductsContext";
import { useThemeContext } from "../../../../context/ThemeContext";
import { useUserContext } from "../../../../context/UserContext";

import { SendOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Typography from "antd/es/typography/Typography";
import axios from "axios";
import { useNotificationContext } from "../../../../context";
import { ReplyEditComment } from "./ReplyEditComment";

const { Meta } = Card;

export const ReplyComment = (props) => {
  const { comment, replyComments, setInputReplyComment, inputReplyComment } =
    props;
  const { id } = useParams();

  const { products, productContextLoading, Update_Product } =
    useProductsContext();
  const { currentUser } = useUserContext();
  const { theme } = useThemeContext();
  const { successNotification, errorNotification } = useNotificationContext();

  // console.log("Product-->products", products);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const createReplyComment = async (values, form) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `hhttps://paint-exchange-fullstack-1.onrender.com/products/${id}/comments/${comment._id}`,
        // `http://localhost:8080/products/${id}/comments/${comment._id}`,
        { replyComment: values.replyComment },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;
      console.log("createReplyComment: data", data);

      Update_Product(data.updatedProduct);
      successNotification("Added reply comment successfully");
      setInputReplyComment(false);
      setLoading(false);
      form.setFieldsValue({ replyComment: "" });
    } catch (error) {
      console.log(error);
      errorNotification(error.message);
    }
  };

  return (
    <Flex
      vertical="true"
      gap="small"
      align="end"
      style={{
        width: "100%",
      }}
    >
      {inputReplyComment === true ? (
        <Flex
          vertical="true"
          gap="small"
          align="end"
          style={{
            width: "90%",
          }}
        >
          <Flex
            vertical="true"
            gap="small"
            align="start"
            style={{
              // paddingRight: "10px",
              width: "100%",
            }}
          >
            <Typography.Title level={5} style={{ marginBottom: 3 }}>
              Add Reply
            </Typography.Title>
            <Form
              form={form}
              name="trigger"
              onFinish={(values) => createReplyComment(values, form)}
              onFinishFailed={(errorInfo) => {
                console.log(errorInfo);
              }}
              style={{
                width: "100%",
                // maxWidth: 600,
              }}
              layout="horizental"
              autoComplete="off"
            >
              <Flex
                horizental="true"
                gap="small"
                // justify={"center"}
                // align={"center"}
                style={{ paddingRight: "0px" }}
              >
                <Form.Item
                  align={"center"}
                  justify={"center"}
                  layout="horizental"
                  name="replyComment"
                  rules={[{ required: true, message: "Required" }]}
                  style={{
                    width: "80%",
                  }}
                >
                  <TextArea />
                </Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  size="large"
                >
                  Send
                </Button>
              </Flex>
            </Form>
          </Flex>
        </Flex>
      ) : (
        <div />
      )}
      {replyComments.map((comment, index) => (
        <Flex
          key={index}
          vertical="true"
          gap="middle"
          style={{
            // border: "1px solid lightgray",
            // backgroundColor: "#eef0f0d5",
            borderRadius: "10px",
            padding: "5px 10px",
            width: "90%",
          }}
        >
          <Flex
            key={index}
            horizental="true"
            gap="middle"
            style={{
              // border: "1px solid lightgray",
              // backgroundColor: "#eef0f0d5",
              borderRadius: "10px",
              padding: "5px 10px",
              // width: "100%",
            }}
          >
            <Flex vertical="true" justify={"center"} align={"center"}>
              <Avatar size="large" src={comment.user.profilePicUrl} />
              <span>{comment.user.name}</span>
            </Flex>
            <Flex
              key={index}
              vertical="true"
              gap="small"
              style={{
                width: "100%",
                padding: "10px",
                // border: "1px solid red",
              }}
            >
              <Flex
                key={index}
                horizental="true"
                gap="middle"
                style={{
                  width: "100%",
                }}
              >
                <Flex
                  align="center"
                  justify="start"
                  style={{
                    padding: "0px 10px",
                    width: "100%",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                >
                  <ReplyEditComment
                    inputReplyComment={inputReplyComment}
                    setInputReplyComment={setInputReplyComment}
                    comment={comment}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
