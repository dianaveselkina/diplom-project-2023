import React from 'react';
import './pages.module.css';
import { Container, Pagination, Stack } from '@mui/material';
import { PostList } from '../components/Main/PostList';

export default function AllPostPage({ pagePostCount, pageNumber, paginatePage }) {


  const displayPaginate = pagePostCount > 2


  return (
    <>
      <Stack>

        <Container sx={{
          display: "flex",
          flexWrap: 'wrap',
          justifyContent: "center",
          gap: '10px',
          marginTop: '10px',

        }} maxWidth='xl'>

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
                  background: 'white',
                  borderRadius: '10px'
                }} />
              : null
          }

        </Container>
        <Container sx={{
          display: "flex",
          flexWrap: 'wrap',
          justifyContent: "center",
          gap: '10px',
          marginTop: '10px',

        }} maxWidth='xl'>

          <PostList />

        </Container>

        <Container sx={{
          display: "flex",
          flexWrap: 'wrap',
          justifyContent: "center",
          padding: '15px',
          mb: '10%',
        }}>

          {displayPaginate
            ? <Pagination
              page={pageNumber}
              count={pagePostCount} color="primary" onChange={(event, num) =>
                paginatePage(num)
              } sx={{
                background: 'white',
                borderRadius: '10px'
              }} />
            : null
          }

        </Container >

      </Stack>
    </>
  )
}


/* ) => {
  const [post, setPosts] = useState({});
  const { id } = useParams();
  const { user, handleLike } = useContext(AllContextData);
  useEffect(() => {
    if (id) {
      api.getPostById(id).then((data) => setPosts(data));
    }
  }, [id]);

  const onPostLike = (item, isLikedPost) => {
    handleLike(item, isLikedPost);
    if (isLikedPost) {
      const filteredLikes = item.likes.filter((e) => e !== user?._id);
      setPosts((s) => ({ ...s, likes: filteredLikes }));
    } else {
      const addLikes = [...item.likes, user?._id];
      setPosts((s) => ({ ...s, likes: addLikes }));
    }
  };

  return (
    <>
      {!!Object.keys(post).length ? (
        <PostOfPage post={post} onPostLike={onPostLike} setPosts={setPosts} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
 */