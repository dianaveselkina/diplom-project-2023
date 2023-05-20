import React, { useContext } from "react";
import { ReactComponent } from "../img/logo.svg";
import "./style.css";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Login } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { UserContext, ThemeContext } from "../../context/context";
import { useState } from "react";

export const Header = ({ onSort }) => {
  const user = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { userData: userInfo, logOut } = useContext({ ...UserContext });
  const [onpenUserModal, setOpenUserModal] = useState(false);

  return (
    <div className="header">
      <Link to="/">
        <button type="button" className="header__logo">
          <ReactComponent className="header__logotip" />
        </button>
      </Link>
      <div className="marquee-container">
        <span className="marquee">
          <pre>Журнал "Весёлые заметки"</pre>
        </span>
      </div>

      <Stack spacing={2} direction="row">
        <Link to="./userpage">
          <Button type="primary">
            <AccountCircleIcon
              onClick={() => setOpenUserModal(!onpenUserModal)}
            />
            <Login className="" onClick={() => logOut()} />
          </Button>
        </Link>

        <Link to="/createpostpage" className="header__button">
          <Button variant="contained">Прислать заметку</Button>
        </Link>

        {/* кнопка для переключения темы */}
        <div className="">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch onChange={() => setTheme(!theme)} defaultChecked />
              }
              label="Тема"
            />
          </FormGroup>
        </div>
      </Stack>
    </div>
  );
};
