import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [username, setUsername] = useState('');

  const handleChange = (e) => setUsername(e.target.value);

  const handleSearch = () => {
    if (username) {
      onSearch(username);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        className="search-bar"
        placeholder="Enter GitHub username..." 
        value={username} 
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
    
  );
}

export default SearchBar;
