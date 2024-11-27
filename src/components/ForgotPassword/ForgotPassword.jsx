import React from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form">
        <h1>Forgot Password</h1>
        <div className="input-group">
          <label className='input-label' style={{ backgroundColor: '#C1DDE5' }}>E-mail Address</label>
          <input type="email" placeholder='Enter your email' className='styled-input'/>
        </div>
        <button className="forgot-password-reset-password">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
