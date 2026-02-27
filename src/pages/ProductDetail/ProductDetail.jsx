import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Truck, Shield } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  console.log('Product ID:', id);

  // Datos de ejemplo (reemplazar con tu API)

  // Datos de ejemplo (reemplazar con tu API)
  const product = {
    id: 1,
    name: "Producto Premium",
    price: 99.99,
    discountPrice: 79.99,
    images: ['/img1.jpg', '/img2.jpg', '/img3.jpg'],
    description: "Descripción detallada del producto...",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    rating: 4.5,
    reviews: 128,
    inStock: true
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <span>Home / </span>
            <span>Categoría / </span>
            <span className="font-semibold">{product.name}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-2xl overflow-hidden bg-white shadow-xl"
            >
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            
            {/* Miniaturas */}
            <div className="flex gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-brand scale-105' 
                      : 'border-transparent hover:border-brand'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Badge y título */}
            <div>
              <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-full text-sm font-medium">
                ¡Oferta Especial!
              </span>
              <h1 className="text-4xl font-bold mt-4 text-gray-900">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'fill-gray-200 text-gray-200'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reseñas)</span>
              </div>
            </div>

            {/* Precios */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm font-bold">
                  -20%
                </span>
              </div>
              <p className="text-green-600 font-medium">Envío gratis</p>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Características */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Características principales</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selector de cantidad y compra */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-brand text-white py-3 px-8 rounded-lg font-semibold flex items-center justify-center gap-3 hover:bg-brand-light transition-colors"
                  >
                    <ShoppingCart size={20} />
                    Añadir al Carrito
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Comprar Ahora
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Garantías */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand">
              <div className="text-center p-4 rounded-xl bg-gray-50">
                <Truck className="mx-auto mb-2 text-brand" />
                <p className="font-medium">Envío Gratis</p>
                <p className="text-sm text-gray-600">En 24h</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gray-50">
                <Shield className="mx-auto mb-2 text-green-500" />
                <p className="font-medium">Garantía</p>
                <p className="text-sm text-gray-600">2 años</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gray-50">
                <svg className="w-6 h-6 mx-auto mb-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="font-medium">Pago Seguro</p>
                <p className="text-sm text-gray-600">SSL Certificado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;