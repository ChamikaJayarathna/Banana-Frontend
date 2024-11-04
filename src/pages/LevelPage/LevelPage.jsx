import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import LevelComponent from '../../components/LevelComponent/LevelComponent';
import EassyMonkey from '../../assets/momkey04.png';
import MediumMonkey from '../../assets/momkey05.png';
import HardMonkey from '../../assets/momkey06.png';
import ExpertMonkey from '../../assets/momkey07.png';
import './LevelPage.css';
import NavBar from '../../components/NavBar/NavBar';

const LevelPage = () => {

  let { userAuth : { access_token }} = useContext(UserContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!access_token) {
  //     navigate('/login');
  //   }
  // },[access_token, navigate]);

  const handleStart = (level) => {
    navigate(`/game/${level}`);
  } 

  return (
    <>
      <NavBar/>
      <div className="container">
        
        <LevelComponent
          image={EassyMonkey}
          title="Easy"
          timer="Timer: 60s"
          btnName="START"
          onStart={() => handleStart('easy')}
        />

        <LevelComponent
          image={MediumMonkey}
          title="Medium"
          timer="Timer: 40s"
          btnName="START"
          onStart={() => handleStart('medium')}
        />

        <LevelComponent
          image={HardMonkey}
          title="Hard"
          timer="Timer: 30s"
          btnName="START"
          onStart={() => handleStart('hard')}
        />
        <LevelComponent
          image={ExpertMonkey}
          title="Expert"
          timer="Timer: 15s"
          btnName="START"
          onStart={() => handleStart('expert')}
        />

      </div>
    </>
  );
}

export default LevelPage;