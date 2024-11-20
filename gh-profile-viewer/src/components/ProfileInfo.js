import React, { useState } from 'react';
import './ProfileInfo.css';
import AddUserForm from './AddUserForm';  // Add this import if the component exists separately
import AddFriendModal from './AddFriendModal';


function ProfileInfo({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!userData) return null;

  return (
    <div className="profile-info">
      <div className="profile-header">
        <img className="avatar" src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
        <div className="profile-details">
          <h2>{userData.name || userData.login}</h2>
          <p>@{userData.login}</p>
          <div className="profile-actions">
            <button onClick={openModal}>Add Friend</button>
          </div>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h3>Add User</h3>
                <AddUserForm onClose={closeModal} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;



