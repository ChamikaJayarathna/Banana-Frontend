import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import LevelComponent from '../../components/LevelComponent/LevelComponent';
import EassyMonkey from '../../assets/momkey04.png';
import './LevelPage.css';

const LevelPage = () => {

  let { userAuth : { access_token }} = useContext(UserContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!access_token) {
  //     navigate('/login');
  //   }
  // },[access_token, navigate]);

  return (
    <div className="container">
      <LevelComponent
        image={EassyMonkey}
        title="Essay"
        timer="Timer: 60s"
        btnName="START"
      />
    </div>
  );
}

export default LevelPage;