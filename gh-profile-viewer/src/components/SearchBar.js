import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    if (username.trim() !== '') {
      onSearch(username);
    } else {
      alert('Please enter a GitHub username');
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        <FontAwesomeIcon icon={faSearch} /> {/* Add the search icon here */}
      </button>
    </div>
  );
}

export default SearchBar;



