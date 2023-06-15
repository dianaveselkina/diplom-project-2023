import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Main/Footer';
import { Header } from './components/Main/Header';
// import data from './DB/data.json';
import { PostOfPage } from './pages/PostOfPage';
import { ErrorPage } from './pages/ErrorPage';
import { api } from './Utils/api';
import { /* ThemeContext,  */AllContextData } from './context/context';
import { Authorisation } from './components/Auth/Authorisation';
import { AuthError } from './components/Auth/AuthError';
import AllPostPage from './pages/AllPostPage';


const App = () => {

  const [autorozation, SetAutorization] = useState(false);
  const [authErr, setAuthErr] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("") !== "" &&
      localStorage.getItem("")
    ) {
      SetAutorization(true);
    }
  }, []);

  /////////////////////////////////////////////////

  const [posts, setPosts] = useState([]);

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

  ///////////////////////////////////////////////
  function singIn(userData) {
    api
      .singInUser(userData)
      .then((data) => authIsTru(data))
      .catch((err) => setAuthErr(err.message));
  }

  function singUp(userData) {
    alert("Готово!");
    const { email: userEmail, password: userPassword } = { ...userData };
    console.log(userEmail, userPassword, userData);
    api
      .singUpUser(userData)
      .then((res) => {
        console.log(res);
        singIn({ email: userEmail, password: userPassword });
      })
      .catch((err) => setAuthErr(err.message));
  }

  function authIsTru(data) {
    setUserData(data.data);
    localStorage.setItem("", data.token);
    localStorage.setItem("group-12", data.data.group);
    SetAutorization(true);
  }
  function logOut() {
    const result = window.confirm("Уже уходите?");

    if (result) {
      localStorage.removeItem("");
      localStorage.removeItem("group-12");
      SetAutorization(false);
      setUserData({});
    }
  }
  /////////////////////////////////////////////////////

  const [userData, setUserData] = useState([]); // Стейт данных пользователя
  const [postData, setPostData] = useState([]); // Стейт постов
  const [allPostCount, setAllPostcount] = useState([]); //  Стейт общего количества постов
  const [pageNumber, setPageNumber] = useState(1); // Стейт пагинации
  console.log(userData);
  useEffect(() => {
    if (!!autorozation) {
      console.log('i work');
      api.getUserInfo().then((data) => setUserData(data));
    } else {
      console.log('i not work');
    }

    if (autorozation) {
      paginatePage(1);
    }
  }, [autorozation]); // Хук useEffect (зависимость стейт авторизации) апи запрос на получение с сервера данных пользователя и массива с постами

  ////////////////////////// Пагинация ////////////////////

  let pagePostCount = Math.ceil(allPostCount / 9); // Количество страниц пагинации
  const POST_QUANTITY = 9;

  function paginatePage(currentPage = 1) {
    let postQuantity = POST_QUANTITY; // Переменная определяющая количество постов на странице
    api
      .getPaginate(currentPage, postQuantity)
      .then(
        (
          data // апи запрос на получение постов с сервера.
        ) => {
          console.log(data)
          setPostData(data.posts);
          setAllPostcount(data.total);
          setPageNumber(currentPage);
        }
      )
      .catch((err) => console.log("ошибка при запросе постов:", err.message));
  }

  //////////// Изменение лайка ////////////////////////

  const likeIsHer = (likesArr, userDataid) => {
    return likesArr.some(e => e === userDataid)
  }

  function changeStateLikedPost(likesArr, postId) {
    api
      .changePostLike(postId, likeIsHer(likesArr, userData._id))
      .then((res) => updatePostState(res));
  }
  function updatePostState(likedPost) {
    let updatedPostData = postData.map((el) => {
      return el._id !== likedPost._id ? el : likedPost;
    });
    setPostData(updatedPostData);
  }
  ////////// Обновление постов после добавления нового

  function addNewPostInState(newPost) {
    let updatedPostData = [...postData, newPost];
    setPostData(updatedPostData);
  }
  ////////// Удаления поста ////////////////////////////

  function deletePost(author, _id) {
    author._id !== userData._id
      ? alert("Нельзя удалять то, что не создавали")
      : delPost(_id);

    function delPost(_id) {
      const result = window.confirm("хорошо подумал?");
      if (result) {
        api.deletePostById(_id);
        let updatedPostData = postData.filter((e) => {
          return e._id !== _id;
        });
        setPostData(updatedPostData);
      }
    }
  }
  /////////////////////////////////////////////////////////

  return (
    <>
      <AllContextData.Provider
        value={{
          // Контекс для работы с постами
          /* posts,
          setPosts, */
          postData,
          changeStateLikedPost,
          deletePost,
          addNewPostInState,
          updatePostState,
          paginatePage,
          onSort,
          userData,
          autorozation,
          singIn,
          singUp,
          logOut,
          setUserData,
        }}
      ><Routes>
          <Route path="*" element={<Header />} />
        </Routes>
        {autorozation ?
          <main className="main">
            <Routes>
              <Route
                index
                element={
                  <AllPostPage
                    onSort={onSort}
                    pagePostCount={pagePostCount}
                    pageNumber={pageNumber}
                    paginatePage={paginatePage}
                  />
                }
              />
              <Route path="/post/:postId" element={<PostOfPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
          :
          <Authorisation />
        }

        {(authErr !== "") ?
          <AuthError authErr={authErr} setAuthErr={setAuthErr} />
          : null}
        <Routes>
          <Route path="*" element={<Footer />} />
        </Routes>
      </AllContextData.Provider >
    </>
  );
};

