import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileInfo from '../components/ProfileInfo';
import PublicRepos from '../components/ReposList';

function ProfilePage() {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch User Data
        axios.get(`https://api.github.com/users/${username}`)
            .then(response => setUserData(response.data))
            .catch(() => setError('User not found'));

        // Fetch User Repositories
        axios.get(`https://api.github.com/users/${username}/repos`)
            .then(response => setRepos(response.data))
            .catch(() => setError('Repositories not found'));
    }, [username]);

    if (error) return <p>{error}</p>;
    if (!userData) return <p>Loading...</p>;

    return (
        <div>
            <ProfileInfo user={userData} />
            <PublicRepos repos={repos} />
        </div>
    );
}

export default ProfilePage;
