import React, { useState } from 'react';
import { X, Mail, Star, ShieldCheck, RefreshCw } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onQuoteProduct }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={15} 
          fill={i <= fullStars ? "#ffb800" : "none"} 
          style={{ color: i <= fullStars ? "#ffb800" : "var(--text-muted)" }} 
        />
      );
    }
    return stars;
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleQuoteClick = () => {
    onQuoteProduct(product, quantity);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '860px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '36px',
          position: 'relative',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          borderRadius: '24px',
          border: '1px solid var(--card-border)',
          background: 'var(--modal-bg)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--text-muted)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--input-bg)'
          }}
          aria-label="Cerrar detalles"
        >
          <X size={18} />
        </button>

        {/* Modal Layout Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '40px',
          marginTop: '12px'
        }} className="detail-modal-grid">
          
          {/* Left Column: Image Showcase */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--card-border)',
              background: '#ffffff',
              boxShadow: 'var(--glow-shadow)'
            }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{
                  width: '100%',
                  maxHeight: '360px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Quick Guarantees */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text)' }}>
                <ShieldCheck size={16} style={{ color: 'var(--primary)' }} />
                <span>Garantía oficial y asesoría técnica directa</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text)' }}>
                <RefreshCw size={16} style={{ color: 'var(--primary)' }} />
                <span>Cotizaciones rápidas enviadas a admo.spa@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Quote Action */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
            {/* Category */}
            <span style={{
              fontSize: '11px',
              color: 'var(--primary)',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '6px',
              display: 'block'
            }}>
              {product.category}
            </span>

            {/* Product Name */}
            <h2 style={{
              fontSize: '22px',
              marginBottom: '10px',
              lineHeight: '1.2'
            }}>
              {product.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex' }}>
                {renderStars(product.rating)}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-title)', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({product.reviews} opiniones)</span>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--text)',
              marginBottom: '20px'
            }}>
              {product.description}
            </p>

            {/* Specifications Table */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-title)', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                ESPECIFICACIONES TÉCNICAS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div 
                    key={key} 
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      padding: '4px 0',
                      borderBottom: '1px dashed var(--border)'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{key.replace('_', ' ')}</span>
                    <span style={{ color: 'var(--text-title)', fontWeight: 600, textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Panel: Quantity & Action */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '16px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              {/* Quantity Selector */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--input-bg)',
                borderRadius: '980px',
                padding: '4px 8px'
              }}>
                <button 
                  onClick={handleDecrease}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', color: 'var(--text-title)', fontSize: '14px', fontWeight: 'bold' }}
                >
                  -
                </button>
                <span style={{ width: '28px', textAlign: 'center', fontWeight: 600, color: 'var(--text-title)', fontSize: '13px' }}>
                  {quantity}
                </span>
                <button 
                  onClick={handleIncrease}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', color: 'var(--text-title)', fontSize: '14px', fontWeight: 'bold' }}
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleQuoteClick}
                className="apple-btn-primary"
                style={{ padding: '12px 20px', fontSize: '13px' }}
              >
                <Mail size={15} />
                Solicitar cotización
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
