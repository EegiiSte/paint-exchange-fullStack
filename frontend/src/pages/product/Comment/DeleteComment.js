import { Button, Flex, Form, Input } from "antd";
import axios from "axios";
import React from "react";

import { SendOutlined } from "@ant-design/icons";
export const DeleteComment = (props) => {
  const { comment } = props;

  const editComment = async (values) => {
    console.log("DeleteComment-->values", values);

    try {
      const response = await axios.put(
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
        initialValues={{
          comment: comment.comment,
        }}
      >
        <Form.Item
          layout="horizental"
          name="comment"
          rules={[{ required: true, message: "Required" }]}
        >
          <Flex horizental="true">
            <Input />
            <Button
              type="primary"
              htmlType="submit"
              block
              icon={<SendOutlined />}
            />
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};
