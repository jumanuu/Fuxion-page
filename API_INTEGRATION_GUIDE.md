# FuxionPage - Estructura del Proyecto con API de Node.js

## 📋 Resumen de la Implementación

He reestructurado el proyecto para integrar una API de Node.js con autenticación de usuarios y roles (Admin vs Usuarios normales). El frontend ahora está listo para conectarse con una API REST.

## 🏗️ Estructura de Carpetas Creada

```
src/
├── api/                    # Servicios de API
│   ├── axios.js           # Configuración de Axios con interceptores
│   ├── auth.js            # Endpoints de autenticación
│   ├── products.js        # Endpoints de productos
│   └── admin.js           # Endpoints de administración
├── context/                # Contextos de React (State Management)
│   ├── AuthContext.jsx    # Gestión de autenticación y usuario
│   └── CartContext.jsx   # Gestión del carrito de compras
├── hooks/                  # Custom hooks (useAuth, useProduct, etc.)
├── pages/
│   ├── auth/              # Páginas de autenticación
│   │   ├── Login.jsx      # Login de usuarios
│   │   └── Register.jsx   # Registro de usuarios
│   ├── admin/             # Panel de administración
│   │   ├── Dashboard.jsx  # Dashboard principal del admin
│   │   ├── Orders.jsx     # Gestión de pedidos
│   │   └── Users.jsx      # Gestión de usuarios
│   ├── user/              # Páginas de usuario normal
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   └── Profile.jsx
│   └── ...
├── routes/                 # Rutas protegidas
│   ├── ProtectedRoute.jsx  # Rutas para usuarios autenticados
│   └── AdminRoute.jsx     # Rutas solo para administradores
└── ...
```

## 🔐 Sistema de Autenticación

### Flujo de Autenticación

1. **Login/Register** → Usuario ingresa credenciales
2. **API** → Valida y retorna JWT token + datos del usuario
3. **LocalStorage** → Guarda token y datos del usuario
4. **AuthContext** → Provee estado de autenticación a toda la app
5. **Axios Interceptor** → Agrega token a todas las peticiones
6. **Rutas Protegidas** → Verifica autenticación y roles

### Roles de Usuario

- **user**: Usuario normal que puede comprar productos
- **admin**: Administrador que ve dashboard, pedidos y usuarios

### Token JWT

```javascript
// Estructura del token (decodificado)
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "admin" // o "user"
}
```

## 🌐 API Endpoints Esperados

### Autenticación (`/api/auth`)

```javascript
POST   /api/auth/login         // Iniciar sesión
POST   /api/auth/register      // Registrar usuario
POST   /api/auth/logout        // Cerrar sesión
GET    /api/auth/profile       // Obtener perfil del usuario
PUT    /api/auth/profile       // Actualizar perfil
POST   /api/auth/change-password // Cambiar contraseña
```

### Productos (`/api/products`)

```javascript
GET    /api/products           // Obtener todos los productos (con paginación)
GET    /api/products/:id       // Obtener producto por ID
GET    /api/products/category/:category // Productos por categoría
GET    /api/products/search    // Buscar productos
GET    /api/products/featured  // Productos destacados
GET    /api/products/new       // Productos nuevos
```

### Admin Dashboard (`/api/admin`)

```javascript
GET    /api/admin/dashboard    // Estadísticas generales
```

### Admin Pedidos (`/api/admin/orders`)

```javascript
GET    /api/admin/orders       // Obtener todos los pedidos
GET    /api/admin/orders/:id   // Obtener pedido por ID
PATCH  /api/admin/orders/:id/status // Actualizar estado del pedido
```

### Admin Usuarios (`/api/admin/users`)

```javascript
GET    /api/admin/users        // Obtener todos los usuarios
GET    /api/admin/users/:id    // Obtener usuario por ID
PATCH  /api/admin/users/:id/role // Cambiar rol de usuario
DELETE /api/admin/users/:id    // Eliminar usuario
```

### Admin Productos (`/api/admin/products`)

```javascript
POST   /api/admin/products     // Crear producto
PUT    /api/admin/products/:id // Actualizar producto
DELETE /api/admin/products/:id // Eliminar producto
```

### Admin Analytics (`/api/admin/analytics`)

```javascript
GET    /api/admin/analytics/sales   // Reporte de ventas
GET    /api/admin/analytics/users   // Reporte de usuarios
GET    /api/admin/analytics/products // Reporte de productos
```

## 📝 Respuestas Esperadas de la API

### Login/Register Response

