import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import emailjs from 'emailjs-com'; 
import './RepoItem.css';

function RepoItem({ repo }) {
  const [likes, setLikes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  const repoKey = `repo-${repo.id}-likes`; // Unique key for the repository in localStorage

  // Load likes from localStorage when the component mounts
  useEffect(() => {
    const savedLikes = localStorage.getItem(repoKey);
    if (savedLikes) {
      setLikes(Number(savedLikes));
    }
  }, [repoKey]);

  // Save likes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(repoKey, likes);
  }, [likes, repoKey]);

  const handleLike = () => setLikes(likes + 1);

  const handleShareClick = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSenderEmail('');
    setRecipientEmail('');
    setMessage('');
  };

  // Function to send email using EmailJS
  const handleSendEmail = async () => {
    if (senderEmail && recipientEmail) {
      const emailParams = {
        from_name: senderEmail,
        to_email: recipientEmail,
        reply_to: senderEmail, // Set the reply-to field to the sender's email
        repo_name: repo.name,
        repo_url: repo.html_url,
        last_updated: formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true }),
      };

      try {
        await emailjs.send(
          'service_kz52cwk',    // EmailJS service ID
          'template_iv6gqfq',   // EmailJS template ID
          emailParams,
          'kJzvEyNyd2VS3XOo2'   // EmailJS public key
        );
        setMessage('Email sent successfully!');
      } catch (error) {
        console.error('Error sending email:', error);
        setMessage('Failed to send email. Please try again.');
      }

      // Close the modal after 2 seconds
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
        {/* Make the repo name clickable, redirecting to the GitHub repo page */}
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
          <h3 className="repo-name">{repo.name}</h3>
        </a>
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


