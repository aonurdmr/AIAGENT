import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  signs: {
    title: 'İzler',
    items: [
      { icon: '🐾', t: 'Ayak izi', d: 'Vaşak izi: 7-9cm, yuvarlak, 4 parmak, pençe izi yok. Kar\'da belirgin.' },
      { icon: '🌲', t: 'Kazıma', d: 'Sınır işareti: ağaç kabuğu kazıma, yüksek. Çam ve kayın tercih.' },
      { icon: '💩', t: 'Dışkı', d: 'Gömülü: kendi işini örter. Tüy ve kemik içerir. Sınır alanında.' },
      { icon: '🩸', t: 'Av kalıntısı', d: 'Geyik yavrusu, yaban tavşanı. Boyun ısırığı karakteristik. Örtülü.' },
    ],
  },
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🐈', t: 'Türkiye vaşağı', d: 'Lynx lynx: doğal ormanda yeniden belirir. Doğu Karadeniz, Doğu Anadolu.' },
      { icon: '🌲', t: 'Habitat', d: 'Yoğun iğne yapraklı orman. Yüksek kar örtüsünde büyük ayaklar avantaj.' },
      { icon: '🌙', t: 'Davranış', d: 'Yalnız, gece aktif. Geniş alan: 100-400 km2. İnsan bölgesinden kaçar.' },
      { icon: '📷', t: 'Gözlem şansı', d: 'Gündoğumu yakın orman kenarı. Tuzak kamera: en iyi yöntem.' },
    ],
  },
};

export default function LynxTracking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signs');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060408', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐱 Vaşak Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İzler · ekoloji · gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#78350f' : '#0c0810', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c0810', borderRadius: 14, padding: 14, border: '1px solid #78350f33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #140c18' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#d97706' }}>{item.t}</div>
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
