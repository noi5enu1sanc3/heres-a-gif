import React from "react";

function PopupWithGif({ gifLink, gifTitle, gifSource, isOpen, onClose, onOverlay }) {
  return (
    <section className={`popup ${isOpen ? "popup_status_show" : ""}`} onClick={onOverlay}>
      <div className="popup__container">
        <img className="popup__gif" src={gifLink} />
        <div className="popup__info-container">
          <p className="popup__title">{gifTitle}</p>
          <a className="popup__source-link" href={gifSource} target="_blank" rel="noopener noreferrer">see on Giphy</a>
        </div>
        <button className="popup__close-btn" onClick={onClose} />
      </div>
    </section>
  )
}

export default PopupWithGif;
