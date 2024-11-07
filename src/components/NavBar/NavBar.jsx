import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { gameMode, userAuth } = useContext(UserContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className={`navbar-menu-icon ${isOpen ? 'hidden' : ''}`} onClick={toggleSidebar}>
        <i className="fi fi-sr-apps"></i>
      </div>
      <div className={`navbar-sidebar ${isOpen ? 'open' : 'closed'}`}>
        {isOpen && (
          <div className="navbar-close-icon" onClick={toggleSidebar}>
            <i className="fi fi-sr-cross-small"></i>
          </div>
        )}
        <ul>
          <li style={{ marginTop: "30px" }}><Link to="/level"><i className="fi fi-ss-home"></i> Home</Link></li>

          {userAuth._id ? 
            (<li><Link to={`/profile/${userAuth._id}`}><i className="fi fi-ss-user"></i> Profile</Link></li>) :
            null
          }

          {gameMode && (
            <li><Link to={`/leaderboard?mode=${gameMode}`}><i className="fi fi-ss-trophy-star"></i> Leaderboard</Link></li>
          )}
        </ul>
        <div className="logout-button">
          <li><Link to="/logout"><i className="fi fi-br-sign-out-alt"></i> Logout</Link></li>
        </div>
      </div>
    </div>
  );
};

export default NavBar;