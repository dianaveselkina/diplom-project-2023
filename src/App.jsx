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
import { Authorisation } from './components/Auth/Authorisation';
import { AuthError } from './components/Auth/AuthError';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [autorozation, SetAutorization] = useState(false); // Стейт авторизации
  const [authErr, setAuthErr] = useState(''); // стейт ошибок авторизации
  const themeValue = { theme, setTheme };
  const [postCount, setPostCount] = useState([]); //  состояние количества постов
  const [pageNum, setPageNum] = useState(1); // состояние пагинации
  const quantity = 12; //кол-во постов на стр.

  const handlePostLike = async (post, wasLiked) => {
    const updatedPost = await api.changePostLike(post._id, wasLiked);
    const index = posts.findIndex((e) => e._id === updatedPost?._id);
    if (index !== -1) {
      setPosts((state) => [
        ...state.slice(0, index),
        updatedPost,
        ...state.slice(index + 1),
      ]);
    }
    wasLiked
      ? setFavorites((state) => state.filter((f) => f._id !== updatedPost._id))
      : setFavorites((state) => [updatedPost, ...state]);
  };
  function changeStateLikedPost(likesArr, postId) {
    api
      .changePostLike(postId(likesArr, user._id))
      .then((res) => updatePostState(res));
  }

  ///////////////////////////// фильтрация по токену //////////////////////////
  /* const filteredPost = (post) => {
    return post.filter(
      (e) =>
        e.author._id === '64423c303291d790b3fc967c' ||
        e.author._id === '644573ee3291d790b3073d8d'
    );
  }; */

  const onSort = (sortId) => {
    if (sortId === 'Популярные') {
      const newPost = posts.sort((a, b) => b.likes.length - a.likes.length);
      setPosts([...newPost]);
      return;
    }
    if (sortId === 'Новые') {
      const newPost = posts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPosts([...newPost]);
      return;
    }
    if (sortId === 'Все') {
      const newPost = posts;
      setPosts([...newPost]);
      return;
    }
  };


  function updatePostState(likedPost) {
    let updatedPost = posts.map((el) => {
      return el._id !== likedPost._id ? el : likedPost;
    });
    setPosts([...updatedPost]);
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
    } if (autorozation) {
      paginate(1);
    }
  }, [autorozation]);


  let pagePostCount = Math.ceil(postCount / 12); // Количество страниц пагинации

  function paginate(currentPage = 1, search = "") {
    let postQuantity = quantity; // переменная определяющая количество постов на странице
    api
      .getPaginate(currentPage, postQuantity)
      .then(
        (
          data // апи запрос на получение постов с сервера.
        ) => {
          setPosts(data.posts);
          setPostCount(data.total);
          setPageNum(currentPage);
        }
      )
      .catch((err) => console.log("ошибка при запросе постов:", err.message));
  }

  useEffect(() => {
    api.getAllPosts().then((data) => setPosts(data));
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
    posts,
    setPosts,
    favorites,
    changeStateLikedPost,
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
    let updatedPost = [...posts, newPost];
    setPosts(updatedPost);
  }

  function deletePost(author, _id) {
    author._id !== user._id ? alert('Атата!') : delPost(_id);

    function delPost(_id) {
      const result = window.confirm('Вы уверены?');
      if (result) {
        api.deletePostById(_id);
        let updatedPost = posts.filter((e) => {
          return e._id !== _id;
        });
        setPosts(updatedPost);
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
                    element={<PostList onSort={onSort} posts={posts} pagePostCount={pagePostCount}
                      pageNum={pageNum}
                      paginate={paginate} />}
                  />
                  {/* <Route path="/post/:postId" element={<PostPage />} /> */}
                  <Route path="/post/:id" element={<PostPage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </main>
            ) : (
              <Authorisation />
            )}

            {authErr !== '' ? (
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
