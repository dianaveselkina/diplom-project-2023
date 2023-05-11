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
import { UserContext } from "./context/userContext";
import { ThemeContext } from "./context/themeContext";
import { Button } from "@mui/material";

function App() {
  const [posts, setPosts] = useState([]);
  const [user] = useState({});
  const [theme, setTheme] = useState(true);

  const themeValue = {
    theme,
    setTheme,
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
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <UserContext.Provider value={user}>
            <main className="container content">
              <Header />
              <Button onClick={() => setTheme(!theme)}>
                {/* Поменять тему */}
              </Button>
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
            </main>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

export default App;
