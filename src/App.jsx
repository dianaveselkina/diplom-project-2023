import './App.css';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
import data from './DB/data.json';
import { PostPage } from './pages/PostPage';
import { UserPage } from './pages/UserPost';

function App() {
  return (
    <div className="App">
      <Header />
      <PostList posts={data} />
      {/* <PostPage /> */}
      {/* <UserPage /> */}
      <Footer />
    </div>
  );
}

export default App;
