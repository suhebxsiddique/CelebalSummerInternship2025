import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, view }) => {
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  if (view === 'list') {
    return (
      <div className="product-card list-view">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {product.discount > 0 && (
            <div className="discount-badge">-{product.discount}%</div>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <div className="product-rating">
              {renderStars(product.rating)} ({product.reviews} reviews)
            </div>
          </div>
        </div>
        
        <div className="product-pricing">
          <div className="price-container">
            {product.discount > 0 && (
              <span className="original-price">${product.price.toFixed(2)}</span>
            )}
            <span className="current-price">${discountedPrice.toFixed(2)}</span>
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card grid-view">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.discount > 0 && (
          <div className="discount-badge">-{product.discount}%</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            {renderStars(product.rating)} ({product.reviews})
          </div>
        </div>
        
        <div className="price-container">
          {product.discount > 0 && (
            <span className="original-price">${product.price.toFixed(2)}</span>
          )}
          <span className="current-price">${discountedPrice.toFixed(2)}</span>
        </div>
        
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 