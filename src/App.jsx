import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Profile from './pages/Profile/Profile';
import Sponsor from './pages/Sponsor/Sponsor';
import Cart from './pages/cart/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          <ThemeProvider>
            <Router>
              <div className="app">
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/sponsor" element={<Sponsor />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/cart" element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    } />

                    <Route path="/admin/dashboard" element={
                      <AdminRoute>
                        <Dashboard />
                      </AdminRoute>
                    } />

                    <Route path="/admin/orders" element={
                      <AdminRoute>
                        <Orders />
                      </AdminRoute>
                    } />

                    <Route path="/admin/users" element={
                      <AdminRoute>
                        <Users />
                      </AdminRoute>
                    } />

                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </ThemeProvider>
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
