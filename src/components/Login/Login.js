import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Library, Mail, Lock } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!(data.error)) {
        // Assuming the API returns a token or success status
        login(data.data); // Setting user data from response.data
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred during login. Request Timeout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Decorative Blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Library size={32} color="#818cf8" />
            <span className="logo-text">LibManager</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="librarian@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
