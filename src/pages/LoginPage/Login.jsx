import React from 'react';
import './Login.css';
import Monkey from '../../assets/momkey02.png';
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    <>
    <div className="login-wrapper">
      <img src={Monkey} alt="image" className='mascot'/>
      <div className="login-container">
        <h1>Welcome!</h1>
        <form action="">
          <div className="input-group">
            <label className='input-label' style={{ backgroundColor: '#C1DDE5' }}>E-mail Address</label>
            <input type="email" placeholder='Enter your email' className='styled-input'/>
          </div>
          <div className="input-group">
            <label className='input-label' style={{ backgroundColor: '#BBD9E0' }}>Password</label>
            <input type="password" placeholder='Enter your password'className='styled-input'/>
          </div>
          <button type='submit' className='login-btn'>Login</button>
        </form>
        <div className="signup-prompt">
          Don't have an account? <Link to="/signup" className='signup-link'>Join us today</Link>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Login;