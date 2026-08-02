import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanima',
    items: [
      { icon: '🌷', t: 'Yabani Laleler', d: 'Tulipa armena ve T. humilis; yabani lale Doğu Anadolu endemikidir.' },
      { icon: '💜', t: 'Süsənlər', d: 'Iris species; mor, sari ve beyaz renk varyasyonlariyla taslık ve cayirlarda.' },
      { icon: '🌼', t: 'Papatya Turleri', d: 'Anthemis ve Achillea cinsleri; kireçli topraklarda yaygin bahar habercisi.' },
      { icon: '🌸', t: 'Bahar Safrani', d: 'Crocus biflorus Turkiye\'de yaygin; Mart-Nisan arasi erken sezon.' },
      { icon: '🟡', t: 'Kardelen', d: 'Galanthus elwesii Turkiye\'de yaygin; Ocak-Mart arasi kar altinda bile acar.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🗺️', t: 'Soguk Iklimlerde', d: 'Erzurum platosu, Bolu ve Kastamonu ormanlari erken ilkbahar guzelliginde.' },
      { icon: '📅', t: 'Mevsim Planlama', d: 'Sahil bolgelerinde Subat, ic anadoluda Nisan-Mayis icin rota planlayin.' },
      { icon: '📸', t: 'Fotograf Ipuclari', d: 'Makro lens ve dusuk acili cekimler cicek detaylarini en iyi yakalar.' },
      { icon: '🌱', t: 'Koruma Kurallari', d: 'Yabani cicekleri koparmayin; fotograf cekin ve birakin aynen orada kalsin.' },
      { icon: '🔭', t: 'Rehber Kaynaklar', d: 'Flora of Turkey (Davis) akademik referans; Turkiye Bitkileri veri tabani online.' },
    ],
  },
};

export default function SpringFlowers() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#db2777';
  const bg = '#0a0008';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fce7f3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌷 Bahar Çiçekleri</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1a0014', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#ec4899',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160010', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#f9a8d4', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
