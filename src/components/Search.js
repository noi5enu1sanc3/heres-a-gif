import React, { useEffect, useState } from "react";
import Gif from "./Gif";
import EndOfScroll from "./EndOfScroll";
import Masonry from "react-masonry-css";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import api from '../utils/Api';

function Search({
  //gifs,
  //searchType,
  query,
  onGifClick,
  //isLoading,
  handleSubmit,
  handleRandomSearch,
  //totalGifs,
}) {
  const {
    values,
    setValues,
    handleChange,
    errors,
    resetForm,
    isValid,
    setIsValid,
  } = useFormAndValidation(".input");

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const [searchGifs, setSearchGifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("random");
  const [offset, setOffset] = useState(0);
  const [totalGifs, setTotalGifs] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const handleScroll = (evt) => {
    if (
      evt.target.documentElement.scrollTop + window.innerHeight + 300 >=
      evt.target.documentElement.scrollHeight
    ) {
      setIsLoading(true);
    }
  };

  //listen for scrolling and trigger loading
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return function() {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //effect for scrolling
  useEffect(() => {
    if (
      isLoading &&
      searchQuery !== ""
    ) {
      searchHandler(searchQuery);
    }
  }, [isLoading, ])

  const getRandom = (list) => {
    const randomItem = list.data[Math.floor(Math.random() * list.data.length)];
    return randomItem;
  };

  const startRandomSearch = () => {
    setOffset(0);
    setSearchType("random");
    setSearchGifs([]);
    api
      .getSearches()
      .then((queries) => getRandom(queries))

      .then((query) => {
        searchHandler(query);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    startRandomSearch();
  }, [])

  const startUserSearch = (str) => {
    setOffset(0);
    setSearchType("user");
    setSearchGifs([]);
    searchHandler(str);
  };

  const searchHandler = (str) => {
    api
      .search(str, offset)
      .then((res) => {
        setTotalGifs(res.pagination.total_count);
        setSearchQuery(str);
        const newGifs = [];
        res.data.forEach((gif) => newGifs.push(gif));
        setSearchGifs((oldGifs) => [...oldGifs, ...newGifs]);
        setOffset((prevOffset) => prevOffset + 30);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const onSearch = (evt) => {
    evt.preventDefault();
    startUserSearch(values.searchQuery);
    setValues({});
    resetForm();
  };

  const onRandomSearch = (evt) => {
    evt.preventDefault();
    console.log("clicked");
    handleRandomSearch();
  };

  return (
    <section
      className="search-gif-section section"
      // searchType={searchType}
      // query={query}
    >
      <form
        onSubmit={onSearch}
        className="search-gif-section__search-form form"
        name="search"
        noValidate
      >
        <input
          value={values.searchQuery || ""}
          onChange={handleChange}
          type="text"
          name="searchQuery"
          className="search-gif-section__input search-gif-section__input_role_search input"
          placeholder="Type something here"
          minLength="1"
          maxLength="20"
          id="search-gif-section__input"
          noValidate
          required
        />
        <div className="search-gif-section__input-error-container">
          <span
            className="search-gif-section__input-error"
            id="search-gif-section__input-error"
          >
            {errors.searchQuery}
          </span>
        </div>
        <button
          type="submit"
          className={`search-gif-section__search-btn submit-btn ${
            isValid ? "" : "popup__save-btn_disabled"
          }`}
          disabled={!isValid}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      <div className="search-gif-section__popular-search-container">
        <p className="search-gif-section__search-text text">
          {`${
            searchType === "random" ? "Someone is searching" : "Here's some"
          } `}
          <span className="search-gif-section__search-query">{searchQuery}</span>
        </p>
        <button
          className="search-gif-section__reload-btn reload-btn"
          onClick={startRandomSearch}
        >
          ↑↓
        </button>
      </div>
      <Masonry
        className="search-gif-section__wrapper grid-search my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        breakpointCols={breakpointColumnsObj}
      >
        {Array.from(searchGifs).map((gif) => (
          <Gif key={gif.id} gif={gif} onGifClick={onGifClick} /> //TODO if search returned nothing
        ))}
      </Masonry>
      {searchGifs.length === totalGifs && totalGifs > 0 && <EndOfScroll />}
    </section>
  );
}

export default Search;
