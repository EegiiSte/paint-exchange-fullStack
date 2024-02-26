import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Divider, Flex, Skeleton, Tag } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useNotificationContext,
  useProductsContext,
  useResponsiveContext,
  useThemeContext,
  useUserContext,
} from "../../context";
import "./Product.css";

const { Meta } = Card;

export const ProductCard = (props) => {
  const { product, index, handleOpen, handleOpenDelete, loadingProducts } =
    props;
  const navigate = useNavigate();
  const { theme, textStyle } = useThemeContext();
  const { currentUser } = useUserContext();
  const { mobile, tablet, desktop } = useResponsiveContext();
  const { successNotification } = useNotificationContext();
  const { Update_Product } = useProductsContext();

  const [loadingTag, setLoadingTag] = useState(false);

  const handleTag = async (value) => {
    setLoadingTag(true);
    try {
      const response = await axios.put(
        // `https://paint-exchange-fullstack-1.onrender.com/products/${id/type`,
        `http://localhost:8080/products/${product._id}/type`,
        { type: value },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;

      Update_Product(data);
      setLoadingTag(false);
      successNotification("Product type changed successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Skeleton key={index} loading={loadingProducts} avatar active>
      <Card
        style={{
          width: 250,
        }}
        cover={
          <img
            alt="example"
            src={product.image}
            height={"300px"}
            // width={"auto"}
            onClick={() => navigate(`/products/${product._id}`)}
          />
        }
        actions={[
          product.user.email === currentUser.user.email ? (
            <Flex justify="space-evenly">
              <Button
                key="edit"
                onClick={() => handleOpen(product)}
                icon={<EditOutlined />}
              >
                Edit
              </Button>

              <Button
                key="delete"
                onClick={() => handleOpenDelete(product)}
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Flex>
          ) : (
            <div />
          ),
        ]}
      >
        <Meta
          avatar={
            <Flex
              horizental="true"
              align="center"
              gap="middle"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/profile/${product.user._id}`)}
            >
              <Avatar src={product.user.profilePicUrl} />
              <p>{product.user.email}</p>
            </Flex>
          }
        />
        <Divider dashed />
        {currentUser.user.email === product.user.email ? (
          <Tag
            icon={
              loadingTag === false ? (
                <CheckCircleOutlined />
              ) : (
                <SyncOutlined spin />
              )
            }
            onClick={() =>
              handleTag(product.type === "public" ? "private" : "public")
            }
            style={{
              cursor: "pointer",
              marginBottom: 20,
            }}
            color={product.type === "public" ? "success" : "cyan"}
          >
            {product.type}
          </Tag>
        ) : (
          <Tag
            icon={
              loadingTag === false ? (
                <CheckCircleOutlined />
              ) : (
                <SyncOutlined spin />
              )
            }
            style={{
              marginBottom: 20,
            }}
            color={product.type === "public" ? "success" : "cyan"}
          >
            {product.type}
          </Tag>
        )}

        <Meta
          title={product.name}
          description={
            <div onClick={() => navigate(`/products/${product._id}`)}>
              <p>Price : ${product.price}</p>
              <p style={{ height: "10" }}>
                Description : {product.description}
              </p>
              <p>Category : {product.category}</p>
            </div>
          }
        />
      </Card>
    </Skeleton>
  );
};
