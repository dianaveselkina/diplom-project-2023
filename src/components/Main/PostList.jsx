import { Post } from './Post';
import './style.css';

export const PostList = ({ posts, onSort }) => {
  const sortedItems = [
    { id: 'Популярные', title: 'POPULAR' },
    { id: 'Новые', title: 'NEWEST' },
    { id: 'Все', title: 'ALL' },
  ];
  return (
    <div className="postlist__container">
      <div className="sort-posts">
        {sortedItems.map((e) => (
          <span className="sort-item" key={e.id} onClick={() => onSort(e.id)}>
            {e.id}
          </span>
        ))}
      </div>
      {posts.map((post, i) => (
        <Post key={post.name} {...post} posts={post} />
      ))}
    </div>
  );
};
