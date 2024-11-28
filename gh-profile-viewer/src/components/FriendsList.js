import React from 'react';
import './FriendsList.css';

function FriendsList({ friends, onClose }) {
  return (
    <div className="friends-list-modal">
      <div className="friends-list-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Friends List</h2>
        <div className="friends-list-scrollable">
          {friends.length === 0 ? (
            <p>No friends added yet.</p>
          ) : (
            friends.map((friend) => (
              <div key={friend.id} className="friend-item">
                <img src={friend.avatar_url} alt={`${friend.login}'s avatar`} className="friend-avatar" />
                <div className="friend-details">
                  <h3>{friend.name || friend.login}</h3>
                  <p>@{friend.login}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendsList;













