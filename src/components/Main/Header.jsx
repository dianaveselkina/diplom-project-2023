import React, { useContext /* , { useContext } */ } from "react";
import { ReactComponent } from "../img/logo.svg";
import "./style.css";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Login } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { ThemeContext } from "../../context/themeContext";
import { UserContext } from "../../context/userContext";

export const Header = ({ onSort }) => {
  const user = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="header">
      <ReactComponent className="header__logotip" />

      <div className="marquee-container">
        <span className="marquee">
          <pre>Журнал "Весёлые заметки"</pre>
        </span>
      </div>

      <Stack spacing={2} direction="row">
        <Link to="./userpage">
          <Button type="primary">
            <AccountCircleIcon />
            <Login className="card__favorite-icon" />
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
              label="On"
            />
          </FormGroup>
        </div>
      </Stack>
    </div>
  );
};
