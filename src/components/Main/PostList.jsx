import { Post } from './Post';
import './style.css';

export const PostList = ({ posts }) => {
  return (
    <div className="postlist__conteiner">
      {posts.map((item) => {
        return <Post key={item.name} {...item} posts={item} />;
      })}
    </div>
  );
};
