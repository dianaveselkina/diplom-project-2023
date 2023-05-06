import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import { AllContextData } from "../context/context";
import "./style.css";

export const Search = () => {
  const [inputText, setInputText] = useState("");
  const data = useContext(AllContextData);
  const paginatePage = data[5];
  const setSearch = data[6];
  const search = data[7];

  const formSubmit = (e) => {
    e.preventDefault();
    paginatePage(1, inputText);
    setSearch(!search);
    setInputText("");
  };

  return (
    <form className="search" onSubmit={formSubmit}>
      <input
        type="text"
        className="search__input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Поиск по заголовкам постов"
      />

      <IconButton type="submit" className="search__btn">
        <SearchIcon />
      </IconButton>

      <IconButton
        onClick={() => {
          setSearch(false);
          paginatePage();
        }}
        className="search__btn"
      >
        <HomeIcon />
      </IconButton>
    </form>
  );
};
