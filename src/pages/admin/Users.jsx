import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import adminService from '../../api/admin';
import { Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import './Users.css';

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRole, setEditRole] = useState('');

  const roleOptions = ['all', 'user', 'admin'];

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
      };
      if (roleFilter !== 'all') {
        params.role = roleFilter;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }
      const data = await adminService.getAllUsers(params);
      setUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, roleFilter, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      fetchUsers();
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error('Error updating user role:', err);
      alert('Error al actualizar el rol del usuario');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await adminService.deleteUser(userId);
      fetchUsers();
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Error al eliminar el usuario');
    }
  };

  const handleEditRole = (user) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setShowEditModal(true);
  };

  const handleDeleteClick = (user) => {
    if (user.id === currentUser.id) {
      alert('No puedes eliminar tu propia cuenta');
      return;
    }
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setEditRole('');
    setShowEditModal(false);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  const filteredUsers = searchTerm
    ? users.filter(
        (user) =>
          user.id.toString().includes(searchTerm) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  if (loading) {
    return (
      <div className="admin-users">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <div className="users-header">
        <div>
          <h1>Gestión de Usuarios</h1>
          <p>Administra todos los usuarios registrados</p>
        </div>
      </div>

      <div className="users-content">
        <div className="filters-bar">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por ID, nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Buscar</button>
            </div>
          </form>

          <div className="filter-group">
            <Filter size={20} className="filter-icon" />
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Todos los roles' : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-container">
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron usuarios</p>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Rol</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="actions-cell">
                      <button
                        className="action-button edit"
                        onClick={() => handleEditRole(user)}
                        title="Cambiar rol"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-button delete"
                        onClick={() => handleDeleteClick(user)}
                        title="Eliminar usuario"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {filteredUsers.length > 0 && (
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Anterior
            </button>
            <span className="pagination-info">
              Página {currentPage}
            </span>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={filteredUsers.length < 10}
            >
              Siguiente
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles del Usuario #{selectedUser.id}</h2>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="user-details">
                <div className="detail-section">
                  <h3>Información Personal</h3>
                  <p><strong>Nombre:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Teléfono:</strong> {selectedUser.phone || 'N/A'}</p>
                  <p><strong>Rol:</strong> <span className={`role-badge ${selectedUser.role}`}>{selectedUser.role}</span></p>
                  <p><strong>Fecha de Registro:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
                </div>

                {selectedUser.address && (
                  <div className="detail-section">
                    <h3>Dirección</h3>
                    <p><strong>Calle:</strong> {selectedUser.address.street || 'N/A'}</p>
                    <p><strong>Ciudad:</strong> {selectedUser.address.city || 'N/A'}</p>
                    <p><strong>Estado:</strong> {selectedUser.address.state || 'N/A'}</p>
                    <p><strong>Código Postal:</strong> {selectedUser.address.zipCode || 'N/A'}</p>
                  </div>
                )}

                <div className="detail-section">
                  <h3>Estadísticas</h3>
                  <p><strong>Pedidos Totales:</strong> {selectedUser.totalOrders || 0}</p>
                  <p><strong>Gasto Total:</strong> ${selectedUser.totalSpent?.toFixed(2) || '0.00'}</p>
                  <p><strong>Puntos Acumulados:</strong> {selectedUser.totalPoints || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedUser && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cambiar Rol</h2>
              <button className="close-button" onClick={closeEditModal}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '1rem' }}>
                Cambiar el rol de <strong>{selectedUser.name}</strong>
              </p>
              <div className="form-group">
                <label htmlFor="role">Seleccionar Nuevo Rol:</label>
                <select
                  id="role"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="modal-actions">
                <button className="button-secondary" onClick={closeEditModal}>
                  Cancelar
                </button>
                <button
                  className="button-primary"
                  onClick={() => handleRoleChange(selectedUser.id, editRole)}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedUser && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Eliminar Usuario</h2>
              <button className="close-button" onClick={closeDeleteModal}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '1.5rem', color: '#dc2626' }}>
                ¿Estás seguro de que deseas eliminar al usuario <strong>{selectedUser.name}</strong>?
              </p>
              <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
                Esta acción no se puede deshacer. Se eliminarán todos los datos asociados con el usuario.
              </p>
              <div className="modal-actions">
                <button className="button-secondary" onClick={closeDeleteModal}>
                  Cancelar
                </button>
                <button
                  className="button-danger"
                  onClick={() => handleDeleteUser(selectedUser.id)}
                >
                  Eliminar Usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
