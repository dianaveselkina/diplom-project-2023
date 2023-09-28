import React, { useContext } from "react";
import "./style.module.css";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Login } from "@mui/icons-material";
import { Avatar, CardHeader, Container, Typography } from "@mui/material";
import { AllContextData } from "../../context/context";
import { useState } from "react";
import BasicModal from "../Modal/modal";
import CheckAvatar from "../../Utils/avatar";
import TransitionsModal from "../Modal/transitModal";
import s from './style.module.css';
import logo from '../img/logo.svg'

export const Header = () => {
  const { userData: userInfo, logOut } = useContext({ ...AllContextData });
  const [onpenUserModal, setOpenUserModal] = useState(false);
  const urlpage = useParams();

  return (
    <>
      <Container maxWidth='xl'
        sx={{
          position: "fixed",
          zIndex: 2,
          display: 'flex',
          height: '70px',
          backgroundColor: '#5fcdd9',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '300px',
        }}
      >
        {<Link to="/">
          <Button className={s.logo}>
            <img src={logo} height="50px" width="50px" /></Button>
        </Link>}

        <Container maxWidth='xl'>
          <div className="marquee-container">
            <span className="marquee">
              <pre>Журнал "Весёлые заметки"</pre>
            </span>
          </div>
        </Container >

        <BasicModal urlpage={urlpage} />
        {
          Object.entries(userInfo).length > 0
            ? <div style={{
              display: 'flex',
              justifyContent: 'end',
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
                }}
                title={userInfo?.about}
                subheaderTypographyProps={{
                  color: 'whitesmoke',
                }}
                subheader={userInfo?.name}
                onClick={() => setOpenUserModal(!onpenUserModal)}



              />

              <Button type="primary">
                <Login className="" onClick={() => logOut()} />
              </Button>
            </div>
            : null
        }
        <TransitionsModal onpenUserModal={onpenUserModal} setOpenUserModal={setOpenUserModal} />
      </Container >
    </>
  );
};