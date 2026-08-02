import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🏔️', t: 'Yayla çayırı', d: 'Yüksek irtifa çayır: kısa yoğun bitki örtüsü. Kısa sezon yoğun çiçeklenme.' },
      { icon: '🌿', t: 'Endemik bitkiler', d: 'Türkiye yaylalarında çok endemik: Silene, Astragalus, Verbascum. Belge et.' },
      { icon: '🐑', t: 'Otlatma etkisi', d: 'Geleneksel otlatma: biyoçeşitlilik artırır. Aşırı otlatma: degradasyon.' },
      { icon: '📅', t: 'Mevsim', d: 'Haziran-Ağustos: tam çiçeklenme. Erken ilkbaharda bazı türler kısa açar.' },
    ],
  },
  hike: {
    title: 'Yürüyüş',
    items: [
      { icon: '🗺️', t: 'Güzergah', d: 'Kaçkar, Aladağlar, Bolkar: Türkiye\'nin zengin yayla güzergahları.' },
      { icon: '🏕️', t: 'Kamp', d: 'Yayla göçü döneminde çoban köyleri: konaklama ve sohbet imkanı.' },
      { icon: '☁️', t: 'Hava', d: 'Öğleden sonra gök gürültüsü: erken çık, zirvede öğlen olmamak iyi.' },
      { icon: '🦅', t: 'Yaban hayatı', d: 'Çayır kartalı, yaban keçisi, çekirge sürüsü: yüksek çayır zenginliği.' },
    ],
  },
};

export default function HighlandGrazing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('ecology');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020e04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏔️ Yayla Ekolojisi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekoloji · bitki · yürüyüş</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#166534' : '#031808', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#031808', borderRadius: 14, padding: 14, border: '1px solid #16653433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #052808' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac' }}>{item.t}</div>
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
