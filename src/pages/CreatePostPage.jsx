import React from 'react';
import { useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
export const CreatePostPage = () => {
  const [data, setData] = useState({
    titlle: '',
    post: '',
    text: '',
    link: '',
  });

  function handleFormSubmit(event) {
    event.preventDefault();
  }
  function handleInputChange(e, name) {
    setData({ ...data, [name]: e.target.value });
  }
  return (
    <div className="userpage__form">
      <div className="userpage__profile">
        <titlle>Создать пост</titlle>
        <button className="userpage__close">
          {' '}
          <FaRegWindowClose className="close__icons" />
        </button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label>
          <input
            type="url"
            value={data.link}
            placeholder="url вашей картинки"
            onChange={(e) => handleInputChange(e, 'link')}
          />
          <div className="userpage__defolt">
            <img src="./defoltimage.svg" />
            <p>no image available</p>
          </div>
          <input
            type="text"
            value={data.username}
            placeholder="Заголовок поста"
            onChange={(e) => handleInputChange(e, 'titlle')}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Текст поста"
            value={data.email}
            onChange={(e) => handleInputChange(e, 'post')}
          />
        </label>
        <label>
          <input
            type="text"
            value={data.description}
            placeholder="введите теги через запятую"
            onChange={(e) => handleInputChange(e, 'text')}
          />
        </label>
        <div className="userpage__button">
          <button className="userpage_submit" type="submit">
            Создать
          </button>
          <button className="userpage_submit" type="submit">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
