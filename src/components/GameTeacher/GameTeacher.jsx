import React, { useEffect, useState } from 'react';
import Monkey from '../../assets/momkey12.png';
import './GameTeacher.css';

const GameTeacher = () => {
  const messages = [
    'Hello there!',
    'Welcome back!',
    'Hope you have a great day!',
    'You are doing awesome!',
    'Keep up the good work!',
    'Remember to stay positive!',
  ];

  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    const getRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    };

    setCurrentMessage(getRandomMessage());

    const messageInterval = setInterval(() => {
      setCurrentMessage(getRandomMessage());
    }, 8000);

    return () => clearInterval(messageInterval);
  }, [messages]);

  return (
    <div className="game-teacher-container">
      <img src={Monkey} alt="game-teacher-image" className='game-teacher-popup-image' />
      <p className='game-teacher-popup-message'>{currentMessage}</p>
    </div>
  );
}

export default GameTeacher;
