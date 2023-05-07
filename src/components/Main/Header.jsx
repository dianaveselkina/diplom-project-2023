import { ReactComponent } from '../img/logo.svg';
import './style.css';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Login } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Header = () => {
  /* const setUserPage = false; */

  return (
    <div className='header'>
      <ReactComponent className='header__logotip' />
      <div className='marquee-container'>
        <span className='marquee'>
          <pre>Журнал "Весёлые заметки"</pre>
        </span>
      </div>

      <Stack spacing={2} direction='row'>
        <Link to='./userpage'>
          <Button
            type='primary'
            /* onClick={() => {
              setUserPage(true);
            }} */
          >
            <AccountCircleIcon />
            <Login className='card__favorite-icon' />
          </Button>
        </Link>

        <Link to='/createpostpage' className='header__button'>
          <Button variant='contained'>Прислать заметку</Button>
        </Link>
      </Stack>
    </div>
  );
};
