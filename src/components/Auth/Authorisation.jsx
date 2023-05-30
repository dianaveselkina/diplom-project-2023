import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { useState } from "react";
import { FormAuth } from "../Form/FormAuth";
import { FormReg } from "../Form/FormReg";
import s from "./auth.module.css";

export const Authorisation = () => {
  const [authReg, setAuthReg] = useState(true);

  const style = {
    position: "absolute",
    top: "38%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={s.authPage}>
        <div className="">
          <div>Hеобходима авторизация</div>

          <div className={s.buttonBlock}>
            <button
              className={s.authBtn}
              onClick={() => {
                handleOpen();
                setAuthReg(true);
              }}
            >
              Авторизация
            </button>
            или
            <button
              className={s.authBtn}
              onClick={() => {
                handleOpen();
                setAuthReg(false);
              }}
            >
              Регистарция
            </button>
          </div>
        </div>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style}>
              {authReg ? 
                <FormAuth
                  authReg={authReg}
                  handleClose={handleClose}
                  setAuthReg={setAuthReg}
                />
               : 
                <FormReg
                  authReg={authReg}
                  handleClose={handleClose}
                  setAuthReg={setAuthReg}
                />
              }
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};
