import { Mail, Phone, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Sponsor.css';

const Sponsor = () => {
  const { t } = useLanguage();
  
  const sponsorInfo = {
    name: "MAYERLY PARDO",
    title: "Empresaria Fuxion",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    about: t.sponsorAboutText,
    
    contact: {
      email: "mayerly.pardo@fuxion.com",
      phone: "+57 300 123 4567",
      whatsapp: "+57 300 123 4567"
    },
    
    social: [
      { platform: "Instagram", icon: <Instagram />, url: "https://instagram.com", handle: "@mayerly.fuxion" },
      { platform: "Facebook", icon: <Facebook />, url: "https://facebook.com", handle: "Mayerly Pardo" },
      { platform: "WhatsApp", icon: <MessageCircle />, url: "https://wa.me/573001234567", handle: t.sponsorWhatsApp }
    ]
  };

  return (
    <div className="sponsor-profile-page">
      {/* Header */}
      <div className="sponsor-header">
        <h1 className="page-title">{t.sponsorPageTitle}</h1>
        <p className="page-subtitle">{t.sponsorPageSubtitle}</p>
      </div>

      <div className="sponsor-content">
        {/* Card principal */}
        <div className="sponsor-main-card">
          {/* Imagen */}
          <div className="sponsor-image-section">
            <div className="sponsor-image-container">
              <img src={sponsorInfo.image} alt={sponsorInfo.name} className="sponsor-photo" />
            </div>
            <h2 className="sponsor-name">{sponsorInfo.name}</h2>
            <p className="sponsor-title">{sponsorInfo.title}</p>
          </div>

          {/* Sobre mí */}
          <div className="sponsor-about-section">
            <h3 className="section-title">{t.sponsorAboutMe}</h3>
            <p className="about-text">{sponsorInfo.about}</p>
          </div>

          {/* Contacto */}
          <div className="sponsor-contact-section">
            <h3 className="section-title">{t.sponsorContactMe}</h3>
            
            <div className="contact-methods">
              <a href={`mailto:${sponsorInfo.contact.email}`} className="contact-method email">
                <Mail size={20} />
                <span>{sponsorInfo.contact.email}</span>
              </a>
              
              <a href={`tel:${sponsorInfo.contact.phone}`} className="contact-method phone">
                <Phone size={20} />
                <span>{sponsorInfo.contact.phone}</span>
              </a>
              
              <a href={`https://wa.me/573001234567`} target="_blank" rel="noopener noreferrer" className="contact-method whatsapp">
                <MessageCircle size={20} />
                <span>{sponsorInfo.contact.whatsapp}</span>
              </a>
            </div>

            {/* Redes Sociales */}
            <div className="social-links">
              {sponsorInfo.social.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-button"
                >
                  {social.icon}
                  <span>{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
