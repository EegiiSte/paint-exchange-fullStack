import { Avatar, Button, Card, Flex, Form, Typography } from "antd";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../../../context/ProductsContext";
import { useThemeContext } from "../../../context/ThemeContext";
import { useUserContext } from "../../../context/UserContext";

import { SendOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useNotificationContext } from "../../../context";
import { EditComment } from "./EditComment";

const { Meta } = Card;

export const Comment = (props) => {
  // const {id} = props;
  const { id } = useParams();

  //   console.log(`Product -> id ${id}`);
  const { products, productContextLoading, Update_Product } =
    useProductsContext();
  const { currentUser } = useUserContext();
  const { theme } = useThemeContext();
  const { successNotification, errorNotification } = useNotificationContext();

  // console.log("Product-->products", products);

  const selectedProduct = products.find((product) => product._id === id);
  // const [selectedProduct, setSelectedProduct] = useState(foundProduct);

  const sortedComments =
    selectedProduct?.comments?.sort((comment1, comment2) => {
      return comment1.timeStamp - comment2.timeStamp;
    }) || [];

  const [form] = Form.useForm();

  const createComment = async (values, form) => {
    // console.log("Product-->values", values);

    try {
      const response = await axios.post(
        // "https://fullstack-backend-pm5t.onrender.com/products",
        `http://localhost:8080/products/${id}/comments`,
        { comment: values.comment },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;
      console.log("createComment: data", data);

      Update_Product(data.updatedProduct);
      successNotification("Added comment successfully");

      form.setFieldsValue({ comment: "" });
    } catch (error) {
      console.log(error);
      errorNotification(error.message);
    }
  };

  return (
    <Flex vertical="true" gap="small" justify="center">
      <Typography.Title level={5} style={{ marginBottom: 5 }}>
        Add comment
      </Typography.Title>
      <Flex
        horizental="true"
        gap="small"
        justify={"center"}
        align={"center"}
        style={{ width: "100%" }}
      >
        <Form
          form={form}
          name="trigger"
          // onFinish={createComment}
          onFinish={(values) => createComment(values, form)}
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
              name="comment"
              rules={[{ required: true, message: "Required" }]}
              style={{
                width: "80%",
              }}
            >
              <TextArea />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              size="large"
            />
          </Flex>
        </Form>
      </Flex>
      <Typography.Title level={5} style={{ marginBottom: 5 }}>
        Comments
      </Typography.Title>

      {sortedComments.map((comment, index) => (
        <Flex
          key={index}
          horizental="true"
          gap="middle"
          style={{
            // border: "1px solid lightgray",
            borderRadius: "5px",
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
                }}
              >
                <EditComment comment={comment} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
