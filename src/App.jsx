import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Main/Footer';
import { Header } from './components/Main/Header';
// import data from './DB/data.json';
import { PostOfPage } from './pages/PostOfPage';
import { ErrorPage } from './pages/ErrorPage';
import { api } from './Utils/api';
import { AllContextData } from './context/context';
import { Authorisation } from './components/Auth/Authorisation';
import { AuthError } from './components/Auth/AuthError';
import AllPostPage from './pages/AllPostPage';


const App = () => {

  const [autorozation, setAutorization] = useState(false);
  const [authErr, setAuthErr] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("") !== "" &&
      localStorage.getItem("")
    ) {
      setAutorization(true);
    }
  }, []);

  const onSort = (sortId) => {
    let newPost = [];
    if (sortId === 'Популярные') {
      newPost = postData.sort((a, b) => b.likes.length - a.likes.length);
      setPostData([...newPost]);
      return;
    }
    if (sortId === 'Новые') {
      newPost = postData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPostData([...newPost]);
      return;
    }
    if (sortId === 'По алфавиту') {
      newPost = postData.sort((a, b) => {
        let aText = a.title.toLowerCase();
        let bText = b.title.toLowerCase();
        return aText < bText ? -1 : aText > bText ? 1 : 0;
      });
      setPostData([...newPost]);
      return;
    }
  };

  function singIn(userData) {
    api
      .singInUser(userData)
      .then((data) => authIsTru(data))
      .catch((err) => setAuthErr(err.message));
  }

  function singUp(userData) {
    alert("Готово!");
    const { email: userEmail, password: userPassword } = { ...userData };
    api
      .singUpUser(userData)
      .then((res) => {
        singIn({ email: userEmail, password: userPassword });
      })
      .catch((err) => setAuthErr(err.message));
  }

  function authIsTru(data) {
    setUserData(data.data);
    localStorage.setItem("", data.token);
    console.log('token')
    localStorage.setItem("group-12", data.data.group);
    setAutorization(true);
  }
  function logOut() {
    const result = window.confirm("Уже уходите?");

    if (result) {
      localStorage.removeItem("group-12");
      setAutorization(false);
      setUserData({});
    }
  }

  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [allPostCount, setAllPostcount] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    if (!!autorozation) {
      api.getUserInfo().then((data) => setUserData(data));
    } else {
    }

    if (autorozation) {
      paginatePage(1);
    }
  }, [autorozation]);


  let pagePostCount = Math.ceil(allPostCount / 9);
  const POST_QUANTITY = 9;

  function paginatePage(currentPage = 1) {
    let postQuantity = POST_QUANTITY;
    api
      .getPaginate(currentPage, postQuantity)
      .then(
        (
          data
        ) => {
          setPostData(data.posts);
          setAllPostcount(data.total);
          setPageNumber(currentPage);
        }
      )
      .catch((err) => console.log("ошибка при запросе постов:", err.message));
  }

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


  function addNewPostInState(newPost) {
    let updatedPostData = [...postData, newPost];
    setPostData(updatedPostData);
  }


  function deletePost(author, _id) {
    author._id !== userData._id
      ? alert("Ата-та!")
      : delPost(_id);

    function delPost(_id) {
      const result = window.confirm("Вы уверенны?");
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
    <>
      <AllContextData.Provider
        value={{
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