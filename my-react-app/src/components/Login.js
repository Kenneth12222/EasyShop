import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import "../styles/Form.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isAdmin = await handleLogin(username, password);
      console.log("isAdmin returned:", isAdmin);
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Login failed: Account not found or incorrect credentials. Please sign up if you do not have an account.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button">&times;</button>
        <h1>Login</h1>
        {loginError && <div className="error-message">{loginError}</div>}
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit-button" type="submit">Login</button>
        </form>
        <div className="signup-prompt">
          <p>Don't have an account?</p>
          <Link to="/register" className="signup-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;