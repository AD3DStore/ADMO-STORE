import React, { useState, useEffect } from 'react';
import { products } from './data/products';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import PCBuilder from './components/PCBuilder';
import ProductCard from './components/ProductCard';
import QuoteForm from './components/QuoteForm';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'catalog', 'pcbuilder', 'quote'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteProducts, setQuoteProducts] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Sync Dark/Light theme class with document root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Extract featured products for Apple Hero carousel
  const featuredProducts = products.filter(p => 
    p.tag === 'Más Vendido' || p.tag === 'Top Rendimiento' || p.tag === 'Flagship ADMO'
  ).slice(0, 3);

  // Submenu Navigation Handler
  const handleNavClick = (navId) => {
    if (navId === 'mac') {
      setSelectedCategory('Laptops & Mac');
      setActiveTab('catalog');
    } else if (navId === 'components') {
      setSelectedCategory('Componentes');
      setActiveTab('catalog');
    } else if (navId === 'peripherals') {
      setSelectedCategory('Periféricos');
      setActiveTab('catalog');
    } else if (navId === 'chargers') {
      setSelectedCategory('Cargadores');
      setActiveTab('catalog');
    } else {
      if (navId === 'catalog' || navId === 'home') {
        setSelectedCategory('All');
      }
      setActiveTab(navId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quote Action Handler (Transfers selected item into Quote view)
  const handleQuoteProduct = (product) => {
    setQuoteProducts((prev) => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
    setActiveTab('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`¡${product.name} añadido a tu lista de cotización!`);
  };

  // Quote Custom PC Build Handler
  const handleQuotePCBuild = (items) => {
    setQuoteProducts(items);
    setActiveTab('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`¡Configuración de PC enviada a Cotizaciones!`);
  };

  // Toast notifications manager
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      
      {/* Streamlined Header Navigation */}
      <Header 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        quoteCount={quoteProducts.length}
        onQuoteClick={() => handleNavClick('quote')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavClick={handleNavClick}
        activeTab={activeTab}
      />

      {/* Main Content Area */}
      <main className="container" style={{ flexGrow: 1, paddingBottom: '80px', paddingTop: '32px' }}>
        
        {activeTab === 'home' && (
          <>
            {/* Apple Hero Showcase & Bento Grid */}
            <Hero 
              featuredProducts={featuredProducts}
              onProductClick={setSelectedProduct}
              onQuoteProduct={handleQuoteProduct}
              onCategoryClick={(cat) => {
                if (cat === 'Laptops & Mac') handleNavClick('mac');
                else if (cat === 'Componentes') handleNavClick('components');
                else handleNavClick('catalog');
              }}
            />
            
            {/* Bestselling Products Section */}
            <div style={{ marginTop: '48px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                LO MÁS VENDIDO EN ADMO STORE
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                Los equipos y periféricos preferidos por creadores, ingenieros y gamers
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: '24px'
              }}>
                {products.slice(0, 4).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onProductClick={setSelectedProduct} 
                    onQuoteProduct={handleQuoteProduct}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => handleNavClick('catalog')} 
                className="apple-btn-primary"
                style={{ marginTop: '40px', padding: '12px 32px', fontSize: '15px' }}
              >
                Ver todo el Catálogo
              </button>
            </div>
          </>
        )}

        {activeTab === 'catalog' && (
          <ProductCatalog 
            products={products}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onProductClick={setSelectedProduct}
            onQuoteProduct={handleQuoteProduct}
            initialCategory={selectedCategory}
          />
        )}

        {activeTab === 'pcbuilder' && (
          <PCBuilder 
            products={products}
            onQuotePCBuild={handleQuotePCBuild}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'quote' && (
          <QuoteForm 
            cartItems={quoteProducts}
            onShowToast={showToast}
          />
        )}

      </main>

      {/* Footer Panel */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '40px 0',
        marginTop: 'auto'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ fontFamily: 'var(--font-logo)', fontWeight: 800, color: 'var(--text-title)', fontSize: '15px', letterSpacing: '0.15em' }}>
            ADMO <span style={{ color: 'var(--primary)' }}>STORE</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} ADMO STORE. Todos los derechos reservados. Cotizaciones enviadas a admo.spa@gmail.com
          </p>
        </div>
      </footer>

      {/* Detailed Product Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onQuoteProduct={handleQuoteProduct}
        />
      )}

      {/* Toast Alert System */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
