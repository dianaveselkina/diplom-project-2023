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
      <span className="card__titlle">{title}</span>
      <p>{text}</p>
      <div className="card__info">
        <div className="card__time">
          {dayjs(created_at).format("HH:MM:s DD/MM/YYYY")}
        </div>
        <button
          className="card__like card__like_active"
          type="button"
          onClick={handleClick}
        >
          {tags.length ? (
            <Link to={`/post/${_id}`}>
              <IconButton aria-label="go to comments">
                <Badge badgeContent={tags.length} color="primary">
                  <StyleIcon color="gray" />
                </Badge>
              </IconButton>
            </Link>
          ) : null}
          <ReactComponent />
        </button>
      </div>
    </div>
  );
};
/* 
<button onClick={handleClick} className={`card__favorite ${isLiked ? 'card__favorite_active' : ''}`}>
                    <Like />
                </button> */
