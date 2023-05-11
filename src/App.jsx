import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Main/Footer";
import { Header } from "./components/Main/Header";
import { PostList } from "./components/Main/PostList";
// import data from './DB/data.json';
import { PostPage } from "./pages/PostPage";
import { UserPage } from "./pages/UserPage";
import { CreatePostPage } from "./pages/CreatePostPage";
import { ErrorPage } from "./pages/ErrorPage";
import { api } from "./Utils/api";
import { UserContext } from "./context/userContext";
import { CardsContext } from "./context/cardContext";
import { ThemeContext } from "./context/themeContext";

function App() {
  const [posts, setPosts] = useState([]);
  const [user] = useState({});
  const [theme, setTheme] = useState(true);

  const postsValue = {
    posts: posts,
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

  useEffect(() => {
    api.getAllPosts().then((data) => setPosts(filteredPosts(data)));
  }, []);

  return (
    <div className="App">
      <div className={`app__${theme ? "light" : "dark"} `}>
        {/* смена темы */}
        <ThemeContext.Provider value={theme}>
          <CardsContext.Provider value={postsValue}>
            <UserContext.Provider value={user}>
              <Header>
                <button onClick={() => setTheme(!theme)}>change theme</button>{" "}
              </Header>
              <Routes>
                <Route
                  path="/"
                  element={<PostList onSort={onSort} posts={posts} />}
                />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/createpostpage" element={<CreatePostPage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/userpage" element={<UserPage />} />
              </Routes>
              <Footer />
            </UserContext.Provider>
          </CardsContext.Provider>
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

export default App;
