import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './ForgotPassword.css';
import axios from 'axios';

const ForgotPassword = () => {
    const forgotPasswordForm = useRef();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();

        let form = new FormData(forgotPasswordForm.current);
        let { email } = Object.fromEntries(form.entries());

        if (!email) {
            return toast.error('Please enter your email address');
        }

        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/forgot-password", { email })
            .then(() => {
                toast.success('Password reset link sent to your email');
            })
            .catch(({ response }) => {
                toast.error(response.data.error || "An error occurred. Please try again.");
            });
    };

    return (
        <>
            <Toaster />
            <div className="forgot-password-container">
                <form ref={forgotPasswordForm} className="forgot-password-form">
                    <h1>Forgot Password</h1>
                    <div className="input-group">
                        <label className='input-label' style={{ backgroundColor: '#C1DDE5' }}>E-mail Address</label>
                        <input type="email" name="email" placeholder='Enter your email' className='styled-input' />
                    </div>
                    <button className="forgot-password-reset-password" type='submit' onClick={handleSubmit}>
                        Reset Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;