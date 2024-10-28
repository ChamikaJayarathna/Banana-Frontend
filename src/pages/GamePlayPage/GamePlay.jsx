import React from 'react';
import Monkey from '../../assets/momkey03.png';
import { Link } from 'react-router-dom';
import './GamePlay.css';

const GamePlay = () => {
  return (
    <>
      <div className="game-wrapper">
        <img src={Monkey} alt="image" className='mascot'/>
        <div className="game-container">
          <h1>Hello There!</h1>
          <p>Help our monkey collect as many bananas as possible while dodging obstacles. Ready to go bananas? Tap <span class="highlight">Start</span> to begin!</p>
          <Link  to='/level' className='start-btn'>Start</Link>
        </div>
      </div>
    </>
  );
}

export default GamePlay;