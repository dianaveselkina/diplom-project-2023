import React from 'react';

import './style.css';
import { ReactComponent } from './img/like.svg';
export const Post = ({ title, text, image, tags }) => {
  const handleClick = (e) => {
    e.currentTarget.classList.toggle('card__like_active');
  };
  return (
    <div className="card__conteiner">
      <p className="card__author">Имя пользователя</p>
      <img src={image} alt="картинка" />
      <span className="card__titlle">{title}</span>
      <p>{text}</p>
      <div className="card__info">
        <button
          className="card__like card__like_active"
          type="button"
          onClick={handleClick}
        >
          <ReactComponent />
        </button>
        <span>28 апреля 2023</span>
      </div>
    </div>
  );
};
