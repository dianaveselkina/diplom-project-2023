import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { api } from '../Utils/api';
import { PostOfPage } from '../components/Main/PostOfPage';
import { AllContextData } from '../context/context';
import './pages.module.css';

export const PostPage = () => {
  const [post, setPosts] = useState({});
  const { id } = useParams();
  const { user, handleLike } = useContext(AllContextData);
  useEffect(() => {
    if (id) {
      api.getPostById(id).then((data) => setPosts(data));
    }
  }, [id]);

  const onPostLike = (item, isLikedPost) => {
    handleLike(item, isLikedPost);
    if (isLikedPost) {
      const filteredLikes = item.likes.filter((e) => e !== user?._id);
      setPosts((s) => ({ ...s, likes: filteredLikes }));
    } else {
      const addLikes = [...item.likes, user?._id];
      setPosts((s) => ({ ...s, likes: addLikes }));
    }
  };

  return (
    <>
      {!!Object.keys(post).length ? (
        <PostOfPage post={post} onPostLike={onPostLike} setPosts={setPosts} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
