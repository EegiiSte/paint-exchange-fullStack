import { Button, Flex, Input, Popconfirm } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../../../context/ProductsContext";
import { useUserContext } from "../../../context/UserContext";

import { DeleteOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";

export const EditComment = (props) => {
  const { comment } = props;
  const { id } = useParams();

  const { Update_Product } = useProductsContext();
  const { currentUser } = useUserContext();
  //   console.log("EditComment: currentUser", currentUser);

  const [editedComment, setEditedComment] = useState(comment.comment);

  //   console.log("EditComment: editedComment", editedComment);

  const handleInputComment = (e) => {
    const inputComment = e.target.value;
    setEditedComment(inputComment);
  };

  const updateComment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/products/${id}/comments`,
        { comment: editedComment, commentId: comment._id },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;
      Update_Product(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/products/${id}/comments`,
        { commentId: comment._id },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.data;
      Update_Product(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [editInput, setEditInput] = useState(true);

  const handleEditComment = (value) => {
    setEditInput(value);

    if (value === false) {
      setEditedComment(comment.comment);
    }
  };

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);

  const inputPress = (e) => {
    const editComment = e.target.value;
    setDisabledSubmitButton(editComment === comment.comment);
  };

  return (
    <Flex
      style={{
        width: "100%",
      }}
    >
      <Flex
        align="center"
        horizental="true"
        justify="space-between"
        style={{
          width: "100%",
        }}
      >
        {editInput === true ? (
          <p>{comment.comment}</p>
        ) : (
          <Input
            value={editedComment}
            onChange={(e) => {
              setEditedComment(e.target.value);
              inputPress(e);
            }}
          />
        )}
        <Flex gap="smaill" horizental="true">
          {editInput === true ? (
            <div />
          ) : (
            <Flex>
              <Button
                onClick={updateComment}
                icon={<SendOutlined />}
                disabled={disabledSubmitButton}
              >
                Update
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this comment?"
                onConfirm={deleteComment}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} danger>
                  Delete
                </Button>
              </Popconfirm>
            </Flex>
          )}
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditComment(!editInput)}
          >
            {editInput ? "Edit" : "Cancel"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
