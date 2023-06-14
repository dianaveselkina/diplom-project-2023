import React, { useContext } from "react";
import { CardHeader } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
import "./index.css";
import { api } from "../../Utils/api";
import { AllContextData } from "../../context/context";
import CheckAvatar from "../../Utils/avatar";
import HTMLReactParser from "html-react-parser";

export const PostComment = ({ postId, author, created_at, text, ...rest }) => {

  const data = useContext(AllContextData)

  const updatePostState = data[4]

  function delComment() {
    api.deleteComments(rest._id, postId).then((data) => updatePostState(data));
  }

  return (
    <div className="post-comment">
      <CardHeader
        sx={{ maxWidth: "200px", padding: "5px" }}
        avatar={<Avatar aria-label="recipe" src={CheckAvatar(author)}>{CheckAvatar(author)}</Avatar>}
        title={author.name}
        subheader={dayjs(created_at).format("hh:mm DD-MM-YYYY")}
      />
      {/* HTMLReactParser(string[, options]). Парсер преобразует строку HTML в React element */}
      <div className="comment-text">{HTMLReactParser(text)}</div>
      <IconButton
        onClick={() => delComment()}
        className="comment-deleteBtn-icon"
      >
        <DeleteIcon className="comment-delete-icon" />
      </IconButton>
    </div>
  );
};
