import React from 'react';
import './pages.module.css';
import { Container, Pagination, Stack } from '@mui/material';
import { PostList } from '../components/Main/PostList';

export default function AllPostPage({ onSort, pagePostCount, pageNumber, paginatePage }) {

  const displayPaginate = pagePostCount > 1
  /* console.log(postData) */

  const sortedItems = [
    { id: 'Популярные', title: 'POPULAR' },
    { id: 'Новые', title: 'NEWEST' },
    { id: 'Все', title: 'ALL' },
  ];

  return (
    <>
      <Stack>

        <Container sx={{
          display: "flex",
          flexWrap: 'wrap',
          justifyContent: "center",
          backgroundColor: '#006663',

        }} maxWidth='xl'>

          <Container sx={{
            display: "flex",
            flexWrap: 'wrap',
            justifyContent: "center",
            padding: '15px',
            mb: '1%',
          }}>
            <div className="sort-posts">
              {
                sortedItems.map((e) => (
                  <span className="sort-item" key={e.id} onClick={() => onSort(e.id)} >
                    {e.id}
                  </span>
                ))
              }
            </div>
            {
              displayPaginate
                ? <Pagination
                  page={pageNumber}
                  count={pagePostCount} color="primary" onChange={
                    (event, num) =>
                      paginatePage(num)
                  } sx={{
                    display: "flex",
                    justifyContent: "center",
                    background: '#5fcdd9',
                    mt: '10%',
                    ml: '-15%',
                    borderRadius: '10px',
                  }} />
                : null
            }
          </Container>

          <Container sx={{
            display: "flex",
            flexWrap: 'wrap',
            justifyContent: "center",
            gap: '30px',
            marginTop: '10px',
            marginBottom: '80px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',

          }} maxWidth='xl'>

            <PostList />

          </Container>
        </Container>
      </Stack>
    </>
  )
}