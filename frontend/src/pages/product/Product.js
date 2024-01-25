import { Button, Flex, Image, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../component";
import { MatrixBG } from "../../component/matrix";
import { useProductsContext } from "../../context/ProductsContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import { DeleteProductModal } from "./modal/DeleteProductModal";
import { EditProductModal2 } from "./modal/EditProductModal2";

import "./Product.css";

export const Product = () => {
  const { id } = useParams();

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

  //   console.log(`Product -> id ${id}`);
  const { products, productContextLoading } = useProductsContext();
  const { theme } = useThemeContext();
  const { currentUser } = useUserContext();

  const selectedProduct = products.find((product) => product._id === id);

  console.log("Product-->selectedProduct", selectedProduct);

  const [singleProduct, setSingleProduct] = useState([]);

  console.log("Product-->singleProduct", singleProduct);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          // "https://fullstack-backend-pm5t.onrender.com/products",
          `http://localhost:8080/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const data = await response.data;

        setSingleProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
      fetchProducts();
    }
    return () => fetchProducts();
  }, [currentUser]);

  // console.log(`Product -> currentUser.email ${currentUser.user.email}`);
  // console.log(`Product -> selectedProduct.email ${selectedProduct.userEmail}`);

  if (productContextLoading) {
    return <div>...Loading Products</div>;
  } else {
    return (
      <div
        className="align-c d-flex "
        style={{
          flexDirection: "column",
          // backgroundColor: theme === "light" ? "#cbdaf0a8" : "#cbdaf0a8",
        }}
      >
        <Header />
        {theme === "light" ? (
          <div style={{ backgroundColor: "#cbdaf0a8" }} />
        ) : (
          <MatrixBG />
        )}
        <div
          className="padding-top-10 "
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            color: theme === "light" ? "black" : "white",
          }}
        >
          This is Single Product page
          {currentUser.user.email === singleProduct.userProduct?.email ? (
            <Flex className="gap-10" wrap="wrap" gap="small">
              <Button
                block
                onClick={handleOpen}
                style={{
                  backgroundColor: theme === "light" ? "white" : "#0000006c",
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Edit
              </Button>
              <Button
                block
                onClick={handleOpenDelete}
                style={{
                  backgroundColor: theme === "light" ? "white" : "#0000006c",
                  color: theme === "light" ? "black" : "white",
                }}
              >
                Delete
              </Button>
            </Flex>
          ) : (
            <div />
          )}
        </div>
        {singleProduct && (
          <div
            // className="box-shadow-gray"
            style={{
              border: "1px solid white",
              backgroundColor: theme === "light" ? "white" : "#0000007c",
              height: "70vh",
              width: "55%",
              borderRadius: "10px",
              padding: "20px",
              margin: "20px",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div
              className="d-flex flex-direction-c just-s-evenly "
              style={{
                width: "50%",
                height: "100%",
                color: theme === "light" ? "black" : "white",
              }}
            >
              <div className="d-flex align-c just-start">
                <Tag
                  color={
                    singleProduct.product?.type === "public"
                      ? "success"
                      : "cyan"
                  }
                >
                  {singleProduct.product?.type}
                </Tag>
              </div>
              <div
                className="d-flex flex-direction-c just-c align-start "
                style={{ gap: "10px" }}
              >
                <p>
                  <div className="d-flex flex-direction-row">
                    <p>Name :</p>
                    <p>{singleProduct.product?.name}</p>
                  </div>
                </p>
                <p>
                  <div className="d-flex flex-direction-row">
                    <p>Price : $</p>
                    <p>{singleProduct.product?.price}</p>
                  </div>
                </p>
                <p>
                  <div className="d-flex flex-direction-row">
                    <p>Category :</p> {singleProduct.product?.category}
                  </div>
                </p>
                <div className="d-flex flex-direction-c gap-10">
                  <span>Description : </span>
                  <span>{singleProduct.product?.description}</span>
                </div>
              </div>
              <p
                style={{
                  fontSize: "12px",
                }}
              >
                <Image
                  preview={false}
                  height={"50px"}
                  src={singleProduct?.userProduct.profilePicUrl}
                  style={{ borderRadius: "50%", border: "1px solid black" }}
                />{" "}
                : {singleProduct?.userProduct.email}
              </p>
            </div>
            <div
              className="d-flex flex-direction-c just-s-evenly "
              style={{
                width: "50%",
                height: "100%",
                color: theme === "light" ? "black" : "white",
                fontSize: "150%",
              }}
            >
              <img
                style={{
                  borderRadius: "5px",
                }}
                src={selectedProduct?.image}
                alt={"productImage"}
                // width="350px"
                // height="150px"
              />
            </div>
          </div>
        )}

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
      </div>
    );
  }
};

// <EditProductModal
// handleClose={handleClose}
// open={open}
// selectedProduct={selectedProduct}
// id={id}
// />
