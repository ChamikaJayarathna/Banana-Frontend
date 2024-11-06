import React from 'react';
import Monkey from '../../assets/momkey11.png';
import LeaderboardCom from '../LeaderboardCom/LeaderboardCom';
import './Leaderboard.css';

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
        <div className="leaderboard-header">
            <div className="leaderboard-icon-container leaderboard-icon-container-left">
                <img src={Monkey} alt="image" className='leaderboard-monkey-icon'/>
            </div>
            <h1 className='leaderboard-header-title'>ACHIEVEMENTS</h1>
            <div className="leaderboard-icon-container leaderboard-icon-container-right">
                <img src={Monkey} alt="image" className='leaderboard-monkey-icon'/>
            </div>
        </div>

        <div className="leaderboard-achievement-list">
          <LeaderboardCom/>
        </div>

    </div>
  );
}

export default Leaderboard;