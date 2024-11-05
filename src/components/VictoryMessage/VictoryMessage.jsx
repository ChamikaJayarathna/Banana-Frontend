import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './VictoryMessage.css';

const VictoryMessage = ({ moves }) => {

  let { level } = useParams();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/game/${level}`);
  }

  const handleCrossClick = () => {
    navigate('/level');
  }

  return (
    <div className="victory-message-overlay">
      <div className='victory-message-card'>
        <div className="victory-message-cross-icon" onClick={handleCrossClick}>
          <i className="fi fi-sr-cross-small"></i>
        </div>
        <div className='victory-message'>
          <h1 className='victory-message-title'>Congratulations!</h1>
          <p className='victory-message-moves'>You finished in {moves} moves!</p>
          <button onClick={handleContinue} className='victory-message-btn'>Continue to Banana Game</button>
        </div>
      </div>
    </div>
  );
};

export default VictoryMessage;
