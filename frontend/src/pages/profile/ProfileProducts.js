import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Flex, Image, Input, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext, useUserContext } from "../../context";
import { useProductsContext } from "../../context/ProductsContext";
import { DeleteProductModal } from "../product/modal/DeleteProductModal";
import { EditProductModal2 } from "../product/modal/EditProductModal2";
import { CreateProductModal } from "../products/CreateProductModal";
const { Meta } = Card;

export const ProfileProducts = (props) => {
  const { singleUserData, id } = props;
  const products = singleUserData?.user?.products;

  // console.log("ProfileProducts-singleUserData", singleUserData);
  // console.log("ProfileProducts-products", singleUserData.user.products);

  const { theme, textStyle } = useThemeContext();
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  // console.log("ProfileProducts-currentUser", currentUser);

  const [openCreate, setOpenCreate] = React.useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  const [loagingUsers, setLoagingUsers] = useState(true);
  // console.log("ProfilePage-loagingUsers ", loagingUsers);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const [searchProductValue, setSearchProductValue] = useState("");

  const handleInputSearch = (e) => {
    const value = e.target.value;

    setSearchProductValue(value);
  };

  useEffect(() => {
    setLoagingUsers(true);

    const getSingleUserData = async () => {
      try {
        const response = await axios.get(
          // `https://fullstack-backend-pm5t.onrender.com/users/${id}`,
          `http://localhost:8080/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const usersData = await axios.get(
          // `https://fullstack-backend-pm5t.onrender.com/users/`,
          "http://localhost:8080/users/",
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const data = await response.data;
        // setSingleUserData(data);
        localStorage.setItem("singleUserDataLocal", JSON.stringify(data));

        const newPacientes = data.user.products?.filter((product) =>
          product.name.toLowerCase().includes(searchProductValue.toLowerCase())
        );

        setFilteredProducts(newPacientes);
        setLoagingUsers(false);

        // console.log("ProfilePage-data", data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleUserData();

    return () => {
      getSingleUserData();
    };
  }, [id, searchProductValue]);

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
            value={searchProductValue}
            placeholder="Search by name"
            style={{
              height: "45px",
            }}
          ></Input>

          {currentUser.user?.email === singleUserData?.user?.email ? (
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
        <Flex gap="middle" align="start" justify="center" wrap="wrap">
          {filteredProducts?.map((product, index) => (
            <Card
              loading={loagingUsers}
              key={index}
              style={{
                width: 200,
                // display: id === product.user?._id ? "none" : "",
              }}
              cover={
                <Image
                  preview={false}
                  style={{}}
                  alt="example"
                  src={product.image}
                  onClick={() => navigate(`/products/${product._id}`)}
                />
              }
              actions={[
                currentUser?.user?.email === singleUserData?.user?.email ? (
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
