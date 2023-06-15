import { useContext } from 'react';
import { Post } from './Post';
import './style.module.css';
/* import { ThemeContext } from '../../context/context'; */
/* import { Container, Pagination } from '@mui/material'; */
import { ErrorPage } from "../../pages/ErrorPage";
import { AllContextData } from "../../context/context";


/* export const PostList = ({ pagePostCount, pageNum, paginate, posts, onSort }) => {
  const sortedItems = [
    { id: 'Популярные', title: 'POPULAR' },
    { id: 'Новые', title: 'NEWEST' },
    { id: 'Все', title: 'ALL' },
  ];
  const theme = useContext(ThemeContext);
  const displayPaginate = pagePostCount > 2 */


export const PostList = ({ onSort }) => {

  const { postData } = useContext(AllContextData)

  /* let post = (!!countedPost[0]) ? countedPost[0] : []; */

  const sortedItems = [
    { id: 'Популярные', title: 'POPULAR' },
    { id: 'Новые', title: 'NEWEST' },
    { id: 'Все', title: 'ALL' },
  ];

  return (
    <>
      {
        sortedItems.map((e) => (
          <span className="sort-item" key={e.id} onClick={() => onSort(e.id)}>
            {e.id}
          </span>
        ))
      }

      {
        !!postData.length
          ? postData.map(el => <Post key={el._id} {...el} />)
          : <ErrorPage />

      }


    </>
  )
}

/* 
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
      {posts.map(el => {
        return <Post key={el._id} {...el} />;
      })}
    </div>
  );
}; */