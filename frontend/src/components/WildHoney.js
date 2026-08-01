import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'find', name: 'Kovan Bulma', icon: '🔍', accent: '#f59e0b',
    items: [
      { t: 'Ari takibi', d: 'Arilar kovana dogru ucar. Iki noktadan gozlemle, kesisim noktasi kovan.' },
      { t: 'Su kaynagi', d: 'Sicak gunlerde arilar su ariyor - su basinda izle, yonlerini takip et.' },
      { t: 'Ses', d: 'Buyuk kovan 50m den vizildiyor. Sessiz ormanda dik kulak.' },
      { t: 'Agac kovuklari', d: 'Kestane, mese, kavak kovuklari. Girisde sari izi bak - balmumu ve propolis.' },
    ],
  },
  {
    id: 'collect', name: 'Guvenli Toplama', icon: '🍯', accent: '#22c55e',
    items: [
      { t: 'Duman', d: 'Duman arilari sakinlestirir. Yas ot veya cuval yakar, ufle.' },
      { t: 'Koruyucu giysi', d: 'Kafes, eldiven, beyaz giysi. Siyah renkler saldirganligini tetikler.' },
      { t: 'Hasat miktari', d: 'Kovanin en az yuzde altmisini birak. Kis icin depo varsa daha fazla alinabilir.' },
      { t: 'Kacis yolu', d: 'Ruzgara karsi dur. Saldiri aninda duz kos - don ve vurma.' },
    ],
  },
  {
    id: 'types', name: 'Bal Turleri', icon: '🌸', accent: '#a78bfa',
    items: [
      { t: 'Kestane bali', d: 'Koyu, aci-tatli. Guclu antioksidan. Karadeniz yayla bali olarak bilinir.' },
      { t: 'Orman bali', d: 'Yaprak biti salgisindan. Rengi koyu, karamelli. Mineral zengini.' },
      { t: 'Cam bali', d: 'Mugla cam bali dunya unlu. Bal arisi ve cam kosnil bocegi salgisi.' },
      { t: 'Delibal', d: 'Rododendron nektari - karadeniz yayla. Az miktarda bile zehirli olabilir.' },
    ],
  },
];

export default function WildHoney() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍯 Yabani Bal Arama</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kovan bulma · guvenli toplama · bal turleri</div>
      </div>

      <div style={{ background: '#140c00', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f59e0b33' }}>
        <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>🍯 YABANİ BAL</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Anadolu yabani bali essiz — flora cesitliligi sayesinde dunya kalite rekoru. Arama gelenegi binlerce yillik.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#140c00', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#140c00', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1e1400' : 'none' }}>
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
