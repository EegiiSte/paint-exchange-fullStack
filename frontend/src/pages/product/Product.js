import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  FloatButton,
  Image,
  Switch,
  Tag,
} from "antd";
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
  CommentOutlined,
  CustomerServiceOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { NotFound } from "../../component/NotFound";
import { Comment } from "./Comment/Comment";
import "./Product.css";
const { Meta } = Card;

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, productContextLoading } = useProductsContext();
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

  const [openSwitch, setOpenSwitch] = useState(true);
  const onChangeSwitch = (checked) => {
    setOpen(checked);
  };

  const selectedProduct = products.find((product) => product._id === id);

  if (productContextLoading) return <div>...Loading Products</div>;
  if (!productContextLoading && !selectedProduct) return <NotFound />;

  return (
    <Flex gap="middle" vertical="true" align="center">
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
          // border: "1px solid red",
          width: "60%",
          padding: "15px 0px",
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
              height={"300px"}
            />
          </Flex>
          <Card
            style={{
              width: 440,
              fontSize: "18px",
            }}
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
            <Tag
              style={{
                marginBottom: 20,
                fontSize: "16px",
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
                        size="large"
                        key="edit"
                        onClick={() => handleOpen(selectedProduct)}
                        icon={<EditOutlined />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="large"
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
