import React, { useContext, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Loader from '../../assets/Loader.json';
import axios from 'axios';
import './ProfilePage.css';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  const { userAuth: { access_token } } = useContext(UserContext);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError('');

      if(!userId){
        return toast.error("No user ID available");
      }

      const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      setUser(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to fetch user details");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchUserDetails();
    }
  }, [userId, access_token]);

  return (
    <>
      <Toaster/>
      {loading ? (
        <Lottie animationData={Loader} className='banana-game-loader-animation' />
      ) : user ? (
        <div className="profile-page-container">
          <div className="profile-page-content">
            <div className="profile-page-card">
              <div className="profile-page-header">
                <img src={user.profile_img} alt="profile" className="profile-page-picture" />
              </div>
              <div className="profile-page-info">
                <p className='profile-page-username'><i className="fi fi-ss-user"></i>{user.username}</p>
                <p className='profile-page-email'><i className="fi fi-ss-envelope"></i>{user.email}</p>
              </div>
              <div className="profile-page-level-scores">
                <h3 className="profile-page-level-title">Highest Scores</h3>
                <div className="profile-page-level-row">
                  <div className="profile-page-level-score-card">
                    <h3 className='profile-page-level-score-card-title'>Easy</h3>
                    <p className='profile-page-level-score-card-score'>Score: {user.levelScores.easy}</p>
                  </div>
                  <div className="profile-page-level-score-card">
                    <h3 className='profile-page-level-score-card-title'>Medium</h3>
                    <p className='profile-page-level-score-card-score'>Score: {user.levelScores.medium}</p>
                  </div>
                </div>
                <div className="profile-page-level-row">
                  <div className="profile-page-level-score-card">
                    <h3 className='profile-page-level-score-card-title'>Hard</h3>
                    <p className='profile-page-level-score-card-score'>Score: {user.levelScores.hard}</p>
                  </div>
                  <div className="profile-page-level-score-card">
                    <h3 className='profile-page-level-score-card-title'>Expert</h3>
                    <p className='profile-page-level-score-card-score'>Score: {user.levelScores.expert}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>{error || "No user data found."}</p>
      )}
    </>
    
  );
};

export default ProfilePage;