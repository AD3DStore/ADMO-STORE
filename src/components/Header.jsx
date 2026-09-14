import React, { useState } from 'react';
import { Search, Sun, Moon, Cpu, Mail, Laptop, HardDrive, Monitor, Store, Zap } from 'lucide-react';
import Logo from './Logo';

export default function Header({ 
  darkMode, 
  setDarkMode, 
  quoteCount, 
  onQuoteClick, 
  searchQuery, 
  setSearchQuery,
  onNavClick,
  activeTab
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Tienda', icon: Store },
    { id: 'mac', label: 'Laptops & Mac', icon: Laptop },
    { id: 'components', label: 'Componentes', icon: HardDrive },
    { id: 'chargers', label: 'Cargadores Dell/HP', icon: Zap },
    { id: 'pcbuilder', label: 'PC Builder', icon: Cpu },
    { id: 'quote', label: 'Cotizaciones', icon: Mail }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid var(--border)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '52px',
        padding: '0 24px'
      }}>
        {/* Left Side: ADMO Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavClick('home'); }} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Logo size="small" showText={true} />
        </a>

        {/* Center: Apple-style Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '14px' }} className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (activeTab === 'catalog' && (item.id === 'mac' || item.id === 'components' || item.id === 'peripherals' || item.id === 'chargers'));

            return (
              <button 
                key={item.id}
                onClick={() => onNavClick(item.id)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '12px',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? 'var(--primary)' : 'var(--text-title)',
                  opacity: isActive ? 1 : 0.8,
                  transition: 'opacity 0.2s ease, color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 10px',
                  borderRadius: '980px',
                  background: isActive ? 'rgba(var(--primary-rgb), 0.08)' : 'transparent'
                }}
                className="apple-nav-btn"
              >
                <Icon size={13} style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Search, Theme Toggle, Quote Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Apple Expandable Search Input */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--input-bg)',
            borderRadius: '980px',
            padding: '4px 12px 4px 32px',
            width: searchOpen || searchQuery ? '170px' : '100px',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <Search size={14} style={{
              position: 'absolute',
              left: '10px',
              color: 'var(--text-muted)'
            }} />
            <input 
              type="text" 
              placeholder="Buscar..."
              value={searchQuery}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalog') onNavClick('catalog');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-title)',
                fontSize: '12px',
                width: '100%',
                fontWeight: '400'
              }}
            />
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-title)',
              background: 'var(--input-bg)',
              transition: 'transform 0.2s'
            }}
            aria-label="Toggle Theme"
            className="apple-icon-btn"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Quote Badge Button */}
          <button 
            onClick={onQuoteClick}
            style={{
              height: '32px',
              padding: '0 12px',
              borderRadius: '980px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--primary)',
              background: 'rgba(var(--primary-rgb), 0.08)',
              fontSize: '12px',
              fontWeight: '600',
              position: 'relative'
            }}
            aria-label="Cotizaciones"
            className="apple-icon-btn"
          >
            <Mail size={14} />
            <span>Cotizar</span>
            {quoteCount > 0 && (
              <span style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: '700',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '2px'
              }}>
                {quoteCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .apple-nav-btn:hover {
          opacity: 1 !important;
          color: var(--primary) !important;
        }
        .apple-icon-btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </header>
  );
}
