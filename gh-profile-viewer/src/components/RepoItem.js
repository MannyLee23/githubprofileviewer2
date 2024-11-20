import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import './RepoItem.css';

function RepoItem({ repo }) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => setLikes(likes + 1);

  const lastUpdated = formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true });

  return (
    <div className="repo-item">
      <h3>{repo.name}</h3>
      <p className="last-updated">Last updated: {lastUpdated}</p>
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

