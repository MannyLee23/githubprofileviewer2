import React from 'react';
import './index.css'; // Import the CSS file for styling

function IndexMessage() {
  return (
    <div className="home-content">
      <div className="header">
        <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="GitHub Logo" className="github-logo" />
        <h1 className="title">GitHub Profile Viewer</h1>
      </div>
      <h2 className="description">A simpler way to show your GitHub profile and repositories.</h2>
      <div className="search-container">
        <input type="text" className="search-bar" placeholder="Enter GitHub username..." />
      </div>
    </div>
  );
}

export default IndexMessage;
