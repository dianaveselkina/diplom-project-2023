import React, { useContext } from "react";
import { CardHeader } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
/* import checkAvatar from "../../utils/avatar"; */
import "./index.css";
import { api } from "../../Utils/api";
import { AllContextData } from "../../context/context";
import CheckAvatar from "../../Utils/avatar";

export const PostComment = ({ postId, author, created_at, text, ...rest }) => {

  const { data, updatePostState } = useContext(AllContextData);
  /* const { author, text, created_at, post, _id } = comment; */

  function delComment() {
    api.deleteComment(rest._id, postId).then((data) => updatePostState(data));
  }

  return (
    <div className="post-comment">
      <CardHeader
        sx={{ maxWidth: "200px", padding: "5px" }}
        avatar={<Avatar aria-label="recipe" src={CheckAvatar(author)}></Avatar>}
        title={author.name}
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
