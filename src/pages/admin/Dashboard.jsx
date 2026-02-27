import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import adminService from '../../api/admin';
import { 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign,
  Package,
  LogOut
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchDashboardStats}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Panel de Administración</h1>
          <p>Bienvenido, {user?.name}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon orders">
              <ShoppingCart size={32} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Pedidos Totales</p>
              <h3 className="stat-value">{stats?.totalOrders || 0}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon users">
              <Users size={32} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Usuarios Registrados</p>
              <h3 className="stat-value">{stats?.totalUsers || 0}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <DollarSign size={32} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Ingresos Totales</p>
              <h3 className="stat-value">${stats?.totalRevenue?.toFixed(2) || '0.00'}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon products">
              <Package size={32} />
            </div>
            <div className="stat-info">
              <p className="stat-label">Productos Activos</p>
              <h3 className="stat-value">{stats?.totalProducts || 0}</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Pedidos Recientes</h2>
              <a href="/admin/orders">Ver todos</a>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentOrders?.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Usuarios Nuevos</h2>
              <a href="/admin/users">Ver todos</a>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentUsers?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
