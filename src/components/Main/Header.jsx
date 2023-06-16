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
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

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
          display: 'flex',
          height: '80px',
          backgroundColor: '#5fcdd9',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '10px',
          /* margin: 2, */
          minWidth: '300px',
          left: '65px',
        }}
      >
        {<Link to="/">
          <Button type="primary">
            <SentimentVerySatisfiedIcon />
            <EmojiEmotionsIcon />
          </Button>
        </Link>}
        <Container maxWidth='xl'
          sx={{}}>
          <div className="marquee-container">
            <span className="marquee">
              <pre>Журнал "Весёлые заметки"</pre>
            </span>
          </div>
        </Container >
        {/* <Typography variant="h5" element="div" color={'primary'} marginLeft={'100'}>
          <pre>Журнал "Весёлые заметки"</pre>
        </Typography> */}

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
                } />

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