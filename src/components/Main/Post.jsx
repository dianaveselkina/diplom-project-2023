import React, { useContext } from 'react';
import dayjs from 'dayjs';
import './style.css';
import { ReactComponent as Like } from '../img/like.svg';
import { Link } from 'react-router-dom';
import { Avatar, Badge, CardHeader, IconButton } from '@mui/material';
import { ThemeContext, AllContextData } from '../../context/context';
import CommentIcon from '@mui/icons-material/Comment';
import CheckAvatar from '../../Utils/avatar';
import { DeleteForever, Favorite, QuestionAnswer, Style } from '@mui/icons-material';
import cN from "classnames";

export const Post = ({
  image,
  comments,
  author,
  updated_at,
  post,
  title,
  text,
  likes,
  userId,
  tags,
  _id,
  created_at,
  ...args
}) => {
  const { theme } = useContext(ThemeContext);
  const user = useContext({ ...AllContextData });
  const { handleLike, data } = useContext(AllContextData);
  const deletePost = data

  const handleClick = () => {
    handleLike(post, isLikedPost);
  };
  const isLikedPost = likes.some((e) => e === user._id);

  let dataAuthor;

  if (user._id === author._id) {
    dataAuthor = user.user;
  } else {
    dataAuthor = author;
  }

  return (
    <div className={`card__container postlist__${theme ? 'light' : 'dark'} `}>
      <Link to={`/post/${_id}`} className="post__link">
        <CardHeader
          avatar={
            author && (
              <Avatar aria-label="recipe" src={CheckAvatar}>
                {CheckAvatar}
              </Avatar>
            )
          }
          title={dataAuthor.about + ' ' + dataAuthor.name}
        />
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
          className={`card__like ${isLikedPost ? 'card__like_active' : ''}`}
        >
          <Badge badgeContent={likes.length} color="primary"></Badge>
          <Like />
        </button>

        {comments.length ?
          <Link to={`/post/${_id}`}>
            <IconButton aria-label="go to comments" >
              <Badge badgeContent={comments.length} color='primary'  >
                <QuestionAnswer color='gray' />
              </Badge>
            </IconButton>
          </Link>
          : null}

        {/* {tags.length ?
          <Link to={`/post/${_id}`}>
            <IconButton aria-label="go to comments" >
              <Badge badgeContent={tags.length} color='primary'  >
                <Style color='gray' />
              </Badge>
            </IconButton>
          </Link>
          : null} */}

        <div className="post__sticky post__sticky_type_bottom-right">

          {
            user.user._id === author._id
              ? <IconButton onClick={() => deletePost(author, _id)} className='comment-deleteBtn-icon'>
                <DeleteForever className='comment-delete-icon' />
              </IconButton>
              : null
          }


          {/* <Link to={`/post/${_id}`}>
            <IconButton aria-label="go to comments">
              <Badge badgeContent={comments.length} color="primary">
                <CommentIcon color="gray" />
              </Badge>
            </IconButton>
          </Link> */}
        </div>
      </div>
    </div>
  );
};
