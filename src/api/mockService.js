const STORAGE_KEYS = {
  USERS: 'fuxion_users',
  ORDERS: 'fuxion_orders',
  CURRENT_USER: 'fuxion_current_user',
  TOKEN: 'fuxion_token'
};

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

const generateId = () => Math.random().toString(36).substr(2, 9);

const initializeDefaultData = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!users || JSON.parse(users).length === 0) {
    const defaultUsers = [
      {
        id: generateId(),
        name: 'Admin Fuxion',
        email: 'admin@fuxion.com',
        phone: '+1 555 000 0000',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: generateId(),
        name: 'Usuario Demo',
        email: 'demo@fuxion.com',
        phone: '+1 555 123 4567',
        password: 'demo123',
        role: 'user',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }
};

initializeDefaultData();

const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const getOrders = () => {
  const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return orders ? JSON.parse(orders) : [];
};

const saveOrders = (orders) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const authService = {
  login: async (email, password) => {
    await delay();
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw { response: { data: { message: 'Email o contraseña incorrectos' } } };
    }
    
    const { password: _, ...userWithoutPassword } = user;
    const token = generateId() + '-' + Date.now();
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    
    return {
      token,
      user: userWithoutPassword
    };
  },

  register: async (userData) => {
    await delay();
    
    const users = getUsers();
    
    if (users.find(u => u.email === userData.email)) {
      throw { response: { data: { message: 'El email ya está registrado' } } };
    }
    
    const newUser = {
      id: generateId(),
      ...userData,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    const { password: _, ...userWithoutPassword } = newUser;
    const token = generateId() + '-' + Date.now();
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    
    return {
      token,
      user: userWithoutPassword
    };
  },

  logout: async () => {
    await delay(100);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getProfile: async () => {
    await delay();
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!user) {
      throw { response: { data: { message: 'No autenticado' } } };
    }
    return JSON.parse(user);
  },

  updateProfile: async (userData) => {
    await delay();
    
    const users = getUsers();
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
      throw { response: { data: { message: 'Usuario no encontrado' } } };
    }
    
    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;
    saveUsers(users);
    
    const { password: _, ...userWithoutPassword } = updatedUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  }
};

export const adminService = {
  getDashboardStats: async () => {
    await delay();
    
    const users = getUsers();
    const orders = getOrders();
    
    return {
      totalUsers: users.length,
      totalOrders: orders.length,
      totalSales: orders.reduce((sum, o) => sum + (o.total || 0), 0),
      pendingOrders: orders.filter(o => o.status === 'pending').length
    };
  },

  getAllUsers: async () => {
    await delay();
    const users = getUsers();
    return users.map(({ password: _password, ...user }) => user);
  },

  getUserById: async (id) => {
    await delay();
    const users = getUsers();
    const user = users.find(u => u.id === id);
    if (!user) {
      throw { response: { data: { message: 'Usuario no encontrado' } } };
    }
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  updateUserRole: async (id, role) => {
    await delay();
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw { response: { data: { message: 'Usuario no encontrado' } } };
    }
    
    users[userIndex].role = role;
    saveUsers(users);
    
    const { password: _password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  },

  deleteUser: async (id) => {
    await delay();
    
    const users = getUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    
    if (filteredUsers.length === users.length) {
      throw { response: { data: { message: 'Usuario no encontrado' } } };
    }
    
    saveUsers(filteredUsers);
    return { success: true };
  },

  getAllOrders: async () => {
    await delay();
    return getOrders();
  },

  getOrderById: async (id) => {
    await delay();
    const orders = getOrders();
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw { response: { data: { message: 'Pedido no encontrado' } } };
    }
    return order;
  },

  updateOrderStatus: async (id, status) => {
    await delay();
    
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
      throw { response: { data: { message: 'Pedido no encontrado' } } };
    }
    
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    saveOrders(orders);
    
    return orders[orderIndex];
  },

  createOrder: async (orderData) => {
    await delay();
    
    const orders = getOrders();
    const newOrder = {
      id: generateId(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    saveOrders(orders);
    
    return newOrder;
  }
};

export const orderService = {
  createOrder: async (orderData) => {
    return adminService.createOrder(orderData);
  },
  
  getMyOrders: async () => {
    await delay();
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return [];
    
    const orders = getOrders();
    return orders.filter(o => o.userId === currentUser.id);
  }
};

export default {
  authService,
  adminService,
  orderService
};
