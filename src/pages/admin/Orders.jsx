import React, { useState, useEffect, useCallback } from 'react';
import adminService from '../../api/admin';
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
      };
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }
      const data = await adminService.getAllOrders(params);
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, searchTerm]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Error al actualizar el estado del pedido');
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const filteredOrders = searchTerm
    ? orders.filter(
        (order) =>
          order.id.toString().includes(searchTerm) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : orders;

  if (loading) {
    return (
      <div className="admin-orders">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <div>
          <h1>Gestión de Pedidos</h1>
          <p>Administra todos los pedidos de la tienda</p>
        </div>
      </div>

      <div className="orders-content">
        <div className="filters-bar">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por ID, cliente o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Buscar</button>
            </div>
          </form>

          <div className="filter-group">
            <Filter size={20} className="filter-icon" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Todos los estados' : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-container">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron pedidos</p>
            </div>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Puntos</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.customerEmail}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>{order.points || 0}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="actions-cell">
                      <button
                        className="action-button view"
                        onClick={() => handleViewOrder(order)}
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </button>
                      <select
                        className="status-select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        {statusOptions
                          .filter((opt) => opt !== 'all')
                          .map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {filteredOrders.length > 0 && (
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
              disabled={filteredOrders.length < 10}
            >
              Siguiente
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles del Pedido #{selectedOrder.id}</h2>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="order-details">
                <div className="detail-section">
                  <h3>Información del Cliente</h3>
                  <p><strong>Nombre:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                  <p><strong>Teléfono:</strong> {selectedOrder.customerPhone || 'N/A'}</p>
                  <p><strong>Dirección:</strong> {selectedOrder.shippingAddress || 'N/A'}</p>
                </div>

                <div className="detail-section">
                  <h3>Información del Pedido</h3>
                  <p><strong>Estado:</strong> <span className={`status-badge ${selectedOrder.status}`}>{selectedOrder.status}</span></p>
                  <p><strong>Fecha:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  <p><strong>Subtotal:</strong> ${selectedOrder.subtotal?.toFixed(2) || '0.00'}</p>
                  <p><strong>Envío:</strong> ${selectedOrder.shipping?.toFixed(2) || '0.00'}</p>
                  <p><strong>Impuestos:</strong> ${selectedOrder.tax?.toFixed(2) || '0.00'}</p>
                  <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                  <p><strong>Puntos:</strong> {selectedOrder.points || 0}</p>
                </div>

                <div className="detail-section">
                  <h3>Productos</h3>
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
