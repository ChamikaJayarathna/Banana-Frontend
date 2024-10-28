import React from 'react';
import './SignUp.css';
import Monkey from '../../assets/momkey02.png';
import { Link } from 'react-router-dom';

const SignUp = () => {

  return (
    <>
    <div className="signup-wrapper">
      <img src={Monkey} alt="image" className='mascot'/>
      <div className="signup-container">
        <div className="header-section">
          <h2>Sign Up</h2>
          <span className='login-link'>Already have an account? <Link to="/login" className='login-link'>Login</Link></span>
        </div>
        <form action="">
          <div className="input-group" style={{marginTop: "1.5rem"}}>
            <label className='input-label' style={{ backgroundColor: '#C1DDE5' }}>Username</label>
            <input type="text" placeholder='Enter your username' className='styled-input'/>
          </div>
          <div className="input-group">
            <label className='input-label' style={{ backgroundColor: '#C1DDE5' }}>E-mail Address</label>
            <input type="email" placeholder='Enter your email' className='styled-input'/>
          </div>
          <div className="input-group">
            <label className='input-label' style={{ backgroundColor: '#BBD9E0' }}>Password</label>
            <input type="password" placeholder='Enter your password'className='styled-input'/>
          </div>
          <button type='submit' className='signup-btn'>Sign Up</button>
        </form>
      </div>
    </div>
    </>
    
  );
}

export default SignUp;