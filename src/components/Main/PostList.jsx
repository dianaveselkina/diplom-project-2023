import { Post } from './Post';
import './style.css';

export const PostList = ({ posts }) => {
  return (
    <div className="postlist__conteiner">
      {posts.map((post) => {
        return <Post key={post.name} {...post} posts={post} />;
      })}
    </div>
  );
};
