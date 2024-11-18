import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileInfo from './components/ProfileInfo';
import ReposList from './components/ReposList';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const fetchGitHubData = async (username) => {
    try {
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      const profileData = await profileResponse.json();
      setUserData(profileData);

      const reposResponse = await fetch(profileData.repos_url);
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="logo">
      </div>
      <div className="home-content">
      <div className="header">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" className="github-logo" />
        <h1 className="title">GitHub Profile Viewer</h1>
      </div>
      <h2 className="description">A simpler way to show your GitHub profile and repositories.</h2>
      <div className="search-container">
      </div>
    </div>
      <SearchBar onSearch={fetchGitHubData} />
      {userData && <ProfileInfo userData={userData} />}
      {repos.length > 0 && <ReposList repos={repos} />}
    </div>
  );
}

export default App;
