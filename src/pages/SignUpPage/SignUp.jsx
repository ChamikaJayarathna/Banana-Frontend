import React, { useState } from 'react';
import Monkey from '../../assets/momkey02.png';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const userAuthServer = async () => {

    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/api/signup', {
        username,
        email,
        password
      });

      if(response.data){
        toast.success('Account created successfully');
        navigate('/game-play');
      }

    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if(username.length < 5){
      return toast.error("Username must be at least 5 letters long")
    }

    if(!email.length){
      return toast.error("Enter Email")
    }

    if(!emailRegex.test(email)){
      return toast.error("Invalid Email")
    }

    if(!passwordRegex.test(password)){
      return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
    }

    userAuthServer();

  }

  return (
    <>
    <Toaster/>
    <div className="signup-wrapper">
      <img src={Monkey} alt="image" className='mascot-monkey'/>
      <div className="signup-container">
        <div className="header-section">
          <h2>Sign Up</h2>
          <span className='login-link'>Already have an account? <Link to="/login" className='login-link'>Login</Link></span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{marginTop: "1.5rem"}}>
            <label className='input-label' style={{ backgroundColor: '#C1DDE5' }}>Username</label>
            <input type="text" placeholder='Enter your username' className='styled-input' onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="input-group">
            <label className='input-label' style={{ backgroundColor: '#C1DDE5' }}>E-mail Address</label>
            <input type="email" placeholder='Enter your email' className='styled-input' onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-group">
            <label className='input-label' style={{ backgroundColor: '#BBD9E0' }}>Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder='Enter your password'className='styled-input' onChange={(e) => setPassword(e.target.value)}/>
              <i className={`fi ${showPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed'} password-toggle-icon`} onClick={() => setShowPassword(!showPassword)}></i>
            </div>
          </div>
          <button type='submit' className='signup-btn'>Sign Up</button>
        </form>
      </div>
    </div>
    </>
    
  );
}

export default SignUp;