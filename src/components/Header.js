import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className='header__heading-dot'></div>
      <h1 className='header__heading'>HERE'S A GIF</h1>
      <div className='header__heading-dot'></div>
      <NavLink activeClassName="tab_state_active" className="tab header__trending-btn" to="/trending">Trending</NavLink>
      <NavLink activeClassName="tab_state_active" className="tab header__search-btn" to="/search">Search</NavLink>
      <NavLink activeClassName="tab_state_active" className="tab header__random-btn" to="/random">Random</NavLink>
    </header>
  )
}

export default Header;
