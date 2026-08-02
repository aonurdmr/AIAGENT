import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'identify', name: 'Tanımlama', icon: '🐍', accent: '#16a34a',
    items: [
      { t: 'Su yılanı (zararsız)', d: 'Natrix natrix: boyun arkasında sarı-turuncu yaka lekesi. Zararsız.' },
      { t: 'Kocabaş (zararsız)', d: 'Dolichophis caspius: uzun, ince, hızlı. Zehirsiz ama ısırır.' },
      { t: 'Engerek (zehirli)', d: 'Vipera berus: V şekli baş deseni, üçgen kafa. Dikkat! Geniş kafa belirgin.' },
      { t: 'Renk tuzağı', d: 'Renk güvenilir değil: bazı su yılanları koyu. Kafa şekline bak: üçgen = engerek.' },
    ],
  },
  {
    id: 'behavior', name: 'Davranış', icon: '☀️', accent: '#ca8a04',
    items: [
      { t: 'Isınan yılan', d: 'Sabahları güneşlenir. Taş ve yol kenarlarında dikkat: baskı hissedince ısırır.' },
      { t: 'Saldırmaz', d: 'Çoğu yılan kaçar. Köşeye sıkışınca savunma moduna girer. Yaklaşma.' },
      { t: 'Engerek sokması', d: 'Hastaneye git. Serin tut, hareketi azalt. Kesme-emme yasak.' },
      { t: 'Genel kural', d: 'Elleme, adını bilmeden. 30 cm mesafe. Bot giy, çalılıkta baston.' },
    ],
  },
];

export default function GrassSnakeGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020a00', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐍 Yılan Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tanımlama · davranış · ilk yardım</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#061200', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#061200', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0a1e00' : 'none' }}>
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
