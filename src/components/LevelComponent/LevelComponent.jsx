import React from 'react';
import './LevelComponent.css';

const LevelComponent = ({image, title, timer, btnName, onStart}) => {
  return (
    <div className="level-container">
        <img src={image} alt="image" className='monkey-level-img'/>
        <div className="level-card">
            <h2 className='level-title'>{title}</h2>
            <p className='level-timer'>{timer}</p>
            <button className='start-level-btn' onClick={onStart}>{btnName}</button>
        </div>
    </div>
  );
}

export default LevelComponent;