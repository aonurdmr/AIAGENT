import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  method: {
    title: 'Av Yöntemi',
    items: [
      { icon: '🐙', t: 'Ahtapot tuzağı', d: 'Pişmiş toprak kap veya tüp: ahtapot yuva sever. Gece bırak, sabah topla.' },
      { icon: '🎣', t: 'Zıpkın', d: 'Serbest dalışta zıpkın: kayalık dip, taş altı. Gözlemle sonra yaklaş.' },
      { icon: '🌊', t: 'Kıyı avı', d: 'Taş kaldır - ahtapot saklıdır. Kabuklu yığını işaret: aktif yuva.' },
      { icon: '🌙', t: 'Gece dalış', d: 'Ahtapot gece akar. El feneri ile kayalık tara. Renk değişimi izle.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔨', t: 'Yumuşatma', d: 'Kayaya vur 30-40 kez ya da dondur-çöz. Sert kollajen lifler kırılır.' },
      { icon: '🫕', t: 'Yavaş pişirme', d: 'Kırmızı şarap + soğan: 90 dk kısık ateş. Çatal girince dur.' },
      { icon: '🔥', t: 'Izgara', d: 'Haşla, hafif dondur, grill: 3 dk her yüz. Zeytinyağı + limon.' },
      { icon: '🫙', t: 'Marine', d: 'Sirke + baharat: Akdeniz klasiği. Soğuk servis meze olarak ideal.' },
    ],
  },
};

export default function OctoFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('method');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080008', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐙 Ahtapot Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yöntem · tuzak · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#7e22ce' : '#100010', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100010', borderRadius: 14, padding: 14, border: '1px solid #7e22ce33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #180018' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#d8b4fe' }}>{item.t}</div>
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
