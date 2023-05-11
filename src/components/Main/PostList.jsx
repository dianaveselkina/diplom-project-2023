import { useContext } from "react";
import { Post } from "./Post";
import "./style.css";
import { ThemeContext } from "../../context/themeContext";
import { UserContext } from "../../context/userContext";

export const PostList = ({ posts, onSort }) => {
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
      {posts.map((post, i) => (
        <Post key={post.name} {...post} posts={post} />
      ))}
    </div>
  );
};
