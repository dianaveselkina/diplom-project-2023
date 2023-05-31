import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Main/Footer';
import { Header } from './components/Main/Header';
import { PostList } from './components/Main/PostList';
// import data from './DB/data.json';
import { PostPage } from './pages/PostPage';
import { ErrorPage } from './pages/ErrorPage';
import { api } from './Utils/api';
import { ThemeContext, AllContextData } from './context/context';
import { Button, Modal } from '@mui/material';
import { Authorisation } from './components/Auth/Authorisation';
import { AuthError } from './components/Auth/AuthError';
import { FormAddPost } from './components/Form/FormAddPost';

function App() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [autorozation, SetAutorization] = useState(false); // Стейт авторизации
  const [authErr, setAuthErr] = useState(''); // стейт ошибок авторизации
  const themeValue = { theme, setTheme };

  const handlePostLike = async (post, wasLiked) => {
    const updatedPost = await api.changePostLike(post._id, wasLiked);
    const index = post.findIndex((e) => e._id === updatedPost?._id);
    if (index !== -1) {
      setPost((state) => [
        ...state.slice(0, index),
        updatedPost,
        ...state.slice(index + 1),
      ]);
    }
    wasLiked
      ? setFavorites((state) => state.filter((f) => f._id !== updatedPost._id))
      : setFavorites((state) => [updatedPost, ...state]);
  };

  /* const filteredPost = (post) => {
    return post.filter(
      (e) =>
        e.author._id === '64423c303291d790b3fc967c' ||
        e.author._id === '644573ee3291d790b3073d8d'
    );
  }; */

  const onSort = (sortId) => {
    if (sortId === 'Популярные') {
      const newPost = post.sort((a, b) => b.likes.length - a.likes.length);
      setPost([...newPost]);
      return;
    }
    if (sortId === 'Новые') {
      const newPost = post.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPost([...newPost]);
      return;
    }
    if (sortId === 'Все') {
      const newPost = post;
      setPost([...newPost]);
      return;
    }
  };

  function updatePostState(likedPost) {
    let updatedPost = post.map((el) => {
      return el._id !== likedPost._id ? el : likedPost;
    });
    setPost([...updatedPost]);
  }

  useEffect(() => {
    if (
      localStorage.getItem('postApi') !== '' &&
      localStorage.getItem('postApi')
    ) {
      SetAutorization(true);
    }
  }, []);

  useEffect(() => {
    if (autorozation) {
      api.getUserInfo().then((data) => setUser(data));
    }
  }, [autorozation]);

  useEffect(() => {
    api.getAllPosts().then((data) => setPost(data));
  }, []);

  useEffect(() => {
    api.getUserInfo().then((user) => {
      setUser(user);
    });
  }, []);

  const postValue = {
    updatePostState,
    deletePost,
    addNewPostInState,
    handleLike: handlePostLike,
    post: post,
    setPost,
    favorites,
    onSort,
    user,
    autorozation,
    singIn,
    singUp,
    logOut,
    setUser,
  };

  ///////////////////////////// Блок авторизации и регистрации /////////////////////////////

  function singIn(user) {
    api
      .singInUser(user)
      .then((data) => authIsTru(data))
      .catch((err) => setAuthErr(err.message));
  }

  function singUp(user) {
    const { email: userEmail, password: userPassword } = { ...user };
    /* console.log(userEmail, userPassword, user); */
    api
      .singUpUser(user)
      .then((res) => {
        console.log(res);
        singIn({ email: userEmail, password: userPassword });
      })

      .catch((err) => setAuthErr(err.message));
  }

  function authIsTru(data) {
    setUser(data.data);
    localStorage.setItem('postApi', data.token);
    localStorage.setItem('group', data.data.group);
    SetAutorization(true);
  }

  function logOut() {
    const result = window.confirm('Уже уходите?');

    if (result) {
      localStorage.removeItem('postApi');
      localStorage.removeItem('group');
      SetAutorization(false);
      setUser({});
    }
  }

  //////////////////Oбновлениe стейта постов, после добавления нового поста ///////////////

  function addNewPostInState(newPost) {
    let updatedPost = [...post, newPost];
    setPost(updatedPost);
  }

  function deletePost(author, _id) {
    author._id !== user._id ? alert('Атата!') : delPost(_id);

    function delPost(_id) {
      const result = window.confirm('Вы уверены?');
      if (result) {
        api.deletePostById(_id);
        let updatedPost = post.filter((e) => {
          return e._id !== _id;
        });
        setPost(updatedPost);
      }
    }
  }

  return (
    <div className="App">
      <div className={`theme__postlist__${theme ? 'light' : 'dark'} `}>
        <ThemeContext.Provider value={themeValue}>
          <AllContextData.Provider value={postValue}>
<Routes>
            <Route path="*" element={<Header />} />
          </Routes>
          {autorozation ? (
            <main className="main">
              <Routes>
                <Route
                  index
                  element={<PostList onSort={onSort} post={post} />}
                />
                {/* <Route path="/post/:postId" element={<PostPage />} /> */}
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
          ) : (
            <Authorisation />
          )}

          {authErr !== "" ? (
            <AuthError authErr={authErr} setAuthErr={setAuthErr} />
          ) : null}
          <Routes>
            <Route path="*" element={<Footer />} />
          </Routes>              
          </AllContextData.Provider>
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

export default App;

              //     {<Route path="/createpostpage" element={<FormAddPost />} />}
              //     <Route path="/userpage" element={<Authorisation />} />
