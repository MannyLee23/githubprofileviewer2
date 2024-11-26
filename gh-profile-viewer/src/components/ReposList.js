import React, { useState } from 'react';
import RepoItem from './RepoItem';
import './RepoList.css';

function ReposList({ repos }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDescending, setIsDescending] = useState(true); // Track filter order

  if (!repos || repos.length === 0) {
    return <p>No repositories found.</p>;
  }

  // Filter repositories based on the search term
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort repositories based on update date
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return isDescending ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setIsDescending(!isDescending);
  };

  return (
    <div className="repos-list-container">
      <h2 className="repos-list-title">Public Repositories</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search repositories"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="filter-button" onClick={toggleSortOrder}>
          Filter By: {isDescending ? 'Update (Descending)' : 'Update (Ascending)'}
        </button>
      </div>
      <div className="repos-list">
        {sortedRepos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default ReposList;








