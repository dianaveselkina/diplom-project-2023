import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../Utils/api";
import { PostComment } from "./PostComment";

export default function PostComments({ comments, id, setPost }) {
  const [postCommentState, setPostCommentState] = useState([]);

  useEffect(() => {
    if (id) api.getPostsComments(id).then((data) => setPostCommentState(data));
  }, [id, comments]);

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <span style={{ paddingRight: "15px" }}>Комментарии</span>
            <Badge badgeContent={comments?.length} color="primary" />
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          {postCommentState.map((e) => (
            <PostComment
              key={e._id}
              postId={id}
              comment={e}
              setPost={setPost}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
