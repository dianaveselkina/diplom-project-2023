import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge } from "@mui/material";
import { PostComment } from "./PostComment";

export default function PostComments({ comments, id }) {

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <span style={{ paddingRight: "15px" }}>Комментарии</span>
            <Badge badgeContent={comments?.length} color="primary" />
          </Typography>
        </AccordionSummary>

        {<AccordionDetails>
          {comments.map((comment) =>
            <PostComment
              key={comment._id}
              postId={id}
              {...comment}
            />
          )}
        </AccordionDetails>}
      </Accordion>
    </div>
  );
}
