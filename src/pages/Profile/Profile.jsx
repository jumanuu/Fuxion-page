import { useState, useEffect } from 'react';
import { User, Package, Heart, CreditCard, MapPin, Settings, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../api/auth';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: <User size={18} /> },
    { id: 'orders', label: 'Pedidos', icon: <Package size={18} /> },
    { id: 'wishlist', label: 'Deseos', icon: <Heart size={18} /> },
    { id: 'payments', label: 'Pagos', icon: <CreditCard size={18} /> },
    { id: 'addresses', label: 'Direcciones', icon: <MapPin size={18} /> },
    { id: 'settings', label: 'Configuración', icon: <Settings size={18} /> },
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = await authService.updateProfile(formData);
      updateUser(updatedUser);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <Loader2 className="animate-spin" size={48} />
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  const memberSince = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long' 
      })
    : 'No disponible';

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <User size={32} />
          </div>
          <div className="profile-details">
            <h1 className="profile-name">{user.name || 'Usuario'}</h1>
            <p className="profile-email">{user.email || ''}</p>
            <p className="profile-membership">Miembro desde {memberSince}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">{user.totalOrders || 0}</div>
            <div className="stat-label">Pedidos</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.totalPoints || 0}</div>
            <div className="stat-label">Puntos</div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <aside className="profile-sidebar">
          <nav className="sidebar-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </aside>

        <main className="profile-main">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2 className="tab-title">Resumen de Cuenta</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-value">
                    ${user.totalSpent?.toFixed(2) || '0.00'}
                  </div>
                  <div className="stat-card-label">Gasto Total</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-value">
                    {user.totalOrders || 0}
                  </div>
                  <div className="stat-card-label">Pedidos Completados</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-value">
                    {user.totalPoints || 0}
                  </div>
                  <div className="stat-card-label">Puntos Acumulados</div>
                </div>
              </div>

              <div className="recent-orders">
                <h3 className="orders-title">Información Personal</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Nombre:</span>
                    <span className="info-value">{user.name || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Teléfono:</span>
                    <span className="info-value">{user.phone || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Rol:</span>
                    <span className={`info-value role-badge ${user.role}`}>
                      {user.role || 'user'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-content">
              <h2 className="tab-title">Configuración de Cuenta</h2>

              <form onSubmit={handleUpdateProfile} className="settings-form">
                <div className="form-group">
                  <label className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled
                  />
                  <small className="form-hint">El email no se puede cambiar</small>
                </div>

                <div className="form-group">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <button
                  type="submit"
                  className="save-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Guardando...
                    </>
                  ) : (
                    'Guardar Cambios'
                  )}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="tab-content">
              <h2 className="tab-title">Historial de Pedidos</h2>
              <div className="empty-state">
                <Package size={48} />
                <p>No se encontraron pedidos</p>
                <a href="/" className="shop-button">Ver Productos</a>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="tab-content">
              <h2 className="tab-title">Mi Lista de Deseos</h2>
              <div className="empty-state">
                <Heart size={48} />
                <p>Tu lista de deseos está vacía</p>
                <a href="/" className="shop-button">Explorar Productos</a>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="tab-content">
              <h2 className="tab-title">Métodos de Pago</h2>
              <div className="empty-state">
                <CreditCard size={48} />
                <p>No tienes métodos de pago guardados</p>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="tab-content">
              <h2 className="tab-title">Mis Direcciones</h2>
              <div className="empty-state">
                <MapPin size={48} />
                <p>No tienes direcciones guardadas</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
