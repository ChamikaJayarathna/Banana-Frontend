import React, { useEffect, useState } from 'react';
import Monkey from '../../assets/momkey12.png';
import Thinking from '../../assets/Thinking.json';
import Lottie from 'lottie-react';
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
  const [showLottie, setShowLottie] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  let intervalId = null;

  useEffect(() => {
    const getRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    };

    const cycleDisplay = () => {
      if (!shouldStopRandomMessages) {
        setCurrentMessage(getRandomMessage());
        setShowMessage(true);
        setShowLottie(false);

        setTimeout(() => {
          setShowMessage(false);
          setShowLottie(true);
        }, 10000);
      }
    };

    if (!shouldStopRandomMessages) {
      cycleDisplay();
      intervalId = setInterval(cycleDisplay, 13000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [shouldStopRandomMessages]);

  return (
    <>
      <div className="game-teacher-container">
        <img src={Monkey} alt="game-teacher-image" className="game-teacher-popup-image" />
        {showLottie && (
          <Lottie animationData={Thinking} className="game-teacher-animation" />
        )}
        {showMessage && (
          <p className="game-teacher-popup-message">{currentMessage}</p>
        )}
      </div>
    </>
  );
};

export default GameTeacher;
