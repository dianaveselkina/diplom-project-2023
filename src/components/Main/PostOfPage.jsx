import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Like } from "./../img/like.svg";
import { Avatar, Badge, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { AllContextData } from "../../context/context";
import "./style.css";
import BasicModal from "../Modal/modal";
import PostComments from "../PostComment/PostComments";
import { api } from "../../Utils/api";
import CheckAvatar from "../../Utils/avatar";
import dayjs from "dayjs";
import { PostTagList } from "../PostTag/PostTagList";

export const PostOfPage = ({ post, onPostLike, setPost }) => {
  const [isLikedPost, setIsPostLike] = useState(false);
  const { user, data, handleLike } = useContext({...AllContextData});

  const deletePost = data
  const postIdFromUrl = useParams()
  /* const { _id, comments } = post; */
  const urlpage = useParams();
  const navigate = useNavigate();

  /* useEffect(() => { api.getPostById(postIdFromUrl.postId).then((data) => { setPost(data) }) }, [postIdFromUrl.postId]) */

  const { _id, author, created_at, image, title, text, likes, comments, tags } = post

  /* let color

    if (likes?.length > 0) { color = 'warning' } */

  useEffect(() => {
    const isLiked = post.likes.some((e) => e === user?._id);
    setIsPostLike(isLiked);
  }, [post.likes, user]);

  const handleClick = () => {
    onPostLike(post, isLikedPost);
  };

  return (    
    <Card sx={{
                            maxWidth: '800px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }} >
    <div /* className="postlist__container" */>     
     <CardHeader 
                            className='singlePost__card__header'
                                avatar={
                                    author && <Avatar aria-label="recipe" src={CheckAvatar(author)}>
                                        {CheckAvatar(author)}
                                    </Avatar>
                                }
                                sx={{ minHeight: '7em' }}
                                title={author?.about + ' ' + author?.name}
                                subheader={dayjs(created_at).format('HH:MM:s DD/MM/YYYY')}
                            >

                            </CardHeader>
                             <CardMedia
                                component="img"
                                //height="600"
                                width='auto'
                                src={image}
                                alt="Изображение"
                                sx={{
                                    display: 'flex',
                                    //maxHeight: '800px',
                                    maxWidth:'50%', 
                                    alignSelf:'center'
                                }}
                            >
                            </CardMedia>
      {/* <img
        className="postlist__img"
        src={post.image}
        width={"600px"}
        height={"600px"}
        alt="изображение"
      /> */}

      <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h5" color="text.secondary">
                                    {title}
                                </Typography>
                                <p dangerouslySetInnerHTML={{ __html: text }} />
                            </CardContent>
                            <>
                            {
                                comments?.length
                                ? <PostComments comments={comments} id={_id} />
                                : null
                            }
                            {
                                tags?.length
                                ? <PostTagList tags={tags} id={_id} />
                                : null
                            }
                            </>
      <div className="postpage__infa">
        <p className="postpage__author">Имя пользователя</p>
        <div className="postpage__like">
          <button
            onClick={handleClick}
            className={`card__like ${isLikedPost ? "card__like_active" : ""}`}
          >
            <Like />
            <span>{isLikedPost ? "Мне нравится" : "Не нравится"}</span>
          </button>
        </div>
        <title className="postpage__title">{post.title}</title>
        <p>{post.text}</p>

        <BasicModal urlpage={urlpage} post={post} setPost={setPost} />
        <span>{post.tags}</span>
        <span>28 апреля 2023</span>
        <Link to="/">
          {<Button variant="contained">Вернуться на главную страницу</Button>}
        </Link>
      </div>
      {/* <div>
        {comments?.length ? (
          <PostComments comments={comments} id={_id} />
        ) : null}
        Комментарии
      </div> */}
    </div>
    </Card>
  );
};
