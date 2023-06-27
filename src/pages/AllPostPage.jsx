import React from 'react';
import './pages.module.css';
import { Container, Pagination, Stack } from '@mui/material';
import { PostList } from '../components/Main/PostList';

export default function AllPostPage({ onSort, pagePostCount, pageNumber, paginatePage }) {

  const displayPaginate = pagePostCount > 1

  const sortedItems = [
    { id: 'Популярные', title: 'POPULAR' },
    { id: 'Новые', title: 'NEWEST' },
    { id: 'По алфавиту', title: 'ABC' },
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
            padding: '15px',
            marginTop: '80px',
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
          </Container>

          <Container sx={{
            display: "flex",
            flexWrap: 'wrap',
            justifyContent: "center",
            padding: '15px',
            mb: '1%',
          }}>
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
                    mt: '-30px',
                    borderRadius: '4px',
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

          }} maxWidth='xl'>

            <PostList />

          </Container>
        </Container>
      </Stack>
    </>
  )
}