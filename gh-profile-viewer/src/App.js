import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ProfileInfo from './components/ProfileInfo';
import ReposList from './components/ReposList';
import GithubSSO from './GithubSSO'; // Import the GithubSSO component
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

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

  // Handle the OAuth callback and retrieve the access token
  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (!code) {
      console.error('No code found in the URL.');
      return;
    }

    try {
      // Exchange code for an access token using your backend
      const response = await fetch("http://localhost:5000/api/github/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      console.log(data);  // Log the response to check if we get the accessToken

      if (data.accessToken) {
        setIsAuthenticated(true); // Set authentication to true

        // Fetch user data with access token
        const userResponse = await fetch("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${data.accessToken}` },
        });
        const userData = await userResponse.json();
        console.log('User Data:', userData); // Log user data
        setUserData(userData);
      }
    } catch (error) {
      console.error('Error during GitHub login:', error);
    }
  };

  useEffect(() => {
    // Check for OAuth callback
    if (window.location.pathname === "/callback") {
      handleCallback();
    }
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <img src={require('./assets/logo.png')} alt="GitHub Logo" className="github-logo" />
          <h1 className="title">GitHub Profile Viewer</h1>
        </div>
        <div className="header-right">
          {!isAuthenticated ? (
            <GithubSSO /> // Show login button if not authenticated
          ) : (
            <div className="user-info">
              <img src={userData?.avatar_url} alt="User Avatar" className="user-avatar" />
              <span>Welcome, {userData?.login}!</span> {/* Show username after login */}
            </div>
          )}
        </div>
      </header>
      <h2 className="description">A simpler way to show your GitHub profile and repositories.</h2>
      <SearchBar onSearch={fetchGitHubData} />
      {userData && <ProfileInfo userData={userData} />}
      {repos.length > 0 && <ReposList repos={repos} />}
    </div>
  );
}

export default App;
