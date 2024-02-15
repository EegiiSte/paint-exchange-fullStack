import { Avatar, Button, Card, Flex, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../../../context/ProductsContext";
import { useThemeContext } from "../../../context/ThemeContext";
import { useUserContext } from "../../../context/UserContext";

import { EditOutlined, SendOutlined } from "@ant-design/icons";
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

  // console.log("Product-->products", products);

  const selectedProduct = products.find((product) => product._id === id);
  // const [selectedProduct, setSelectedProduct] = useState(foundProduct);

  // console.log("Product-->selectedProduct", selectedProduct);

  ///////sort

  const sortedComments = selectedProduct?.comments?.sort(
    (comment1, comment2) => {
      return comment2.timeStamp - comment1.timeStamp;
    }
  );

  const createComment = async (values) => {
    console.log("Product-->values", values);

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

      // setCommentsProduct(data.updatedProduct?.comments);
      Update_Product(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form
        name="trigger"
        onFinish={(values) => {
          createComment(values);
        }}
        onFinishFailed={(errorInfo) => {
          console.log(errorInfo);
        }}
        style={{
          maxWidth: 600,
        }}
        layout="horizental"
        autoComplete="off"
      >
        <Form.Item
          layout="horizental"
          name="comment"
          rules={[{ required: true, message: "Required" }]}
        >
          <Flex horizental="true">
            <Input />
            <Button type="primary" htmlType="submit" icon={<SendOutlined />} />
          </Flex>
        </Form.Item>
      </Form>

      {sortedComments.map((comment, index) => (
        <Flex
          key={index}
          horizental="true"
          gap="middle"
          style={{
            padding: "10px",
          }}
        >
          <Flex vertical="true">
            <Avatar src={comment.user.profilePicUrl} />
            <span>{comment.user.name}</span>
          </Flex>
          <Flex
            align="center"
            justify="start"
            style={{
              padding: "0px 10px",
              border: "1px solid lightgray",
              width: "100%",
              borderRadius: "5px",
            }}
          >
            <EditComment comment={comment} />
          </Flex>
        </Flex>
      ))}
    </div>
  );
};
