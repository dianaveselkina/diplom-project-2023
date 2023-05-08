import { Post } from './Post';
import './style.css';

export const PostList = ({ posts }) => {
  return (
    <div className='postlist__container'>
      {posts.map((post, i) => (
        <Post key={post.name} {...post} posts={post} />
      ))}
    </div>
  );
};
