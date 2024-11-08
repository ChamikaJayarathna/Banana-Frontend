import React, { useEffect, useState } from 'react';
import './Welcome.css';
import Monkey from '../../assets/momkey01.png';
import Title from '../../assets/title.png';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const [loading, setLoading] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if(loading < 100){
      const timer = setInterval(() => {
        setLoading((prevLoading) => prevLoading + 1)
      }, 70);
      return () => clearInterval(timer);
    }
    else{
      navigate('/login')
    }

  },[loading, navigate]);

  return (
    <div className='splash-screen'>
      <div className="image-container">
        <img src={Title} alt="image" className='title' />
        <img src={Monkey} alt="image" className='monkey-img' />
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${loading}%` }}></div>
        </div>
      </div>
      
    </div>
  );
}

export default Welcome;