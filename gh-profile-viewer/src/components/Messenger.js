import React, { useState } from 'react';
import './Messenger.css';

function Messenger({ username }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { sender: 'You', text: inputValue }]);
      setInputValue('');
    }
  };

  return (
    <div className="messenger">
      <div className="chat-header">Chat with {username}</div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <strong>{message.sender}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Messenger;



