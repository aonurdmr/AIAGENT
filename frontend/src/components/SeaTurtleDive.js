import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🐢', t: 'Caretta caretta', d: 'Akdeniz\'in sembolü. Yaz aylarında Türkiye sahillerinde yumurta bırakır.' },
      { icon: '🌊', t: 'Chelonia mydas', d: 'Yeşil kaplumbağa. Akdeniz\'de nadir. Ot yiyen tek deniz kaplumbağası.' },
      { icon: '🌿', t: 'Beslenme', d: 'Caretta: yumuşakça, denizanası. Chelonia: deniz çayırı. Mevsime göre değişir.' },
      { icon: '📍', t: 'Habitat', d: 'Dalyan, İztuzu, Belek, Akyatan: koruma altındaki yuvalama sahilleri.' },
    ],
  },
  dive: {
    title: 'Dalış',
    items: [
      { icon: '🤿', t: 'Gözlem derinliği', d: '0-15m: en sık gözlem. Solunum için yüzeye çıkarlar her 5-45 dakikada.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Flash kullanma, mesafe koru (3m). Aniden yaklaşma. Yüzme yolunu kesme.' },
      { icon: '⚠️', t: 'Koruma kuralları', d: 'Yuvalama sahillerinde gece gezmek yasak. Işık yak. Lastik botta sürükleme yok.' },
      { icon: '🏊', t: 'Dalış sezonu', d: 'Mayıs–Ekim: en aktif. Yaz: dişi kumula çıkar. Gündüz gözlem için ideal.' },
    ],
  },
};

export default function SeaTurtleDive() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#010810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐢 Deniz Kaplumbağası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · dalış · koruma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0f766e' : '#031018', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#031018', borderRadius: 14, padding: 14, border: '1px solid #0f766e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #051c28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#2dd4bf' }}>{item.t}</div>
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
