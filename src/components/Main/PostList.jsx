import { useContext } from 'react';
import { Post } from './Post';
import './style.css';
import { ThemeContext } from '../../context/context';
import { Container, Pagination, Stack } from '@mui/material';

export const PostList = ({ pagePostCount, pageNum, paginate, posts, onSort }) => {
  const sortedItems = [
    { id: 'Популярные', title: 'POPULAR' },
    { id: 'Новые', title: 'NEWEST' },
    { id: 'Все', title: 'ALL' },
  ];
  const theme = useContext(ThemeContext);
  const displayPaginate = pagePostCount > 2


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
        <Container >
          {displayPaginate
            ? <Pagination
              page={pageNum}
              count={pagePostCount} color="primary" onChange={(event, num) =>
                paginate(num)
              } sx={{
                marginLeft: '280px',
                background: '#f2e3d',
                borderRadius: '9px'
              }} />
            : null
          }
        </Container>
      </div>
      {posts.map((post) => {
        return <Post key={post.updated_at} {...post} post={post} />;
      })}
    </div>
  );
};
