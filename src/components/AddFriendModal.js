import React, { useState } from 'react';
import './AddFriendModal.css';

function AddFriendModal({ user, onClose }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <div className="add-friend-modal">
      <div className="modal-content">
        {isConfirmed ? (
          // Confirmation screen
          <div className="confirmation-screen">
            <h2>Friend Request Sent!</h2>
            <div className="user-details">
              <img className="avatar" src={user.avatar_url} alt={`${user.username}'s avatar`} />
              <h3>{user.name}</h3>
              <p>Last active: 4 hours ago</p>
              <p>Member since: 2017</p>
            </div>
            <div className="action-buttons">
              <button onClick={onClose}>Return to Profile</button>
              <button>Send a Message</button>
            </div>
          </div>
        ) : (
          // Friend request screen
          <div className="request-screen">
            <h2>Adding Friends</h2>
            <div className="user-details">
              <img className="avatar" src={user.avatar_url} alt={`${user.username}'s avatar`} />
              <p>Add @{user.username} as a friend?</p>
              <div className="action-buttons">
                <button className="confirm-btn" onClick={handleConfirm}>✔️</button>
                <button className="cancel-btn" onClick={onClose}>❌</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddFriendModal;
