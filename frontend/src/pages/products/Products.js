import { Button, Flex, Image, Input, Tag, Tooltip } from "antd";
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
import { Card } from "antd";
import { AllProducts } from "./AllProducts";

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

export const Products = () => {
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
  const [filteredArray, setFilteredArray] = useState(products);

  // console.log("Products-filteredArray", filteredArray);

  const handleInputSearch = (e) => {
    const value = e.target.value;

    const newPacientes = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredArray(newPacientes);
  };
  // console.log("Products-> products", products);

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

      <div
        className=" d-flex flex-direction-c just-start width-100pr padding-top-10"
        style={{
          // backgroundImage:
          //   theme === "light"
          //     ? // ? "url(https://img.freepik.com/premium-photo/paint-cans-paint-brushes-how-choose-perfect-interior-paint-color-good-health_109549-2530.jpg)"
          //       "url(https://hydeparkpaintandpaper.com/wp-content/uploads/2019/01/Paint-brush-sitting-on-top-of-paint-can.jpg)"
          //     : // ? "url()"
          //       "url(https://media.istockphoto.com/id/643650778/photo/white-paint-and-brush.jpg?s=612x612&w=0&k=20&c=14fe78GgCBDEyIGUhW2ZB9Hvv7KK_w4ZssEjd_I9KS0=)",
          // //: "url()",
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          height: "calc(100vh - 80px)",
        }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            textShadow:
              theme === "light" ? "0px 0px 0px black" : "0px 0px 4px black",
            ...textStyle,
          }}
        >
          <Flex align="center" justify="center">
            <Input
              onChange={handleInputSearch}
              // value={searchValue}
              placeholder="Search by name"
              style={{
                height: "45px",
                // width: "100%",
              }}
              // placeholder="Search"
            ></Input>
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
          </Flex>
        </Flex>
        <Flex
          wrap="wrap"
          gap="middle"
          align="center"
          justify="center"
          style={{
            padding: 20,
          }}
        >
          <AllProducts
            handleOpenDelete={handleOpenDelete}
            filteredArray={filteredArray}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Flex>
      </div>

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
