import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🐦', t: 'Gümüş martı', d: 'Larus argentatus: büyük, gri sırt, pembe bacak. Kıyıda en yaygın.' },
      { icon: '⚫', t: 'Karabaş martı', d: 'Chroicocephalus ridibundus: siyah baş (üreme), kırmızı gaga. Nehir ve göl.' },
      { icon: '🦅', t: 'Büyük martı', d: 'Larus michahellis: sarı gaga kırmızı nokta. Türkiye\'nin kıyı türü.' },
      { icon: '🌊', t: 'Fırtına martısı', d: 'Hydrocoloeus minutus: küçük, siyah kanat altı. Karadeniz bölgesi.' },
    ],
  },
  behavior: {
    title: 'Davranış',
    items: [
      { icon: '🍕', t: 'Beslenme', d: 'Fırsatçı: balık, çöp, diğer kuşların yemi. Tekne arkasında bekler.' },
      { icon: '🥚', t: 'Üreme', d: 'Koloni yuvalaması: kayalık kıyı. Nisan-Haziran. Yuvaya yaklaşma.' },
      { icon: '🌡️', t: 'Mevsim', d: 'Kış: büyük sürüler limana toplanır. Yaz: üreme alanı dağılımı.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Martı fotoğrafı: hava ve ışık koşulu kritik. Karşı ışık: zarif sil.' },
    ],
  },
};

export default function SeagullWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐦 Martı Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · davranış · fotoğraf</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#155e75' : '#061820', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#061820', borderRadius: 14, padding: 14, border: '1px solid #155e7533' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #0a2030' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22d3ee' }}>{item.t}</div>
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
