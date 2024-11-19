import React from 'react';
import { Button } from '@mui/material'; // Assuming you're using MUI for button styles
import './RepoCard.css'; // Custom CSS for RepoCard styling

function RepoCard({ repo }) {
    return (
        <div className="repo-card">
            {/* Repo Name */}
            <h3 className="repo-name">{repo.name}</h3>

            {/* Last Updated Date */}
            <p className="last-updated">Last updated: {new Date(repo.updated_at).toLocaleDateString()}</p>

            {/* Likes Section */}
            <div className="likes">
                <span>{repo.likes ? repo.likes : 0} Likes</span>
                <Button variant="outlined" className="like-btn">Like</Button>
            </div>

            {/* Share Button */}
            <Button variant="contained" className="share-btn" onClick={() => handleShare(repo.url)}>
                Share
            </Button>
        </div>
    );
}

// Share functionality (could use a modal, copy link, etc.)
const handleShare = (repoUrl) => {
    alert(`Share this repo: ${repoUrl}`);
};

export default RepoCard;
