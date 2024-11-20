import React from 'react';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
import './MessagingPage.css';

function MessagingPage() {
  return (
    <div className="messaging-page">
      <MessagesList />
      <MessageForm />
    </div>
  );
}

export default MessagingPage;
