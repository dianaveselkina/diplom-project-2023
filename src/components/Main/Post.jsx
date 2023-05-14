import React, { useContext } from 'react';
import dayjs from 'dayjs';
import './style.css';
import { ReactComponent as Like } from '../img/like.svg';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import { UserContext } from '../../context/userContext';
import { ThemeContext } from '../../context/themeContext';
import { PostContext } from '../../context/postContext';

export const Post = ({
  post,
  title,
  text,
  image,
  likes,
  userId,
  tags,
  _id,
  created_at,
  ...args
}) => {
  const { theme } = useContext(ThemeContext);
  const user = useContext(UserContext);
  const { handleLike } = useContext(PostContext);

  const handleClick = () => {
    handleLike(post, isLiked);
  };
  const isLiked = likes.some((e) => e === user._id);
  return (
    <div className={`card__container postlist__${theme ? 'light' : 'dark'} `}>
      <Link to={`/post/${_id}`} className="post__link">
        <p className="card__author">Имя пользователя</p>
        <img className="card__img" src={image} alt="Изображение" />
        <span className="card__title">{title}</span>
        <p className="card__text">{text}</p>
      </Link>
      <div className="card__info">
        <div className="card__time">
          {dayjs(created_at).format('HH:MM:s DD/MM/YYYY')}
        </div>

        <button
          onClick={handleClick}
          className={`card__like ${isLiked ? 'card__like_active' : ''}`}
        >
          <Badge badgeContent={likes.length} color="primary"></Badge>
          <Like />
        </button>
      </div>
    </div>
  );
};
