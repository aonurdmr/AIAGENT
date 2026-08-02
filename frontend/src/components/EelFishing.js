import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🪱', t: 'Yem', d: 'Solucan en iyi yem. Sazan mırmırı da etkili. Dip çekimi: yılan balığı dipte.' },
      { icon: '🌙', t: 'Gece avı', d: 'Yılan balığı gece aktif. Kanal ve nehir ağzı: en etkili gece yeri.' },
      { icon: '🎣', t: 'Teknik', d: 'Yavaş çek, ipimi sallandır. Yılan balığı sert çeker: sert kavrama.' },
      { icon: '📍', t: 'Nokta', d: 'Bataklık ve saz altı dereleri. Çamurlu dip: yılan balığı burada.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Izgara', d: 'Deri ile bütün: yüksek ateş 8 dk her yüz. Yağlı et: kendi yağında pişer.' },
      { icon: '🫕', t: 'Tütsüleme', d: 'Soğuk tütsü 12 saat: klasik Avrupa tarifi. Yumuşak, derin tütün tadı.' },
      { icon: '🍋', t: 'Marine', d: 'Limon + sirke + baharatla: keskin tadı dengeler. Gece beklet.' },
      { icon: '⚠️', t: 'Kan zehirli', d: 'Yılan balığı kanı zehirlidir: el yıka, göze değdirme. Pişirince zararsız.' },
    ],
  },
};

export default function EelFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐍 Yılan Balığı Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · gece · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#15803d' : '#041008', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041008', borderRadius: 14, padding: 14, border: '1px solid #15803d33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081a0c' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{item.t}</div>
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
