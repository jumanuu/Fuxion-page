import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard, LogIn, Globe, ChevronDown, Menu, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const cartCount = getCartCount();

  const adminPaths = ['/admin/dashboard', '/admin/orders', '/admin/users'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/fuxion-white.png" alt="Fuxion" className="logo-image" />
        </Link>

        <nav className="nav-desktop">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            {t.products}
          </Link>
          <Link 
            to="/sponsor" 
            className={`nav-link ${location.pathname === '/sponsor' ? 'active' : ''}`}
          >
            {t.sponsor}
          </Link>
          {isAdmin && (
            <Link 
              to="/admin/dashboard" 
              className={`nav-link ${adminPaths.includes(location.pathname) ? 'active' : ''} admin-link`}
            >
              <LayoutDashboard size={16} />
              {t.admin}
            </Link>
          )}
        </nav>

        <div className="header-actions">
          <button 
            className="icon-btn"
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            className="icon-btn"
            onClick={toggleLanguage}
            title={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
          >
            <Globe size={18} />
            {language.toUpperCase()}
          </button>
          
          {isAuthenticated ? (
            <div className="profile-dropdown-container" ref={profileRef}>
              <button 
                className="profile-button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User size={18} />
                <ChevronDown size={16} className={`chevron ${isProfileOpen ? 'open' : ''}`} />
              </button>
              
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <span className="dropdown-name">{user?.name}</span>
                    <span className="dropdown-email">{user?.email}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item">
                    <User size={16} />
                    {t.myProfile}
                  </Link>
                  <Link to="/cart" className="dropdown-item">
                    <ShoppingCart size={16} />
                    {t.cart} {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </Link>
                  {isAdmin && (
                    <>
                      <div className="dropdown-divider"></div>
                      <Link to="/admin/dashboard" className="dropdown-item">
                        <LayoutDashboard size={16} />
                        {t.dashboard}
                      </Link>
                    </>
                  )}
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <LogOut size={16} />
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                <LogIn size={16} />
                {t.login}
              </Link>
            </div>
          )}
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <ChevronDown size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <Link 
            to="/" 
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.products}
          </Link>
          <Link 
            to="/sponsor" 
            className={`mobile-nav-link ${location.pathname === '/sponsor' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.sponsor}
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                to="/profile" 
                className={`mobile-nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                {t.profile}
              </Link>
              {isAdmin && (
                <>
                  <Link 
                    to="/admin/dashboard" 
                    className={`mobile-nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    {t.dashboard}
                  </Link>
                  <Link 
                    to="/admin/orders" 
                    className={`mobile-nav-link ${location.pathname === '/admin/orders' ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.orders}
                  </Link>
                  <Link 
                    to="/admin/users" 
                    className={`mobile-nav-link ${location.pathname === '/admin/users' ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.users}
                  </Link>
                </>
              )}
              <Link 
                to="/cart" 
                className={`mobile-nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={18} />
                {t.cart} {cartCount > 0 && `(${cartCount})`}
              </Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="mobile-logout-button">
                <LogOut size={18} />
                {t.logout}
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link 
                to="/login" 
                className={`mobile-nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} />
                {t.login}
              </Link>
              <Link 
                to="/register" 
                className={`mobile-nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.register}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
