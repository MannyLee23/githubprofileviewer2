import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function IndexMessage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  return (
    <div className="home-content">
      <div className="header">
        <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="GitHub Logo" className="github-logo" />
        <h1 className="title">GitHub Profile Viewer</h1>
      </div>
      <h2 className="description">A simpler way to show your GitHub profile and repositories.</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default IndexMessage;

