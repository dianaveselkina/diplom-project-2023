import { ReactComponent } from '../img/logo.svg';
import './style.css';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Search } from 'react-router';

export const Header = () => {
  return (
    <div className='header'>
      <ReactComponent className='header__logotip' />
      <div className='marquee-container'>
        <span className='marquee'>
          <pre>Журнал "Весёлые заметки"</pre>
        </span>
      </div>

      <Link to='CreatePostPage' className='header__button'>
        <Stack spacing={2} direction='row'>
          <Link to='/userpage'>
            <div class='header__userprofile'>
              <span class='img__userprofile'>
                <img
                  src='https://i.yapx.ru/WAHaj.png'
                  width={'50px'}
                  height={'50px'}
                />
              </span>
              <button type='button' class='ant-btn css-htwhyh ant-btn-default'>
                <span>изменить</span>
              </button>
            </div>
          </Link>
          <Link to='/createpostpage'>
            <Button variant='contained'>Прислать заметку</Button>
          </Link>
        </Stack>
      </Link>
    </div>
  );
};
