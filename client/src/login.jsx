import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!otp || otp.length < 4) {
      setError('Please enter a valid OTP');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      alert('OTP resent successfully!');
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      {!otpSent ? (
        <form className="form" onSubmit={handleLogin}>
          <p className="title">Login</p>
          <p className="message">Welcome back! Please login to your account.</p>
          {error && <p className="error">{error}</p>}
          
          <label>
            <input
              required
              placeholder=""
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span>Email</span>
          </label>
          
          <label>
            <input
              required
              placeholder=""
              type="password"
              className="input"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span>Password</span>
          </label>

          <button className="submit" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Login'}
          </button>
          
          <p className="signin">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      ) : (
        <form className="form" onSubmit={handleVerifyOtp}>
          <p className="title">Verify OTP</p>
          <p className="message">Enter the OTP sent to your email.</p>
          {error && <p className="error">{error}</p>}
          
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
            <span>OTP</span>
          </label>

          <button className="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          
          <p className="signin">
            Didn't receive OTP? {' '}
            <a href="#" onClick={handleResendOtp}>Resend OTP</a>
          </p>
        </form>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message, .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
    text-decoration: none;
  }

  .signin a:hover {
    text-decoration: underline;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    cursor: pointer;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  .submit:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .error {
    color: #ff3333;
    font-size: 14px;
    text-align: center;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default Login;