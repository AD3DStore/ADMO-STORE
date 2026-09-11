import React from 'react';
import isotipoImg from '../assets/isotipo.png';

export default function Logo({ size = 'small', showText = true, className = '' }) {
  const dimensions = {
    small: { icon: 32, fontMain: '16px', fontSub: '7px' },
    medium: { icon: 44, fontMain: '22px', fontSub: '8px' },
    large: { icon: 64, fontMain: '32px', fontSub: '11px' }
  }[size] || { icon: 32, fontMain: '16px', fontSub: '7px' };

  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Uploaded ADMO Isotipo Image */}
      <img 
        src={isotipoImg} 
        alt="ADMO Isotipo" 
        style={{
          width: `${dimensions.icon}px`,
          height: `${dimensions.icon}px`,
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0px 2px 6px rgba(0, 113, 227, 0.2))'
        }}
      />

      {showText && (
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Main ADMO title */}
          <div 
            style={{ 
              fontFamily: 'var(--font-logo)', 
              fontWeight: 900, 
              fontSize: dimensions.fontMain, 
              color: 'var(--text-title)',
              letterSpacing: '0.12em',
              lineHeight: 1
            }}
          >
            <span style={{ color: 'var(--primary)' }}>A</span>
            <span>DM</span>
            <span style={{ color: 'var(--primary)' }}>O</span>
          </div>

          {/* Subtitle STORE */}
          <div 
            style={{ 
              fontFamily: 'var(--font-logo)',
              fontSize: dimensions.fontSub,
              letterSpacing: '0.35em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginTop: '2px',
              fontWeight: 600
            }}
          >
            STORE
          </div>
        </div>
      )}
    </div>
  );
}
