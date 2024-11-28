import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEnvelope, faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './ProfileInfo.css';
import AddFriendModal from './AddFriendModal';
import Messenger from './Messenger';

function ProfileInfo({ userData, onSearch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const navigate = useNavigate();

  // Load friends list from localStorage when the component mounts
  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem('friendsList')) || [];
    setFriendsList(storedFriends);
  }, []);

  // Save friends list to localStorage whenever it changes
  useEffect(() => {
    if (friendsList.length > 0) {
      localStorage.setItem('friendsList', JSON.stringify(friendsList));
    }
  }, [friendsList]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMessenger = () => setIsMessengerOpen((prev) => !prev);
  const goBackHome = () => navigate('/');

  // Add friend function with duplicate check
  const addFriend = () => {
    const isAlreadyFriend = friendsList.some((friend) => friend.id === userData.id);

    if (!isAlreadyFriend) {
      setFriendsList((prevFriends) => {
        const updatedFriendsList = [...prevFriends, userData];
        localStorage.setItem('friendsList', JSON.stringify(updatedFriendsList)); // Update local storage immediately
        return updatedFriendsList;
      });
      closeModal();
    } else {
      alert('This user is already in your friends list.');
      closeModal();
    }
  };

  // Handler to search a new GitHub user
  const handleSearchNewUser = () => {
    if (newUsername.trim() !== '') {
      onSearch(newUsername);
    } else {
      alert('Please enter a valid GitHub username');
    }
  };

  return (
    <div className="profile-info-container">
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

        {/* Search New User Input */}
        <div className="search-new-user">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Search new user..."
            className="search-input-small"
          />
          <button onClick={handleSearchNewUser} className="search-button-small">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {/* Add Friend Modal */}
      {isModalOpen && (
        <AddFriendModal
          user={userData}
          onClose={closeModal}
          onConfirm={addFriend}
        />
      )}

      {/* Messenger */}
      {isMessengerOpen && (
        <div className="messenger-container">
          <Messenger username={userData.username || userData.login} />
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
