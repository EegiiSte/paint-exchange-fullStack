import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Flex, Image, Input, Tag } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext, useUserContext } from "../../context";
import { DeleteProductModal } from "../product/modal/DeleteProductModal";
import { EditProductModal2 } from "../product/modal/EditProductModal2";
import { CreateProductModal } from "../products/CreateProductModal";
const { Meta } = Card;

export const ProfileProducts = (props) => {
  const { singleUser } = props;

  const products = singleUser?.user?.products;

  console.log("ProfileProducts-singleUser", singleUser);
  // console.log("ProfileProducts-products", products);

  const { theme, textStyle } = useThemeContext();
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  console.log("ProfileProducts-currentUser", currentUser);

  const [openCreate, setOpenCreate] = React.useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  const [filteredArray, setFilteredArray] = useState(products);

  const handleInputSearch = (e) => {
    const value = e.target.value;

    const newPacientes = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredArray(newPacientes);
  };

  //function for edit modal
  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct({});

    setNewImageUrl("");
  };

  //for delete modal
  const handleOpenDelete = (product) => {
    setOpenDelete(true);
    setSelectedProduct(product);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedProduct({});
  };

  return (
    <div>
      <Flex
        vertical
        gap="middle"
        align="center"
        justify="start"
        style={{
          padding: 20,
        }}
      >
        <Flex align="center" justify="start">
          <Input
            onChange={handleInputSearch}
            // value={searchValue}
            placeholder="Search by name"
            style={{
              height: "45px",
            }}
          ></Input>

          {currentUser.user?.email === singleUser.user?.email ? (
            <Button
              block
              onClick={handleOpenCreate}
              style={{
                height: "46px",
                width: "200px ",
                ...textStyle,
                backgroundColor: theme === "light" ? "white" : "#0000007c",
              }}
            >
              Create Product
            </Button>
          ) : (
            <div />
          )}
        </Flex>
        <Flex gap="middle" align="start" justify="start" wrap="wrap">
          {filteredArray?.map((product, index) => (
            <Card
              key={index}
              style={{
                width: 200,
              }}
              cover={
                <Image
                  preview={false}
                  alt="example"
                  src={product.image}
                  onClick={() => navigate(`/products/${product._id}`)}
                />
              }
              actions={[
                currentUser.user.email === singleUser.user.email ? (
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
              ></Meta>
            </Card>
          ))}
        </Flex>
      </Flex>
      <EditProductModal2
        handleClose={handleClose}
        open={open}
        selectedProduct={selectedProduct}
        id={selectedProduct._id}
        newImageUrl={newImageUrl}
        setNewImageUrl={setNewImageUrl}
      />
      <DeleteProductModal
        handleCloseDelete={handleCloseDelete}
        openDelete={openDelete}
        product={selectedProduct}
        id={selectedProduct._id}
      />
      <CreateProductModal
        handleCloseCreate={handleCloseCreate}
        openCreate={openCreate}
      />
    </div>
  );
};
