import React, { useContext } from "react";
import { CardHeader } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
import "./index.css";
import { api } from "../../Utils/api";
import { AllContextData } from "../../context/context";
import { Delete } from "@mui/icons-material";

export const PostComment = ({ postId, author, created_at, text, ...rest }) => {
  const { updatePostState } = useContext(AllContextData)

  function delComment() {
    api.deleteComments(rest._id, postId).then((data) => updatePostState(data));
  }

  return (
    <div className="post-comment">
      <CardHeader
        sx={{ maxWidth: "200px", padding: "5px" }}
        avatar={<Avatar aria-label="recipe" src={author.avatar}></Avatar>}
        title={author.name}
        subheader={dayjs(created_at).format("hh:mm DD-MM-YYYY")}
      />
      <div className="comment-text">{text}</div>
      <IconButton
        onClick={() => delComment()}
        className="comment-deleteBtn-icon"
      >
        <Delete className="comment-delete-icon" />
      </IconButton>
    </div>
  );
};
