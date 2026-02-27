import { useState, useEffect, useCallback } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductDetailOverlay from '../../components/ProductDetailOverlay/ProductDetailOverlay';
import { useLanguage } from '../../context/LanguageContext';
import { productService } from '../../api/products';
import './ProductCatalog.css';

const DEMO_PRODUCTS = [
  {
    id: 1,
    itemCode: 'DEMO001',
    name: "Q'OCINA EN CASA VALENTINE'S",
    price: 26.97,
    points: 6,
    category: 'GASTRONOMIC_LINE',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
    shortDescription: "Special Valentine's Edition",
    description: "Premium culinary experience for Valentine's Day with exclusive recipes and ingredients.",
    stockLevel: 50,
    bv: 6,
    cv: 5,
  },
  {
    id: 2,
    itemCode: 'DEMO002',
    name: 'FUXION CHOCOLATE FIT',
    price: 29.50,
    points: 12,
    category: 'WEIGHT_MANAGEMENT',
    imageUrl: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=400',
    shortDescription: 'BOX 14 x 15gr',
    description: 'Delicious protein chocolate that helps with weight management while satisfying sweet cravings.',
    stockLevel: 100,
    bv: 12,
    cv: 10,
  },
  {
    id: 3,
    itemCode: 'DEMO003',
    name: 'FUXION BIOPRO+ FIT',
    price: 37.00,
    points: 16,
    category: 'WEIGHT_MANAGEMENT',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
    shortDescription: 'Box 14 sticks x 25 gr',
    description: 'Advanced probiotic formula for digestive health and weight management support.',
    stockLevel: 75,
    bv: 16,
    cv: 14,
  },
  {
    id: 4,
    itemCode: 'DEMO004',
    name: 'FUXION BIOPRO+ TECT',
    price: 41.00,
    points: 18,
    category: 'WEIGHT_MANAGEMENT',
    imageUrl: 'https://images.unsplash.com/photo-1594672247386-43ffb3b0d4ad?w=400',
    shortDescription: 'BOX 14 x 25gr',
    description: 'Complete probiotic system with advanced technology for maximum absorption.',
    stockLevel: 60,
    bv: 18,
    cv: 15,
  },
  {
    id: 5,
    itemCode: 'DEMO005',
    name: 'FUXION IMMUNE BOOST',
    price: 45.99,
    points: 20,
    category: 'IMMUNE_SUPPORT',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    shortDescription: 'Box 30 capsules',
    description: 'Powerful immune support formula with vitamins, minerals, and herbal extracts.',
    stockLevel: 80,
    bv: 20,
    cv: 18,
  },
  {
    id: 6,
    itemCode: 'DEMO006',
    name: 'FUXION ENERGY FOCUS',
    price: 32.50,
    points: 14,
    category: 'MENTAL_STAMINA',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    shortDescription: '30 servings',
    description: 'Natural energy and focus formula to enhance mental clarity and productivity.',
    stockLevel: 90,
    bv: 14,
    cv: 12,
  },
  {
    id: 7,
    itemCode: 'DEMO007',
    name: 'FUXION PROTEIN POWER',
    price: 52.99,
    points: 22,
    category: 'SPORT_PERFORMANCE',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    shortDescription: '2lb Chocolate',
    description: 'Premium whey protein for muscle recovery and athletic performance.',
    stockLevel: 70,
    bv: 22,
    cv: 20,
  },
  {
    id: 8,
    itemCode: 'DEMO008',
    name: 'FUXION ANTI-AGE CREAM',
    price: 68.00,
    points: 28,
    category: 'ANTI_AGEING',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-9c360e1d458f?w=400',
    shortDescription: '50ml Premium',
    description: 'Advanced anti-aging cream with retinol and hyaluronic acid for youthful skin.',
    stockLevel: 40,
    bv: 28,
    cv: 25,
  },
  {
    id: 9,
    itemCode: 'DEMO009',
    name: 'FUXION CLEANSE DETOX',
    price: 34.99,
    points: 15,
    category: 'CLEANSE',
    imageUrl: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=400',
    shortDescription: '30 day detox program',
    description: 'Complete 30-day detox program to cleanse and rejuvenate your body.',
    stockLevel: 55,
    bv: 15,
    cv: 13,
  },
  {
    id: 10,
    itemCode: 'DEMO010',
    name: 'FUXION REGENERATE SERUM',
    price: 55.00,
    points: 24,
    category: 'REGENERATE',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    shortDescription: 'Advanced skin serum',
    description: 'Regenerative serum with stem cell technology for skin renewal.',
    stockLevel: 45,
    bv: 24,
    cv: 21,
  },
  {
    id: 11,
    itemCode: 'DEMO011',
    name: 'FUXION REVITALIZE BOOST',
    price: 42.50,
    points: 19,
    category: 'REVITALIZE',
    imageUrl: 'https://images.unsplash.com/photo-1596755389378-9e5f4e5b2d5f?w=400',
    shortDescription: 'Energy boost formula',
    description: 'Revitalizing formula to boost energy levels and combat fatigue.',
    stockLevel: 65,
    bv: 19,
    cv: 17,
  },
  {
    id: 12,
    itemCode: 'DEMO012',
    name: 'FUXION MIND FOCUS',
    price: 38.75,
    points: 17,
    category: 'MENTAL_STAMINA',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    shortDescription: 'Mental clarity supplement',
    description: 'Cognitive enhancer for improved focus, memory, and mental clarity.',
    stockLevel: 85,
    bv: 17,
    cv: 15,
  },
];

