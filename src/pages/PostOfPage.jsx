import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
/* import { ReactComponent as Like } from './../img/like.svg'; */
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
/* import './style.module.css'; */
import BasicModal from '../components/Modal/modal';
import PostComments from '../components/PostComment/PostComments';
import CheckAvatar from '../Utils/avatar';
import dayjs from 'dayjs';
import { PostTagList } from '../components/PostTag/PostTagList';
import { DeleteForever } from '@mui/icons-material';
import { PostComment } from '../components/PostComment/PostComment';
import { api } from '../Utils/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import s from './pages.module.css'

export const PostOfPage = () => {
  const urlpage = useParams();

  const changeStateLikedPost = data[1]
  const [singlePost, setSinglePost] = useState({})
  const { user, data } = useContext({ ...AllContextData });

  const postIdFromUrl = useParams()
  const deletePost = data[2]
  const navigate = useNavigate();

  useEffect(() => { api.getPostById(postIdFromUrl.postId).then((data) => { setSinglePost(data) }) }, [changeStateLikedPost, postIdFromUrl.postId])

  const { _id, author, created_at, image, title, text, likes, comments, tags } = singlePost

  let color

  if (likes?.length > 0) { color = 'warning' }

  return (
    <>
      {!singlePost ? <></> :
        <div className={s.mainpost}>
          <div className={s.button__homepage_top}>
            <Link to="/" className={s.btn__home}>
              <Button variant="contained" >Вернуться на главную страницу</Button>
            </Link>
          </div>

          {!singlePost
            ? <h1>dont worry</h1>
            :
            <Card sx={{
              maxWidth: '800px',
              // height: '800px',
              display: 'flex',
              flexDirection: 'column',

            }} >
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
                // height="600"
                width='auto'
                src={image}
                alt="Изображение"
                sx={{
                  display: 'flex',
                  // maxHeight: '800px',
                  // maxWidth:'50%', 
                  alignSelf: 'center'
                }}
              >
              </CardMedia>

              <CardContent sx={{ flex: 1 }}>

                <Typography variant="h5" color="text.secondary">
                  {title}
                </Typography>

                <p dangerouslySetInnerHTML={{ __html: text }} />

              </CardContent>

              <div className={s.cart__bottom}>

                <IconButton aria-label="add to favorites" color={color} onClick={function (e) { e.stopPropagation(); changeStateLikedPost(likes, _id) }}>
                  <Badge badgeContent={likes?.length} color="primary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>

                < BasicModal urlpage={urlpage} singlePost={singlePost} />

                {
                  user?.userData._id === author?._id
                    ? <IconButton onClick={() => deletePost(author, _id)} className={s.post_deleteBtn_icon}>
                      <DeleteForeverIcon className={s.post_delete_icon} />
                    </IconButton>
                    : null
                }

              </div>

              {
                comments?.length
                  ? <PostComment comments={comments} id={_id} />
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


{/* <Card
      sx={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        margin: '50px',
      }}
    >
      <div className="postlist__container">
        <CardHeader
          className="singlePost__card__header"
          avatar={
            author && (
              <Avatar aria-label="recipe" src={CheckAvatar(author)}>
                {CheckAvatar(author)}
              </Avatar>
            )
          }
          sx={{ minHeight: '7em' }}
          title={author?.about + ' ' + author?.name}
          subheader={dayjs(created_at).format('HH:MM:s DD/MM/YYYY')}
        ></CardHeader>
        <CardMedia
          component="img"
          width="auto"
          src={image}
          alt="Изображение"
          sx={{
            display: 'flex',
            maxWidth: '50%',
            alignSelf: 'center',
          }}
        ></CardMedia>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
          <p dangerouslySetInnerHTML={{ __html: text }} />
        </CardContent>
        <>
          {comments?.length ? (
            <PostComments comments={comments} id={_id} />
          ) : null}
          {tags?.length ? <PostTagList tags={tags} id={_id} /> : null}
        </>
        <div className="postpage__like">
          <button
            onClick={handleClick}
            className={`card__like ${isLikedPost ? 'card__like_active' : ''}`}
          >
            <Like />
            <span>{isLikedPost ? 'Мне нравится' : 'Не нравится'}</span>
          </button>

          < BasicModal urlpage={urlpage} singlePost={singlePost} />


          {
            user?.userData._id === author?._id
              ? <IconButton onClick={() => deletePost(author, _id)} className=''>
                <DeleteForever className='' />
              </IconButton>
              : null
          }

        </div>

        {
          comments?.length
            ? <PostComment comments={comments} id={_id} />
            : null
        }
        {
          tags?.length
            ? <PostTagList tags={tags} id={_id} />
            : null
        }

        <Link to="/">
          {
            <Button
              variant="contained"sx={{
                margin: '50px',
              }}
            >
              Вернуться на главную страницу
            </Button>
          }
        </Link>
      </div>
    </Card >
  );
}; */}
