import React from 'react';
import './ProfileInfo.css'; // Import the specific CSS file for repo styling


function ProfileInfo({ userData }) {
  if (!userData) return null;

  return (
    <div className="profile-info">
      <div className="profile-header">
        <img className="avatar" src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
        <div className="profile-details">
          <h2>{userData.name || userData.login}</h2>
          <p>@{userData.login}</p>
          <div className="profile-actions">
            <button>Message</button>
            <button>Add Friend</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;

