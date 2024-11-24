import React, { useState } from 'react';
import './Messenger.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faTimes } from '@fortawesome/free-solid-svg-icons';

function Messenger({ username }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { sender: 'You', text: inputValue }]);
      setInputValue('');
    }
  };

  if (isClosed) return null; // Don't render if closed

  return (
    <div className="messenger-container">
      <div className="chat-header">
        <span>Chat with {username}</span>
        <div className="chat-controls">
          <FontAwesomeIcon
            icon={faWindowMinimize}
            className="control-icon"
            onClick={() => setIsMinimized(!isMinimized)}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className="control-icon"
            onClick={() => setIsClosed(true)}
          />
        </div>
      </div>

      {!isMinimized && (
        <div className="chat-content">
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
      )}
    </div>
  );
}

export default Messenger;
