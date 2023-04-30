import React from 'react';
import './post.css';
import { ReactComponent } from '../img/like.svg';
export const Post = () => {
  return (
    <div className="card__conteiner">
      <p className="card__author">Имя пользователя</p>
      <img
        src="https://kartinkof.club/uploads/posts/2022-03/1648643818_1-kartinkof-club-p-smeshnaya-kartinka-pozdravlyayu-1.jpg"
        alt="картинка"
      />
      <span className="card__titlle">Довольная мышь</span>
      <p>
        Дорогая, в холодильнике мышь повесилась! — Не трогай, это на Новый год!
      </p>
      <div className="card__info">
        <ReactComponent className="card__logotip" />
        <span>28 апреля 2023</span>
      </div>
    </div>
  );
};
