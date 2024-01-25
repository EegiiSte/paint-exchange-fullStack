import { Button, message } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../../component";
import { useNotesContext } from "../../../context/NotesContext";
import { useNotificationContext } from "../../../context/NotificationContext";
import { useUserContext } from "../../../context/UserContext";

export const DeleteNoteModal = (props) => {
  const { handleCloseDelete, openDelete, id } = props;

  const navigate = useNavigate();

  const { currentUser } = useUserContext();
  const { successNotification } = useNotificationContext();
  const { Delete_Note } = useNotesContext();

  const handleDeleteButton = async () => {
    try {
      const response = await axios.delete(
        // `https://fullstack-backend-pm5t.onrender.com/notes/${id}`,
        `http://localhost:8080/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;

      Delete_Note(data._id);

      handleCloseDelete();
      navigate("/notes");

      successNotification("Note Deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Modal handleClose={handleCloseDelete} open={openDelete}>
        <div className="d-flex flex-direction-c gap-10">
          <div className="d-flex just-c">
            <h3>Are You sure?</h3>
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
