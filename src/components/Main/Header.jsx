import React, { useContext } from "react";
import { ReactComponent } from "../img/logo.svg";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Login } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, CardHeader, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { AllContextData, ThemeContext } from "../../context/context";
import { useState } from "react";
import BasicModal from "../Modal/modal";
import CheckAvatar from "../../Utils/avatar";

export const Header = ({ onSort }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user: userInfo, logOut } = useContext({ ...AllContextData });
  const [onpenUserModal, setOpenUserModal] = useState(false);
  const urlpage = useParams();

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

      {/* <Stack spacing={2} direction="row">
        <Link to="./userpage">
          <Button type="primary">
            <AccountCircleIcon
              onClick={() => setOpenUserModal(!onpenUserModal)}
            />
            <Login className="" onClick={() => logOut()} />
          </Button>
        </Link> */}

{
        Object.entries(userInfo).length > 0
            ? <div style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '5vw'
            }}>
                <CardHeader className=''
                    avatar={
                        userInfo && <Avatar aria-label="recipe" src={CheckAvatar(userInfo)}
                        >
                            {CheckAvatar(userInfo)}
                        </Avatar>
                    }
                    subheader={userInfo?.name}
                    onClick={() => setOpenUserModal(!onpenUserModal)}
                />
                
                <Button type="primary">
            <Login className="" onClick={() => logOut()} />
          </Button>
            </div>
            : null
    }


        {/* <Link to="/createpostpage" className="header__button"> */}
          <BasicModal urlpage={urlpage} />
          {/* <Button variant="contained">Прислать заметку</Button> */}
        {/* </Link> */}

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
      {/* </Stack> */}
    </div>
  );
};