export default App;

/* function App() {
  const [posts, setPosts] = useState([]);
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
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
    const index = postData.findIndex((e) => e._id === updatedPost?._id);
    if (index !== -1) {
      setPostData((state) => [
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
      .changePostLike(postId(likesArr, userData._id))
      .then((res) => updatePostState(res));
  }

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
    let updatedPostData = postData.map((el) => {
      return el._id !== likedPost._id ? el : likedPost;
    });
    setPostData([...updatedPostData]);
  }

  function addNewPostInState(newPost) {
    let updatedPostData = [...postData, newPost];
    setPostData(updatedPostData);
  }

  useEffect(() => {
    if (
      localStorage.getItem('') !== '' &&
      localStorage.getItem('')
    ) {
      SetAutorization(true);
    }
  }, []);

  useEffect(() => {
    if (autorozation) {
      api.getUserInfo().then((data) => setUserData(data));
    }

    if (autorozation) {
      paginate(1);
    }
  }, [autorozation]);


  let pagePostCount = Math.ceil(postCount / 12); // Количество страниц пагинации

  function paginate(currentPage = 1) {
    let postQuantity = quantity; // переменная определяющая количество постов на странице
    api
      .getPaginate(currentPage, postQuantity)
      .then(
        (
          data // апи запрос на получение постов с сервера.
        ) => {
          setPostData(data.posts);
          setPostCount(data.total);
          setPageNum(currentPage);
        }
      )
      .catch((err) => console.log("ошибка при запросе постов:", err.message));
  }

  useEffect(() => {
    api.getAllPosts().then((data) => setPosts(data));
  }, []);

  const postValue = {
    updatePostState,
    deletePost,
    addNewPostInState,
    handleLike: handlePostLike,
    postData,
    favorites,
    changeStateLikedPost,
    onSort,
    paginate,
    userData,
    autorozation,
    singIn,
    singUp,
    logOut,
    setUserData,
  };

  ///////////////////////////// Блок авторизации и регистрации /////////////////////////////

  function singIn(userData) {
    api
      .singInUser(userData)
      .then((data) => authIsTru(data))
      .catch((err) => setAuthErr(err.message));
  }

  function singUp(userData) {
    const { email: userEmail, password: userPassword } = { ...userData };
    api
      .singUpUser(userData)
      .then((res) => {
        console.log(res);
        singIn({ email: userEmail, password: userPassword });
      })

      .catch((err) => setAuthErr(err.message));
  }

  function authIsTru(data) {
    setUserData(data.data);
    localStorage.setItem('', data.token);
    localStorage.setItem('group', data.data.group);
    SetAutorization(true);
  }

  function logOut() {
    const result = window.confirm('Уже уходите?');

    if (result) {
      localStorage.removeItem('');
      localStorage.removeItem('group');
      SetAutorization(false);
      setUserData({});
    }
  }


  function deletePost(author, _id) {
    author._id !== userData._id ? alert('Атата!') : delPost(_id);

    function delPost(_id) {
      const result = window.confirm('Вы уверены?');
      if (result) {
        api.deletePostById(_id);
        let updatedPostData = postData.filter((e) => {
          return e._id !== _id;
        });
        setPostData(updatedPostData);
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
                    element={<PostList onSort={onSort} pagePostCount={pagePostCount}
                      pageNum={pageNum}
                      paginate={paginate} />}
                  /><Route path="/post/:id" element={<PostPage />} />
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
 */

  ///////////////////////////// фильтрация по токену //////////////////////////
/* const filteredPost = (post) => {
  return post.filter(
    (e) =>
      e.author._id === '64423c303291d790b3fc967c' ||
      e.author._id === '644573ee3291d790b3073d8d'
  );
}; <CssBaseline /> сброс CSS стилий от MaterialUI */ 