import { ReactComponent } from "../img/logo.svg";
import "./style.css";
import { Link } from "react-router-dom";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Search } from "react-router";

export const Header = () => {
  return (
    <div className="header">
      <ReactComponent className="header__logotip" />
      <div className="marquee-container">
        <span className="marquee">
          <pre>Журнал "Весёлые заметки"</pre>
        </span>
      </div>
      <Link to="CreatePostPage" className="header__button">
        <Stack spacing={2} direction="row">
          <Button variant="contained">Прислать заметку</Button>
        </Stack>
      </Link>
    </div>
  );
};
