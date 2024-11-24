import React from "react";
import "./GithubSSO.css"; 

function GithubSSO() {
  const CLIENT_ID = "Ov23lie5Iw3CEuyr2hSR"; // Your GitHub client ID
  const REDIRECT_URI = "http://localhost:3000/callback"; // Ensure this matches the redirect URI on GitHub

  return (
    <div className="login-box">
      <div className="textbox">
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`}
        >
          <button className="btn" type="button">
            Login with GitHub
          </button>
        </a>
      </div>
    </div>
  );
}

export default GithubSSO;
