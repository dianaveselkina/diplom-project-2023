import { useContext } from "react";
import { Post } from "./Post";
import "./style.css";
import { UserContext, ThemeContext } from "../../context/context";
import { ErrorPage } from "../../pages/ErrorPage";
import { Sort } from "@mui/icons-material";

export const PostList = ({ posts, post, onSort }) => {
  const sortedItems = [
    { id: "Популярные", title: "POPULAR" },
    { id: "Новые", title: "NEWEST" },
    { id: "Все", title: "ALL" },
  ];
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  return (
    <div
      className={`postlist__container postlist__${theme ? "light" : "dark"} `}
    >
      <div className="sort-posts">
        {sortedItems.map((e) => (
          <span className="sort-item" key={e.id} onClick={() => onSort(e.id)}>
            {e.id}
          </span>
        ))}
      </div>
      {posts.map((post) => {
        return <Post key={post.updated_at} {...post} posts={post} />;
      })}
    </div>
  );
};
