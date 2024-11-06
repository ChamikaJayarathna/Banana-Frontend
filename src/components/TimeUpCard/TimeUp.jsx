import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import './TimeUp.css';


const TimeUp = () => {

    const navigate = useNavigate();
    let { level } = useParams();
    const { gameMode } = useContext(UserContext);

    const handleCrossClick = () => {
        navigate('/level');
    }

  return (
    <div className="time-up-overlay">
      <div className="time-up-card">
        <div className="time-up-cross-icon" onClick={handleCrossClick}>
            <i className="fi fi-sr-cross-small"></i>
        </div>
        <h2 className="time-up-card-title">Time's Up!</h2>
        <p className="time-up-card-message">Play this if you wish to continue the Banana game.</p>
        <Link to={`/leaderboard?mode=${gameMode}`} className="time-up-leaderboard-button">Leader Board</Link>
        <Link to={`/maze-game/${level}`} className="time-up-play-button">Play</Link>
      </div>
    </div>
  );
};

export default TimeUp;
