import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './ProfileInfo.css';
import AddFriendModal from './AddFriendModal';
import Messenger from './Messenger';

function ProfileInfo({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMessenger = () => setIsMessengerOpen((prev) => !prev);

  return (
    <div className="profile-info">
      <div className="profile-header">
        <img className="avatar" src={userData.avatar_url} alt={`${userData.username || userData.login}'s avatar`} />
        <div className="profile-details">
          <h2>{userData.name || userData.username || userData.login}</h2>
          <p>@{userData.username || userData.login}</p>
          <div className="profile-actions">
            <button className="add-friend-button" onClick={openModal}>
              <FontAwesomeIcon icon={faUserPlus} /> Add Friend
            </button>
            <button className="message-button" onClick={toggleMessenger}>
              <FontAwesomeIcon icon={faEnvelope} /> Message
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddFriendModal user={userData} onClose={closeModal} />
      )}
      {isMessengerOpen && (
        <div className="messenger-container">
          <Messenger username={userData.username || userData.login} />
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;

