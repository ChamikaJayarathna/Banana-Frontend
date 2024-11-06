import React from 'react';
import './LeaderboardCom.css';

const LeaderboardCom = ({ username, score, rank }) => {
  return (
    <div className="leaderboard-component-achievement-item">
        <span className="leaderboard-component-rank">{rank}</span>
        <span className="leaderboard-component-name">{username}</span>
        <span className="leaderboard-component-score">{score}</span>
    </div>
  );
}

export default LeaderboardCom;