import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, ShoppingCart, HelpCircle, Loader2, Sparkles, X } from 'lucide-react';

export default function QuoteForm({ cartItems, preselectedProduct, onShowToast, onClearPreselected }) {
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
      onShowToast("¡Formulario de cotización listo para enviar!");

      const itemsList = quoteProducts.length > 0
        ? quoteProducts.map(item => `- ${item.name} (Categoría: ${item.category})`).join('\n')
        : 'Consulta general de equipo / Asesoría técnica';

      const emailBody = `Hola ADMO STORE,

Deseo solicitar una cotización personalizada para los siguientes productos / requerimientos:

--------------------------------------------------
DATOS DE CONTACTO
--------------------------------------------------
Nombre: ${formData.name}
Correo: ${formData.email}
Teléfono: ${formData.phone || 'No especificado'}

--------------------------------------------------
DETALLES DE LA SOLICITUD
--------------------------------------------------
Propósito del equipo: ${formData.purpose}
Presupuesto aproximado: ${formData.budget ? `$${formData.budget} MXN` : 'Por definir según recomendación'}

PRODUCTOS A COTIZAR:
${itemsList}

--------------------------------------------------
DETALLES ADICIONALES / REQUISITOS
--------------------------------------------------
${formData.details || 'Sin observaciones adicionales.'}

--------------------------------------------------
Quedo atento a su respuesta y cotización formal. Saludos.`;

      // Trigger mailto link directly to admo.spa@gmail.com
      window.location.href = `mailto:admo.spa@gmail.com?subject=Solicitud de Cotización - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
    }, 1200);
  };

  return (
    <div style={{ padding: '20px 0 60px', textAlign: 'left' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>
          SOLICITAR COTIZACIÓN PERSONALIZADA
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
          Completa el formulario y te enviaremos la propuesta técnica directamente a <strong style={{ color: 'var(--primary)' }}>admo.spa@gmail.com</strong>
        </p>
      </div>

      {submitted ? (
        /* Success Screen */
        <div className="glass-panel" style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '48px 36px',
          borderRadius: '24px',
          textAlign: 'center',
          border: '1px solid var(--success)',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--success-bg)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 0 20px rgba(52, 199, 89, 0.2)'
          }}>
            <CheckCircle2 size={44} />
          </div>

          <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 700 }}>¡SOLICITUD ENVIADA!</h3>
          <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px' }}>
            Se ha abierto la plantilla en tu gestor de correo dirigida a <strong style={{ color: 'var(--primary)' }}>admo.spa@gmail.com</strong>. Si no se abrió automáticamente, haz clic abajo:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => {
                const itemsList = quoteProducts.length > 0
                  ? quoteProducts.map(item => `- ${item.name}`).join('\n')
                  : 'Consulta general de equipo';
                const emailBody = `Hola ADMO STORE,\n\nDeseo solicitar cotización para:\n${itemsList}\n\nNombre: ${formData.name}\nCorreo: ${formData.email}\nPropósito: ${formData.purpose}\nDetalles: ${formData.details}`;
                window.location.href = `mailto:admo.spa@gmail.com?subject=Solicitud de Cotización - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
              }}
              className="apple-btn-primary"
              style={{ justifyContent: 'center', padding: '14px' }}
            >
              <Mail size={16} />
              Reabrir correo en tu cliente
            </button>

            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  purpose: 'Gaming',
                  budget: '',
                  details: ''
                });
              }}
              className="apple-btn-secondary"
              style={{ justifyContent: 'center', padding: '12px' }}
            >
              Solicitar otra cotización
            </button>
          </div>
        </div>
      ) : (
        /* Form Layout Grid */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '32px',
          alignItems: 'start'
        }} className="quote-grid">
          
          {/* Form Side */}
          <form className="glass-panel" onSubmit={handleSubmit} style={{
            padding: '32px',
            borderRadius: '24px',
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            
            <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '4px' }}>
              <Mail size={18} style={{ color: 'var(--primary)' }} />
              DATOS DE CONTACTO Y REQUERIMIENTOS
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="quote-form-row">
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nombre Completo *</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ej. Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '12px 14px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Correo Electrónico *</label>
                <input 
                  required
                  type="email" 
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '12px 14px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="quote-form-row">
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Teléfono (Opcional)</label>
                <input 
                  type="tel" 
                  placeholder="Ej. 8112345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '12px 14px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Presupuesto Estimado (Opcional)</label>
                <input 
                  type="text" 
                  placeholder="Ej. $25,000 o A convenir"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '12px 14px', color: 'var(--text-title)', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Uso o Propósito del Equipo</label>
              <select 
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  color: 'var(--text-title)',
                  outline: 'none',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                <option value="Gaming">Gaming / E-sports de alto rendimiento</option>
                <option value="Professional">Creadores / Edición de video & Render 3D</option>
                <option value="Office">Oficina general / Estudio / Estación de trabajo</option>
                <option value="Server">Servidor / Desarrollo de software e IA</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Observaciones Adicionales / Requisitos</label>
              <textarea 
                rows="4"
                placeholder="Escribe aquí cualquier preferencia adicional, marca específica, fecha estimada de entrega o preguntas..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '12px 14px', color: 'var(--text-title)', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-body)', fontSize: '13px' }}
              />
            </div>

            <button 
              type="submit" 
              className="apple-btn-primary"
              style={{ justifyContent: 'center', padding: '16px', fontSize: '15px', marginTop: '8px' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="spin-slow" style={{ animation: 'spin 1.5s linear infinite' }} />
                  PREPARANDO COTIZACIÓN...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Enviar Cotización a admo.spa@gmail.com
                </>
              )}
            </button>
          </form>

          {/* Right Column: Preselected items for quote */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', background: 'var(--card-bg)' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--text-title)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                PRODUCTOS A COTIZAR ({quoteProducts.length})
              </h3>

              {quoteProducts.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {quoteProducts.map((item) => (
                    <div 
                      key={item.id} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--input-bg)',
                        padding: '10px 14px',
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
                        style={{ color: '#ef4444', opacity: 0.8 }}
                        title="Quitar de cotización"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setQuoteProducts([])}
                    style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'right' }}
                  >
                    Limpiar lista de cotización
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  No hay productos específicos seleccionados. La cotización se enviará como una consulta general de equipo.
                </p>
              )}
            </div>

            {/* Direct Contact info box */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', background: 'var(--card-bg)' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--text-title)', marginBottom: '8px' }}>
                Atención Directa ADMO
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '12px' }}>
                También puedes escribirnos directamente con tus archivos de requerimientos a:
              </p>
              <a 
                href="mailto:admo.spa@gmail.com" 
                style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', textDecoration: 'underline' }}
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
