import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { PostList } from './components/PostList/PostList';
import data from './DB/data.json';

function App() {
  return (
    <div className="App">
      <Header />
      <PostList posts={data} />
      <Footer />
    </div>
  );
}

export default App;
