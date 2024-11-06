import React from 'react';
import GoldCup from '../../assets/goldCup.png';
import SilverCup from '../../assets/silverCup.png';
import BronzeCup from '../../assets/bronzeCup.png';
import './LeaderboardCom.css';

const LeaderboardCom = ({ username, score, rank }) => {
  const getTrophy = (rank) => {
    switch(rank) {
      case 1:
        return GoldCup;
      case 2:
        return SilverCup;
      case 3:
        return BronzeCup;
      default:
        return null;
    }
  }

  return (
    <div className="leaderboard-component-achievement-item">
      <span className="leaderboard-component-rank">{rank}</span>
      <span className="leaderboard-component-name">{username}</span>
      <div className="leaderboard-component-trophy-score">
        {getTrophy(rank) && (
          <img src={getTrophy(rank)} alt="trophy-icon" className="leaderboard-component-trophy" />
        )}
        <span className="leaderboard-component-score">{score}</span>
      </div>
    </div>
  );
}

export default LeaderboardCom;