import { Avatar, Button, Card, Divider, Flex, Image, Tag } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix";
import { useProductsContext } from "../../context/ProductsContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import { DeleteProductModal } from "./modal/DeleteProductModal";
import { EditProductModal2 } from "./modal/EditProductModal2";

import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { NotFound } from "../../component/NotFound";
import { useNotificationContext } from "../../context";
import { useResponsiveContext } from "../../context/ResponsiveContext";
import { Comment } from "./Comment/Comment";
import "./Product.css";
const { Meta } = Card;

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, productContextLoading } = useProductsContext();
  const { mobile, tablet, desktop } = useResponsiveContext();

  const { theme } = useThemeContext();
  const { currentUser } = useUserContext();
  const { Update_Product } = useProductsContext();
  const { successNotification } = useNotificationContext();

  //state for edit modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewImageUrl("");
  };
  //state for delete modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  const selectedProduct = products.find((product) => product._id === id);
  // console.log("Product-->products", products);

  const [loadingTag, setLoadingTag] = useState(false);

  const handleTag = async (value) => {
    setLoadingTag(true);
    try {
      const response = await axios.put(
        `https://paint-exchange-fullstack-1.onrender.com/products/${selectedProduct._id}/type`,
        // `http://localhost:8080/products/${selectedProduct._id}/type`,
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

  if (productContextLoading) return <div>...Loading Products</div>;
  if (!productContextLoading && !selectedProduct) return <NotFound />;

  return (
    <Flex
      gap="middle"
      vertical="true"
      align="center"
      style={{
        // width: "100%",
        height: mobile ? "100vh" : "100vh",
        backgroundColor: theme === "light" ? "" : "#2e3134",
      }}
    >
      <Header />

      <Flex
        vertical="true"
        gap="middle"
        style={{
          borderRadius: "10px",
          backgroundColor: "white",
          borderRadius: "10px",
          // border: "1px solid red",

          width: mobile ? "90%" : tablet ? "80%" : "60%",

          padding: "15px 0px",
          marginTop: "20px",
        }}
      >
        <Flex
          gap="middle"
          horizental="true"
          style={{
            border: "1px solid white",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <Flex>
            <Image
              style={{
                borderRadius: "10px",
              }}
              alt="example"
              src={selectedProduct.image}
              height={mobile ? "200px" : tablet ? "260px" : "300px"}
            />
          </Flex>
          <Card
            style={{
              width: mobile ? 220 : 440,
              fontSize: "18px",
            }}
          >
            <Meta
              avatar={
                <Flex
                  horizental="true"
                  align="center"
                  gap={mobile ? "small" : "middle"}
                  style={{
                    cursor: "pointer",
                    fontSize: mobile ? "12px" : "16px",
                  }}
                  onClick={() =>
                    navigate(`/profile/${selectedProduct.user._id}`)
                  }
                >
                  <Avatar src={selectedProduct.user.profilePicUrl} />
                  <p>{selectedProduct.user.email}</p>
                </Flex>
              }
            />
            <Divider dashed />
            <Tag
              icon={
                loadingTag === false ? (
                  <CheckCircleOutlined />
                ) : (
                  <SyncOutlined spin />
                )
              }
              onClick={() =>
                handleTag(
                  selectedProduct.type === "public" ? "private" : "public"
                )
              }
              style={{
                cursor: "pointer",
                marginBottom: 20,
              }}
              color={selectedProduct.type === "public" ? "success" : "cyan"}
            >
              {selectedProduct.type}
            </Tag>
            <Meta
              title={selectedProduct.name}
              description={
                <div>
                  <p>Price : ${selectedProduct.price}</p>
                  <p style={{ height: "10" }}>
                    Description : {selectedProduct.description}
                  </p>
                  <p>Category : {selectedProduct.category}</p>
                </div>
              }
            />
            <Divider />
            <Meta
              // title={selectedProduct.name}
              description={
                <div>
                  {selectedProduct.user.email === currentUser.user.email ? (
                    <Flex justify="space-evenly">
                      <Button
                        size={mobile ? "small" : "large"}
                        key="edit"
                        onClick={() => handleOpen(selectedProduct)}
                        icon={<EditOutlined />}
                      >
                        Edit
                      </Button>
                      <Button
                        size={mobile ? "small" : "large"}
                        key="delete"
                        onClick={() => handleOpenDelete(selectedProduct)}
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Button>
                    </Flex>
                  ) : (
                    <div />
                  )}
                </div>
              }
            />
          </Card>
        </Flex>
        <Flex
          vertical="true"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Divider />
          <Comment id={id} />
        </Flex>
      </Flex>

      <EditProductModal2
        handleClose={handleClose}
        open={open}
        selectedProduct={selectedProduct}
        id={id}
        newImageUrl={newImageUrl}
        setNewImageUrl={setNewImageUrl}
      />
      <DeleteProductModal
        handleCloseDelete={handleCloseDelete}
        openDelete={openDelete}
        id={id}
      />
    </Flex>
  );
};
