import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ProfileInfo from './components/ProfileInfo';
import ReposList from './components/ReposList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

// Create an Auth Context
export const AuthContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const fetchGitHubData = async (username) => {
    try {
      console.log('Searching for:', username);
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);

      if (!profileResponse.ok) {
        throw new Error('User not found');
      }

      const profileData = await profileResponse.json();
      setUserData(profileData);

      const reposResponse = await fetch(profileData.repos_url);

      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const reposData = await reposResponse.json();
      setRepos(reposData);

      navigate(`/profile/${username}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div className="app-container">
        <header className="header">
          <div className="header-left">
            <img src={require('./assets/logo.png')} alt="GitHub Logo" className="github-logo" />
            <h1 className="main-title">GitHub Profile Viewer</h1>
          </div>
          <div className="header-right">
            {!isAuthenticated ? (
              <div className="auth-links">
                <Link to="/login" className="nav-button">Login</Link>
                <Link to="/register" className="nav-button">Register</Link>
              </div>
            ) : (
              <div className="user-info">
                <span>Welcome, User!</span>
                <button onClick={() => setIsAuthenticated(false)} className="logout-button">Logout</button>
              </div>
            )}
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <h2 className="description">A simpler way to show your GitHub profile and repositories.</h2>
                <SearchBar onSearch={fetchGitHubData} />
              </div>
            }
          />
          <Route
            path="/profile/:username"
            element={
              userData ? (
                <>
                  <ProfileInfo userData={userData} />
                  <ReposList repos={repos} />
                </>
              ) : (
                <div>Loading Profile...</div>
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default function WrappedApp() {
  // Make sure to wrap App in Router here
  return (
    <Router>
      <App />
    </Router>
  );
}

