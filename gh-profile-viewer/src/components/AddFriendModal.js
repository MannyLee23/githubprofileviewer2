import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import './AddFriendModal.css';

function AddFriendModal({ user, onClose }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  // Format the account creation date
  const formattedCreationDate = user.created_at
    ? format(new Date(user.created_at), "MMMM yyyy")
    : "Unknown";

  return (
    <div className="add-friend-modal">
      <div className="modal-content">
        {isConfirmed ? (
          // Confirmation screen
          <div className="confirmation-screen">
            <h2>Friend Request Sent!</h2>
            <div className="user-details">
              <img className="avatar" src={user.avatar_url} alt={`${user.username || user.login}'s avatar`} />
              <h3>{user.name || user.username || user.login}</h3>
              <p>Last active: 4 hours ago</p>
              <p>Member since: {formattedCreationDate}</p>
            </div>
            <div className="action-buttons">
              <button className="profile-button" onClick={onClose}>
                <FontAwesomeIcon icon={faUser} /> Return to Profile
              </button>
              <button className="message-button">
                <FontAwesomeIcon icon={faEnvelope} /> Send a Message
              </button>
            </div>
          </div>
        ) : (
          // Friend request screen
          <div className="friend-request-screen">
            <div className="content-container">
              <div className="left-section">
                <img className="avatar" src={user.avatar_url} alt={`${user.username || user.login}'s avatar`} />
                <p className="user-info"><strong>Last active:</strong> 4 hours ago</p>
                <p className="user-info"><strong>Member since:</strong> {formattedCreationDate}</p> {/* Display formatted account creation date */}
              </div>
              <div className="right-section">
                <h2>Add @{user.username || user.login} as a friend?</h2>
                <div className="confirmation-buttons">
                  <button className="confirm-btn" onClick={handleConfirm}>✔️</button>
                  <button className="cancel-btn" onClick={onClose}>❌</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddFriendModal;

