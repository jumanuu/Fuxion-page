import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import authService from '../../api/auth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    loginName: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.loginName, formData.password);

    if (result.success) {
      const user = authService.getCurrentUser();
      if (user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message || t.loginInvalidCredentials);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Link to="/" className="logo">
            <img src="/fuxion-white.png" alt="Fuxion" />
          </Link>
          <h1>{t.loginTitle}</h1>
          <p>{t.loginSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="loginName">{t.loginUserPlaceholder}</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input
                type="text"
                id="loginName"
                name="loginName"
                value={formData.loginName}
                onChange={handleChange}
                placeholder={t.loginUserPlaceholder}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">{t.loginPasswordPlaceholder}</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t.loginPasswordPlaceholder}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>{t.loginRememberMe}</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              {t.loginForgotPassword}
            </Link>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              t.loginLoading
            ) : (
              <>
                {t.loginButton}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {t.loginNoAccount}{' '}
            <Link to="/register">{t.loginRegisterHere}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
