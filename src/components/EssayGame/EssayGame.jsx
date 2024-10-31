import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EssayGame.css';
import toast, { Toaster } from 'react-hot-toast';
import Monkey01 from '../../assets/momkey08.png';
import Monkey02 from '../../assets/momkey09.png';

const EssayGame = () => {

  const [question,  setQuestion] = useState('');
  const [solution, setSolution] = useState(0);

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

  return (
    <>
      <Toaster/>
      <div className="game-level-container">
        <div className="game-level-header">
          <div className="level-info">
            <img src={Monkey01} alt="image" />
            <div className="level-text">Level : 1</div>
          </div>
          <div className="level-right-container">
            <div className="level-timer">00:30</div>
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