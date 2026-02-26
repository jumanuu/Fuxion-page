import { adminService as mockAdmin } from './mockService';
import { authService } from './auth';

const USE_MOCK = true;

const api = {
  get: async (_url, _config = {}) => {
    throw new Error('Use mock service');
  },
  
  post: async (_url, _data) => {
    throw new Error('Use mock service');
  },
  
  patch: async (_url, _data) => {
    throw new Error('Use mock service');
  },
  
  delete: async (_url) => {
    throw new Error('Use mock service');
  }
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const checkAdmin = () => {
  const user = authService.getCurrentUser();
  if (!user || user.role !== 'admin') {
    throw { response: { data: { message: 'Acceso denegado' } } };
  }
};

export const adminService = {
  getDashboardStats: async () => {
    if (USE_MOCK) {
      checkAdmin();
      return await mockAdmin.getDashboardStats();
    }
    const response = await api.get('/admin/dashboard', { headers: getAuthHeader() });
    return response.data;
  },

  getAllUsers: async (params = {}) => {
    if (USE_MOCK) {
      checkAdmin();
      const users = await mockAdmin.getAllUsers();
      return { users, total: users.length, page: 1, totalPages: 1 };
    }
    const response = await api.get('/admin/users', { params, headers: getAuthHeader() });
    return response.data;
  },

  getUserById: async (id) => {
    if (USE_MOCK) {
      checkAdmin();
      return await mockAdmin.getUserById(id);
    }
    const response = await api.get(`/admin/users/${id}`, { headers: getAuthHeader() });
    return response.data;
  },

  updateUserRole: async (id, role) => {
    if (USE_MOCK) {
      checkAdmin();
      return await mockAdmin.updateUserRole(id, role);
    }
    const response = await api.patch(`/admin/users/${id}/role`, { role }, { headers: getAuthHeader() });
    return response.data;
  },

  deleteUser: async (id) => {
    if (USE_MOCK) {
      checkAdmin();
      return await mockAdmin.deleteUser(id);
    }
    const response = await api.delete(`/admin/users/${id}`, { headers: getAuthHeader() });
    return response.data;
  },

  getAllOrders: async (params = {}) => {
    if (USE_MOCK) {
      checkAdmin();
      const orders = await mockAdmin.getAllOrders();
      return { orders, total: orders.length, page: 1, totalPages: 1 };
    }
    const response = await api.get('/admin/orders', { params, headers: getAuthHeader() });
    return response.data;
  },

  getOrderById: async (id) => {
    if (USE_MOCK) {
      checkAdmin();
      return await mockAdmin.getOrderById(id);
    }
    const response = await api.get(`/admin/orders/${id}`, { headers: getAuthHeader() });
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    if (USE_MOCK) {
      checkAdmin();
      return await mockAdmin.updateOrderStatus(id, status);
    }
    const response = await api.patch(`/admin/orders/${id}/status`, { status }, { headers: getAuthHeader() });
    return response.data;
  },

  createProduct: async (_productData) => {
    throw new Error('Not implemented');
  },

  updateProduct: async (_id, _productData) => {
    throw new Error('Not implemented');
  },

  deleteProduct: async (_id) => {
    throw new Error('Not implemented');
  },

  getSalesReport: async (_params = {}) => {
    throw new Error('Not implemented');
  },

  getUserReport: async (_params = {}) => {
    throw new Error('Not implemented');
  },

  getProductReport: async (_params = {}) => {
    throw new Error('Not implemented');
  }
};

export default adminService;
