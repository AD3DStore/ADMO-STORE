import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Sparkles, X, Loader2 } from 'lucide-react';

export default function QuoteForm({ cartItems, preselectedProduct, onShowToast }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quoteProducts, setQuoteProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'Gaming',
    budget: '',
    details: ''
  });

  useEffect(() => {
    if (preselectedProduct) {
      if (Array.isArray(preselectedProduct)) {
        setQuoteProducts(preselectedProduct);
      } else {
        setQuoteProducts([preselectedProduct]);
      }
    } else if (cartItems && cartItems.length > 0) {
      setQuoteProducts(cartItems);
    }
  }, [preselectedProduct, cartItems]);

  const handleRemoveQuoteItem = (id) => {
    setQuoteProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert("Por favor completa tu nombre y correo electrónico.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      onShowToast("¡Cotización generada exitosamente!");

      const itemsList = quoteProducts.length > 0
        ? quoteProducts.map(item => `- ${item.name} (${item.category})`).join('\n')
        : 'Consulta general de equipo / Asesoría técnica';

      const emailBody = `Hola ADMO STORE,

Deseo solicitar una cotización personalizada:

DATOS DE CONTACTO:
- Nombre: ${formData.name}
- Correo: ${formData.email}
- Teléfono: ${formData.phone || 'No especificado'}

REQUERIMIENTOS DEL EQUIPO:
- Propósito: ${formData.purpose}
- Presupuesto estimado: ${formData.budget ? `$${formData.budget}` : 'A convenir'}

PRODUCTOS SELECCIONADOS:
${itemsList}

OBSERVACIONES ADICIONALES:
${formData.details || 'Sin comentarios adicionales.'}

Quedo a la espera de su respuesta. Saludos.`;

      window.location.href = `mailto:admo.spa@gmail.com?subject=Solicitud de Cotización - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
    }, 1000);
  };

  return (
    <div style={{ padding: '20px 0 60px', textAlign: 'left' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>
          SOLICITAR COTIZACIÓN
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
          Completa los datos y enviaremos tu propuesta directamente a <strong style={{ color: 'var(--primary)' }}>admo.spa@gmail.com</strong>
        </p>
      </div>

      {submitted ? (
        <div className="glass-panel" style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '44px 32px',
          borderRadius: '24px',
          textAlign: 'center',
          border: '1px solid var(--success)',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--success-bg)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle2 size={40} />
          </div>

          <h3 style={{ fontSize: '22px', marginBottom: '10px', fontWeight: 700 }}>¡COTIZACIÓN GENERADA!</h3>
          <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
            Se ha preparado la información en tu aplicación de correo para enviar a <strong style={{ color: 'var(--primary)' }}>admo.spa@gmail.com</strong>.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => {
                const itemsList = quoteProducts.length > 0
                  ? quoteProducts.map(item => `- ${item.name}`).join('\n')
                  : 'Consulta general';
                const emailBody = `Hola ADMO STORE,\n\nSolicitud de cotización para:\n${itemsList}\n\nNombre: ${formData.name}\nCorreo: ${formData.email}\nPropósito: ${formData.purpose}\nDetalles: ${formData.details}`;
                window.location.href = `mailto:admo.spa@gmail.com?subject=Solicitud de Cotización - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
              }}
              className="apple-btn-primary"
              style={{ justifyContent: 'center', padding: '14px' }}
            >
              <Mail size={16} />
              Reabrir correo
            </button>

            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', purpose: 'Gaming', budget: '', details: '' });
              }}
              className="apple-btn-secondary"
              style={{ justifyContent: 'center', padding: '10px' }}
            >
              Nueva cotización
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '32px',
          alignItems: 'start'
        }} className="quote-grid">
          
          <form className="glass-panel" onSubmit={handleSubmit} style={{
            padding: '32px',
            borderRadius: '24px',
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            
            <h3 style={{ fontSize: '17px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
              <Mail size={18} style={{ color: 'var(--primary)' }} />
              INFORMACIÓN DE CONTACTO
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="quote-form-row">
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Nombre Completo *</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ej. Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Correo Electrónico *</label>
                <input 
                  required
                  type="email" 
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="quote-form-row">
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Teléfono (Opcional)</label>
                <input 
                  type="tel" 
                  placeholder="Ej. 8112345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Presupuesto Estimado</label>
                <input 
                  type="text" 
                  placeholder="Ej. $25,000 o A convenir"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Uso del Equipo</label>
              <select 
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  color: 'var(--text-title)',
                  outline: 'none',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                <option value="Gaming">Gaming / E-sports de alto rendimiento</option>
                <option value="Professional">Creadores / Edición de video & Render 3D</option>
                <option value="Office">Oficina / Estudio / Trabajo</option>
                <option value="Server">Servidor / Desarrollo e IA</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Observaciones Adicionales</label>
              <textarea 
                rows="3"
                placeholder="Indica cualquier modelo específico, cargador, o preferencia..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '10px 12px', color: 'var(--text-title)', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-body)', fontSize: '13px' }}
              />
            </div>

            <button 
              type="submit" 
              className="apple-btn-primary"
              style={{ justifyContent: 'center', padding: '14px', fontSize: '14px', marginTop: '6px' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="spin-slow" style={{ animation: 'spin 1.5s linear infinite' }} />
                  Procesando...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Enviar a admo.spa@gmail.com
                </>
              )}
            </button>
          </form>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', background: 'var(--card-bg)' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--text-title)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                PRODUCTOS SELECCIONADOS ({quoteProducts.length})
              </h3>

              {quoteProducts.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {quoteProducts.map((item) => (
                    <div 
                      key={item.id} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--input-bg)',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                    >
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text-title)' }}>{item.name}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.category}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveQuoteItem(item.id)}
                        style={{ color: '#ef4444' }}
                        title="Quitar"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setQuoteProducts([])}
                    style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}
                  >
                    Vaciar lista
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Sin productos seleccionados. Se enviará como una consulta general de cotización.
                </p>
              )}
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: '24px', background: 'var(--card-bg)' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-title)', marginBottom: '6px' }}>
                Contacto Directo ADMO STORE
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '8px' }}>
                Atención por correo electrónico:
              </p>
              <a 
                href="mailto:admo.spa@gmail.com" 
                style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}
              >
                admo.spa@gmail.com
              </a>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
