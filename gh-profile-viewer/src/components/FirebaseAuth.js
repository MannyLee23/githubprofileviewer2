import React, { useState } from 'react';

function FirebaseAuth({ handleLogin, handleRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      handleRegister(email, password);
    } else {
      handleLogin(email, password);
    }
  };

  return (
    <div className="firebase-auth-container">
      <h3>{isRegister ? 'Register' : 'Login'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
    </div>
  );
}

export default FirebaseAuth;
