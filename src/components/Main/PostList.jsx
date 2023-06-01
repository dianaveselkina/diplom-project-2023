import { useContext } from 'react';
import { Post } from './Post';
import './style.css';
import { ThemeContext } from '../../context/context';

export const PostList = ({ posts, onSort }) => {
  const sortedItems = [
    { id: 'Популярные', title: 'POPULAR' },
    { id: 'Новые', title: 'NEWEST' },
    { id: 'Все', title: 'ALL' },
  ];
  const theme = useContext(ThemeContext);

  return (
    <div
      className={`postlist__container postlist__${theme ? 'light' : 'dark'} `}
    >
      <div className="sort-post">
        {sortedItems.map((e) => (
          <span className="sort-item" key={e.id} onClick={() => onSort(e.id)}>
            {e.id}
          </span>
        ))}
      </div>
      {posts.map((post) => {
        return <Post key={post.updated_at} {...post} post={post} />;
      })}
    </div>
  );
};
