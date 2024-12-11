import React, { useState } from 'react';

const LoginWithOTP = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        // You might want to add navigation here
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
      />
      {otpSent && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={loading}
          maxLength={6}
          required
        />
      )}
      {!otpSent ? (
        <button onClick={handleSendOtp} disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      ) : (
        <button onClick={handleVerifyOtp} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      )}
    </div>
  );
};

export default LoginWithOTP; 