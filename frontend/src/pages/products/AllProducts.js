import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Flex, Image, Tag } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useProductsContext,
  useThemeContext,
  useUserContext,
} from "../../context";
import "./Product.css";

export const AllProducts = (props) => {
  const { handleOpen, handleClose, filteredArray, handleOpenDelete } = props;

  const navigate = useNavigate();

  const { products } = useProductsContext();
  const { theme, textStyle } = useThemeContext();
  const { currentUser } = useUserContext();

  console.log("AllProducts: products", products);

  return (
    <div>
      <Flex
        wrap="wrap"
        gap="middle"
        align="center"
        justify="center"
        style={{
          padding: 20,
        }}
      >
        {products &&
          filteredArray.map((product) => (
            <div
              className=" d-flex flex-direction-c just-s-evenly "
              key={product.id}
              style={{
                ...textStyle,
                border: "1px solid white",
                width: 240,
                height: 320,
                borderRadius: "10px",
                overflow: "hidden",
                // backgroundColor: theme === "light" ? "white" : "",
                // backgroundColor: "white",
                backdropFilter: "saturate(180%) blur(15px)",
              }}
            >
              <div
                className="d-flex align-c just-c"
                style={{ height: "10%", cursor: "pointer" }}
                onClick={() => navigate(`/profile/${product.user._id}`)}
              >
                <p
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Image
                    preview={false}
                    height={"25px"}
                    src={product.user.profilePicUrl}
                    style={{ borderRadius: "50%", border: "1px solid black" }}
                  />
                  : {product.user.email}
                </p>
              </div>
              <div
                style={{
                  height: "40%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image height={"100%"} src={product.image} />
              </div>
              <div className="d-flex align-c just-start">
                <Tag color={product.type === "public" ? "success" : "cyan"}>
                  {product.type}
                </Tag>
              </div>
              <div
                className="d-flex flex-direction-c just-c"
                style={{ height: "30%", overflow: "hidden" }}
              >
                <div className="d-flex flex-direction-c just-c align-c">
                  <div
                    style={{
                      width: "80%",
                      justifyContent: "space-between",
                    }}
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <p>Name : {product.name}</p>
                    <p>Price : ${product.price}</p>
                    <p style={{ height: "10" }}>
                      Description : {product.description}
                    </p>
                    <p>Category : {product.category}</p>
                  </div>
                </div>
              </div>
              {product.user.email === currentUser.user.email ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    icon={theme === "light" ? <EditOutlined /> : <EditFilled />}
                    onClick={() => handleOpen(product)}
                  />
                  <Button
                    icon={
                      theme === "light" ? <DeleteOutlined /> : <DeleteFilled />
                    }
                    onClick={() => handleOpenDelete(product)}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
      </Flex>
    </div>
  );
};
