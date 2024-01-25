import { Button, ColorPicker, Flex } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/Header";
import { useNotesContext } from "../../context/NotesContext";
import { useThemeContext } from "../../context/ThemeContext";
import { CreateNoteModal } from "./CreateNoteModal";

import "./Notes.css";

export const Notes = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { notes, notesContextLoading } = useNotesContext();
  const { theme } = useThemeContext();

  const [bgColor, setBgColor] = useState("#cbdaf0a8");
  const [cardBoxColor, setCardBoxColor] = useState("#0000006c");
  const [textColor, setTextColor] = useState("white");

  if (notesContextLoading) {
    return <div>...Loading Notes</div>;
  }
  return (
    <div className="d-flex align-c flex-wrap-wrap just-c">
      <Header />
      <div
        className="d-flex flex-direction-c just-s-evenly width-100pr padding-top-10"
        style={{
          textShadow:
            theme === "light" ? "0px 0px 0px black" : "0px 0px 0px black",
          color: theme === "light" ? "black" : "white",
          backgroundColor: theme === "light" ? "#cbdaf0a8" : bgColor,
        }}
      >
        <div className="d-flex flex-direction-row just-s-evenly gap-top-10">
          This is Notes page
          <div>
            <Button
              block
              onClick={handleOpen}
              style={{
                backgroundColor: theme === "light" ? "white" : "#0000007c",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Create Note
            </Button>
          </div>
        </div>
        {theme === "light" ? (
          <div />
        ) : (
          <div className="d-flex flex-direction-row just-s-evenly">
            <div className="d-flex flex-direction-row align-c gap-10">
              <p>Background Color</p>
              <ColorPicker
                showText
                value={bgColor}
                onChangeComplete={(color) => {
                  setBgColor(color.toHexString());
                }}
              />
            </div>
            <div className="d-flex flex-direction-row align-c gap-10">
              <p>Card Box Color</p>
              <ColorPicker
                showText
                value={cardBoxColor}
                onChangeComplete={(color) => {
                  setCardBoxColor(color.toHexString());
                }}
              />
            </div>
            <div className="d-flex flex-direction-row align-c gap-10">
              <p>Text Color</p>
              <ColorPicker
                showText
                value={textColor}
                onChangeComplete={(color) => {
                  setTextColor(color.toHexString());
                }}
              />
            </div>
          </div>
        )}
        <Flex
          wrap="wrap"
          gap="middle"
          align="center"
          justify="center"
          style={{
            padding: 20,
          }}
        >
          {notes &&
            notes.map((note) => (
              <div
                className="d-flex flex-wrap-wrap just-c align-c"
                key={note.id}
                style={{
                  boxShadow:
                    theme === "light"
                      ? "0px 0px 10px gray"
                      : "0px 0px 20px white",
                  backgroundColor: theme === "light" ? "white" : cardBoxColor,
                  width: 200,
                  height: 160,
                  borderRadius: "10px",
                  padding: "20px",
                  margin: "20px",
                  color: theme === "light" ? "black" : textColor,
                }}
                onClick={() => navigate(`/notes/${note._id}`)}
              >
                <p>Name : {note.name}</p>
                <p>Goal : {note.goal}</p>
                <p>Description : {note.description}</p>
                <p>Category : {note.category}</p>
              </div>
            ))}
        </Flex>
        <CreateNoteModal handleClose={handleClose} open={open} />
      </div>
    </div>
  );
};
