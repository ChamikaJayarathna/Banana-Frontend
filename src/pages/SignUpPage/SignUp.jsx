import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const SignUp = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const userAuthServer = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/api/signup', {
        username,
        email,
        password,
      });

      if(response.data){
        toast.success('Account created successfully');
        navigate('/login');
      }

    } catch (err) {
      toast.error(err.response?.data?.error || "An error occurred");
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
    <div className="signup-container">
      <Toaster/>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Join us today</h1>
        <div className="input-group">
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;