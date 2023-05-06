import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent } from "./../img/like.svg";

export const PostOfPage = ({ post, handleClick }) => {
  return (
    <div className="postpage__conteiner">
      <img src={post.picture} width={"400px"} height={"400px"} alt="картинка" />
      <div className="postpage__infa">
        <p className="postpage__author">Имя пользователя</p>
        <div className="postpage__like">
          <button
            className="card__like card__like_active post__like"
            type="button"
            onClick={handleClick}
          >
            <ReactComponent />
          </button>
          <div className="clicker__like"> 15</div>
        </div>
        <titlle className="postpage__titlle">
          "Идея пришла в его голову и теперь упорно ищет мозг."
        </titlle>
        <p>
          "Богу ваша исповедь ни к чему, ему и без того все про вас известно."
        </p>

        <div>Комментарии</div>

        <span>Теги</span>
        <span>28 апреля 2023</span>
        <Link to="/" className="btn__home">
          {/* <Button variant="contained">Вернуться на главную страницу</Button> */}
          <button>Вернуться на главную страницу</button>
        </Link>
      </div>
    </div>
  );
};
