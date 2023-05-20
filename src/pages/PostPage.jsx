import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { api } from "../Utils/api";
import { PostOfPage } from "../components/Main/PostOfPage";
import { PostContext } from "../context/context";
import "./index.css";

export const PostPage = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { user, handleLike } = useContext(PostContext);

  useEffect(() => {
    if (id) {
      api.getPostId(id).then((data) => setPost(data));
    }
  }, [id]);

  const onPostLike = (item, isLikedPost) => {
    handleLike(item, isLikedPost);
    if (isLikedPost) {
      const filteredLikes = item.likes.filter((e) => e !== user?._id);
      setPost((s) => ({ ...s, likes: filteredLikes }));
    } else {
      const addLikes = [...item.likes, user?._id];
      setPost((s) => ({ ...s, likes: addLikes }));
    }
  };

  return (
    <>
      {!!Object.keys(post).length ? (
        <PostOfPage post={post} onPostLike={onPostLike} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
