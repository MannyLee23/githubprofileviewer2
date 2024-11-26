import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './ProfileInfo.css';
import AddFriendModal from './AddFriendModal';
import Messenger from './Messenger';

function ProfileInfo({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate for navigation

  // Handlers for actions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMessenger = () => setIsMessengerOpen((prev) => !prev);

  // Navigate directly to the home page when the back button is clicked
  const goBackHome = () => navigate('/');

  return (
    <div className="profile-info-container">
      {/* Back button using useNavigate to go directly to the home page */}
      <button onClick={goBackHome} className="nav-back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
      </button>

      <div className="profile-header">
        <img
          className="avatar"
          src={userData.avatar_url}
          alt={`${userData.username || userData.login}'s avatar`}
        />
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

      {/* Conditional rendering for modals */}
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



