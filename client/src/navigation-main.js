import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = (props) => {
  return (
    <div className="header-nav">
      <NavLink 
        key="home" 
        to={'/'} 
        activeClassName="hide" 
        className="main-title"
        onClick={() => props.handleScroll(true)}>
        <header>
          <h1 className="name">A<span>bb</span>ey Reisle</h1>
          <p className="title">web developer/designer</p>
        </header>
      </NavLink>
      <nav className={`main-nav`}>
        <ul>
          <li>
            <NavLink 
              key="portfolio" 
              to={'/portfolio'} 
              onClick={() => props.handleScroll(true)}>
              <span>Portfolio</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              key="about" 
              to={'/about-contact'} 
              onClick={() => props.handleScroll(true)}>
              <span>About</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { MainNav };