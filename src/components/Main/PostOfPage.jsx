import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent } from './../img/like.svg';
import { Button } from '@mui/material';

export const PostOfPage = ({ post, handleClick }) => {
  return (
    <div className='postlist__container'>
      {' '}
      {/* замена postpage__ */}
      <img
        src={post.image}
        width={'400px'}
        height={'400px'}
        alt='изображение'
      />
      <div className='postpage__infa'>
        <p className='postpage__author'>Имя пользователя</p>
        <div className='postpage__like'>
          <button
            className='card__like card__like_active post__like'
            type='button'
            onClick={handleClick}
          >
            <ReactComponent />
          </button>
          <div className='clicker__like'> 15</div>
        </div>
        <titlle className='postpage__titlle'>{post.titlle}</titlle>
        <p>{post.text}</p>

        <div>Комментарии</div>

        <span>{post.tags}</span>
        <span>28 апреля 2023</span>
        <Link to='/'>
          {<Button variant='contained'>Вернуться на главную страницу</Button>}
        </Link>
      </div>
    </div>
  );
};
