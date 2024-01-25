import { Button, Form, Image, Input, Radio } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "../../../component/modal";
import {
  useNotificationContext,
  useProductsContext,
  useUserContext,
} from "../../../context";
import { uploadImage } from "../../../utils";

export const EditProductModal2 = (props) => {
  const {
    handleClose,
    open,
    selectedProduct,
    id,
    setNewImageUrl,
    newImageUrl,
  } = props;

  const { successNotification } = useNotificationContext();
  const { Update_Product } = useProductsContext();
  const { currentUser } = useUserContext();

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const [selectedType, setSelectedType] = useState(selectedProduct?.type);

  const lenght = newImageUrl?.length;

  const handleFileChange = async (e) => {
    const imageUrl = await uploadImage(e.target.files[0]);
    setNewImageUrl(imageUrl);
  };

  const onChangeType = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setSelectedType(value);
  };

  const options = [
    {
      label: "public",
      value: "public",
    },
    {
      label: "private",
      value: "private",
    },
  ];

  const inputPress = (e) => {
    const { value, name } = e.target;
    setDisabledSubmitButton(value === selectedProduct[name]);
  };

  const handleEditButton = async (values) => {
    const updatedProduct = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      type: values.type,
      image: newImageUrl ? newImageUrl : selectedProduct.image,
    };

    try {
      const response = await axios.put(
        // `https://fullstack-backend-pm5t.onrender.com/products/${id}`,
        `http://localhost:8080/products/${id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;

      Update_Product(data);

      successNotification("Product edited successfully");
      handleClose();
      setDisabledSubmitButton(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        {selectedProduct && (
          <Form
            initialValues={{
              name: selectedProduct.name,
              description: selectedProduct.description,
              category: selectedProduct.category,
              price: selectedProduct.price,
              type: selectedProduct.type,
            }}
            name="trigger"
            onFinish={(values) => {
              handleEditButton(values);
            }}
            onFinishFailed={(errorInfo) => {
              console.log(errorInfo);
            }}
            style={{
              maxWidth: 600,
            }}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Required" },
                { min: 4, message: "4oos ih baih" },
              ]}
            >
              <Input name="name" onChange={inputPress} />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ min: 1, required: true, type: "number" }]}
            >
              <Input
                type="number"
                name="price"
                onChange={inputPress}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input name="description" onChange={inputPress} />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input name="category" onChange={inputPress} />
            </Form.Item>
            <Form.Item label="image" name="image">
              <label>File</label>
              <input
                name="image"
                onChange={handleFileChange}
                placeholder="choose file"
                type="file"
              />
              <Image
                height={"60px"}
                src={newImageUrl ? newImageUrl : selectedProduct.image}
              />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Required" }]}
            >
              <Radio.Group
                options={options}
                onChange={(onChangeType, inputPress)}
                value={selectedType}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>

            <div className="d-flex just-s-evenly margin-top-10 gap-10">
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ width: "100%" }}
                disabled={disabledSubmitButton && lenght === 0}
              >
                Submit
              </Button>
              <Button
                block
                onClick={() => {
                  handleClose();
                  setDisabledSubmitButton(true);
                }}
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};
