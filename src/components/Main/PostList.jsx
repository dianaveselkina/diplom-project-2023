import { LIKEST } from "../../sort/sort";
import { Post } from "./Post";
import "./style.css";

/* export const PostList = ({ posts }) => {
  console.log(goods);
  return (
    <div className="postlist__conteiner">
      {posts.map((post) => {
        return <Post key={post.name} {...post} posts={post} />;
      })}
    </div>
  );
}; */

export const PostList = ({ posts }) => {
  return (
    <div className="postlist__conteiner">
      {posts.map((post, i) => (
        <Post key={post.name} {...post} posts={post} />
      ))}
    </div>
  );
};

/* const { cards, onSort, search } = useContext(CardsContext);

/* сортировка с переводом*/

/* const sortedItems = [
  { id: LIKEST, title: "Популярные" },
  { id: NEWEST, title: "Новые" },
]; */
