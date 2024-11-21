import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="GitHub Logo" />
        <h1>GitHub Profile Viewer</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default Navbar;

