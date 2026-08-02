import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🚣', t: 'Kurs kupasi', d: 'Kayak kupas: dirsek omuz hizasinda. Cekme, itmemek. Bel don.' },
      { icon: '🌊', t: 'Dalga girmek', d: 'Kiyidan acilma: dik dalga yuzune gir, egil. Yana alinirsan kuvvetli cek.' },
      { icon: '🔄', t: 'Donme', d: 'Akıntıda donme: one ters, geride ileri kupa. Sagdan saga donuyor.' },
      { icon: '🏄', t: 'Surf etmek', d: 'Arkadan gelen dalga: hiz kayagin arkasini yukleyen dalganin onune gec.' },
    ],
  },
  safety: {
    title: 'Guvenlik',
    items: [
      { icon: '🦺', t: 'Can yelegi', d: 'Her zaman: PFD giymeden kayaga binilmez. Ogutmez, kurtarır.' },
      { icon: '📡', t: 'VHF', d: 'Deniz radyosu: kanal 16, sıkıntı kanalı. Acil durum haberlesmesi.' },
      { icon: '🌡️', t: 'Hipotermi', d: 'Denize dusersen: kollarini govdeye cek, bacaklar yukari. PFD tasiyor.' },
      { icon: '🧭', t: 'Ruzgar', d: 'Acik denizde ters ruzgar: geri donemeyebilirsin. Ruzgar yonunu bildir.' },
    ],
  },
};

export default function SeaKayaking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a12', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🚣 Deniz Kaykı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · güvenlik · açık deniz</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0369a1' : '#041420', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041420', borderRadius: 14, padding: 14, border: '1px solid #0369a133' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #08202e' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>{item.t}</div>
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
