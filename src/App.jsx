import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { PostList } from './components/PostList/PostList';
function App() {
  return (
    <div className="App">
      <Header />
      <PostList />
      <Footer />
    </div>
  );
}

export default App;
