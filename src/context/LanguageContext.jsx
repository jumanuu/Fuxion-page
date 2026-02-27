import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem('fuxion_language');
    return stored || 'es';
  });

  useEffect(() => {
    localStorage.setItem('fuxion_language', language);
  }, [language]);

  const translations = {
    es: {
      products: 'Productos',
      sponsor: 'Sponsor',
      profile: 'Mi Perfil',
      myProfile: 'Mi Perfil',
      admin: 'Admin',
      cart: 'Carrito',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      logout: 'Cerrar Sesión',
      orders: 'Pedidos',
      users: 'Usuarios',
      dashboard: 'Panel',
      search: 'Buscar productos...',
      categories: 'Categorías',
      sortBy: 'Ordenar por',
      select: 'Seleccionar',
      priceLowToHigh: 'Precio: Menor a Mayor',
      priceHighToLow: 'Precio: Mayor a Menor',
      mostPopular: 'Más Popular',
      showing: 'Mostrando',
      of: 'de',
      addToCart: 'Añadir al Carrito',
      description: 'Descripción',
      keyFeatures: 'Características',
      quantity: 'Cantidad',
      inStock: 'En Stock',
      outOfStock: 'Agotado',
      freeShipping: 'Envío Gratis',
      freeShippingInfo: 'En pedidos mayores a $100',
      guarantee: 'Garantía',
      guaranteeInfo: 'Garantía de 30 días',
      checkout: 'Finalizar Compra',
      continueShopping: 'Seguir Comprando',
      emptyCart: 'Tu carrito está vacío',
      subtotal: 'Subtotal',
      points: 'Puntos',
      total: 'Total',
      orderPlaced: '¡Pedido realizado!',
      orderPlacedMessage: 'Tu pedido ha sido registrado correctamente.',
      loginRequired: 'Debes iniciar sesión para realizar un pedido',
      myOrders: 'Mis Pedidos',
      orderDate: 'Fecha del pedido',
      orderStatus: 'Estado',
      pending: 'Pendiente',
      completed: 'Completado',
      cancelled: 'Cancelado',
      all: 'Todos',
      quickLinks: 'Enlaces Rápidos',
      support: 'Soporte',
      legal: 'Legal',
      helpCenter: 'Centro de Ayuda',
      shippingInfo: 'Información de Envío',
      returns: 'Devoluciones',
      contactUs: 'Contáctanos',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',
      cookiePolicy: 'Política de Cookies',
      footerDescription: 'Productos premium de bienestar diseñados para limpiar, regenerar y revitalizar tu cuerpo.',
      loginTitle: 'Iniciar Sesión',
      loginSubtitle: 'Ingresa tus credenciales para acceder',
      loginButton: 'Iniciar Sesión',
      loginLoading: 'Cargando...',
      loginNoAccount: '¿No tienes una cuenta?',
      loginRegisterHere: 'Regístrate aquí',
      loginRememberMe: 'Recordarme',
      loginForgotPassword: '¿Olvidaste tu contraseña?',
      loginUserPlaceholder: 'Tu usuario o email',
      loginPasswordPlaceholder: '••••••••',
      loginInvalidCredentials: 'Credenciales inválidas',
      demoMode: 'Modo Demo',
      demoMessage: 'Estás viendo productos de demostración',
      sponsorPageTitle: 'MI PERFIL',
      sponsorPageSubtitle: 'Conóceme y contáctame para empezar tu camino hacia el bienestar',
      sponsorAboutMe: 'Sobre Mí',
      sponsorContactMe: 'Contáctame',
      sponsorWhatsApp: 'Escríbeme',
      sponsorAboutText: 'Soy Empresaria Fuxion comprometida con ayudarte a alcanzar tus metas de salud y bienestar. A través de los productos premium de Fuxion, he encontrado una forma de mejorar mi calidad de vida y la de quienes me rodean. Estoy aquí para guiarte en tu camino hacia una vida más saludable.',
    },
    en: {
      products: 'Products',
      sponsor: 'Sponsor',
      profile: 'My Profile',
      myProfile: 'My Profile',
      admin: 'Admin',
      cart: 'Cart',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      orders: 'Orders',
      users: 'Users',
      dashboard: 'Dashboard',
      search: 'Search products...',
      categories: 'Categories',
      sortBy: 'Sort by',
      select: 'Select',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      mostPopular: 'Most Popular',
      showing: 'Showing',
      of: 'of',
      addToCart: 'Add to Cart',
      description: 'Description',
      keyFeatures: 'Key Features',
      quantity: 'Quantity',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      freeShipping: 'Free Shipping',
      freeShippingInfo: 'On orders over $100',
      guarantee: 'Guarantee',
      guaranteeInfo: '30-Day Guarantee',
      checkout: 'Checkout',
      continueShopping: 'Continue Shopping',
      emptyCart: 'Your cart is empty',
      subtotal: 'Subtotal',
      points: 'Points',
      total: 'Total',
      orderPlaced: 'Order Placed!',
      orderPlacedMessage: 'Your order has been registered successfully.',
      loginRequired: 'You must be logged in to place an order',
      myOrders: 'My Orders',
      orderDate: 'Order Date',
      orderStatus: 'Status',
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
      all: 'All',
      quickLinks: 'Quick Links',
      support: 'Support',
      legal: 'Legal',
      helpCenter: 'Help Center',
      shippingInfo: 'Shipping Info',
      returns: 'Returns',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy',
      footerDescription: 'Premium wellness products designed to cleanse, regenerate, and revitalize your body.',
      loginTitle: 'Login',
      loginSubtitle: 'Enter your credentials to access',
      loginButton: 'Login',
      loginLoading: 'Loading...',
      loginNoAccount: "Don't have an account?",
      loginRegisterHere: 'Register here',
      loginRememberMe: 'Remember me',
      loginForgotPassword: 'Forgot your password?',
      loginUserPlaceholder: 'Your username or email',
      loginPasswordPlaceholder: '••••••••',
      loginInvalidCredentials: 'Invalid credentials',
      demoMode: 'Demo Mode',
      demoMessage: 'You are viewing demo products',
      sponsorPageTitle: 'MY PROFILE',
      sponsorPageSubtitle: 'Get to know me and contact me to start your journey to wellness',
      sponsorAboutMe: 'About Me',
      sponsorContactMe: 'Contact Me',
      sponsorWhatsApp: 'Write to me',
      sponsorAboutText: 'I am a Fuxion Business Partner committed to helping you achieve your health and wellness goals. Through Fuxion premium products, I have found a way to improve my quality of life and that of those around me. I am here to guide you on your path to a healthier life.',
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
