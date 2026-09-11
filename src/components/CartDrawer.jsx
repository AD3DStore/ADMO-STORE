import React from 'react';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

export default function CartDrawer({ 
  cartItems, 
  onClose, 
  onUpdateQty, 
  onRemoveItem, 
  onCheckoutClick 
}) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25.0; // Free shipping over $500
  const tax = subtotal * 0.16; // 16% simulated tax (IVA)
  const total = subtotal + shipping + tax;

  return (
    <div className="overlay" onClick={onClose} style={{ justifyContent: 'flex-end', alignItems: 'stretch' }}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          borderRadius: '0px',
          borderLeft: '1px solid var(--card-border)',
          background: 'var(--modal-bg)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          position: 'relative',
          padding: '24px'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }} className="glow-text">
            <ShoppingCart size={20} style={{ color: 'var(--primary)' }} />
            TU CARRITO ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </h2>
          <button 
            onClick={onClose}
            style={{
              color: 'var(--text-muted)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--input-bg)'
            }}
            className="header-icon-btn"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }} className="cart-items-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div 
                key={item.id} 
                className="glass-panel"
                style={{
                  padding: '12px',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '12px',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)'
                }}
              >
                {/* Product Thumbnail */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: '#0a0f1d'
                }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Name & Control */}
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                    letterSpacing: 'normal',
                    lineHeight: '1.3',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {item.name}
                  </h4>
                  
                  {/* Quantity adjustments */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '2px',
                    width: 'fit-content'
                  }}>
                    <button 
                      onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                      style={{ width: '24px', height: '24px', borderRadius: '4px', color: 'var(--text-title)', fontSize: '12px' }}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span style={{ width: '24px', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--text-title)' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      style={{ width: '24px', height: '24px', borderRadius: '4px', color: 'var(--text-title)', fontSize: '12px' }}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and Delete action */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' }}>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                    className="delete-item-btn"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: 'var(--text-title)',
                    marginTop: 'auto'
                  }}>
                    ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            /* Empty Drawer State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '40px 0'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(0, 128, 255, 0.08)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: 'var(--glow-shadow)'
              }}>
                <ShoppingCart size={28} />
              </div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px', textTransform: 'uppercase' }}>CARRITO VACÍO</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', maxWidth: '280px', lineHeight: '1.5', marginBottom: '24px' }}>
                ¡Parece que no tienes componentes agregados todavía! Explora nuestro catálogo de hardware premium.
              </p>
              <button 
                onClick={onClose}
                className="outline-btn"
                style={{ width: '100%' }}
              >
                EMPEZAR A COMPRAR
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cartItems.length > 0 && (
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '20px',
            marginTop: '20px',
            textAlign: 'left'
          }}>
            {/* Calculation details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>
                  ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Envío</span>
                <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>
                  {shipping === 0 ? (
                    <span style={{ color: 'var(--success)' }}>Gratis</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Impuestos (IVA 16%)</span>
                <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>
                  ${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '16px', 
                borderTop: '1px solid var(--border)', 
                paddingTop: '12px',
                marginTop: '4px'
              }}>
                <span style={{ fontWeight: 700, color: 'var(--text-title)' }}>TOTAL</span>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  color: 'var(--primary)',
                  fontSize: '20px',
                  textShadow: '0 0 10px rgba(0, 128, 255, 0.2)'
                }}>
                  ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Launch Checkout button */}
            <button 
              onClick={onCheckoutClick}
              className="glow-btn"
              style={{
                width: '100%',
                padding: '16px',
                justifyContent: 'center',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              PROCEDER AL PAGO
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .delete-item-btn:hover {
          color: #ef4444 !important;
        }
      `}</style>
    </div>
  );
}
