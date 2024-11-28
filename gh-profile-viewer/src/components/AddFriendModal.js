import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Messenger from './Messenger'; 
import './AddFriendModal.css';

function AddFriendModal({ user, onClose }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false); // State to open/close messenger

  const handleConfirm = () => {
    setIsConfirmed(true);
    addFriendToLocalStorage(user);
  };

  // Function to add a friend to localStorage
  const addFriendToLocalStorage = (friend) => {
    let friendsList = JSON.parse(localStorage.getItem('friendsList')) || [];

    // Check if the friend already exists to avoid duplicates
    const friendExists = friendsList.some(existingFriend => existingFriend.id === friend.id);

    if (!friendExists) {
      friendsList.push({
        id: friend.id,
        login: friend.login,
        avatar_url: friend.avatar_url,
        name: friend.name,
        created_at: friend.created_at,
      });

      // Update the friends list in localStorage
      localStorage.setItem('friendsList', JSON.stringify(friendsList));
    }
  };

  // Function to open messenger
  const handleOpenMessenger = () => {
    setIsMessengerOpen(true);
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
              <button className="message-button" onClick={handleOpenMessenger}>
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
                <p className="user-info"><strong>Member since:</strong> {formattedCreationDate}</p>
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

        {/* Messenger Modal */}
        {isMessengerOpen && (
          <div className="messenger-container">
            <div className="messenger-header">
              <h4>Message {user.name || user.username || user.login}</h4>
              <button className="close-messenger-button" onClick={() => setIsMessengerOpen(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <Messenger username={user.username || user.login} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddFriendModal;






