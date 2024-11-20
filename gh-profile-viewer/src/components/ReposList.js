import React from 'react';
import RepoItem from './RepoItem';
import './RepoList.css';

function ReposList({ repos }) {
  if (!repos || repos.length === 0) {
    return <p>No repositories found.</p>;
  }

  return (
    <div className="repos-list-container">
      <h2 className="repos-list-title">Public Repositories</h2>
      <div className="search-container">
        <input type="text" placeholder="Search repositories" className="search-bar" />
        <button className="filter-button">Filter By: Update</button>
      </div>
      <div className="repos-list">
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default ReposList;






