import React from "react";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

export const UserPage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    description: "",
    link: "",
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
        <titlle>Профиль</titlle>
        <button className="userpage__close">
          {" "}
          <FaRegWindowClose className="close__icons" />
        </button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label>
          <input
            type="url"
            value={data.link}
            placeholder="url вашей фотографии"
            onChange={(e) => handleInputChange(e, "link")}
          />
          <div className="userpage__defolt">
            <img src="./defoltimage.svg" />
            <p>no image available</p>
          </div>
          <input
            type="text"
            value={data.username}
            placeholder="Иванов Иван Иванович"
            onChange={(e) => handleInputChange(e, "username")}
          />
        </label>
        <label>
          <input
            type="email"
            value={data.email}
            placeholder="ivanov@mail.ru"
            onChange={(e) => handleInputChange(e, "email")}
          />
        </label>
        <label>
          <input
            type="text"
            value={data.description}
            placeholder="Самый лучший человек на свете"
            onChange={(e) => handleInputChange(e, "description")}
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
