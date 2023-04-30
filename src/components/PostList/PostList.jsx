import { Post } from '../Post/Post';
import './postlist.css';
export const PostList = ({ posts }) => {
  return (
    <div className="postlist__conteiner">
      {posts.map((item) => {
        return <Post key={item.name} {...item} posts={item} />;
      })}
    </div>
  );
};
