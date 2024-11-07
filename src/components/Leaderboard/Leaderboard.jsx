import React, { useEffect, useState } from 'react';
import Monkey from '../../assets/momkey11.png';
import LeaderboardCom from '../LeaderboardCom/LeaderboardCom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mode = query.get('mode');

  const fetchUsersDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/userdetails?mode=${mode}`);
      const sortedUsers = response.data.sort((a, b) => b.score - a.score);
      setUsers(sortedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsersDetails();
  }, [mode]);

  return (
    <>
      <NavBar/>
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="leaderboard-icon-container leaderboard-icon-container-left">
            <img src={Monkey} alt="icon" className='leaderboard-monkey-icon' />
          </div>
          <h1 className='leaderboard-header-title'>ACHIEVEMENTS</h1>
          <div className="leaderboard-icon-container leaderboard-icon-container-right">
            <img src={Monkey} alt="icon" className='leaderboard-monkey-icon' />
          </div>
        </div>

        <div className="leaderboard-achievement-list">
          {users.map((user, index) => (
            <LeaderboardCom
              key={index}
              username={user.username}
              score={user.score}
              rank={index + 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
