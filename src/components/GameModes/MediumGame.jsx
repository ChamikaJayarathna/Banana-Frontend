import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import Monkey01 from '../../assets/momkey08.png';
import Monkey02 from '../../assets/momkey09.png';
import TimeUp from '../TimeUpCard/TimeUp';
import { UserContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../assets/Loader.json';
import NavBar from '../NavBar/NavBar';
import GameTeacher from '../GameTeacher/GameTeacher';
import './GameModes.css';

const MediumGame = () => {

  let { userAuth : { access_token}} = useContext(UserContext);
  
  const [question,  setQuestion] = useState('');
  const [solution, setSolution] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timer, setTimer] = useState(40);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  let { level } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/api/quiz');
      const { question, solution} = response.data;

      setQuestion(question);
      setSolution(solution);
      setLoading(false);
      console.log('Solution:', solution);
    } catch (error) {
      toast.error("Error fetching question data", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!access_token) {
      navigate('/login');
    }
  },[access_token, navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(userAnswer) === solution) {
        toast.success("Answer is correct!");
        const points = level === 'easy' ? 5 : level === 'medium' ? 10 : level === 'hard' ? 15 : 20;
        const updatedScore = score + points;

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_SERVER_DOMAIN}/api/score`,
                { score: points, level },
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                }
            );

            if (response.status === 200) {
                setScore(updatedScore);
                fetchData();
            } else {
                console.log('Error updating score');
            }

        } catch (error) {
            toast.error("Error updating score");
            console.error(error);
        }
    } else {
        toast.error("Answer is wrong!");
    }

    setUserAnswer('');
  };

  return (
    <>
      <Toaster/>
      <NavBar/>
      <GameTeacher shouldStopRandomMessages={isTimeUp}/>
      {isTimeUp && (
          <TimeUp/>
      )}
      <div className="game-level-container">
        <div className="game-level-header">
          <div className="level-info">
            <img src={Monkey01} alt="image" />
            <div className="level-text">Score : {score}</div>
          </div>
          <div className="level-right-container">
            <div className="level-timer">{formatTime(timer)}</div>
            <img src={Monkey02} alt="image" className='monkey-icon-right'/>
          </div>
        </div>

        <div className="banana-game">
          {loading ? 
            ( <Lottie animationData={Loader} className='banana-game-loader-animation'/> ) :
            ( <img src={question} alt="banana-game"/> )
          }
        </div>

        <div className="answer-section">
          <input type="text" placeholder='Enter Your Answer Here...' value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}/>
          <button className='next-btn' onClick={handleSubmit}>Next</button>
        </div>

      </div>
    </>
  );
}

export default MediumGame;
