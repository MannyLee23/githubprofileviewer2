import React from 'react';
import RepoItem from './RepoItem'; // Import RepoItem component

function ReposList({ repos }) {
  // Check if repos array is empty or not loaded yet
  if (!repos || repos.length === 0) {
    return <p>No repositories available</p>;
  }

  return (
    <div className="repos-list">
      {repos.map((repo) => (
        // Pass each repo as a prop to RepoItem component
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
}

export default ReposList;