```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+1 234 567 8900",
    "role": "user",
    "totalOrders": 5,
    "totalSpent": 450.50,
    "totalPoints": 225,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Products Response

```json
{
  "products": [
    {
      "id": 1,
      "name": "Producto A",
      "description": "Descripción corta",
      "fullDescription": "Descripción completa...",
      "price": 99.99,
      "points": 50,
      "category": "CLEANSE",
      "images": [
        "https://...",
        "https://..."
      ],
      "features": ["Característica 1", "Característica 2"],
      "rating": 4.5,
      "reviews": 128,
      "inStock": true,
      "sku": "FUX-001"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Admin Dashboard Response

```json
{
  "totalOrders": 150,
  "totalUsers": 50,
  "totalRevenue": 15000.50,
  "totalProducts": 20,
  "recentOrders": [
    {
      "id": "ORD-001",
      "customerName": "Juan Pérez",
      "customerEmail": "juan@example.com",
      "total": 199.99,
      "status": "pending",
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "recentUsers": [
    {
      "id": 1,
      "name": "María García",
      "email": "maria@example.com",
      "role": "user",
      "createdAt": "2024-01-14T00:00:00.000Z"
    }
  ]
}
```

### Orders Response

```json
{
  "orders": [
    {
      "id": "ORD-001",
      "customerName": "Juan Pérez",
      "customerEmail": "juan@example.com",
      "customerPhone": "+1 234 567 8900",
      "shippingAddress": "Calle 123, Ciudad",
      "items": [
        {
          "id": 1,
          "name": "Producto A",
          "price": 99.99,
          "quantity": 2
        }
      ],
      "subtotal": 199.98,
      "shipping": 5.99,
      "tax": 15.60,
      "total": 221.57,
      "points": 100,
      "status": "pending",
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Users Response

```json
{
  "users": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "phone": "+1 234 567 8900",
      "role": "user",
      "address": {
        "street": "Calle 123",
        "city": "Ciudad",
        "state": "Estado",
        "zipCode": "12345"
      },
      "totalOrders": 5,
      "totalSpent": 450.50,
      "totalPoints": 225,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

## 🚀 Cómo Probar la Aplicación

### 1. Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con la URL de tu API
VITE_API_URL=http://localhost:3000/api
```

### 2. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

### 3. Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **Login**: http://localhost:5173/login
- **Register**: http://localhost:5173/register
- **Dashboard Admin**: http://localhost:5173/admin/dashboard (solo admin)

## 🔧 Componentes Principales

### AuthContext
- Proporciona estado de autenticación
- Gestiona login, register, logout
- Almacena usuario y token en localStorage
- Actualiza usuario y elimina usuario

### CartContext
- Gestiona el carrito de compras
- Funciones: addToCart, removeFromCart, updateQuantity, clearCart
- Calcula totales y puntos
- Almacena carrito en localStorage

### ProtectedRoute
- Verifica si el usuario está autenticado
- Redirige a /login si no lo está

### AdminRoute
- Verifica si el usuario es admin
- Redirige a / si no es admin

## 📦 Dependencias Instaladas

```json
{
  "axios": "^1.7.9"
}
```

## 🎨 Componentes UI

- **Header**: Muestra navegación según autenticación y rol
- **Login**: Formulario de inicio de sesión
- **Register**: Formulario de registro
- **Dashboard Admin**: Panel con estadísticas y datos recientes
- **Orders Admin**: Tabla de pedidos con filtros y acciones
- **Users Admin**: Tabla de usuarios con gestión de roles
- **Profile**: Perfil de usuario con pestañas

## 🔒 Seguridad Implementada

1. **JWT Tokens**: Autenticación basada en tokens
2. **Axios Interceptors**: Agrega token automáticamente
3. **Rutas Protegidas**: Verificación de autenticación
4. **Role-based Access**: Verificación de roles para acceso admin
5. **Token Storage**: Almacenamiento seguro en localStorage

## 📝 Notas para el Backend (Node.js)

### Requisitos Mínimos

1. **Autenticación JWT**: Usar `jsonwebtoken` para generar y validar tokens
2. **Hashing de contraseñas**: Usar `bcryptjs` para hash de contraseñas
3. **Validación**: Usar `joi` o `express-validator` para validar inputs
4. **CORS**: Configurar CORS para permitir peticiones desde el frontend
5. **Base de Datos**: Usar MongoDB, PostgreSQL o MySQL

### Ejemplo de Estructura del Backend

```
server/
├── config/
│   ├── db.js              # Configuración de base de datos
│   └── jwt.js            # Configuración de JWT
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── adminController.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── admin.js
├── middleware/
│   ├── auth.js            # Verificar JWT
│   ├── admin.js           # Verificar rol admin
│   └── validation.js      # Validar inputs
└── index.js               # Entry point
```

### Ejemplo de Endpoint de Login

```javascript
// server/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        totalOrders: user.totalOrders || 0,
        totalSpent: user.totalSpent || 0,
        totalPoints: user.totalPoints || 0,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

## ✅ Checklist de Implementación Completa

### Frontend (React)
- [x] Estructura de carpetas creada
- [x] API services (auth, products, admin)
- [x] Axios configuration con interceptors
- [x] AuthContext para gestión de autenticación
- [x] CartContext para gestión del carrito
- [x] ProtectedRoute para rutas de usuarios
- [x] AdminRoute para rutas de administradores
- [x] Página de Login
- [x] Página de Register
- [x] Dashboard Admin con estadísticas
- [x] Dashboard Admin con pedidos recientes
- [x] Dashboard Admin con usuarios nuevos
- [x] Página de gestión de pedidos (Orders)
- [x] Página de gestión de usuarios (Users)
- [x] Header actualizado con autenticación
- [x] Profile actualizado con datos del usuario
- [x] Variables de entorno configuradas (.env)
- [x] Axios instalado

### Backend (Node.js) - Pendiente de implementación

- [ ] Servidor Express configurado
- [ ] Base de datos conectada
- [ ] Modelos de datos (User, Product, Order)
- [ ] Endpoints de autenticación
- [ ] Endpoints de productos
- [ ] Endpoints de administración
- [ ] Middleware de autenticación JWT
- [ ] Middleware de autorización de roles
- [ ] Validación de inputs
- [ ] Configuración de CORS
- [ ] Manejo de errores
- [ ] Documentación de API (Swagger/Postman)

## 🎯 Próximos Pasos

1. **Implementar el Backend** (Node.js + Express)
2. **Conectar Frontend con Backend**
3. **Implementar endpoints de productos reales**
4. **Implementar sistema de pedidos completo**
5. **Agregar funcionalidad de wishlist**
6. **Implementar gestión de direcciones**
7. **Agregar métodos de pago**
8. **Implementar sistema de reviews**
9. **Agregar analytics avanzados**
10. **Testing y optimización**

## 📞 Soporte

Para cualquier duda o problema, consulta el archivo AGENTS.md para guías de desarrollo.
