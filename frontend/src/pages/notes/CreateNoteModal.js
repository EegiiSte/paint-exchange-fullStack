import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { Modal } from "../../component";
import { useNotesContext } from "../../context/NotesContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { useUserContext } from "../../context/UserContext";

export const CreateNoteModal = (props) => {
  const { handleClose, open } = props;

  //input values
  const { Create_Note } = useNotesContext();
  const { currentUser } = useUserContext();
  const { successNotification } = useNotificationContext();

  const baldan = async (values) => {
    console.log(`baldangaas - ${values}`, values);
    const newNote = {
      name: values.name,
      description: values.description,
      goal: values.goal,
      category: values.category,
    };
    const response = await axios.post(
      // "https://fullstack-backend-pm5t.onrender.com/notes",
      "http://localhost:8080/notes",
      newNote,
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    const data = await response.data;

    Create_Note(data);
    handleClose();
    successNotification("Create Note successfully");
  };

  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        <div className="d-flex flex-direction-c gap-10">
          <div className="d-flex just-c">
            <h3>Create Product</h3>
          </div>

          <Form
            name="trigger"
            onFinish={(values) => {
              baldan(values);
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Goal"
              name="goal"
              rules={[{ min: 1, required: true }]}
            >
              <Input
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>

            <div className="d-flex just-s-evenly margin-top-10 gap-10">
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ width: "100%" }}
              >
                Create
              </Button>
              <Button
                block
                onClick={() => {
                  handleClose();
                }}
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
