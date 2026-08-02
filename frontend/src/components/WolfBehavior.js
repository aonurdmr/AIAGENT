import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  signs: {
    title: 'İzler',
    items: [
      { icon: '🐾', t: 'Ayak izi', d: 'Kurt izi: 9-11cm uzunluk. Köpek izinden büyük ve belirgin. Çizgi üzerinde.' },
      { icon: '💩', t: 'Dışkı', d: 'Büyük, kıl ve kemik içerir. Sınır işareti: yol ortası, çıkıntı üzeri.' },
      { icon: '🩸', t: 'Avlanma kalıntısı', d: 'Geyik veya yaban domuzu kalıntısı: kurt avı karakteristik kürek kemiği.' },
      { icon: '🌙', t: 'Uluması', d: 'Gün batımı-şafak: uzun tiz ses. Sürü koordinasyonu ve sınır işareti.' },
    ],
  },
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🐺', t: 'Sürü yapısı', d: 'Alfa çift liderlik. 5-15 birey. Aile bağlı, sezon dışı göç az.' },
      { icon: '🗺️', t: 'Türkiye dağılımı', d: 'Doğu Anadolu, Doğu Karadeniz: en yoğun. Ege ve Akdeniz ovalarda azaldı.' },
      { icon: '🦌', t: 'Av', d: 'Hasta ve genç hayvan: sürüden seçer. Geyik, yaban domuzu, yaban keçisi.' },
      { icon: '⚠️', t: 'Güvenlik', d: 'Kurt insana nadiren saldırır. Aşılı köpek: gece kapalı tut. Uzaktan gözlemle.' },
    ],
  },
};

export default function WolfBehavior() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signs');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060408', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐺 Kurt Davranışı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İzler · ekoloji · güvenlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#4b5563' : '#0c0812', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c0812', borderRadius: 14, padding: 14, border: '1px solid #4b556333' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #14101e' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af' }}>{item.t}</div>
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
