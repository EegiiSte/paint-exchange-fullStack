import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider, Flex, Skeleton, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useProductsContext,
  useThemeContext,
  useUserContext,
} from "../../context";
import "./Product.css";
const { Meta } = Card;

export const AllProducts = (props) => {
  const { handleOpen, filteredArray, handleOpenDelete, loadingProducts } =
    props;

  const navigate = useNavigate();

  const { products } = useProductsContext();
  const { theme, textStyle } = useThemeContext();
  const { currentUser } = useUserContext();

  const productsLocal = JSON.parse(localStorage.getItem("products"));

  // console.log("AllProducts: products", products);

  return (
    <div>
      <Flex
        wrap="wrap"
        gap="middle"
        align="start"
        justify="center"
        style={{
          padding: 20,
        }}
      >
        {products &&
          filteredArray.map((product, index) => (
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
                  product.user?.email === currentUser.user?.email ? (
                    <Flex justify="space-evenly">
                      <EditOutlined
                        key="edit"
                        onClick={() => handleOpen(product)}
                      />

                      <DeleteOutlined
                        key="delete"
                        onClick={() => handleOpenDelete(product)}
                      />
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
                      <Avatar src={product.user?.profilePicUrl} />
                      <p>{product.user?.email}</p>
                    </Flex>
                  }
                />
                <Divider dashed />
                <Tag
                  style={{
                    marginBottom: 20,
                  }}
                  color={product.type === "public" ? "success" : "cyan"}
                >
                  {product.type}
                </Tag>
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
          ))}
      </Flex>
    </div>
  );
};
