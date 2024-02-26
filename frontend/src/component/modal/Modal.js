import { Box, Modal as MuiModal } from "@mui/material";
import React from "react";
import { useResponsiveContext } from "../../context";

export const Modal = (props) => {
  const { open, handleClose, children } = props;

  const { mobile, tablet, desktop } = useResponsiveContext();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: mobile ? 360 : 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  return (
    <div>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </MuiModal>
    </div>
  );
};
