import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { PostTag } from "./PostTag";

export const PostTagList = ({ tags, id }) => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <span style={{ paddingRight: "15px" }}>tags</span>
            <Badge badgeContent={tags?.length} color="primary" />
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div>
            Теги
            {tags?.map((tag, index) => (
              <PostTag key={index} index={index} tag={tag} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
