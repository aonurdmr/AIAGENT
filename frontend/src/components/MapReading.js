import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  topo: {
    title: 'Topoğrafya',
    items: [
      { icon: '🗺️', t: 'Eşyükselti eğrileri', d: 'Sıkı = sarp, seyrek = düz arazi. İç içe = tepe, V şekli = vadi.' },
      { icon: '🧭', t: 'Harita kuzey', d: 'Harita kuzeyi ≠ manyetik kuzey. Sapma açısı haritada yazar. Kompas düzelt.' },
      { icon: '📏', t: 'Ölçek', d: '1:25000 = 1cm haritada 250m. Mesafe = cm x ölçek bölen.' },
      { icon: '🎨', t: 'Renkler', d: 'Yeşil: bitki örtüsü. Mavi: su. Kahverengi: eşyükselti. Siyah: yapılar.' },
    ],
  },
  navigate: {
    title: 'Navigasyon',
    items: [
      { icon: '🧭', t: 'Kompas azimut', d: 'Varış yönü tespit: harita + kompas. Döndür ve yürü. Referans noktası al.' },
      { icon: '📐', t: 'Sırt alımı', d: 'Görünen zirve açısı: haritada konumunu böylece doğrula.' },
      { icon: '⏱️', t: 'Zaman-mesafe', d: 'Naismith kuralı: 5km/saat yatay + her 300m yükseliş için 1 saat ekle.' },
      { icon: '🌟', t: 'Yedek plan', d: 'Kaybolunca dur: panik yapmaz. Son bilinen konum bulup geri dön.' },
    ],
  },
};

export default function MapReading() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('topo');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🗺️ Harita Okuma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Topoğrafya · kompas · navigasyon</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#78350f' : '#0e0e00', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e0e00', borderRadius: 14, padding: 14, border: '1px solid #78350f33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1a1a00' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fcd34d' }}>{item.t}</div>
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
