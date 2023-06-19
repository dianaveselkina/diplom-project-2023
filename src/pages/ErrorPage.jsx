import React from 'react';
import { Link } from 'react-router-dom';
import './pages.module.css';
import { Button } from '@mui/material';

export const ErrorPage = () => {
  return (
    <div className="err__container">
      <div className="err__image"></div>
      <Link to="/" className="btn__home">
        <Button variant="outlined">Вернуться на главную страницу</Button>
      </Link>
    </div>
  );
};
