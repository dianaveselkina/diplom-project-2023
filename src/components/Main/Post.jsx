import React, { useContext } from "react";
import dayjs from "dayjs";
import "./style.css";
import { ReactComponent } from "../img/like.svg";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { UserContext } from "../../context/userContext";
import { ThemeContext } from "../../context/themeContext";

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
  // const handleClick = (e) => {
  //   e.currentTarget.classList.toggle('card__like_active');
  // };
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <div className={` card card__${theme ? "light" : "dark"} `}>
      <div className="card__container">
        <Link to={`/post/${_id}`} className="post__link">
          <p className="card__author">Имя пользователя</p>
          <img src={image} alt="Изображение" />
          <span className="card__titlle">{title}</span>
          <p className="card__text">{text}</p>
        </Link>

        <div className="card__info">
          <div className="card__time">
            {dayjs(created_at).format("HH:MM:s DD/MM/YYYY")}
          </div>

          <button
            className="card__like card__like_active"
            type="button"
            // onClick={handleClick}
          >
            <Badge badgeContent={likes.length} color="primary"></Badge>
            <ReactComponent />
          </button>
        </div>
      </div>
    </div>
  );
};
