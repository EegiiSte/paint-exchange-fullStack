import { Button, Flex, Image, Tag, Avatar, Card, Divider, Input } from "antd";
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

import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";

import "./Product.css";
const { Meta } = Card;

export const Product = () => {
  const { id } = useParams();

  const navigate = useNavigate();

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

  // console.log("Product-->singleProduct", singleProduct);

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
      <Flex gap="middle" vertical align="center" className="align-c d-flex ">
        <Header />
        {theme === "light" ? (
          <div style={{ backgroundColor: "#cbdaf0a8" }} />
        ) : (
          <MatrixBG />
        )}
        <Flex
          vertical
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
            horizental
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
                height={"300px"}
              />
            </Flex>
            <Card
              style={{
                width: 440,
              }}
              // cover={<img alt="example" src={selectedProduct.image} />}
              actions={[
                selectedProduct.user.email === currentUser.user.email ? (
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
                      navigate(`/profile/${selectedProduct.user._id}`)
                    }
                  >
                    <Avatar src={selectedProduct.user.profilePicUrl} />
                    <p>{selectedProduct.user.email}</p>
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
            vertical
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <Flex horizental gap="middle">
              <Input />
              <SendOutlined />
            </Flex>
            <Flex
              horizental
              gap="middle"
              style={{
                padding: "10px",
              }}
            >
              <Avatar src={selectedProduct.user.profilePicUrl} />
              <Flex
                align="center"
                justify="start"
                style={{
                  border: "1px solid lightgray",
                  width: "100%",
                  borderRadius: "5px",
                }}
              >
                <p>comment</p>
              </Flex>
            </Flex>
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
  }
};

// <div
//             // className="box-shadow-gray"
//             style={{
//               border: "1px solid white",
//               backgroundColor: theme === "light" ? "#e4e5e5d5" : "#0000007c",
//               height: "70vh",
//               width: "55%",
//               borderRadius: "10px",
//               padding: "20px",
//               margin: "20px",
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "row",
//             }}
//           >
//             <div
//               className="d-flex flex-direction-c just-s-evenly "
//               style={{
//                 width: "50%",
//                 height: "100%",
//                 color: theme === "light" ? "black" : "white",
//               }}
//             >
//               <div className="d-flex align-c just-start">
//                 <Tag
//                   color={
//                     singleProduct.product?.type === "public"
//                       ? "success"
//                       : "cyan"
//                   }
//                 >
//                   {singleProduct.product?.type}
//                 </Tag>
//               </div>
//               <div
//                 className="d-flex flex-direction-c just-c align-start "
//                 style={{ gap: "10px" }}
//               >
//                 <p>
//                   <div className="d-flex flex-direction-row">
//                     <p>Name :</p>
//                     <p>{singleProduct.product?.name}</p>
//                   </div>
//                 </p>
//                 <p>
//                   <div className="d-flex flex-direction-row">
//                     <p>Price : $</p>
//                     <p>{singleProduct.product?.price}</p>
//                   </div>
//                 </p>
//                 <p>
//                   <div className="d-flex flex-direction-row">
//                     <p>Category :</p> {singleProduct.product?.category}
//                   </div>
//                 </p>
//                 <div className="d-flex flex-direction-c gap-10">
//                   <span>Description : </span>
//                   <span>{singleProduct.product?.description}</span>
//                 </div>
//               </div>
//               <p
//                 style={{
//                   fontSize: "12px",
//                 }}
//               >
//                 <Image
//                   preview={false}
//                   height={"50px"}
//                   // src={singleProduct?.userProduct.profilePicUrl}
//                   src={
//                     " https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706745600&semt=ais"
//                   }
//                   style={{ borderRadius: "50%", border: "1px solid black" }}
//                 />{" "}
//                 : {}
//               </p>
//             </div>
//             <div
//               className="d-flex flex-direction-c just-s-evenly "
//               style={{
//                 width: "50%",
//                 height: "100%",
//                 color: theme === "light" ? "black" : "white",
//                 fontSize: "150%",
//               }}
//             >
//               <img
//                 style={{
//                   borderRadius: "5px",
//                 }}
//                 src={selectedProduct?.image}
//                 alt={"productImage"}
//                 // width="350px"
//                 // height="150px"
//               />
//             </div>
//           </div>

// <EditProductModal
// handleClose={handleClose}
// open={open}
// selectedProduct={selectedProduct}
// id={id}
// />
