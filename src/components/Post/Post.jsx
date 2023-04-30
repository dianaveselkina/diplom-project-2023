import React from 'react';
import './post.css';
import { ReactComponent } from '../img/like.svg';
export const Post = ({ title, text, image, tags }) => {
  return (
    <div className="card__conteiner">
      <p className="card__author">Имя пользователя</p>
      <img src={image} alt="картинка" />
      <span className="card__titlle">{title}</span>
      <p>{text}</p>
      <div className="card__info">
        <ReactComponent className="card__logotip" />
        <span>28 апреля 2023</span>
      </div>
    </div>
  );
};
