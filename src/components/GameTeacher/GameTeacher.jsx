import React, { useEffect, useState } from 'react';
import Monkey from '../../assets/momkey12.png';
import './GameTeacher.css';

const GameTeacher = ({ shouldStopRandomMessages }) => {
  const messages = [
    "Try using add or subtract to find the answer — it's simpler!",
    "Skip (*) and (/) — stick to (+) and (-), it's more fun!",
    'Try solving vertically',
    'Solve the lines with the fewest bananas for a quick win!',
    'Keep an eye on the timer!',
    'Stay cool, no need to sweat it! 🍌',
  ];

  const [currentMessage, setCurrentMessage] = useState('');
  const [messageTimeout, setMessageTimeout] = useState(null);

  useEffect(() => {
    const getRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    };

    const updateMessage = () => {
      setCurrentMessage(getRandomMessage());
    };

    const startMessageInterval = () => {
      if(!shouldStopRandomMessages){
        const interval = setInterval(() => {
          updateMessage();
        }, 10000);
        setMessageTimeout(interval);
      }
    };

    startMessageInterval();

    return () => {
      if (messageTimeout) {
        clearInterval(messageTimeout);
      }
    };
  }, [messages, shouldStopRandomMessages]);

  return (
    <div className="game-teacher-container">
      <img src={Monkey} alt="game-teacher-image" className="game-teacher-popup-image" />
      <p className="game-teacher-popup-message">{currentMessage}</p>
    </div>
  );
};

export default GameTeacher;