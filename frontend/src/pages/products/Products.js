import { Button, Flex, Image, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/Header";
import { MatrixBG } from "../../component/matrix";
import { CreateProductModal } from "./CreateProductModal";
import "./Product.css";
import {
  EditOutlined,
  DeleteOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { DeleteProductModal } from "../product/modal/DeleteProductModal";
import { EditProductModal2 } from "../product/modal/EditProductModal2";
import {
  useProductsContext,
  useThemeContext,
  useUserContext,
} from "../../context";

export const Products = () => {
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = React.useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const { products, productContextLoading } = useProductsContext();
  const { theme, textStyle } = useThemeContext();
  const { currentUser } = useUserContext();
  // console.log("Products-currentUser=", currentUser);
  // console.log("Products-singleUser=", singleUser);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  // search
  console.log("Products-> products", products);

  const [filteredArray, setFilteredArray] = useState(products);

  // console.log("Products-filteredArray", filteredArray);

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

  if (productContextLoading) {
    return <div>...Loading Products</div>;
  }
  if (!productContextLoading && !products) {
    return <div>...no data</div>;
  }
  return (
    <div className="d-flex align-c flex-wrap-wrap just-c">
      <Header />
      {theme === "light" ? (
        <div style={{ backgroundColor: "#cbdaf0a8" }} />
      ) : (
        <MatrixBG />
      )}

      <div
        className=" d-flex flex-direction-c just-s-evenly width-100pr padding-top-10"
        style={{
          textShadow:
            theme === "light" ? "0px 0px 0px black" : "0px 0px 4px black",
          ...textStyle,
        }}
      >
        <div style={{}}>
          <div className=" d-flex flex-direction-row just-s-evenly">
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
        </div>
      </div>
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
                backgroundColor: theme === "light" ? "white" : "",
              }}
            >
              <div className="d-flex align-c just-c" style={{ height: "10%" }}>
                <p
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Image
                    preview={false}
                    height={"25px"}
                    src={product?.userProduct.profilePicUrl}
                    style={{ borderRadius: "50%", border: "1px solid black" }}
                  />
                  : {product?.userProduct.email}
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
              {product.userEmail ===
              (currentUser.user
                ? currentUser.user.email
                : currentUser.newUser.email) ? (
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
