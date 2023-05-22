import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Main/Footer";
import { Header } from "./components/Main/Header";
import { PostList } from "./components/Main/PostList";
// import data from './DB/data.json';
import { PostPage } from "./pages/PostPage";
import { UserPage } from "./pages/UserPage";
import { CreatePostPage } from "./pages/CreatePostPage";
import { ErrorPage } from "./pages/ErrorPage";
import { api } from "./Utils/api";
import { UserContext, ThemeContext, PostContext } from "./context/context";
import { Button } from "@mui/material";
import { Authorisation } from "./components/Auth/Authorisation";
import { AuthError } from "./components/Auth/AuthError";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [autorozation, SetAutorization] = useState(false); // Стейт авторизации
  const [authErr, setAuthErr] = useState(""); // стейт ошибок авторизации
  const themeValue = { theme, setTheme };

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

  const filteredPosts = (posts) => {
    return posts.filter(
      (e) =>
        e.author._id === "64423c303291d790b3fc967c" ||
        e.author._id === "644573ee3291d790b3073d8d"
    );
  };

  const onSort = (sortId) => {
    if (sortId === "Популярные") {
      const newPosts = posts.sort((a, b) => b.likes.length - a.likes.length);
      setPosts([...newPosts]);
      return;
    }
    if (sortId === "Новые") {
      const newPosts = posts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPosts([...newPosts]);
      return;
    }
    if (sortId === "Все") {
      const newPosts = posts;
      setPosts([...newPosts]);
      return;
    }
  };

  function updatePostState(likedPost) {
    let updatedPostData = posts.map((el) => {
      return el._id !== likedPost._id ? el : likedPost;
    });
    setPosts([...updatedPostData]);
  }

  useEffect(() => {
    if (
      localStorage.getItem("postApi") !== "" &&
      localStorage.getItem("postApi")
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
    api.getAllPosts().then((data) => setPosts(filteredPosts(data)));
  }, []);

  useEffect(() => {
    api.getUserInfo().then((user) => {
      setUser(user);
    });
  }, []);

  const postsValue = {
    updatePostState,
    handleLike: handlePostLike,
    posts: posts,
    favorites,
    onSort,
    user,
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
    console.log(userEmail, userPassword, user);
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
    localStorage.setItem("postApi", data.token);
    localStorage.setItem("group", data.data.group);
    SetAutorization(true);
  }
  console.log(localStorage.getItem("postApi"));
  function logOut() {
    const result = window.confirm("Уже уходите?");

    if (result) {
      localStorage.removeItem("postApi");
      localStorage.removeItem("group");
      SetAutorization(false);
      setUser({});
    }
  }

  return (
    <div className="App">
      <div className={`theme__postlist__${theme ? "light" : "dark"} `}>
        <ThemeContext.Provider value={themeValue}>
          <PostContext.Provider value={postsValue}>
            <UserContext.Provider
              value={{
                user,
                autorozation,
                singIn,
                singUp,
                logOut,
                setUser,
              }}
            >
              <main className="container content">
                <Header />
                {/* {autorozation ? (
                  <main className="main">
                    <Routes>
                      <Route index element={<PostList />} />
                      <Route path="/post/:postId" element={<PostPage />} />
                    </Routes>
                  </main>
                ) : (
                  <Authorisation />
                )} */}

                {authErr !== "" ? (
                  <AuthError authErr={authErr} setAuthErr={setAuthErr} />
                ) : null}
                <Button onClick={() => setTheme(!theme)}></Button>

                <Routes>
                  <Route
                    path="/"
                    element={<PostList onSort={onSort} posts={posts} />}
                  />
                  <Route path="*" element={<ErrorPage />} />
                  <Route path="/createpostpage" element={<CreatePostPage />} />

                  <Route path="/post/:id" element={<PostPage />} />
                  <Route path="/userpage" element={<Authorisation />} />
                </Routes>
                <Footer />
              </main>
            </UserContext.Provider>
          </PostContext.Provider>
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

export default App;
