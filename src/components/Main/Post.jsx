import React, { useContext } from 'react';
import dayjs from 'dayjs';
import './style.module.css';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { AllContextData } from '../../context/context';
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
  /* const { theme } = useContext(ThemeContext); */
  const { user, data } = useContext({ ...AllContextData });
  const changeStateLikedPost = data[1]
  const deletePost = data[2]

  /* const handleClick = () => {
    handleLike(post, isLikedPost);
  };
  const isLikedPost = likes.some((e) => e === user._id); */

  let dataAuthor;

  if (user.userData._id === author._id) {
    dataAuthor = user.userData
  } else {
    dataAuthor = author
  }

  return (

    < Card className="post" sx={{
      maxWidth: 345,
      minWidth: 345,
      paddingBottom: 4,

    }
    } >

      <Link to={`/post/${_id}`} className="post__link">
        <CardHeader
          avatar={
            author &&
            <Avatar aria-label="recipe" src={CheckAvatar(dataAuthor)}>
              {CheckAvatar(dataAuthor)}
            </Avatar>

          } sx={{ minHeight: '7em' }}

          title={dataAuthor.about + ' ' + dataAuthor.name}

          subheader={dayjs(created_at).format('HH:MM:s DD/MM/YYYY')}
        />
        <CardMedia
          component="img"
          height="200"
          src={image}
          alt="Изображение"
        >
        </CardMedia>

        <CardContent sx={{ flex: 1, }}>
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: text }} style={{ overflow: 'hidden', LineClamp: 4, maxHeight: '50px' }} className="post__text__fild" />
        </CardContent>
      </Link >
      <div className="post__sticky post__sticky_type_bottom-left" >
        <IconButton aria-label="add to favorites" color={cN({ 'gray': !likes.length }, { 'warning': likes.length })} onClick={() => changeStateLikedPost(likes, _id)} >
          <Badge badgeContent={likes.length} color="primary" >
            <Favorite />
          </Badge>
        </IconButton>
        {comments.length ?
          <Link to={`/post/${_id}`}>
            <IconButton aria-label="go to comments" >
              <Badge badgeContent={comments.length} color='primary'  >
                <QuestionAnswer color='gray' />
              </Badge>
            </IconButton>
          </Link>
          : null}

        {tags.length ?
          <Link to={`/post/${_id}`}>
            <IconButton aria-label="go to comments" >
              <Badge badgeContent={tags.length} color='primary'  >
                <Style color='gray' />
              </Badge>
            </IconButton>
          </Link>
          : null}




      </div>
      <div className="post__sticky post__sticky_type_bottom-right" >

        {
          user.userData._id === author._id
            ? <IconButton onClick={() => deletePost(author, _id)} className='comment-deleteBtn-icon'>
              <DeleteForever className='comment-delete-icon' />
            </IconButton>
            : null
        }
      </div>

    </Card >

  );
}

/* {/* <div className={`card__container postlist__${theme ? 'light' : 'dark'} `}>

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
          : null} */

{/* {tags.length ?
          <Link to={`/post/${_id}`}>
            <IconButton aria-label="go to comments" >
              <Badge badgeContent={tags.length} color='primary'  >
                <Style color='gray' />
              </Badge>
            </IconButton>
          </Link>
          : null} */}

/* <div className="post__sticky post__sticky_type_bottom-right">

  {
    user.userData._id === author._id
      ? <IconButton onClick={() => deletePost(author, _id)} className='comment-deleteBtn-icon'>
        <DeleteForever className='comment-delete-icon' />
      </IconButton>
      : null
  } */


{/* <Link to={`/post/${_id}`}>
            <IconButton aria-label="go to comments">
              <Badge badgeContent={comments.length} color="primary">
                <CommentIcon color="gray" />
              </Badge>
            </IconButton>
          </Link> */}
/* </div>
</div> */
{/* </div > */ }/* 
  );
}; */
