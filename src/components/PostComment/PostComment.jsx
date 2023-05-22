import React, { useContext } from "react";
import { CardHeader } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
/* import checkAvatar from "../../utils/avatar"; */
import "./index.css";
import { api } from "../../Utils/api";
import { PostContext } from "../../context/context";

export const PostComment = ({ comment, setPost }) => {
  const { updatePostState } = useContext(PostContext);
  const { author, text, created_at, post, _id } = comment;
  console.log(comment);

  function delComment() {
    api.deleteComment(post, _id).then((data) => {
      updatePostState(data);
      setPost(data);
    });
  }

  return (
    <div className="post-comment">
      <CardHeader
        sx={{ maxWidth: "200px", padding: "5px" }}
        avatar={<Avatar aria-label="recipe" src={author.avatar}></Avatar>}
        title={author?.name}
        subheader={dayjs(created_at).format("hh:mm DD-MM-YYYY")}
      />
      <div className="comment-text">{text}</div>
      <IconButton
        onClick={() => delComment()}
        className="comment-deleteBtn-icon"
      >
        <DeleteIcon className="comment-delete-icon" />
      </IconButton>
    </div>
  );
};
