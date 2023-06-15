import React, { useContext } from "react";
// import { ReactComponent as Logo } from "../img/logo.svg";
import "./style.module.css";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Login } from "@mui/icons-material";
import { Avatar, CardHeader, Container } from "@mui/material";
import { AllContextData } from "../../context/context";
import { useState } from "react";
import BasicModal from "../Modal/modal";
import CheckAvatar from "../../Utils/avatar";
import TransitionsModal from "../Modal/transitModal";
import s from './style.module.css';

export const Header = () => {
  /* const { theme, setTheme } = useContext(ThemeContext); */
  const { userData: userInfo, logOut } = useContext({ ...AllContextData });
  const [onpenUserModal, setOpenUserModal] = useState(false);
  const urlpage = useParams();

  return (
    <>
      <Container maxWidth='xl'
        sx={{
          position: "fixed",
          zIndex: 2,
          display: 'flex', alignItems: 'space-around',
          height: '80px',
          backgroundColor: '#5fcdd9',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '10px',
          margin: 2,
          minWidth: '300px',
        }}
      >
        {<Link to="/">
          <button type="button" className="header__logo">
            {/* <Logo className="header__logotip" /> */}
          </button>
        </Link>}
        <div className="marquee-container">
          <span className="marquee">
            <pre>Журнал "Весёлые заметки"</pre>
          </span>
        </div>
        {
          Object.entries(userInfo).length > 0
            ? <div style={{
              display: 'flex',
              alignItems: 'center',
              paddingRight: '1vw'
            }}>
              <CardHeader className={s.headerUserData}
                avatar={
                  userInfo && <Avatar aria-label="recipe" src={CheckAvatar(userInfo)}
                  >
                    {CheckAvatar(userInfo)}
                  </Avatar>
                }
                titleTypographyProps={{
                  color: 'white',
                }} />

              <Button type="primary">
                <Login className="" onClick={() => logOut()} />
              </Button>
            </div>
            : null
        }
        <TransitionsModal onpenUserModal={onpenUserModal} setOpenUserModal={setOpenUserModal} />
        <BasicModal urlpage={urlpage} />
        {/* <FormGroup>
          <FormControlLabel
            control={
              {<Switch onChange={() => setTheme(!theme)} defaultChecked /> }
            }
            label="Тема"
          />
        </FormGroup> */}
      </Container >
    </>
  );
};