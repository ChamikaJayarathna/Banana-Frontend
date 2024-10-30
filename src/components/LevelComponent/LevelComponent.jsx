import React from 'react';
import './LevelComponent.css';

const LevelComponent = ({image, title, timer, btnName}) => {
  return (
    <div className="level-container">
        <img src={image} alt="image" className='monkey-level-img'/>
        <div className="level-card">
            <h2 className='level-title'>{title}</h2>
            <p className='level-timer'>{timer}</p>
            <button className='start-level-btn'>{btnName}</button>
        </div>
    </div>
  );
}

export default LevelComponent;