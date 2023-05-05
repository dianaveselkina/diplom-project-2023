import React from 'react';

import './style.css';
import { ReactComponent } from '../img/like.svg';
// import { Link, NavLink } from 'react-router-dom';

export const Post = ({ title, text, image, likes, userId, tags, ...args }) => {
  const handleClick = (e) => {
    e.currentTarget.classList.toggle('card__like_active');
  };
  return (
    <div className="card__conteiner">
      <p className="card__author">Имя пользователя</p>
      <img src={image} alt="Изображение" />
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
        <span>$('HH:MM:s DD/MM/YYYY')</span>
      </div>
    </div>
  );
};
/* 
<button onClick={handleClick} className={`card__favorite ${isLiked ? 'card__favorite_active' : ''}`}>
                    <Like />
                </button> */
