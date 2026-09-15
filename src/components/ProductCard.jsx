import React from 'react';
import { Mail, Eye, Star } from 'lucide-react';

export default function ProductCard({ product, onProductClick, onQuoteProduct }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={13} 
          fill={i <= fullStars ? "#ffb800" : "none"} 
          style={{ color: i <= fullStars ? "#ffb800" : "var(--text-muted)" }} 
        />
      );
    }
    return stars;
  };

  const getTagStyle = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'más vendido': return { bg: 'rgba(0, 113, 227, 0.1)', color: '#0071e3' };
      case 'top rendimiento': return { bg: 'rgba(52, 199, 89, 0.1)', color: '#34c759' };
      case 'nuevo': return { bg: 'rgba(175, 82, 222, 0.1)', color: '#af52de' };
      default: return { bg: 'rgba(142, 142, 147, 0.1)', color: '#8e8e93' };
    }
  };

  const tagStyle = getTagStyle(product.tag);

  return (
    <div 
      className="glass-panel apple-card" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}
    >
      {/* Product Tag Pill */}
      {product.tag && (
        <span style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          backgroundColor: tagStyle.bg,
          color: tagStyle.color,
          fontSize: '11px',
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: '980px',
          zIndex: 10
        }}>
          {product.tag}
        </span>
      )}

      {/* Product Image Showcase */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          overflow: 'hidden',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}
        className="card-image-container"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '12px',
            transition: 'transform 0.5s ease'
          }}
          className="card-img"
        />
        
        {/* Quick View Hover overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(4px)',
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.25s ease',
            zIndex: 5
          }}
          className="card-overlay"
        >
          <button 
            onClick={() => onProductClick(product)}
            className="apple-btn-secondary"
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              borderRadius: '980px',
              background: '#ffffff',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Eye size={14} />
            Vista Rápida
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        textAlign: 'left'
      }}>
        {/* Category */}
        <span style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '4px'
        }}>
          {product.category}
        </span>

        {/* Title */}
        <h3 
          onClick={() => onProductClick(product)}
          style={{
            fontSize: '15px',
            fontWeight: 600,
            marginBottom: '8px',
            color: 'var(--text-title)',
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: '40px',
            lineHeight: '1.3',
            transition: 'color 0.2s',
            fontFamily: 'var(--font-heading)'
          }}
          className="product-title-hover"
        >
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          <div style={{ display: 'flex' }}>
            {renderStars(product.rating)}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            ({product.reviews})
          </span>
        </div>

        {/* Bottom Panel: Quote Label and Quote Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '14px',
          borderTop: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ESTADO</span>
            <span style={{
              fontSize: '13px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              color: 'var(--primary)'
            }}>
              Disponible
            </span>
          </div>

          <button 
            onClick={() => onQuoteProduct(product)}
            className="apple-btn-primary"
            style={{
              padding: '8px 14px',
              fontSize: '12px',
              borderRadius: '980px'
            }}
          >
            <Mail size={13} />
            <span>Cotizar producto</span>
          </button>
        </div>
      </div>

      <style>{`
        .apple-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08) !important;
        }
        .apple-card:hover .card-overlay {
          opacity: 1 !important;
        }
        .apple-card:hover .card-img {
          transform: scale(1.05);
        }
        .product-title-hover:hover {
          color: var(--primary) !important;
        }
      `}</style>
    </div>
  );
}
