import React from 'react';
import './LeaderboardCom.css';

const LeaderboardCom = ({ username, score }) => {
  return (
    <div className="leaderboard-component-achievement-item">
        <span className="leaderboard-component-name">{username}</span>
        <span className="leaderboard-component-score">{score}</span>
    </div>
  );
}

export default LeaderboardCom;