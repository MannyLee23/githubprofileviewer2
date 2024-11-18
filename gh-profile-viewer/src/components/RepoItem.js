import React, { useState } from 'react';

function RepoItem({ repo }) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => setLikes(likes + 1);

  return (
    <div>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <button onClick={handleLike}>Like</button>
      <p>{likes} Likes</p>
    </div>
  );
}

export default RepoItem;
