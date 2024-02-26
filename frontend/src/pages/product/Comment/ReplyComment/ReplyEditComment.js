import { Button, Flex, Popconfirm } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  DeleteOutlined,
  EditOutlined,
  LikeTwoTone,
  RollbackOutlined,
  SendOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {
  useNotificationContext,
  useProductsContext,
  useResponsiveContext,
  useUserContext,
} from "../../../../context";

export const ReplyEditComment = (props) => {
  const { comment, replyComment } = props;
  const { id } = useParams();

  const { Update_Product } = useProductsContext();
  const { currentUser } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();
  const { mobile, tablet, desktop } = useResponsiveContext();

  const [editedComment, setEditedComment] = useState(replyComment.comment);

  //   console.log("EditComment: editedComment", editedComment);

  const handleInputComment = (e) => {
    const inputComment = e.target.value;
    setEditedComment(inputComment);
  };

  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `https://paint-exchange-fullstack-1.onrender.com/products/${id}/comments/${comment._id}/replies/${replyComment._id}`,
        // `http://localhost:8080/products/${id}/comments/${comment._id}/replies/${replyComment._id}`,
        {
          headers: {
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzFiM2I1NDk3ODQyODIxODQyM2I1ZiIsImlhdCI6MTcwNzk4MjU4OSwiZXhwIjoxNzA4MDY4OTg5fQ.u2xpvWk1y7J5mghBGzBZbbmDFyRAGddrSKqAL4haZRE`,
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.data;

      handleEditComment(true);

      Update_Product(data);
      successNotification("Deleted comment successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateComment = async () => {
    try {
      const response = await axios.put(
        `https://paint-exchange-fullstack-1.onrender.com/products/${id}/comments/replies/${replyComment._id}`,
        // `http://localhost:8080/products/${id}/comments/${comment._id}/replies/${replyComment._id}`,
        { comment: editedComment },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;
      console.log("updateComment", data);
      setDisabledSubmitButton(true);

      Update_Product(data);
      successNotification("Updeted comment successfully");

      handleEditComment(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [editInput, setEditInput] = useState(true);

  const handleEditComment = (value) => {
    setEditInput(value);

    if (value === false) {
      setEditedComment(replyComment.comment);
    }
  };

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);

  const inputPress = (e) => {
    const editComment = e.target.value;
    setDisabledSubmitButton(editComment === replyComment.comment);
  };

  return (
    <Flex
      style={{
        width: "100%",
        padding: "0.5em",
      }}
    >
      <Flex
        align="center"
        // horizental="true"
        vertical
        gap="small"
        // justify="end"
        style={{
          width: "100%",
        }}
      >
        <Flex
          align="center"
          style={{
            paddingBottom: "10px",
            borderBottom: "1px solid lightgray",
            width: "100%",
          }}
        >
          {editInput === true ? (
            <p>{replyComment.comment}</p>
          ) : (
            <TextArea
              value={editedComment}
              onChange={(e) => {
                setEditedComment(e.target.value);
                inputPress(e);
              }}
            />
          )}
        </Flex>
        <Flex
          align="center"
          horizental="true"
          justify="end"
          style={{
            width: "100%",
          }}
        >
          <Flex
            gap="smaill"
            style={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
            }}
          >
            {editInput === true ? (
              <div />
            ) : (
              <Flex
                style={{
                  display: "flex",
                  flexDirection: mobile ? "column" : "row",
                }}
              >
                <Button
                  size={mobile ? "small" : "large"}
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
                  <Button
                    size={mobile ? "small" : "large"}
                    icon={<DeleteOutlined />}
                    danger
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </Flex>
            )}

            {currentUser.user.email === replyComment.user.email ? (
              <Button
                size={mobile ? "small" : "large"}
                icon={<EditOutlined />}
                onClick={() => handleEditComment(!editInput)}
              >
                {editInput ? "Edit" : "Cancel"}
              </Button>
            ) : (
              <div />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
