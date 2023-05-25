import { Button } from '@mui/material';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../Utils/api';
import { AllContextData, PostContext } from '../context/context';
import './form.css';

export const Form = ({
  handleClose,
  image,
  title,
  text,
  _id,
  tags,
  ...rest
}) => {
  const data = useContext(AllContextData);
  const post = useContext(PostContext);
  const addNewPostInState = data;
  const updatePostState = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      image: image,
      title: title,
      text: text,
      tags: tags,
    },
  });

  const cbSubmit = (data) => {
    if (data.tags === '' || data.tags === ' ' || data.tags.length === 0) {
      data.tags = [];
    } else {
      data.tags = data.tags.split(',');
    }

    Object.entries(rest).length
      ? api.changePost(data, _id).then((newPost) => updatePostState(newPost))
      : api.addNewPost(data).then((newPost) => addNewPostInState(newPost));

    handleClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(cbSubmit)} className="authRegForm">
        <h5 className="authRegForm__header">
          {!Object.entries(rest).length
            ? 'Добавление поста'
            : 'Редактироание поста'}
          <br />
          <p className="authRegForm__header_text"></p>
        </h5>

        <label className="authRegForm__leble">
          {' '}
          {errors?.url?.message ? (
            <p className="authRegForm__leble_error">{errors?.url?.message}</p>
          ) : (
            'Введите URL изображения'
          )}
          <input
            className="authRegForm__input"
            {...register('image', {
              required: {
                value: true,
                message: 'Поле обязательно для заполнения',
              },
              minLength: {
                value: 7,
                message: 'url адрес должен состоять не менее чем из 7 символов',
              },
              pattern: {
                value: 'https://',
                message: 'url адрес должен начинаться с https://',
              },
            })}
            type="text"
            placeholder="https://source.unsplash.com/random/?nature"
          ></input>
        </label>

        <label className="authRegForm__leble">
          {' '}
          {errors?.head?.message ? (
            <p className="authRegForm__leble">{errors?.head?.message}</p>
          ) : (
            'Введите заголовок поста'
          )}
          <input
            className="authRegForm__input"
            {...register('title', {
              required: {
                value: true,
                message: 'Поле обязательно для заполнения',
              },
              minLength: {
                value: 3,
                message:
                  'Заголовок должно состоять не менее чем из 3х символов',
              },
            })}
            type="text"
            placeholder="Заголовок"
          ></input>
        </label>

        <label className="authRegForm__leble">
          {' '}
          {errors?.body?.message ? (
            <p className="authRegForm__leble">{errors?.body?.message}</p>
          ) : (
            'Введите текст поста'
          )}
          <input
            className="authRegForm__input"
            {...register('text', {
              required: {
                value: true,
                message: 'Поле обязательно для заполнения',
              },
              minLength: {
                value: 10,
                message: 'Имя должно состоять не менее чем из 10 символов',
              },
            })}
            type="text"
            placeholder="сам текст"
          ></input>
        </label>

        <label className="authRegForm__leble">
          {' '}
          {errors?.tags?.message ? (
            <p className="authRegForm__leble">{errors?.tags?.message}</p>
          ) : (
            'Список тегов. Если их несаколько, то указывать через запятую'
          )}
          <input
            className="authRegForm__input"
            {...register('tags', {})}
            type="text"
            placeholder="tag1, tag2, tag3...."
          ></input>
        </label>

        <Button type="submit" variant="contained">
          {Object.entries(rest).length
            ? 'Сохранить изменения'
            : 'Опубликовать пост'}
        </Button>
      </form>
    </>
  );
};