const ProductCatalog = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const fetchProducts = async (categoryId = null) => {
    setLoading(true);
    setError(null);
    setIsDemoMode(false);
    
    try {
      let response;
      if (categoryId && categoryId !== 'ALL') {
        response = await productService.getByCategory(categoryId);
      } else {
        response = await productService.getFeatured();
      }
      setProducts(response.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts(DEMO_PRODUCTS);
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const categories = [
    { id: 'ALL', name: t.all, count: products.length },
    { id: 'CLEANSE', name: '1 CLEANSE', count: 8 },
    { id: 'REGENERATE', name: '2 REGENERATE', count: 7 },
    { id: 'REVITALIZE', name: '3 REVITALIZE', count: 6 },
    { id: 'IMMUNE_SUPPORT', name: 'IMMUNE SUPPORT', count: 5 },
    { id: 'WEIGHT_MANAGEMENT', name: 'WEIGHT MANAGEMENT', count: 9 },
    { id: 'ANTI_AGEING', name: 'ANTI-AGEING', count: 4 },
    { id: 'MENTAL_STAMINA', name: 'MENTAL STAMINA', count: 3 },
    { id: 'SPORT_PERFORMANCE', name: 'SPORT PERFORMANCE', count: 6 },
    { id: 'GASTRONOMIC_LINE', name: 'GASTRONOMIC LINE', count: 4 },
    { id: 'MERCHANDISING', name: 'MERCHANDISING', count: 3 },
    { id: 'PROMOTIONS', name: 'PROMOTIONS', count: 2 },
    { id: 'COMBOS', name: 'COMBOS - A BIG START', count: 5 },
    { id: 'EVENTS', name: 'EVENTS', count: 3 },
    { id: 'VIRTUAL_TOOLS', name: 'VIRTUAL TOOLS', count: 2 },
  ];

  const filteredProducts =
    selectedCategory === 'ALL'
      ? products
          .filter(
            (product) =>
              (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
              (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
              (product.shortDescription?.toLowerCase() || '').includes(searchTerm.toLowerCase())
          )
          .slice(0, 16)
      : products.filter(
          (product) =>
            (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (product.shortDescription?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );

  // Funciones para el overlay
  const openProductDetail = (product) => {
    // 🔥 FIX: aseguramos que el overlay siempre tenga "images"
    const normalizedProduct = {
      ...product,
      images: product.images || (product.image ? [product.image] : []),
    };

    setSelectedProduct(normalizedProduct);
    setIsOverlayOpen(true);
  };

  const closeProductDetail = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setIsOverlayOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleAddToCart = (product) => {
    console.log('Product added to cart:', product);
    closeProductDetail();
    alert(`${product.name} added to cart!`);
  };
  const flyers = [
    `${import.meta.env.BASE_URL}FLYER1.png`,
    `${import.meta.env.BASE_URL}FLYER2.png`,
    `${import.meta.env.BASE_URL}FLYER3.png`,
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % flyers.length);
  }, [flyers.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + flyers.length) % flyers.length);
  }, [flyers.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 12000);
    return () => clearInterval(interval);
  }, [flyers.length, nextSlide]);

  return (
    <div className="product-page">
      <div className="page-content">
       {/* Contenido principal - ESTILO ORIGINAL */}
       <main className="main-content">
           {/* HEADER */}
           <header className="page-header">
             <div className="header-left">
               {/* Dropdown de categorías */}
               <div className="category-dropdown">
                 <button 
                   className="category-dropdown-btn"
                   onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    <Menu size={20} />
                    {selectedCategory === 'ALL' 
                      ? t.categories 
                      : categories.find(c => c.id === selectedCategory)?.name}
                  </button>
                 {isCategoryOpen && (
                   <div className="category-dropdown-menu">
                     {categories.map((category) => (
                       <div
                         key={category.id}
                         className={`category-dropdown-item ${
                           selectedCategory === category.id ? 'active' : ''
                         }`}
                         onClick={() => {
                           setSelectedCategory(category.id);
                           setIsCategoryOpen(false);
                         }}
                       >
                         {category.name}
                       </div>
                     ))}
                   </div>
                 )}
               </div>

                {/* Search bar */}
                <div className="search-box">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    placeholder={t.search}
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Sort by */}
                <div className="sort-section">
                  <select className="sort-select">
                    <option>{t.select}</option>
                    <option>{t.priceLowToHigh}</option>
                    <option>{t.priceHighToLow}</option>
                    <option>{t.mostPopular}</option>
                  </select>
                </div>
              </div>

              {/* Slider */}
             <div className="header-right">
               <div className="news-header">
                 <div className="page-carrusel-viewport">
                   <div
                     className="page-carrusel"
                     style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                   >
                     {flyers.map((src, i) => (
                       <img
                         key={src + i}
                         src={src}
                         alt={`Flyer ${i + 1}`}
                         className="image-header"
                       />
                     ))}
                   </div>

                   {/* Botones */}
                   <button className="carrusel-btn left" onClick={prevSlide}>‹</button>
                   <button className="carrusel-btn right" onClick={nextSlide}>›</button>
                 </div>
                </div>
              </div>
            </header>

          {/* Header del contenido */}
          <div className="content-header">
            <div className="content-title">
              <h3>
                {selectedCategory === 'ALL'
                  ? t.all
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h3>
              <p>
                {t.showing} 1 - {filteredProducts.length} {t.of}{' '}
                {selectedCategory === 'ALL' ? 53 : filteredProducts.length} {t.products}
              </p>
            </div>
          </div>

          {/* Banner de Modo Demo */}
          {isDemoMode && (
            <div className="demo-banner">
              <span className="demo-badge">{t.demoMode}</span>
              <span>{t.demoMessage}</span>
            </div>
          )}

          {/* Grid de productos */}
          <div className="products-grid">
            {loading ? (
              <div className="loading-message">
                <p>Cargando productos...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <p>{error}</p>
                {error.includes('autenticación') ? (
                  <Link to="/login" className="login-btn">
                    Iniciar Sesión
                  </Link>
                ) : (
                  <button onClick={() => fetchProducts(selectedCategory)}>Reintentar</button>
                )}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="no-products-message">
                <p>No se encontraron productos</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.itemCode || product.id}
                  className="product-item"
                  onClick={() => openProductDetail(product)}
                >
                  <div className="product-card">
                    {/* ✅ IMAGEN DEL PRODUCTO */}
                    <div className="product-image-container">
                      <img
                        src={product.imageUrl || product.largeImageUrl || product.smallImageUrl || product.images?.[0] || 'https://via.placeholder.com/300'}
                        alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="product-header">
                    <h4 className="product-name">{product.name || product.itemDescription || 'Producto'}</h4>
                    {(product.shortDescription || product.description) && (
                      <p className="product-description">{product.shortDescription || product.description}</p>
                    )}
                  </div>

                  <div className="product-details">
                    <div className="price-section">
                      <div className="price">$ {product.price ? product.price.toFixed(2) : '0.00'}</div>
                      <div className="points">PUNTOS: {product.points || product.bv || 0}</div>
                    </div>

                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Product added to cart:', product);
                        alert(`${product.name} added to cart!`);
                      }}
                    >
                      <ShoppingCart size={16} />
                      {t.addToCart}
                    </button>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Overlay del detalle del producto */}
      <ProductDetailOverlay
        product={selectedProduct}
        isOpen={isOverlayOpen}
        onClose={closeProductDetail}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductCatalog;
