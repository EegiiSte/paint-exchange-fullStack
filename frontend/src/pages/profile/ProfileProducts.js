import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Flex, Image, Tag } from "antd";
import React, { useState } from "react";
import { useThemeContext, useUserContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { EditProductModal2 } from "../product/modal/EditProductModal2";
import { DeleteProductModal } from "../product/modal/DeleteProductModal";
import { CreateProductModal } from "../products/CreateProductModal";

export const ProfileProducts = (props) => {
  const { singleUser } = props;

  const products = singleUser?.user?.products;

  // console.log("ProfileProducts-singleUser", singleUser);
  // console.log("ProfileProducts-products", products);

  const { theme, textStyle } = useThemeContext();
  const navigate = useNavigate();
  const { currentUser } = useUserContext();

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
        justify="center"
        style={{
          padding: 20,
        }}
      >
        <div className=" d-flex flex-direction-c just-c align-c">
          <input
            onChange={handleInputSearch}
            // value={searchValue}
            placeholder="Search by name"
            style={{
              height: "40px",
              width: "500px",
            }}
            // placeholder="Search"
          ></input>
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
        </div>
        {filteredArray?.map((product, index) => (
          <div
            className=" d-flex flex-direction-c just-s-evenly "
            key={index}
            style={{
              ...textStyle,
              border: "1px solid white",
              width: 240,
              height: 320,
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: theme === "light" ? "white" : "",
            }}
          >
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
            <div
              className="d-flex align-c just-start"
              // style={{ height: "10%" }}
            >
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
            {singleUser?.user?.email === currentUser.user.email ? (
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
