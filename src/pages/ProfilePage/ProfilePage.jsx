import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page-container">
      <div className="profile-page-content">
        <div className="profile-page-card">

          <div className="profile-page-header">
            <img src="" alt="profile image" className="profile-page-picture" />
          </div>

          <div className="profile-page-info">
            <p className='profile-page-username'><i className="fi fi-ss-user"></i> Username</p>
            <p className='profile-page-email'><i className="fi fi-ss-envelope"></i> chamika@gmail.com</p>
          </div>

          <div className="profile-page-level-scores">
            <h3 className="profile-page-level-title">Highest Scores</h3>

            <div className="profile-page-level-row">
              <div className="profile-page-level-score-card">
                <h3 className='profile-page-level-score-card-title'>Easy</h3>
                <p className='profile-page-level-score-card-score'>Score: 90</p>
              </div>
              <div className="profile-page-level-score-card">
                <h3 className='profile-page-level-score-card-title'>Medium</h3>
                <p className='profile-page-level-score-card-score'>Score: 80</p>
              </div>
            </div>

            <div className="profile-page-level-row">
              <div className="profile-page-level-score-card">
                <h3 className='profile-page-level-score-card-title'>Hard</h3>
                <p className='profile-page-level-score-card-score'>Score: 75</p>
              </div>
              <div className="profile-page-level-score-card">
                <h3 className='profile-page-level-score-card-title'>Expert</h3>
                <p className='profile-page-level-score-card-score'>Score: 85</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
