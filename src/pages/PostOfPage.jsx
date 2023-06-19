import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { AllContextData } from '../context/context';
import BasicModal from '../components/Modal/modal';
import PostComments from '../components/PostComment/PostComments';
import CheckAvatar from '../Utils/avatar';
import dayjs from 'dayjs';
import { PostTagList } from '../components/PostTag/PostTagList';
import { api } from '../Utils/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import s from './pages.module.css'

export const PostOfPage = () => {
  const urlpage = useParams();
  const { changeStateLikedPost, deletePost, userData } = useContext({ ...AllContextData });

  const [singlePost, setSinglePost] = useState({})

  const postIdFromUrl = useParams()
  const navigate = useNavigate();

  useEffect(() => { api.getPostById(postIdFromUrl.postId).then((data) => { setSinglePost(data) }) }, [changeStateLikedPost, postIdFromUrl.postId])

  const { _id, author, created_at, image, title, text, likes, comments, tags } = singlePost

  let color

  if (likes?.length > 0) { color = 'warning' }

  return (
    <>
      {!singlePost ? <></> :
        <div className={s.mainpost}>

          {!singlePost
            ? <h1>dont worry</h1>
            :
            <Card sx={{
              maxWidth: '800px',
              display: 'flex',
              flexDirection: 'column',
            }} >
              <CardHeader
                className='singlePost__card__header'
                avatar={
                  author && <Avatar aria-label="recipe" src={author.avatar}>
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
                width='auto'
                src={image}
                alt="Изображение"
                sx={{
                  display: 'flex',
                  alignSelf: 'center',
                }}
              >
              </CardMedia>

              <CardContent sx={{ flex: 1 }}>

                <Typography variant="h5" color="text.secondary">
                  {title}
                </Typography>

                <p>{text}</p>

              </CardContent>

              <div className={s.cart__bottom}>

                <IconButton aria-label="add to favorites" color={color} onClick={function (e) { e.stopPropagation(); changeStateLikedPost(likes, _id) }}>
                  <Badge badgeContent={likes?.length} color="primary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>

                < BasicModal urlpage={urlpage} singlePost={singlePost} />
                {
                  userData._id === author?._id
                    ? <IconButton onClick={() => deletePost(author, _id)} className={s.post_deleteBtn_icon}>
                      <DeleteForeverIcon className={s.post_delete_icon} />
                    </IconButton>
                    : null
                }
              </div>
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
            </Card>}

          <div className={s.button__homepage_bottom}>
            <Button variant="contained"
              onClick={() => navigate(-1)}
            >Вернуться на главную страницу</Button>
          </div>
        </div>
      }</>
  )
}