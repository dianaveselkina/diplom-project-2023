import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const ErrorPage = () => {
  return (
    <div className='err__container'>
      <Link to='/' className='btn__home'>
        <button>Вернуться на главную страницу</button>
      </Link>
      <div className='err__image'></div>
    </div>
  );
};
