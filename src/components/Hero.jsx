import React, { useState, useEffect } from 'react';
import { ChevronRight, Mail, Eye } from 'lucide-react';

export default function Hero({ featuredProducts, onProductClick, onQuoteProduct, onCategoryClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  if (!featuredProducts || featuredProducts.length === 0) return null;
  const currentProduct = featuredProducts[currentSlide];

  return (
    <section style={{ width: '100%', margin: '0 auto 60px' }}>
      {/* Apple-Style Main Hero Showcase Banner */}
      <div 
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: '28px',
          padding: '60px 40px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--card-shadow)',
          marginBottom: '32px'
        }}
      >
        {/* Top Tagline */}
        <span style={{
          fontSize: '12px',
          fontFamily: 'var(--font-heading)',
          fontWeight: '600',
          color: 'var(--primary)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '12px',
          display: 'inline-block'
        }}>
          LO MÁS VENDIDO DEL MERCADO
        </span>

        {/* Hero Title */}
        <h1 style={{
          fontSize: '48px',
          fontWeight: 700,
          color: 'var(--text-title)',
          letterSpacing: '-0.02em',
          marginBottom: '12px',
          lineHeight: '1.1',
          maxWidth: '800px',
          margin: '0 auto 12px'
        }}>
          {currentProduct.name}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '18px',
          color: 'var(--text-muted)',
          maxWidth: '640px',
          margin: '0 auto 28px',
          lineHeight: '1.5',
          fontWeight: '400'
        }}>
          {currentProduct.description}
        </p>

        {/* Call To Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          <button 
            onClick={() => onQuoteProduct(currentProduct)}
            className="apple-btn-primary"
            style={{ fontSize: '15px', padding: '12px 26px' }}
          >
            <Mail size={16} />
            Cotizar producto
          </button>
          
          <button 
            onClick={() => onProductClick(currentProduct)}
            className="apple-btn-secondary"
            style={{ fontSize: '15px', padding: '12px 24px' }}
          >
            Ver detalles
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Hero Image Showcase */}
        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
            border: '1px solid var(--card-border)',
            maxHeight: '380px',
            background: '#ffffff'
          }}>
            <img 
              src={currentProduct.image} 
              alt={currentProduct.name} 
              style={{
                width: '100%',
                height: '380px',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s ease'
              }}
            />
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '32px'
        }}>
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: index === currentSlide ? 'var(--primary)' : 'var(--border)',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Apple Bento Box Grid Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px'
      }} className="bento-grid">
        
        {/* Bento Box 1: Mac & Laptops */}
        <div 
          onClick={() => onCategoryClick('Laptops & Mac')}
          className="glass-panel"
          style={{
            padding: '36px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '240px',
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(0, 113, 227, 0.03) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>PORTÁTILES GAMA ALTA</span>
            <h3 style={{ fontSize: '26px', marginTop: '6px', marginBottom: '8px' }}>Laptops & MacBook Pro</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '320px', lineHeight: '1.4' }}>
              Rendimiento extremo con Apple M3 Max e Intel Core Ultra para profesionales.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '14px', fontWeight: '500', marginTop: '20px' }}>
            <span>Cotizar laptops</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Bento Box 2: Components */}
        <div 
          onClick={() => onCategoryClick('Componentes')}
          className="glass-panel"
          style={{
            padding: '36px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '240px',
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(52, 199, 89, 0.03) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>HARDWARE TOP</span>
            <h3 style={{ fontSize: '26px', marginTop: '6px', marginBottom: '8px' }}>Componentes & GPUs</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '320px', lineHeight: '1.4' }}>
              NVIDIA RTX 4090, Ryzen 7 7800X3D y SSDs NVMe Gen 4 ultrarrápidos.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '14px', fontWeight: '500', marginTop: '20px' }}>
            <span>Cotizar componentes</span>
            <ChevronRight size={16} />
          </div>
        </div>

      </div>
    </section>
  );
}
