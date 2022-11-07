import React from "react";

function Gif({ gif, onGifClick }) {
  const handleClick = () => {
    console.log(gif)
    onGifClick(gif);
  }

  return (
    <div className="cardsWrapper grid-item">
      <img className="cardImg" src={gif.images.fixed_width.webp} alt={gif.title} onClick={handleClick} />
    </div>
  )
}

export default Gif;
