import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './ResetPassword.css';

const ResetPassword = () => {
  const [newShowPassword, setNewShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const resetForm = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      const tokenVerification = async () => {
        try {
          await axios.post(
            `${import.meta.env.VITE_SERVER_DOMAIN}/api/reset-password-verify`,
            { token }
          );
          setLoading(false);
        } catch (error) {
          console.error('Token invalid:', error);
          toast.error('Reset password link is expired.');
          navigate('/forgot-password', {
            state: { errorMessage: 'Reset password link is expired.' },
          });
        }
      };

      tokenVerification();
    } else {
      toast.error('Missing token in URL');
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const form = new FormData(resetForm.current);
    const formData = Object.fromEntries(form.entries());
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/reset-password`,
        { token, newPassword }
      );
      toast.success('Password has been reset successfully');
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Failed to reset password');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="reset-password-container">
      <form ref={resetForm} onSubmit={handleResetPassword}>
        <h1>Reset Password</h1>

        <div className="input-group">
          <label className="input-label" style={{ backgroundColor: '#BBD9E0' }}>
            New Password
          </label>
          <div className="password-wrapper">
            <input
              type={newShowPassword ? 'text' : 'password'}
              placeholder="New Password"
              name="newPassword"
              className="styled-input"
              required
            />
            <i
              className={`fi ${
                newShowPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed'
              } password-toggle-icon`}
              onClick={() => setNewShowPassword(!newShowPassword)}
            ></i>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" style={{ backgroundColor: '#BBD9E0' }}>
            Confirm Password
          </label>
          <div className="password-wrapper">
            <input
              type={confirmShowPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              name="confirmPassword"
              className="styled-input"
              required
            />
            <i
              className={`fi ${
                confirmShowPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed'
              } password-toggle-icon`}
              onClick={() => setConfirmShowPassword(!confirmShowPassword)}
            ></i>
          </div>
        </div>

        <button type="submit" className="reset-password-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
