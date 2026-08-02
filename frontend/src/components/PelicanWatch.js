import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🦢', t: 'Tepeli pelikan', d: 'Pelecanus crispus: dünyada en tehlikede. Beyaz, kıvırcık baş. Nesli tehlike.' },
      { icon: '🌊', t: 'Gri pelikan', d: 'Pelecanus onocrotalus: daha yaygın. Pembe gaga kenarı. Göç kuzeyden.' },
      { icon: '📍', t: 'Türkiye', d: 'Manyas, Kızılırmak, Gediz delta: pelikan gözlem noktaları. İlkbahar.' },
      { icon: '🐟', t: 'Avlanma', d: 'Torba ağzıyla kapma: balığı kovalar. Grup koordinasyon davranışı.' },
    ],
  },
  watch: {
    title: 'Gözlem',
    items: [
      { icon: '🦺', t: 'Manyas gölü', d: 'Kuş Cenneti Milli Parkı: pelikan üremesi. Mart-Eylül. Tekne turu.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Uçuşta: teleobjektif 400mm+. Sürü düzenini bekle, tek tık ile. Sabah.' },
      { icon: '🌅', t: 'En iyi zaman', d: 'Sabah erken ve akşam üstü: ışık ve aktivite en yüksek dönem.' },
      { icon: '⚠️', t: 'Yuva mesafesi', d: 'Üreme kolonisinden 100m mesafe. Terk etme riski yüksek hassas tür.' },
    ],
  },
};

export default function PelicanWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦢 Pelikan Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · gözlem · koruma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0369a1' : '#031420', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#031420', borderRadius: 14, padding: 14, border: '1px solid #0369a133' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #051e30' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#7dd3fc' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
