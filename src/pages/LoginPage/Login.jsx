import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const userAuthServer = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/api/login', {
        email,
        password,
      });

      if(response.data){
        toast.success('Logged in successfully');
        navigate('/')
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
    <div className="login-container">
      <Toaster/>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <div className="input-group">
          <input  type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;