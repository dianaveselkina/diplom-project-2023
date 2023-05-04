import React, { useEffect, useState } from 'react';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
import data from './DB/data.json';
import { PostPage } from './pages/PostPage';
import { UserPage } from './pages/UserPost';
import { CreatePostPage } from './pages/CreatePostPage';
/* import api from "./Utils/api" */

function App() {
  return (
    <div className="App">
      <Header />
      {/* <PostList posts={data} /> */}
      {/* <CreatePostPage /> */}
      {/* {<PostPage />} */}
      {<UserPage />}
      <Footer />
    </div>
  );
}

/* const App = () => {

  /* const [search, setSearch] = useState(false) */
/*
const [autorozation, SetAutorization] = useState(false); //Состояние авторизации
const [authErr, setAuthErr] = useState('');   // Состояние ошибок авторизации

  useEffect(() => {
    if (localStorage.getItem('postApi') !== '' && localStorage.getItem('postApi')) {
      SetAutorization(true)
    }
  }, []) */

//Авторизация и регистрация

/*   function singIn(userData) {  // авторизация

    api.singIn(userData)
      .then((data) => authIsTru(data))
      .catch((err) => setAuthErr(err.message))
  }

  function singUp(userData) {  // регистрация

    alert('Попробуйте позже')
    const { email: userEmail, password: userPassword } = { ...userData }
    console.log(userEmail, userPassword, userData)
    api.singUp(userData)
      .then((res) => { console.log(res); singIn({ email: userEmail, password: userPassword }); })

      .catch((err) => setAuthErr(err.message))
  }

  function authIsTru(data) {   // вход при успешной регистрации/авторизации
    setUserData(data.data)
    localStorage.setItem('postApi', data.token)
    localStorage.setItem('group', data.data.group)
    SetAutorization(true)
  } */

/*   const AuthError = ({ authErr, setAuthErr }) => {
 
    return (
      <div className={s.errorBlock}>
        <div className={s.errorMessage}>
          {authErr}Что-то пошло не так...
        </div>
        <Button variant='contained' onClick={() => setAuthErr('')}>Попробовать снова</Button>
      </div>
    )
  } */

/*   function logOut() {         // Выход из учётной записи.

    const result = window.confirm('До новых встреч!')

    if (result) {
      localStorage.removeItem('postApi');
      localStorage.removeItem('group');
      SetAutorization(false);
      setUserData({})
    }
  }

  const [userData, setUserData] = useState([]);         // Состояние данных пользователя
  const [postData, setPostData] = useState([]);         // Состояние постов
  const [allPostCount, setAllPostcount] = useState([]); // Состояние количества постов

  useEffect(() => {

    if (autorozation) {

      api.getUserInfo().then((data) => setUserData(data))
    }
  }, [autorozation]) */

// Обновление стейта постов, после добавления нового

/*   function addNewPost(newPost) {

    let updatedPostData = [...postData, newPost];
    setPostData(updatedPostData)
  }
} */

// удаления поста

/* function deletePost(author, _id) {
  (author._id !== userData._id) ? alert('Ух-ты! Ай-ай-ай! Но-но-но!') : delPost(_id);

  function delPost(_id) {

    const result = window.confirm('Вы уверены?')
    if (result) {
      api.deletePostById(_id)
      let updatedPost = postData.filter((e) => { return e._id !== _id })
      setPost(updatedPost)
    }
  }
} */

export default App;
