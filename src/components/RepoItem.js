import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import './RepoItem.css';

function RepoItem({ repo }) {
  const [likes, setLikes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLike = () => setLikes(likes + 1);

  const handleShareClick = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSenderEmail('');
    setRecipientEmail('');
    setMessage('');
  };

  const handleSendEmail = async () => {
    if (senderEmail && recipientEmail) {
      const emailData = {
        senderEmail,
        recipientEmail,
        repoDetails: `Check out this repository: ${repo.name} - Last updated: ${lastUpdated}`,
      };

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailData),
        });

        if (response.ok) {
          setMessage('Email sent successfully!');
        } else {
          setMessage('Failed to send email.');
        }
      } catch (error) {
        setMessage('Error sending email.');
      }

      setTimeout(() => {
        handleModalClose();
      }, 2000);
    } else {
      setMessage('Please fill in both email addresses.');
    }
  };

  // Formatting the date to show time ago
  const lastUpdated = formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true });

  return (
    <div className="repo-item">
      <div className="repo-details">
        <h3 className="repo-name">{repo.name}</h3>
        <p className="repo-updated">Last updated: {lastUpdated}</p>
      </div>
      <div className="repo-actions">
        <button className="like-button" onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} /> {likes} Like
        </button>
        <button className="share-button" onClick={handleShareClick}>
          <FontAwesomeIcon icon={faShareAlt} /> Share
        </button>
      </div>

      {/* Modal for sharing */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleModalClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h4>Share Repository</h4>
            <input
              type="email"
              placeholder="Your email address"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
            <input
              type="email"
              placeholder="Recipient's email address"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <button onClick={handleSendEmail}>Send</button>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default RepoItem;
