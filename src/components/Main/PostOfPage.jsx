import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Like } from "./../img/like.svg";
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
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
  const { user } = useContext({...AllContextData});

  /* const deletePost = data
  const postIdFromUrl = useParams() */
  const urlpage = useParams();
  const navigate = useNavigate();


  /* useEffect(() => { api.getPostById(postIdFromUrl.postId).then((data) => { setPost(data) }) }, [postIdFromUrl.postId]) */

  const { _id, author, created_at, image, title, text, comments, tags } = post


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
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',            
            margin: '50px',
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
        <div className="postpage__like">
          <button
            onClick={handleClick}
            className={`card__like ${isLikedPost ? "card__like_active" : ""}`}
          >
            <Like />
            <span>{isLikedPost ? "Мне нравится" : "Не нравится"}</span>
          </button>
        </div>
        <BasicModal urlpage={urlpage} post={post} setPost={setPost} />
        
        <Link to="/">
          {<Button variant="contained"  /* onClick={() => navigate(-1)} */sx={{ 
            margin: '50px',  
          }}>Вернуться на главную страницу</Button>}
        </Link>
    </div>
    </Card>
  );
};
