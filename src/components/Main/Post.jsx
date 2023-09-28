import React, { useContext } from 'react';
import dayjs from 'dayjs';
import './style.module.css';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { AllContextData } from '../../context/context';
import CheckAvatar from '../../Utils/avatar';
import { Comment, Delete, Favorite, TurnedIn } from '@mui/icons-material';
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
  const { userData, changeStateLikedPost, deletePost } = useContext(AllContextData);

  let dataAuthor;

  if (userData._id === author._id) {
    dataAuthor = userData
  } else {
    dataAuthor = author
  }

  return (

    < Card className="post" sx={{
      maxWidth: 345,
      minWidth: 345,
      maxHeight: 600,
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

          } sx={{ minHeight: '5em' }}

          title={dataAuthor.about + ' ' + dataAuthor.name}

          subheader={dayjs(created_at).format('HH:MM:s DD/MM/YYYY')}
        />
        <CardMedia
          component="img"
          height="250"
          src={image}
          alt="Изображение"
        >
        </CardMedia>

        <CardContent sx={{ flex: 1, }}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <div className='items-text' style={{ overflow: 'hidden', LineClamp: 3, maxHeight: '50px' }}>
            <p>{text}</p>
          </div>
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
                <Comment color='gray' />
              </Badge>
            </IconButton>
          </Link>
          : null}

        {tags.length ?
          <Link to={`/post/${_id}`}>
            <IconButton aria-label="go to comments" >
              <Badge badgeContent={tags.length} color='primary'  >
                <TurnedIn color='gray' />
              </Badge>
            </IconButton>
          </Link>
          : null}
        {
          userData._id === author._id
            ? <IconButton onClick={() => deletePost(author, _id)} className='comment-deleteBtn-icon'>
              <Delete className='comment-delete-icon' />
            </IconButton>
            : null
        }

      </div>
    </Card >
  );
}