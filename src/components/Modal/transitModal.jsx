import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { FormUserInfo } from '../Form/FormUserInfo';

export default function TransitionsModal({ onpenUserModal, setOpenUserModal }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (onpenUserModal) {
      handleOpen();
      setOpenUserModal(!onpenUserModal)
    }
  }, [onpenUserModal, setOpenUserModal])

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            width: 500,
            bgcolor: 'gray',
            border: '2px solid rgb(8, 68, 219)',
            boxShadow: 35,
            p: 4,
          }
          }>
            <FormUserInfo handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}