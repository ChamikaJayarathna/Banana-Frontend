import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Monkey01 from '../../assets/momkey08.png';
import Monkey02 from '../../assets/momkey09.png';
import TimeUp from '../TimeUpCard/TimeUp';
import './EssayGame.css';

const EssayGame = () => {

  const [question,  setQuestion] = useState('');
  const [solution, setSolution] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const fetchData = async () => {

    try {

      const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/api/quiz');
      const { question, solution} = response.data;

      setQuestion(question);
      setSolution(solution);

    } catch (error) {
      toast.error("Error fetching question data", error);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  useEffect(() => {
    if(timer > 0){
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer -1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsTimeUp(true);
    }
  },[timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <>
      <Toaster/>
      {isTimeUp && (
          <TimeUp/>
      )}
      <div className="game-level-container">
        <div className="game-level-header">
          <div className="level-info">
            <img src={Monkey01} alt="image" />
            <div className="level-text">Level : 1</div>
          </div>
          <div className="level-right-container">
            <div className="level-timer">{formatTime(timer)}</div>
            <img src={Monkey02} alt="image" className='monkey-icon-right'/>
          </div>
        </div>

        <div className="banana-game">
          <img src={question} alt="banana-game" />
        </div>

        <div className="answer-section">
          <input type="text" placeholder='Enter Your Answer Here...'/>
          <button className='next-btn'>Next</button>
        </div>

      </div>
    </>
  );
}

export default EssayGame;