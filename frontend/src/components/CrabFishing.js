import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🦀', t: 'Sepet tuzağı', d: 'Yem: balık başı, tavuk parçası. Gece bırak, sabah topla. 3-5m derinlik.' },
      { icon: '🎣', t: 'Kıyıdan olta', d: 'Ağır yem: taş dipte sürükle. Kıyı kayalıklarında mavi yengeç avı.' },
      { icon: '🌊', t: 'Dalış avı', d: 'Serbest dalışta el ile: taş altı kontrol. Sert karapas dikkat et.' },
      { icon: '🌙', t: 'Gece', d: 'Yengeç gece aktif. El feneriyle aydınlat, iskele üzerinden avla.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🫕', t: 'Haşlama', d: 'Tuzlu kaynayan suya diri at. 10-15 dk. Kabuk kırmızıya dönünce hazır.' },
      { icon: '🔥', t: 'Izgarada', d: 'Ortadan ikilere böl. Zeytinyağı, sarımsak. Yüksek ateş 5-7 dk.' },
      { icon: '🌿', t: 'Baharat', d: 'Defne yaprağı, karabiber, limon. Sade pişir, tat kendinden gelir.' },
      { icon: '⚠️', t: 'Güvenlik', d: 'Ölü yengeç pişirme. Ağır metaller: haftada 2 porsiyon yeterli.' },
    ],
  },
};

export default function CrabFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080200', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦀 Yengeç Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · tuzak · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#c2410c' : '#120400', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#120400', borderRadius: 14, padding: 14, border: '1px solid #c2410c33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1e0800' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fb923c' }}>{item.t}</div>
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
