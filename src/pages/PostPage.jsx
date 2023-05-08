import React from 'react';
/* import { ReactComponent } from "../components/img/like.svg"; */
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../Utils/api';
import { PostOfPage } from '../components/Main/PostOfPage';
import './index.css';

/* import { Button } from "@mui/material"; */

export const PostPage = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  const handleClick = (e) => {
    e.currentTarget.classList.toggle('card__like_active');
  };

  useEffect(() => {
    if (id) {
      api.getPostId(id).then((data) => setPost(data));
    }
  }, [id]);

  return <PostOfPage handleClick={handleClick} post={post} />;
};
console.log({ PostOfPage });
