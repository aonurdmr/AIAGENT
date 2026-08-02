import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🦇', t: 'At nalı yarasa', d: 'Rhinolophus: karakteristik burun yapısı. Mağarada sürü. Ekosistem göstergesi.' },
      { icon: '🌙', t: 'Büyük kulak', d: 'Plecotus auritus: dev kulaklar. Böcek sesle bulur. Orman yarasası.' },
      { icon: '🏙️', t: 'Şehir yarasa', d: 'Pipistrellus: binalarda yaşar. Akşam uçuşu: parkta görmek kolay.' },
      { icon: '🦅', t: 'Büyük yarasa', d: 'Myotis myotis: büyük, böcek avcısı. Çatılarda koloni kurar.' },
    ],
  },
  watch: {
    title: 'Gözlem',
    items: [
      { icon: '🌅', t: 'Çıkış saati', d: 'Günbatımından 20-30 dk sonra: yarasa mağara ve çatıdan çıkar.' },
      { icon: '🔊', t: 'Bat dedektör', d: 'Ultrasonik dönüştürücü: yarasa sesini duyur. Tür tayininde yardımcı.' },
      { icon: '🏞️', t: 'Nokta', d: 'Göl kenarı, ahır, kilise, mağara çıkışı. Su kaynağı yakınında çok aktif.' },
      { icon: '⚠️', t: 'Koruma', d: 'Mağara yuvasına girme: kolonileri bozma. Yarasa ekosistemde kritik.' },
    ],
  },
};

export default function BatWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040206', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦇 Yarasa Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · gözlem · koruma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#4c1d95' : '#080410', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#080410', borderRadius: 14, padding: 14, border: '1px solid #4c1d9533' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #0c0818' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#c4b5fd' }}>{item.t}</div>
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
