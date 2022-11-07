import React, { useEffect, useState } from "react";
import Gif from "./Gif";
import Masonry from "react-masonry-css";
import EndOfScroll from "./EndOfScroll";
import api from '../utils/Api';

function Trending({ onGifClick }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const [trendingGifs, setTrendingGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalGifs, setTotalGifs] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const getTrending = () => {
    api
      .getTrendingGifs(offset)
      .then((res) => {
        setTotalGifs(res.pagination.total_count);
        const newGifs = [];
        res.data.forEach((gif) => newGifs.push(gif));
        setTrendingGifs((oldGifs) => [...oldGifs, ...newGifs]);
        console.log(trendingGifs);
        setOffset((prevOffset) => prevOffset + 30);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getTrending();
  }, []);

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
    if (isLoading && trendingGifs.length > 0) {
      getTrending();
    }
  }, [isLoading]);

  return (
    <section className="trending-gifs-section section">
      <Masonry
        className="trending-gifs-section__wrapper grid my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        breakpointCols={breakpointColumnsObj}
      >
        {Array.from(trendingGifs).map((gif) => (
          <Gif key={gif.id} gif={gif} onGifClick={onGifClick} />
        ))}
      </Masonry>
      {trendingGifs.length === totalGifs && totalGifs > 0 && <EndOfScroll />}
    </section>
  );
}

export default Trending;
