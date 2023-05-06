import React from "react";
import dayjs from "dayjs";
import "./style.css";
import { ReactComponent } from "../img/like.svg";
import { Link, NavLink } from "react-router-dom";
import StyleIcon from "@mui/icons-material/Style";
import { Badge, IconButton } from "@mui/material";

export const Post = ({
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
  const handleClick = (e) => {
    e.currentTarget.classList.toggle("card__like_active");
  };

  return (
    <div className="card__conteiner">
      <p className="card__author">Имя пользователя</p>
      <img src={image} alt="Изображение" />
      <Link to={`/post/${_id}`} className="post__link"></Link>
      <div className="info__content"></div>
      <span className="card__titlle">{title}</span>
      <p>{text}</p>
      <div className="card__info">
        <div className="card__time">
          {dayjs(created_at).format("HH:MM:s DD/MM/YYYY")}
        </div>

        {/*         <IconButton
          aria-label="card__like card__like_active"
          color={({ gray: !likes.length }, { warning: likes.length })}
          type="button"
          onClick={() => handleClick(likes, _id)}
        ></IconButton> */}

        {
          <button
            className="card__like card__like_active"
            type="button"
            onClick={handleClick}
          >
            <Badge badgeContent={likes.length} color="primary"></Badge>
            <ReactComponent />
          </button>
        }
      </div>
    </div>
  );
};
/* 
<button onClick={handleClick} className={`card__favorite ${isLiked ? 'card__favorite_active' : ''}`}>
                    <Like />
                </button> */
