import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "../../../component/modal";
import { useNotesContext } from "../../../context/NotesContext";
import { useNotificationContext } from "../../../context/NotificationContext";
import { useUserContext } from "../../../context/UserContext";

export const EditNoteModal = (props) => {
  const { handleClose, open, selectedNote, id } = props;
  const { Update_Note } = useNotesContext();
  const { currentUser } = useUserContext();

  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);

  const inputPress = (e) => {
    const { value, name } = e.target;
    console.log("inputPress", value, name);

    setDisabledSubmitButton(value === selectedNote[name]);
  };

  const { successNotification, warningNotification } = useNotificationContext();

  const handleEditButton = async (values) => {
    const updatedNote = {
      name: values.name,
      description: values.description,
      goal: values.goal,
      category: values.category,
    };

    try {
      const response = await axios.put(
        `https://fullstack-backend-pm5t.onrender.com/notes/${id}`,
        updatedNote,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.data;

      Update_Note(data);

      successNotification("Note edited successfully");
      handleClose();
      setDisabledSubmitButton(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Modal handleClose={handleClose} open={open}>
        {selectedNote && (
          <Form
            initialValues={{
              name: selectedNote.name,
              description: selectedNote.description,
              goal: selectedNote.goal,
              category: selectedNote.category,
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
              label="Goal"
              name="goal"
              rules={[{ min: 1, required: true }]}
            >
              <Input name="goal" onChange={inputPress} />
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

            <div className="d-flex just-s-evenly margin-top-10 gap-10">
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ width: "100%" }}
                disabled={disabledSubmitButton}
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
