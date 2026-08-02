import React, { useState, useCallback, useRef } from 'react';

let _addToast = null;

export function toast(message, type = 'success', duration = 3000) {
  if (_addToast) _addToast(message, type, duration);
}

const TYPE_STYLES = {
  success: { bg: 'rgba(34,197,94,.15)',  border: 'rgba(34,197,94,.3)',  color: '#86efac', icon: '✓' },
  error:   { bg: 'rgba(248,113,113,.15)', border: 'rgba(248,113,113,.3)', color: '#fca5a5', icon: '✕' },
  info:    { bg: 'rgba(96,165,250,.15)',  border: 'rgba(96,165,250,.3)',  color: '#93c5fd', icon: 'ℹ' },
  warning: { bg: 'rgba(251,191,36,.15)', border: 'rgba(251,191,36,.3)',  color: '#fde68a', icon: '⚠' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  _addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = ++counterRef.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  return (
    <>
      {children}
      <div style={{
        position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)', maxWidth: 398,
        zIndex: 9999, display: 'flex', flexDirection: 'column-reverse', gap: 8,
        pointerEvents: 'none',
      }}>
        {toasts.map(t => {
          const s = TYPE_STYLES[t.type] || TYPE_STYLES.success;
          return (
            <div key={t.id} style={{
              background: s.bg, border: `1px solid ${s.border}`,
              borderRadius: 14, padding: '12px 16px',
              display: 'flex', gap: 10, alignItems: 'center',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px rgba(0,0,0,.4)',
              animation: 'slideUp .3s cubic-bezier(.34,1.56,.64,1) both',
              pointerEvents: 'auto',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: s.border + '40',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, color: s.color, fontWeight: 700,
              }}>{s.icon}</div>
              <div style={{ fontSize: 13, color: '#e8f4e8', fontWeight: 500, lineHeight: 1.4 }}>
                {t.message}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
