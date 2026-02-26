import { useState, useEffect } from 'react';
import { X, ShoppingCart, Star, Truck, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { productService } from '../../api/products';
import './ProductDetailOverlay.css';

const ProductDetailOverlay = ({ product, isOpen, onClose, onAddToCart }) => {
  const { t } = useLanguage();
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (product?.itemCode && isOpen) {
        setLoadingDetails(true);
        try {
          const details = await productService.getById(product.itemCode);
          setProductDetails(details);
        } catch (err) {
          console.error('Error fetching product details:', err);
        } finally {
          setLoadingDetails(false);
        }
      }
    };

    fetchProductDetails();
  }, [product?.itemCode, isOpen]);

  useEffect(() => {
    setSelectedImage(0);
    setProductDetails(null);
  }, [product]);

  if (!isOpen || !product) return null;

  const productImages = productDetails?.listImages?.length > 0 
    ? productDetails.listImages.map(img => img.imagenGrande || img.imagenMediana || img.imagenPequena)
    : product.images || [
        product.largeImageUrl || product.smallImageUrl || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
        'https://images.unsplash.com/photo-1571575173700-afb9492e6a50',
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea'
      ];

  const productFeatures = productDetails?.listDetailItem?.[0] 
    ? [
        productDetails.listDetailItem[0].beneficioLng || productDetails.listDetailItem[0].beneficios,
        productDetails.listDetailItem[0].principalesIngrLng || productDetails.listDetailItem[0].principalesIngredientesLng,
        productDetails.listDetailItem[0].preparacionLng || productDetails.listDetailItem[0].preparacion,
        productDetails.listDetailItem[0].recomendacionLng || productDetails.listDetailItem[0].recomendacion,
        productDetails.listDetailItem[0].restriccionesLng || productDetails.listDetailItem[0].restricciones
      ].filter(Boolean)
    : product.features || [
        "Premium quality ingredients",
        "100% natural and organic",
        "Clinically tested",
        "Suitable for all ages",
        "Made in USA"
      ];

  const productData = {
    id: product.id || 1,
    name: product.name || product.itemDescriptionNew || product.itemDescription || "Product Name",
    price: product.price || productDetails?.price || 0,
    points: product.points || product.bv || 0,
    description: product.description || product.shortDescription || productDetails?.listDetailItem?.[0]?.descripcionLng || "Product description goes here...",
    fullDescription: product.fullDescription || productDetails?.listDetailItem?.[0]?.longDetail1 || "This is a detailed description of the product. It includes all the features, benefits, and specifications that customers need to know before making a purchase decision.",
    images: productImages,
    features: productFeatures,
    rating: product.rating || 4.7,
    reviews: product.reviews || 128,
    inStock: product.inStock !== undefined ? product.inStock : (product.stockLevel > 0),
    category: product.category || "WEIGHT MANAGEMENT",
    sku: product.sku || product.itemCode || "FUX-" + product.id + "001",
    empaque: product.empaque || productDetails?.empaque,
    flavor: product.flavor || productDetails?.sabor,
    tipo: product.tipo
  };

  if (loadingDetails) {
    return (
      <div className={`product-detail-overlay ${isOpen ? 'open' : ''}`}>
        <div className="overlay-backdrop" onClick={onClose}></div>
        <div className="product-detail-modal">
          <div className="loading-details">
            <p>Cargando detalles del producto...</p>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productData.images.length) % productData.images.length);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        ...productData,
        quantity: quantity
      });
    }
  };

  return (
    <div className={`product-detail-overlay ${isOpen ? 'open' : ''}`}>
      <div 
        className="overlay-backdrop" 
        onClick={(e) => {
          e.stopPropagation();
          onClose(e);
        }}
      ></div>
        
      <div className="product-detail-modal">
        <button 
          className="close-button" 
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
        >
          <X size={24} />
        </button>

        <div className="modal-content">
          <div className="image-section">
            <div className="main-image-container">
              <img 
                src={productData.images[selectedImage]} 
                alt={productData.name}
                className="main-image"
              />
              <button className="nav-button prev" onClick={prevImage}>
                <ChevronLeft size={24} />
              </button>
              <button className="nav-button next" onClick={nextImage}>
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="thumbnail-list">
              {productData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                >
                  <img src={img} alt={`${productData.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="info-section">
            <div className="product-header">
              <span className="product-category">{productData.category}</span>
              <h2 className="product-name">{productData.name}</h2>
              <div className="product-sku">SKU: {productData.sku}</div>
            </div>

            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={18}
                    className={i < Math.floor(productData.rating) ? 'filled' : ''}
                  />
                ))}
              </div>
              <span className="rating-value">{productData.rating.toFixed(1)}</span>
              <span className="reviews">({productData.reviews} reviews)</span>
            </div>

            <div className="price-section">
              <div className="price-main">
                <span className="price">$ {productData.price.toFixed(2)}</span>
                <div className="points-badge">
                  <span className="points-label">{t.points}:</span>
                  <span className="points-value">{productData.points}</span>
                </div>
              </div>
              <div className={`stock-status ${productData.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {productData.inStock ? t.inStock : t.outOfStock}
              </div>
            </div>

            <div className="description-section">
              <h3>{t.description}</h3>
              <p className="short-description">{productData.description}</p>
              <p className="full-description">{productData.fullDescription}</p>
            </div>

            <div className="features-section">
              <h3>{t.keyFeatures}</h3>
              <ul className="features-list">
                {productData.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <div className="feature-dot"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="quantity-section">
              <h3>{t.quantity}</h3>
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button 
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={!productData.inStock}
            >
              <ShoppingCart size={20} />
              {t.addToCart}
            </button>

            <div className="info-cards">
              <div className="info-card">
                <Truck size={24} />
                <div>
                  <h4>{t.freeShipping}</h4>
                  <p>{t.freeShippingInfo}</p>
                </div>
              </div>
              <div className="info-card">
                <Shield size={24} />
                <div>
                  <h4>{t.guarantee}</h4>
                  <p>{t.guaranteeInfo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailOverlay;
