import React from 'react';
import { Button } from '@mui/material';
import './RepoCard.css';

function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <h3 className="repo-name">{repo.name}</h3>
      <p className="last-updated">Last updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
      <div className="likes">
        <span>{repo.likes ? repo.likes : 0} Likes</span>
        <Button variant="outlined" className="like-btn">Like</Button>
      </div>
      <Button variant="contained" className="share-btn" onClick={() => handleShare(repo.html_url)}>
        Share
      </Button>
    </div>
  );
}

const handleShare = (repoUrl) => {
  alert(`Share this repo: ${repoUrl}`);
};

export default RepoCard;

