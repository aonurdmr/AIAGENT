import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  collect: {
    title: 'Toplama',
    items: [
      { icon: '🌊', t: 'Toplanacak yer', d: 'Midye: kayalık kıyı, gel-git bolgesi. Temiz su: kirli sahilden alma.' },
      { icon: '📅', t: 'Mevsim', d: 'Kırmızı gelgit (kirmizi midi): Mayis-Agustos yasak. Kabuklu hayvan sahası.' },
      { icon: '🧺', t: 'Toplama', d: 'Kaya sapaga bıçakla kes: yeni bırakmaktan cekme, yerinden kopar.' },
      { icon: '🪣', t: 'Saklama', d: 'Canli midye: nemli, serin, agzı acık. Kapalı plastik torbaya koyma.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🔥', t: 'Buhar', d: 'Tence + su + beyaz sarap: midye kapaninca pismis. Acilmayan at.' },
      { icon: '🧄', t: 'Sarimsak', d: 'Sarimsak + tereyagi + maydanoz: klasik Moules Mariniere. 5 dk.' },
      { icon: '🍅', t: 'Domates sosu', d: 'Domates + sogan + baharat ile: akdeniz tarzı guveçleme. Ekmekle.' },
      { icon: '🚫', t: 'Dikkat', d: 'Pisirmeden once yika. Acilmayan midye: at. Koku varsa: at.' },
    ],
  },
};

export default function MusselCooking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('collect');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐚 Midye Toplama & Pişirme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Toplama · güvenlik · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0e7490' : '#041420', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041420', borderRadius: 14, padding: 14, border: '1px solid #0e749033' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #08202e' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22d3ee' }}>{item.t}</div>
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
