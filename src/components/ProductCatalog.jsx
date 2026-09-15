import React, { useState, useMemo } from 'react';
import { RotateCcw, ArrowUpDown, Search } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductCatalog({ 
  products, 
  searchQuery, 
  setSearchQuery, 
  onProductClick, 
  onQuoteProduct,
  initialCategory = 'All'
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Laptops & Mac', 'Componentes', 'Periféricos', 'Cargadores', 'Gaming & PC Custom'];

  // Handle filter resets
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSortBy('featured');
    setSearchQuery('');
  };

  // Filtered & Sorted products computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter
        const matchesSearch = 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.specs && JSON.stringify(product.specs).toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Category filter
        const matchesCategory = 
          selectedCategory === 'All' || 
          product.category.toLowerCase() === selectedCategory.toLowerCase() ||
          (selectedCategory === 'Cargadores' && (product.name.toLowerCase().includes('cargador') || product.category === 'Cargadores')) ||
          (selectedCategory === 'Gaming & PC Custom' && product.category.includes('Gaming'));

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviews - a.reviews;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div style={{ padding: '20px 0 60px' }}>
      {/* Title & Apple Category Pills Bar */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>
          CATÁLOGO DE HARDWARE & COTIZACIONES
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Explora los equipos y accesorios líderes del mercado y solicita tu cotización personalizada directamente a admo.spa@gmail.com
        </p>

        {/* Category Selector Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '980px',
                  fontSize: '13px',
                  fontWeight: isSelected ? 600 : 400,
                  fontFamily: 'var(--font-heading)',
                  color: isSelected ? '#ffffff' : 'var(--text-title)',
                  background: isSelected ? 'var(--primary)' : 'var(--card-bg)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--card-border)',
                  boxShadow: isSelected ? '0 4px 14px rgba(var(--primary-rgb), 0.25)' : 'var(--glow-shadow)',
                  transition: 'all 0.2s ease'
                }}
                className="category-pill-btn"
              >
                {cat === 'All' ? 'Todas las Categorías' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        background: 'var(--card-bg)',
        padding: '12px 20px',
        borderRadius: '16px',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--glow-shadow)'
      }}>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Mostrando <strong style={{ color: 'var(--text-title)' }}>{filteredProducts.length}</strong> de {products.length} productos disponibles
        </div>

        {/* Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={14} style={{ color: 'var(--primary)' }} />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--input-bg)',
              color: 'var(--text-title)',
              border: 'none',
              borderRadius: '980px',
              padding: '6px 14px',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            <option value="featured">Destacados</option>
            <option value="rating">Mejor Valorados</option>
            <option value="reviews">Más Solicitados</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      <main>
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{ animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                <ProductCard 
                  product={product} 
                  onProductClick={onProductClick} 
                  onQuoteProduct={onQuoteProduct}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="glass-panel" style={{
            padding: '60px 40px',
            textAlign: 'center',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '320px',
            background: 'var(--card-bg)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(0, 113, 227, 0.08)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Search size={28} />
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>Sin resultados</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '340px', marginBottom: '20px' }}>
              No se encontraron cargadores o productos que coincidan con la búsqueda.
            </p>
            <button 
              onClick={handleResetFilters}
              className="apple-btn-primary"
            >
              <RotateCcw size={14} />
              Restablecer Filtros
            </button>
          </div>
        )}
      </main>

      <style>{`
        .category-pill-btn:hover {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
