import { Avatar, Card, Divider, Flex, Image } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix";
import { useProductsContext } from "../../context/ProductsContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import { DeleteProductModal } from "./modal/DeleteProductModal";
import { EditProductModal2 } from "./modal/EditProductModal2";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { NotFound } from "../../component/NotFound";
import { Comment } from "./Comment/Comment";
import "./Product.css";
const { Meta } = Card;

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, productContextLoading, Update_Product } =
    useProductsContext();
  const { theme } = useThemeContext();
  const { currentUser } = useUserContext();

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

  // console.log("Product-->products", products);

  const selectedProduct = products.find((product) => product._id === id);

  // const createComment = async (values) => {
  //   console.log("Product-->values", values);

  //   try {
  //     const response = await axios.post(
  //       // "https://fullstack-backend-pm5t.onrender.com/products",
  //       `http://localhost:8080/products/${id}/comments`,
  //       { comment: values.comment },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${currentUser.token}`,
  //         },
  //       }
  //     );

  //     const data = await response.data;
  //     console.log("createComment: data", data);

  //     Update_Product(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(`Product -> currentUser.email ${currentUser.user.email}`);
  // console.log(`Product -> selectedProduct.email ${selectedProduct.userEmail}`);

  if (productContextLoading) return <div>...Loading Products</div>;
  if (!productContextLoading && !selectedProduct) return <NotFound />;

  return (
    <Flex
      gap="middle"
      vertical="true"
      align="center"
      className="align-c d-flex "
    >
      <Header />
      {theme === "light" ? (
        <div style={{ backgroundColor: "#cbdaf0a8" }} />
      ) : (
        <MatrixBG />
      )}
      <Flex
        vertical="true"
        gap="middle"
        style={{
          borderRadius: "10px",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid red",
          width: "60%",
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
              src={selectedProduct?.image}
              height={"300px"}
            />
          </Flex>
          <Card
            style={{
              width: 440,
            }}
            // cover={<img alt="example" src={selectedProduct.image} />}
            actions={[
              selectedProduct.user?.email === currentUser.user?.email ? (
                <Flex justify="space-evenly">
                  <EditOutlined
                    key="edit"
                    onClick={() => handleOpen(selectedProduct)}
                  />

                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleOpenDelete(selectedProduct)}
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
                  onClick={() =>
                    navigate(`/profile/${selectedProduct.user?._id}`)
                  }
                >
                  <Avatar src={selectedProduct.user?.profilePicUrl} />
                  <p>{selectedProduct.user?.email}</p>
                </Flex>
              }
            />
            <Divider dashed />
            <Meta
              title={selectedProduct.name}
              description={
                <div
                  onClick={() => navigate(`/products/${selectedProduct._id}`)}
                >
                  <p>Price : ${selectedProduct.price}</p>
                  <p style={{ height: "10" }}>
                    Description : {selectedProduct.description}
                  </p>
                  <p>Category : {selectedProduct.category}</p>
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
