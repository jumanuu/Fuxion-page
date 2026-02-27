// src/components/layout/Footer/Footer.jsx
import { useLanguage } from '../../../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Columna 1: Logo y descripción */}
          <div className="footer-section">
            <div className="footer-logo">
              <img
               src={`${import.meta.env.BASE_URL}fuxion-white.png`}
               alt="Fuxion"
              className="logo-image"
             />
            </div>
            <p className="footer-description">
              {t.footerDescription}
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="footer-section">
            <h3 className="footer-title">{t.quickLinks}</h3>
            <ul className="footer-links">
              <li><a href="/">{t.products}</a></li>
              <li><a href="/sponsor">{t.sponsor}</a></li>
              <li><a href="/profile">{t.profile}</a></li>
              <li><a href="/cart">{t.cart}</a></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div className="footer-section">
            <h3 className="footer-title">{t.support}</h3>
            <ul className="footer-links">
              <li><a href="/help">{t.helpCenter}</a></li>
              <li><a href="/shipping">{t.shippingInfo}</a></li>
              <li><a href="/returns">{t.returns}</a></li>
              <li><a href="/contact">{t.contactUs}</a></li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div className="footer-section">
            <h3 className="footer-title">{t.legal}</h3>
            <ul className="footer-links">
              <li><a href="/privacy">{t.privacyPolicy}</a></li>
              <li><a href="/terms">{t.termsOfService}</a></li>
              <li><a href="/cookies">{t.cookiePolicy}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} FUXION. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;