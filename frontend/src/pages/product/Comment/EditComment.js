import { Button, Flex, Popconfirm } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../../../context/ProductsContext";
import { useUserContext } from "../../../context/UserContext";

import {
  DeleteOutlined,
  EditOutlined,
  LikeTwoTone,
  RollbackOutlined,
  SendOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useNotificationContext, useResponsiveContext } from "../../../context";
import { ReplyComment } from "./ReplyComment/ReplyComment";

export const EditComment = (props) => {
  const { comment } = props;
  const { id } = useParams();

  const { Update_Product } = useProductsContext();
  const { currentUser } = useUserContext();
  const { successNotification, errorNotification } = useNotificationContext();
  const { mobile, tablet, desktop } = useResponsiveContext();

  const [editedComment, setEditedComment] = useState(comment.comment);

  //   console.log("EditComment: editedComment", editedComment);

  const handleInputComment = (e) => {
    const inputComment = e.target.value;
    setEditedComment(inputComment);
  };

  const [inputReplyComment, setInputReplyComment] = useState(false);
  // console.log("Comment: inputReplyComment", inputReplyComment);

  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        // `https://paint-exchange-fullstack-1.onrender.com/products/${id}/comments/${comment._id}`,
        `http://localhost:8080/products/${id}/comments/${comment._id}`,
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
        // `https://paint-exchange-fullstack-1.onrender.com/products/${id}/comments/${comment._id}`,
        `http://localhost:8080/products/${id}/comments/${comment._id}`,
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
        width: mobile ? "70%" : "100%",
        fontSize: "15px",
        padding: "0.5em",
      }}
    >
      <Flex
        align="center"
        vertical="true"
        gap="small"
        justify="space-between"
        style={{
          width: "100%",
        }}
      >
        <Flex
          // align="center"
          // horizental="true"
          // justify="space-between"

          style={{
            paddingBottom: "10px",
            borderBottom: "1px solid lightgray",
            width: "100%",
          }}
        >
          {editInput === true ? (
            <p>{comment.comment}</p>
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
          justify="space-between"
          style={{
            width: "100%",
          }}
        >
          <Flex gap="small">
            <Button
              size={mobile ? "small" : "large"}
              onClick={() =>
                setInputReplyComment(inputReplyComment === false ? true : false)
              }
              icon={<RollbackOutlined />}
            >
              Reply
            </Button>
          </Flex>
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

            {currentUser.user.email === comment.user.email ? (
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

        {comment.replyComments ? (
          <ReplyComment
            inputReplyComment={inputReplyComment}
            setInputReplyComment={setInputReplyComment}
            replyComments={comment.replyComments}
            comment={comment}
          />
        ) : (
          <div />
        )}
      </Flex>
    </Flex>
  );
};
