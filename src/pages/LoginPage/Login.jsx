import React, { useContext, useState } from 'react';
import Monkey from '../../assets/momkey02.png';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from '../../components/Session';
import { UserContext } from '../../App';
import './Login.css';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  let { setUserAuth } = useContext(UserContext);
  

  const navigate = useNavigate();

  const userAuthServer = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/api/login', {
        email,
        password
      });

      if(response.data){
        storeInSession('user', JSON.stringify(response.data));
        setUserAuth({ access_token: response.data.token });
        navigate('/game-play')
      }

    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if(!email.length){
      return toast.error('Enter Email');
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
      <div className="login-wrapper">
        <img src={Monkey} alt="image" className='mascot'/>
        <div className="login-container">
          <h1>Welcome!</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className='input-label' style={{ backgroundColor: '#C1DDE5' }}>E-mail Address</label>
              <input type="email" placeholder='Enter your email' className='styled-input' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-group">
              <label className='input-label' style={{ backgroundColor: '#BBD9E0'}}>Password</label>
              <div className="password-wrapper">
                <input type={showPassword ? "text" : "password"} placeholder='Enter your password'className='styled-input' onChange={(e) => setPassword(e.target.value)}/>
                <i className={`fi ${showPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed'} password-toggle-icon`} onClick={() => setShowPassword(!showPassword)}></i>
              </div>
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