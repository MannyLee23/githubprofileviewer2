import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns'; // Import date-fns function to format time
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './RepoItem.css'; // Import the specific CSS file for repo styling

function RepoItem({ repo }) {
  const [likes, setLikes] = useState(0);

  // Handler to increment likes count
  const handleLike = () => setLikes(likes + 1);

  // Format the 'updated_at' date to show time ago (e.g., "2 days ago")
  const lastUpdated = formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true });

  return (
    <div className="repo-item">
      <h3>{repo.name}</h3>
      <p className="last-updated">Last updated: {lastUpdated}</p> {/* Display last updated */}
      
      {/* Like button with heart icon */}
      <div className="like-section">
        <button className="like-button" onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
        </button>
        <span className="likes-count">{likes} Likes</span>
      </div>
    </div>
  );
}

export default RepoItem;
