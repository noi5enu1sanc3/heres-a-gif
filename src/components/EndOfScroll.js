import React from "react";

const EndOfScroll = () => {
  return (
    <div className="end-of-scroll">
      <img
        className="end-of-scroll__img"
        src={require("../images/eye-open.svg")}
      ></img>
      <p className="end-of-scroll__text">Now you've seen it all!</p>
      <img
        className="end-of-scroll__img"
        src={require("../images/eye-open.svg")}
      ></img>
    </div>
  );
};

export default EndOfScroll;
