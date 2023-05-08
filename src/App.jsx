import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { PostContext } from './components/context/PostContext';
import { UserContext } from './components/context/UserContext';
import { Footer } from './components/Main/Footer';
import { Header } from './components/Main/Header';
import { PostList } from './components/Main/PostList';
// import data from './DB/data.json';
import { PostPage } from './pages/PostPage';
import { UserPage } from './pages/UserPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { ErrorPage } from './pages/ErrorPage';
import { api } from './Utils/api';
import { LIKEST, NEWEST } from './sort/Sort';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  const filteredPosts = (posts) => {
    return posts.filter(
      (e) =>
        e.author._id === '64423c303291d790b3fc967c' ||
        e.author._id === '644573ee3291d790b3073d8d'
    );
  };

  const onSort = (sortId) => {
    if (sortId === LIKEST) {
      const newCards = posts.sort((a, b) => b.likes.length - a.likes.length);
      setPosts([...newCards]);
      return;
    }
    if (sortId === NEWEST) {
      const newPosts = posts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPosts([...newPosts]);
      return;
    }
  };

  useEffect(() => {
    api.getAllPosts().then((data) => setPosts(filteredPosts(data)));
  }, []);
  const postValue = { onSort };
  return (
    <div className='App'>
      <Header />
      <PostContext.Provider value={postValue}>
        <UserContext.Provider value={user}>
          <>
            <Routes>
              <Route path='/' element={<PostList posts={posts} />} />
              <Route path='*' element={<ErrorPage />} />
              <Route path='/createpostpage' element={<CreatePostPage />} />
              <Route path='/post/:id' element={<PostPage />} />
              <Route path='/userpage' element={<UserPage />} />
            </Routes>
          </>
        </UserContext.Provider>
      </PostContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
