import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import './RepoItem.css';

function RepoItem({ repo }) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => setLikes(likes + 1);

  // Formatting the date to show time ago
  const lastUpdated = formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true });

  return (
    <div className="repo-item">
      <div className="repo-details">
        <h3 className="repo-name">{repo.name}</h3>
        <p className="repo-updated">Last updated: {lastUpdated}</p>
      </div>
      <div className="repo-actions">
        <button className="like-button" onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} /> {likes} Like
        </button>
        <button className="share-button">
          <FontAwesomeIcon icon={faShareAlt} /> Share
        </button>
      </div>
    </div>
  );
}

export default RepoItem;
