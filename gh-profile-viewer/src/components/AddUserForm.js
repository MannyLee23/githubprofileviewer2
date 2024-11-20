import React, { useState } from 'react';

function AddUserForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can save user data (e.g., to Firebase or local state)
    console.log('User added:', { username, email });

    setConfirmationMessage('User added successfully!');
    setTimeout(() => {
      setConfirmationMessage('');
      onClose(); // Close the modal after showing confirmation
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
      {confirmationMessage && <p className="confirmation">{confirmationMessage}</p>}
    </form>
  );
}

export default AddUserForm;
