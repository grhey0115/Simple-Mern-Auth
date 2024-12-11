import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <StyledWrapper>
      <nav className="navbar">
        <div className="nav-brand">Grhey</div>
        <div className="nav-links">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/about')}>About</button>
          <button onClick={() => navigate('/contact')}>Contact</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <main className="main-content">
        <h1>Welcome to Our Platform</h1>
        <p>Discover amazing features and services.</p>
        
        <div className="features">
          <div className="feature-card">
            <h3>Feature 1</h3>
            <p>Description of feature 1</p>
          </div>
          <div className="feature-card">
            <h3>Feature 2</h3>
            <p>Description of feature 2</p>
          </div>
          <div className="feature-card">
            <h3>Feature 3</h3>
            <p>Description of feature 3</p>
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
    text-align: center;

    h1 {
      color: #333;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
      margin-bottom: 2rem;
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 2rem;
  }

  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      color: royalblue;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
    }
  }

  .footer {
    text-align: center;
    padding: 2rem;
    background-color: #f5f5f5;
    margin-top: 2rem;
  }
`;

export default Home; 