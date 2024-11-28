import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ProfileInfo from './components/ProfileInfo';
import ReposList from './components/ReposList';
import FriendsList from './components/FriendsList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

// Create an Auth Context
export const AuthContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);

  const navigate = useNavigate();

  // Load friends list from localStorage when the component mounts
  useEffect(() => {
    const savedFriends = JSON.parse(localStorage.getItem('friendsList')) || [];
    setFriends(savedFriends);
  }, []);

  // Function to add a friend to the list
  const addFriend = (friend) => {
    setFriends((prevFriends) => {
      // Check if the friend already exists in the list to avoid duplicates
      if (!prevFriends.some((existingFriend) => existingFriend.id === friend.id)) {
        const updatedFriends = [...prevFriends, friend];
        localStorage.setItem('friendsList', JSON.stringify(updatedFriends));
        return updatedFriends;
      }
      return prevFriends;
    });
  };

  // Function to remove a friend from the list
  const removeFriend = (friendId) => {
    setFriends((prevFriends) => {
      const updatedFriends = prevFriends.filter((friend) => friend.id !== friendId);
      localStorage.setItem('friendsList', JSON.stringify(updatedFriends));
      return updatedFriends;
    });
  };

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

  const openFriendsList = () => setIsFriendsListOpen(true);
  const closeFriendsList = () => setIsFriendsListOpen(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div className="app-container">
        <header className="header">
          <div className="header-left">
            <img src={require('./assets/logo.png')} alt="GitHub Logo" className="github-logo" />
            <h1 className="main-title">GitHub Profile Viewer</h1>
          </div>
          <div className="header-right">
            <button onClick={openFriendsList} className="nav-button">Friends List</button>
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
                  <ProfileInfo userData={userData} onAddFriend={addFriend} />
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
        {isFriendsListOpen && (
          <FriendsList
            friends={friends}
            onClose={closeFriendsList}
            onRemoveFriend={removeFriend} // Add remove friend function
          />
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}







