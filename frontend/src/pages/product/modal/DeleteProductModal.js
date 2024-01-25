import { Button } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../component";
import {
  useNotificationContext,
  useProductsContext,
  useUserContext,
} from "../../../context";

export const DeleteProductModal = (props) => {
  const { handleCloseDelete, openDelete, id, product } = props;

  const { successNotification, errorNotification } = useNotificationContext();
  const { Delete_Product } = useProductsContext();
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const name = product?.name;

  const handleDeleteButton = async () => {
    try {
      const response = await axios.delete(
        // `https://fullstack-backend-pm5t.onrender.com/products/${id}`,
        `http://localhost:8080/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.data;

      Delete_Product(data._id);
      successNotification(`(${name}) - Product Deleted successfully`);
      handleCloseDelete();
      navigate("/products");
    } catch (err) {
      errorNotification(err?.message);
      console.error(err);
    }
  };

  return (
    <div>
      <Modal handleClose={handleCloseDelete} open={openDelete}>
        <div className="d-flex flex-direction-c gap-10">
          <div className="d-flex just-c align-c">
            <h3>Are you sure to delete {name} ?</h3>
          </div>
          <div className="d-flex just-s-evenly margin-top-10 gap-10">
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ width: "100%" }}
              onClick={() => {
                handleDeleteButton(id);
              }}
            >
              Delete
            </Button>
            <Button
              block
              onClick={() => {
                handleCloseDelete();
              }}
              style={{ width: "100%" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
