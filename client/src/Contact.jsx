import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <StyledWrapper>
      <nav className="navbar">
        <div className="nav-brand">Your Logo</div>
        <div className="nav-links">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/about')}>About</button>
          <button onClick={() => navigate('/contact')}>Contact</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="contact-container">
          <div className="contact-info">
            <h1>Contact Us</h1>
            <p>Get in touch with us for any inquiries or support.</p>
            
            <div className="info-item">
              <h3>Address</h3>
              <p>123 Business Street, City, Country</p>
            </div>
            
            <div className="info-item">
              <h3>Email</h3>
              <p>contact@yourcompany.com</p>
            </div>
            
            <div className="info-item">
              <h3>Phone</h3>
              <p>+1 234 567 890</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: royalblue;
  }

  .nav-links {
    display: flex;
    gap: 1rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      background: none;
      color: #333;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: royalblue;
      }
    }
      .logout-btn {
      background-color: royalblue;
      color: white;
      border-radius: 5px;

      &:hover {
        background-color: rgb(56, 90, 194);
      }
    }
  }

  .main-content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .contact-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .contact-info {
    background: royalblue;
    color: white;
    padding: 2rem;

    h1 {
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .info-item {
      margin-bottom: 1.5rem;

      h3 {
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
      }
    }
  }

  .contact-form {
    padding: 2rem;

    .form-group {
      margin-bottom: 1rem;

      input, textarea {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: royalblue;
        }
      }
    }

    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: royalblue;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: rgb(56, 90, 194);
      }
    }
  }

  .footer {
    text-align: center;
    padding: 2rem;
    background-color: #f5f5f5;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    .contact-container {
      grid-template-columns: 1fr;
    }
  }
`;

export default Contact; 