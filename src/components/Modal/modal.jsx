import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Form } from '../Form/FormAddPost';
import PostAddIcon from '@mui/icons-material/PostAdd';
import './modal.css';
import { IconButton } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { AllContextData } from '../../context/context';
import { FormComment } from '../Form/FormComment';

export default function BasicModal({ urlpage, post, setPosts }) {
  const user = React.useContext({ ...AllContextData });

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const style = {
    position: 'absolute',
    top: '38%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };

  return (
    <div>
      {!urlpage.postId ?
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<PostAddIcon />}
        >Добавить заметку</Button>
        : user?.user._id === post?.author?._id ?
          <IconButton
            aria-label="Редакировать"
            onClick={handleOpen}
            className="post_addComment_btn"
          >
            <div style={{ fontSize: '15px' }}>Редактировать...</div>
            <DriveFileRenameOutlineIcon />
          </IconButton>
          : null}

      {urlpage.postId ?
        <IconButton
          aria-label="добавить коммент"
          onClick={handleOpen2}
          className="post_addComment_btn"
        >
          <PostAddIcon />
          <div style={{ fontSize: '15px' }}>добавить комментарий...</div>
        </IconButton>
        : null}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Form handleClose={handleClose} {...post} setPosts={setPosts} />
        </Box>
      </Modal>

      <Modal open={open2} onClose={handleClose2}>
        <Box className="modalstule">
          <FormComment
            handleClose2={handleClose2}
            {...post}
            setPosts={setPosts}
          />
        </Box>
      </Modal>
    </div>
  );
}
