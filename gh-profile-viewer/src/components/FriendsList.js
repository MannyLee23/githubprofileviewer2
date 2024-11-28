import React from 'react';
import './FriendsList.css'; 

function FriendsList({ friends, onClose, onRemoveFriend }) {
  return (
    <div className="friends-list-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Friends List</h2>
        <div className="friends-list">
          {friends.length === 0 ? (
            <p>No friends added yet.</p>
          ) : (
            friends.map(friend => (
              <div key={friend.id} className="friend-item">
                <img
                  className="friend-avatar"
                  src={friend.avatar_url}
                  alt={`${friend.login}'s avatar`}
                />
                <div className="friend-details">
                  <h3>{friend.name || friend.login}</h3>
                  <p>@{friend.login}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => onRemoveFriend(friend.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendsList;















