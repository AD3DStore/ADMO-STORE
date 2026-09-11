import React, { useState } from 'react';
import { X, CreditCard, ChevronRight, CheckCircle2, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';

export default function CheckoutModal({ cartItems, onClose, onClearCart, onGoHome }) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 500 ? 0 : 25.0;
  const tax = subtotal * 0.16;
  const total = subtotal + shippingFee + tax;

  // Handle formatters
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // digits only
    if (value.length > 16) value = value.slice(0, 16);
    // Format card with spaces: XXXX XXXX XXXX XXXX
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setPaymentData({ ...paymentData, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // digits only
    if (value.length > 4) value = value.slice(0, 4);
    // Format MM/YY
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setPaymentData({ ...paymentData, cardExpiry: formatted });
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setPaymentData({ ...paymentData, cardCvv: value });
  };

  // Submit handlers
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shippingData.name || !shippingData.email || !shippingData.address || !shippingData.city || !shippingData.zip) {
      alert("Por favor completa todos los campos de envío.");
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.cardExpiry || !paymentData.cardCvv) {
      alert("Por favor completa los detalles de pago.");
      return;
    }
    
    // Simulate API processing delay
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      onClearCart();
    }, 2000);
  };

  // Render stepper indicator
  const renderStepper = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: step >= 1 ? 'var(--primary)' : 'var(--border)',
          color: step >= 1 ? '#ffffff' : 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 'bold',
          fontFamily: 'var(--font-heading)'
        }}>1</span>
        <span style={{ fontSize: '12px', fontWeight: step === 1 ? 'bold' : 'normal', color: step === 1 ? 'var(--text-title)' : 'var(--text-muted)' }}>Envío</span>
      </div>
      
      <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--border)',
          color: step >= 2 ? '#ffffff' : 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 'bold',
          fontFamily: 'var(--font-heading)'
        }}>2</span>
        <span style={{ fontSize: '12px', fontWeight: step === 2 ? 'bold' : 'normal', color: step === 2 ? 'var(--text-title)' : 'var(--text-muted)' }}>Pago</span>
      </div>

      <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: step >= 3 ? 'var(--success)' : 'var(--border)',
          color: step >= 3 ? '#ffffff' : 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 'bold',
          fontFamily: 'var(--font-heading)'
        }}>3</span>
        <span style={{ fontSize: '12px', fontWeight: step === 3 ? 'bold' : 'normal', color: step === 3 ? 'var(--success)' : 'var(--text-muted)' }}>Recibo</span>
      </div>
    </div>
  );

  return (
    <div className="overlay" onClick={step !== 3 ? onClose : undefined}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '520px',
          padding: '36px',
          borderRadius: '24px',
          border: '1px solid var(--card-border)',
          background: 'var(--modal-bg)',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          position: 'relative'
        }}
      >
        {/* Close trigger (hidden during confirmation or loading) */}
        {step !== 3 && !loading && (
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
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
          >
            <X size={18} />
          </button>
        )}

        <h2 style={{ fontSize: '20px', marginBottom: '12px', textAlign: 'center' }} className="glow-text">
          {step === 3 ? 'PEDIDO COMPLETADO' : 'PASARELA DE PAGO'}
        </h2>

        {renderStepper()}

        {loading ? (
          /* Processing State */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '260px' }}>
            <Loader2 size={48} className="spin-slow" style={{ color: 'var(--primary)', animation: 'spin 1.5s linear infinite', marginBottom: '20px' }} />
            <h3 style={{ fontSize: '16px', marginBottom: '8px', textTransform: 'uppercase' }}>PROCESANDO PAGO...</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', maxWidth: '300px', lineHeight: '1.5' }}>
              Estamos procesando tus datos bancarios simulados de forma segura. No cierres el navegador.
            </p>
          </div>
        ) : step === 1 ? (
          /* Step 1: Shipping Form */
          <form onSubmit={handleShippingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nombre Completo</label>
              <input 
                required
                type="text" 
                placeholder="Juan Pérez"
                value={shippingData.name}
                onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Correo Electrónico</label>
              <input 
                required
                type="email" 
                placeholder="juan.perez@example.com"
                value={shippingData.email}
                onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dirección de Envío</label>
              <input 
                required
                type="text" 
                placeholder="Av. Tecnológico #1024, Col. Las Torres"
                value={shippingData.address}
                onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ciudad</label>
                <input 
                  required
                  type="text" 
                  placeholder="Monterrey"
                  value={shippingData.city}
                  onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>C. Postal</label>
                <input 
                  required
                  type="text" 
                  placeholder="64000"
                  value={shippingData.zip}
                  onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="glow-btn"
              style={{ width: '100%', padding: '14px', justifyContent: 'center', marginTop: '12px' }}
            >
              CONTINUAR AL PAGO
              <ChevronRight size={16} />
            </button>
          </form>
        ) : step === 2 ? (
          /* Step 2: Payment details form */
          <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            
            {/* Card preview representation */}
            <div className="glass-panel" style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0b1528 0%, #152952 100%)',
              border: '1px solid var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '160px',
              boxShadow: 'var(--glow-shadow)',
              color: '#ffffff',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CreditCard size={32} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-heading)', fontWeight: 'bold', letterSpacing: '0.1em' }}>ADMO SECURE</span>
              </div>
              
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                letterSpacing: '0.15em',
                textAlign: 'center',
                margin: '16px 0'
              }}>
                {paymentData.cardNumber || '•••• •••• •••• ••••'}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', textTransform: 'uppercase', opacity: 0.8 }}>
                <div>
                  <span style={{ display: 'block', fontSize: '8px', marginBottom: '2px' }}>TITULAR</span>
                  <span>{paymentData.cardName || 'JUAN PEREZ'}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '8px', marginBottom: '2px' }}>VENCE</span>
                  <span>{paymentData.cardExpiry || 'MM/YY'}</span>
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nombre en la Tarjeta</label>
              <input 
                required
                type="text" 
                placeholder="JUAN PEREZ"
                value={paymentData.cardName}
                onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value.toUpperCase() })}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Número de Tarjeta</label>
              <input 
                required
                type="text" 
                placeholder="4111 1111 1111 1111"
                value={paymentData.cardNumber}
                onChange={handleCardNumberChange}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vencimiento</label>
                <input 
                  required
                  type="text" 
                  placeholder="MM/YY"
                  value={paymentData.cardExpiry}
                  onChange={handleExpiryChange}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CVV</label>
                <input 
                  required
                  type="password" 
                  placeholder="•••"
                  value={paymentData.cardCvv}
                  onChange={handleCvvChange}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '12px',
              gap: '16px'
            }}>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: 'var(--text)',
                  fontWeight: 600
                }}
              >
                <ArrowLeft size={14} />
                Regresar
              </button>

              <button 
                type="submit"
                className="glow-btn"
                style={{ padding: '14px 28px' }}
              >
                PAGAR ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </button>
            </div>
          </form>
        ) : (
          /* Step 3: Confirmation */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--success-bg)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
            }} className="animate-float">
              <CheckCircle2 size={48} />
            </div>

            <h3 style={{ fontSize: '22px', marginBottom: '8px', fontFamily: 'var(--font-heading)' }} className="glow-text">¡PEDIDO RECIBIDO!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', maxWidth: '380px', lineHeight: '1.5', marginBottom: '24px' }}>
              Gracias por tu compra, <strong style={{ color: 'var(--text-title)' }}>{shippingData.name}</strong>. Se ha enviado un recibo a <strong style={{ color: 'var(--text-title)' }}>{shippingData.email}</strong>.
            </p>

            {/* Simulated Receipt Summary */}
            <div className="glass-panel" style={{
              width: '100%',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.01)',
              textAlign: 'left',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span>ID ORDEN: #ADMO-{(Math.floor(Math.random() * 90000) + 10000)}</span>
                <span>METODO: TARJETA CRÉDITO</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dirección de envío:</span>
                  <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>{shippingData.address}, {shippingData.city}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
                  <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Envío:</span>
                  <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>{shippingFee === 0 ? 'Gratis' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderTop: '1px dashed var(--border)', paddingTop: '10px', fontWeight: 'bold' }}>
                <span style={{ color: 'var(--text-title)' }}>TOTAL DEBITADO:</span>
                <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button 
              onClick={onGoHome}
              className="glow-btn"
              style={{
                width: '100%',
                padding: '16px',
                justifyContent: 'center',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              <ShoppingBag size={16} />
              CERRAR Y SEGUIR EXPLORANDO
            </button>
          </div>
        )}
      </div>

      {/* Embedded style keyframes for processing animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
