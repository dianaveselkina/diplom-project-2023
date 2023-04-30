import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
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
