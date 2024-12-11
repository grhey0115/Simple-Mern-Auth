import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
        <div className="about-section">
          <h1>About Us</h1>
          <p className="subtitle">Learn more about our company and mission</p>

          <div className="content-grid">
            <div className="info-card">
              <h2>Our Mission</h2>
              <p>To provide exceptional service and innovative solutions to our clients.</p>
            </div>

            <div className="info-card">
              <h2>Our Vision</h2>
              <p>To become the leading provider in our industry through excellence and innovation.</p>
            </div>

            <div className="info-card">
              <h2>Our Values</h2>
              <ul>
                <li>Integrity</li>
                <li>Innovation</li>
                <li>Excellence</li>
                <li>Customer Focus</li>
              </ul>
            </div>

            <div className="info-card">
              <h2>Our Team</h2>
              <p>We are a dedicated team of professionals committed to delivering the best results.</p>
            </div>
          </div>
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

  .about-section {
    text-align: center;

    h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #666;
      margin-bottom: 3rem;
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 2rem;
  }

  .info-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    h2 {
      color: royalblue;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    p {
      color: #666;
    }

    ul {
      list-style: none;
      padding: 0;
      color: #666;

      li {
        margin: 0.5rem 0;
      }
    }
  }

  .footer {
    text-align: center;
    padding: 2rem;
    background-color: #f5f5f5;
    margin-top: 2rem;
  }
`;

export default About; 