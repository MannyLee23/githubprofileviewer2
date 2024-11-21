import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './ProfileInfo.css';
import AddFriendModal from './AddFriendModal';

function ProfileInfo({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddFriendModal user={userData} onClose={closeModal} />
      )}
    </div>
  );
}

export default ProfileInfo;
