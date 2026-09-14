import React, { useState } from 'react';
import { Cpu, LayoutGrid, HardDrive, Mail, CheckCircle, AlertTriangle, Hammer, RefreshCw } from 'lucide-react';

export default function PCBuilder({ products, onQuotePCBuild, onShowToast }) {
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedGPU, setSelectedGPU] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);
  const [selectedSSD, setSelectedSSD] = useState(null);

  const cpus = products.filter(p => p.specs.Socket || p.name.includes('Ryzen') || p.name.includes('Intel Core') || p.name.includes('Chip'));
  const gpus = products.filter(p => p.specs.Arquitectura || p.specs.VRAM || p.name.includes('RTX') || p.name.includes('GeForce'));
  const rams = [
    { id: 'ram-custom-1', name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz', category: 'Componentes', wattage: 15, specs: { Capacidad: '32GB', Tipo: 'DDR5' } },
    { id: 'ram-custom-2', name: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6400MHz', category: 'Componentes', wattage: 25, specs: { Capacidad: '64GB', Tipo: 'DDR5' } }
  ];
  const ssds = [
    { id: 'ssd-custom-1', name: 'Samsung 990 PRO 2TB NVMe M.2 SSD', category: 'Componentes', wattage: 10, specs: { Capacidad: '2TB', Lectura: '7450 MB/s' } },
    { id: 'ssd-custom-2', name: 'Samsung 990 PRO 4TB NVMe M.2 SSD', category: 'Componentes', wattage: 15, specs: { Capacidad: '4TB', Lectura: '7450 MB/s' } }
  ];

  const calculateWattage = () => {
    let wattage = 100;
    if (selectedCPU) wattage += selectedCPU.name.includes('i9') ? 250 : 120;
    if (selectedGPU) wattage += selectedGPU.name.includes('4090') ? 450 : 320;
    if (selectedRAM) wattage += selectedRAM.wattage;
    if (selectedSSD) wattage += selectedSSD.wattage;
    return wattage;
  };

  const getSelectedItems = () => {
    const items = [];
    if (selectedCPU) items.push(selectedCPU);
    if (selectedGPU) items.push(selectedGPU);
    if (selectedRAM) items.push(selectedRAM);
    if (selectedSSD) items.push(selectedSSD);
    return items;
  };

  const selectedItems = getSelectedItems();

  const handleReset = () => {
    setSelectedCPU(null);
    setSelectedGPU(null);
    setSelectedRAM(null);
    setSelectedSSD(null);
  };

  const handleQuoteBuild = () => {
    if (selectedItems.length === 0) {
      alert("Por favor selecciona al menos un componente para cotizar.");
      return;
    }
    onQuotePCBuild(selectedItems);
    onShowToast(`¡Configuración de ${selectedItems.length} componentes enviada a Cotización!`);
  };

  return (
    <div style={{ padding: '20px 0 60px', textAlign: 'left' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>
          CONSTRUCTOR DE PC CUSTOM & WORKSTATIONS
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
          Selecciona tus componentes. Nuestro asistente verifica compatibilidad y consumo antes de solicitar tu cotización.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '32px',
        alignItems: 'start'
      }} className="builder-grid">
        
        {/* Left Side: Component Slots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* CPU Slot */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(0, 113, 227, 0.08)', color: 'var(--primary)' }}>
                <Cpu size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '2px' }}>PROCESADOR (CPU)</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>El motor principal de procesamiento</p>
              </div>
            </div>
            {selectedCPU ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--input-bg)', padding: '12px 16px', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-title)' }}>{selectedCPU.name}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Seleccionado para cotizar</span>
                </div>
                <button onClick={() => setSelectedCPU(null)} style={{ color: '#ef4444', fontSize: '12px', fontWeight: '600' }}>Quitar</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cpus.map(cpu => (
                  <button 
                    key={cpu.id}
                    onClick={() => setSelectedCPU(cpu)}
                    className="builder-option-btn"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--card-border)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      color: 'var(--text-title)',
                      textAlign: 'left'
                    }}
                  >
                    <span>{cpu.name}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 600 }}>+ Añadir</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GPU Slot */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(0, 113, 227, 0.08)', color: 'var(--primary)' }}>
                <Cpu size={24} style={{ transform: 'rotate(45deg)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '2px' }}>TARJETA GRÁFICA (GPU)</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Potencia para juegos y renderizado 3D</p>
              </div>
            </div>
            {selectedGPU ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--input-bg)', padding: '12px 16px', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-title)' }}>{selectedGPU.name}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Seleccionado para cotizar</span>
                </div>
                <button onClick={() => setSelectedGPU(null)} style={{ color: '#ef4444', fontSize: '12px', fontWeight: '600' }}>Quitar</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {gpus.map(gpu => (
                  <button 
                    key={gpu.id}
                    onClick={() => setSelectedGPU(gpu)}
                    className="builder-option-btn"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--card-border)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      color: 'var(--text-title)',
                      textAlign: 'left'
                    }}
                  >
                    <span>{gpu.name}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 600 }}>+ Añadir</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RAM Slot */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(0, 113, 227, 0.08)', color: 'var(--primary)' }}>
                <LayoutGrid size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '2px' }}>MEMORIA RAM DDR5</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Capacidad de multitarea</p>
              </div>
            </div>
            {selectedRAM ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--input-bg)', padding: '12px 16px', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-title)' }}>{selectedRAM.name}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Seleccionado para cotizar</span>
                </div>
                <button onClick={() => setSelectedRAM(null)} style={{ color: '#ef4444', fontSize: '12px', fontWeight: '600' }}>Quitar</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {rams.map(ram => (
                  <button 
                    key={ram.id}
                    onClick={() => setSelectedRAM(ram)}
                    className="builder-option-btn"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--card-border)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      color: 'var(--text-title)',
                      textAlign: 'left'
                    }}
                  >
                    <span>{ram.name}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 600 }}>+ Añadir</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SSD Slot */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(0, 113, 227, 0.08)', color: 'var(--primary)' }}>
                <HardDrive size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '2px' }}>ALMACENAMIENTO (SSD)</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Unidades sólidas de alta velocidad</p>
              </div>
            </div>
            {selectedSSD ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--input-bg)', padding: '12px 16px', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-title)' }}>{selectedSSD.name}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Seleccionado para cotizar</span>
                </div>
                <button onClick={() => setSelectedSSD(null)} style={{ color: '#ef4444', fontSize: '12px', fontWeight: '600' }}>Quitar</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ssds.map(ssd => (
                  <button 
                    key={ssd.id}
                    onClick={() => setSelectedSSD(ssd)}
                    className="builder-option-btn"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--card-border)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      color: 'var(--text-title)',
                      textAlign: 'left'
                    }}
                  >
                    <span>{ssd.name}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 600 }}>+ Añadir</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Diagnostics & Quote Action */}
        <aside className="glass-panel" style={{
          padding: '24px',
          position: 'sticky',
          top: '80px',
          borderRadius: '20px',
          background: 'var(--card-bg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div>
            <h3 style={{ fontSize: '17px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Hammer size={18} style={{ color: 'var(--primary)' }} />
              RESUMEN DE COTIZACIÓN PC
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Diagnóstico de compatibilidad de tu armado</p>
          </div>

          {/* Wattage Details */}
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Consumo Estimado:</span>
              <strong style={{ color: 'var(--text-title)' }}>{calculateWattage()} W</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Fuente Recomendada:</span>
              <strong style={{ color: 'var(--primary)' }}>
                {calculateWattage() > 600 ? '850W Gold' : calculateWattage() > 400 ? '750W Gold' : '650W Bronze'}
              </strong>
            </div>
          </div>

          {/* Component Summary List */}
          <div style={{ flexGrow: 1 }}>
            <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              COMPONENTES SELECCIONADOS ({selectedItems.length})
            </h4>
            {selectedItems.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                {selectedItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-title)' }}>
                    <CheckCircle size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Añade componentes en el panel izquierdo para armar tu cotización.
              </p>
            )}
          </div>

          {/* Quote CTA Action */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={handleQuoteBuild}
                className="apple-btn-primary"
                style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '14px' }}
                disabled={selectedItems.length === 0}
              >
                <Mail size={16} />
                Solicitar cotización de este PC
              </button>

              <button 
                onClick={handleReset}
                className="apple-btn-secondary"
                style={{ width: '100%', padding: '10px', justifyContent: 'center', fontSize: '12px' }}
              >
                <RefreshCw size={13} />
                Reiniciar Configuración
              </button>
            </div>
          </div>

        </aside>
      </div>

      <style>{`
        .builder-option-btn:hover {
          border-color: var(--primary) !important;
          background: rgba(0, 113, 227, 0.06) !important;
        }
      `}</style>
    </div>
  );
}
