import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'identify', name: 'Tanımlama', icon: '🦂', accent: '#f59e0b',
    items: [
      { t: 'Türkiye türleri', d: 'Androctonus crassicauda: kara akrep, ölümcül. Güneydoğu Türkiye\'de yaygın.' },
      { t: 'Meotis gibbosus', d: 'Sarı akrep: daha az zehirli. Ege ve Akdeniz kıyılarında bulunur.' },
      { t: 'Renk bağıntısı', d: 'Renk tehlike göstergesi değil! Sarı akrep de zehirli olabilir.' },
      { t: 'Boyut', d: '4-12 cm arası. Küçük akrep daha fazla zehir enjekte edebilir.' },
    ],
  },
  {
    id: 'safety', name: 'Güvenlik', icon: '⚠️', accent: '#ef4444',
    items: [
      { t: 'Çamur yapılarından uzak', d: 'Toprak çatlakları, taş altları, ahşap yığınları: favori saklanma yeri.' },
      { t: 'Bot giy', d: 'Ayakkabını çevir, silkele. Akrep geceleri bot içine girer.' },
      { t: 'Işıksız yürüme', d: 'Gece kamp alanında mutlaka fener kullan. Akrep ışık arar.' },
      { t: 'Sokma tepkisi', d: 'Hemen hastaneye: antivenom var. Dondurmak veya kesmek yasak.' },
    ],
  },
];

export default function ScorpionGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦂 Akrep Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tanımlama · güvenlik · ilk yardım</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#120c00', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#120c00', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1e1600' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{item.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
