import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = () => {

    const [newShowPassword, setNewShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  return (
    <div className='reset-password-container'>
        <form action="">

            <h1>Reset Password</h1>

            <div className="input-group">
              <label className='input-label' style={{ backgroundColor: '#BBD9E0'}}>New Password</label>
              <div className="password-wrapper">
                <input type={newShowPassword ? "text" : "password"} placeholder='New Password'className='styled-input'/>
                <i className={`fi ${newShowPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed'} password-toggle-icon`} onClick={() => setNewShowPassword(!newShowPassword)}></i>
              </div>
            </div>

            <div className="input-group">
              <label className='input-label' style={{ backgroundColor: '#BBD9E0'}}>Confirm Password</label>
              <div className="password-wrapper">
                <input type={confirmShowPassword ? "text" : "password"} placeholder='Confirm Password'className='styled-input'/>
                <i className={`fi ${confirmShowPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed'} password-toggle-icon`} onClick={() => setConfirmShowPassword(!confirmShowPassword)}></i>
              </div>
            </div>

            <button type='submit' className='reset-password-btn'>
                Reset Password
            </button>

        </form>
    </div>
  );
}

export default ResetPassword;