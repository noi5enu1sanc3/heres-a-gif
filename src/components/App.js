import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  withRouter,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import Header from "./Header";
import Trending from "./Trending";
import Search from "./Search";
import PopupWithGif from "./PopupWithGif";
import api from "../utils/Api";
import { key } from "../utils/key";
import ScrollToTop from "./ScrollToTop";

function App() {
  const location = useLocation();

  const [gifs, setGifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("random");

  const [selectedGif, setSelectedGif] = useState(null);

  const [offset, setOffset] = useState(0);
  const [totalGifs, setTotalGifs] = useState(0);

  const [isLoading, setIsLoading] = useState(true);



  // const getRandom = (list) => {
  //   const randomItem = list.data[Math.floor(Math.random() * list.data.length)];
  //   return randomItem;
  // };

  // const startTrendingSearch = () => {
  //   setOffset(0);
  //   setSearchType("");
  //   setGifs([]);
  //   getTrending();
  // };

  // const startRandomSearch = () => {
  //   setOffset(0);
  //   setSearchType("random");
  //   setGifs([]);
  //   api
  //     .getSearches()
  //     .then((queries) => getRandom(queries))

  //     .then((query) => {
  //       searchHandler(query);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const startUserSearch = (str) => {
  //   setOffset(0);
  //   setSearchType("user");
  //   setGifs([]);
  //   searchHandler(str);
  // };

  // const searchHandler = (str) => {
  //   api
  //     .search(str, offset)
  //     .then((res) => {
  //       setTotalGifs(res.pagination.total_count);
  //       setSearchQuery(str);
  //       const newGifs = [];
  //       res.data.forEach((gif) => newGifs.push(gif));
  //       setGifs((oldGifs) => [...oldGifs, ...newGifs]);
  //       setOffset((prevOffset) => prevOffset + 30);
  //       console.log(gifs);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setIsLoading(false));
  // };

  // const getTrending = () => {
  //   api
  //     .getTrendingGifs(offset)
  //     .then((res) => {
  //       setTotalGifs(res.pagination.total_count);
  //       const newGifs = [];
  //       res.data.forEach((gif) => newGifs.push(gif));
  //       setGifs((oldGifs) => [...oldGifs, ...newGifs]);
  //       console.log(gifs);
  //       setOffset((prevOffset) => prevOffset + 30);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setIsLoading(false));
  // };

  // const handleScroll = (evt) => {
  //   if (
  //     evt.target.documentElement.scrollTop + window.innerHeight + 300 >=
  //     evt.target.documentElement.scrollHeight
  //   ) {
  //     setIsLoading(true);
  //   }
  // };

  // //listen for scrolling and trigger loading
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return function() {
  //     document.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  //effect for loading the page
  // useEffect(() => {
  //   if (location.pathname === "/trending") {
  //     startTrendingSearch();
  //   } else if (location.pathname === "/search") {
  //     startRandomSearch();
  //   }
  // }, []);

  //effect for scrolling
  // useEffect(() => {
  //   console.log(`location is ${location.pathname}, loading = ${isLoading}`);

  //  if (
  //     location.pathname === "/search" &&
  //     isLoading &&
  //     searchQuery !== ""
  //   ) {
  //     searchHandler(searchQuery);
  //   }
  // }, [isLoading, location]);

  const history = useHistory();

  // useEffect(() => {
  //   history.push('/trending');
  //   //getTrending();
  // }, [])

  //load gifs when changing location
  // useEffect(() => {
  //   return history.listen((location) => {
  //     setGifs([]);
  //     //setIsLoading(true);
  //     // setOffset(0);

  //     //setGifs([]);
  //     console.log(
  //       `You changed the page to: ${location.pathname}, loading is ${isLoading}`
  //     );

  //     if (location.pathname === "/search") {
  //       //setIsLoading(true);
  //       //setGifs([]);
  //       console.log(gifs, location, "history listen");

  //       startRandomSearch();
  //     } else if (location.pathname === "/trending") {
  //       //setGifs([]);
  //       console.log(gifs, location, "history listen");

  //       startTrendingSearch();
  //     }
  //   });
  // }, [history, location.key]);

  //set data for a gif that was clicked and open gif popup
  const gifClickHandler = (gif) => {
    console.log(selectedGif);
    setSelectedGif({
      isPopupWithGifOpen: true,
      gifLink: gif.images.original.url,
      gifSource: gif.bitly_url,
      gifTitle: gif.title,
    });
  };

  //popup
  const closePopup = () => {
    setSelectedGif(null);
  };

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup();
    }
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    if (selectedGif && selectedGif.isPopupWithGifOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [selectedGif]);

  return (
    <div className="root">
      <Header />
      <main className="content">
        <Switch>
          <Route exact path="/trending">
            <Trending
              //gifs={gifs}
              onGifClick={gifClickHandler}
              //isLoading={isLoading}
              //offset={offset}
              //totalGifs={totalGifs}
            />
            <ScrollToTop />
          </Route>
          <Route exact path="/search">
            <Search
              gifs={gifs}
              //handleRandomSearch={startRandomSearch}
              //handleSubmit={startUserSearch}
              //searchType={searchType}
              //query={searchQuery}
              onGifClick={gifClickHandler}
              //isLoading={isLoading}
              //totalGifs={totalGifs}
            />
            <ScrollToTop />
          </Route>
          <Route path="*">
            <Redirect to="/trending" />
          </Route>
        </Switch>
      </main>
      <PopupWithGif
        isOpen={selectedGif !== null ? selectedGif.isPopupWithGifOpen : ""}
        gifLink={selectedGif !== null ? selectedGif.gifLink : ""}
        gifSource={selectedGif !== null ? selectedGif.gifSource : ""}
        gifTitle={selectedGif !== null ? selectedGif.gifTitle : ""}
        onClose={closePopup}
        onOverlay={handleOverlayClick}
      />
      <a
        href="https://giphy.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="attribution-logo"
        norefferer="true"
        noopener="true"
      ></a>
    </div>
  );
}

export default withRouter(App);
