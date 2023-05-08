import { useContext } from 'react';
import { PostList } from '../components/Main/PostList';
import { Search } from '@mui/icons-material';
import { PostContext } from '../components/context/PostContext';
import './style.css';

export const LIKEST = 'likest';
export const NEWEST = 'newest';

export const Sort = () => {
  const { posts, onSort } = useContext(PostContext);

  return (
    <>
      {Search && (
        <p className='search'>
          {' '}
          По запросу <b>{Search}</b> {posts.length === 1 ? 'найден' : 'найдено'}{' '}
          {posts.length}
        </p>
      )}
      {/* сортировка при выборке */}
      <div className='sort-posts'>
        {posts.map((e) => (
          <span className='sort-item' key={e.id} onClick={() => onSort(e.id)}>
            {e.id}
          </span>
        ))}
      </div>
      <PostList posts={posts} />
    </>
  );
};

/* .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((e) => (
                <div key={e.created_at} className={s.comment}> */
