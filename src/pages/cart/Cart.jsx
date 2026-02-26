import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Q'OCINA EN CASA VALENTINE'S...",
      price: 26.97,
      points: 6,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
      quantity: 1,
      description: 'Special Valentine\'s Edition'
    },
    {
      id: 2,
      name: "FUXION CHOCOLATE FIT",
      price: 29.50,
      points: 12,
      image: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50',
      quantity: 2,
      description: 'BOX 14 x 15gr'
    },
    {
      id: 3,
      name: "FUXION BIOPRO+ FIT",
      price: 37.00,
      points: 16,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
      quantity: 1,
      description: 'Box 14 sticks x 25 gr'
    }
  ]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculatePoints = () => {
    return cartItems.reduce((total, item) => total + (item.points * item.quantity), 0);
  };

  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const tax = calculateSubtotal() * 0.08; // 8% tax
  const total = calculateSubtotal() + shipping + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="cart-page">
      {/* Header */}
      <div className="cart-header">
        <h1 className="cart-title">SHOPPING CART</h1>
        <p className="cart-subtitle">Review your items and proceed to checkout</p>
      </div>

      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-content">
          {/* Cart Actions */}
          <div className="cart-actions">
            <Link to="/" className="continue-shopping">
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
            {cartItems.length > 0 && (
              <button onClick={clearCart} className="clear-cart-btn">
                <Trash2 size={18} />
                Clear Cart
              </button>
            )}
          </div>

          {/* Cart Items List */}
          <div className="cart-items-section">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={64} />
                <h2>Your cart is empty</h2>
                <p>Add some products to get started</p>
                <Link to="/" className="shop-now-btn">
                  Shop Products
                </Link>
              </div>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="remove-item-btn"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <p className="item-description">{item.description}</p>
                      
                      <div className="item-info">
                        <div className="quantity-controls">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="quantity-btn"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="quantity-btn"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="item-prices">
                          <div className="price-row">
                            <span className="price-label">Price:</span>
                            <span className="price">$ {item.price.toFixed(2)}</span>
                          </div>
                          <div className="price-row">
                            <span className="price-label">Points:</span>
                            <span className="points">{item.points}</span>
                          </div>
                          <div className="price-row">
                            <span className="price-label">Subtotal:</span>
                            <span className="subtotal">$ {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <aside className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>$ {calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>$ {shipping.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>$ {tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>$ {total.toFixed(2)}</span>
              </div>
              
              <div className="summary-row points">
                <span>Total Points</span>
                <span>{calculatePoints()}</span>
              </div>
            </div>
            
            <div className="checkout-section">
              <button className="checkout-btn">
                <CreditCard size={20} />
                Proceed to Checkout
              </button>
              
              <div className="payment-methods">
                <span className="payment-label">Secure payment with:</span>
                <div className="payment-icons">
                  <span className="payment-icon">VISA</span>
                  <span className="payment-icon">MC</span>
                  <span className="payment-icon">PP</span>
                </div>
              </div>
            </div>
            
            <div className="shipping-info">
              <h3>Shipping Information</h3>
              <p>Free shipping on orders over $100</p>
              <p>Estimated delivery: 3-5 business days</p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Cart;