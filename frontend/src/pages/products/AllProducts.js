import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Divider, Flex, Skeleton, Tag } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useProductsContext,
  useResponsiveContext,
  useThemeContext,
  useUserContext,
} from "../../context";
import "./Product.css";
import { ProductCard } from "./ProductCard";
const { Meta } = Card;

export const AllProducts = (props) => {
  const { handleOpen, filteredArray, handleOpenDelete, loadingProducts } =
    props;

  const navigate = useNavigate();

  const { products } = useProductsContext();
  const { theme, textStyle } = useThemeContext();
  const { currentUser } = useUserContext();
  const { mobile, tablet, desktop } = useResponsiveContext();

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
            <ProductCard
              handleOpen={handleOpen}
              loadingProducts={loadingProducts}
              handleOpenDelete={handleOpenDelete}
              product={product}
              index={index}
            />
          ))}
      </Flex>
    </div>
  );
};
