import React from 'react';
import '../App.css';
import { NavbarData } from './NavbarData';

function Navbar() {
  return (
    <nav>
      <h1>DreamCatcher</h1>
      <ul className="navbar-links">
        {NavbarData.map((item, index) => (
          <li key={index} className="navbar-item">
            <a href={item.link} className="navbar-link">
              {item.icon}
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;