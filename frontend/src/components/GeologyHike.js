import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  rocks: {
    title: 'Kayaçlar',
    items: [
      { icon: '🪨', t: 'Kireçtaşı', d: 'Türkiye\'de yaygın: Toros, Trakya. Karstik mağara ve obruk oluşturur.' },
      { icon: '🌋', t: 'Volkanik', d: 'Kapadokya: tüf, ignimbrit. Peri bacaları: yumuşak tüf, sert bazalt başlık.' },
      { icon: '🔷', t: 'Metamorfik', d: 'Mika şist: parlak yüzey, levhamsı kırılma. Yüksek dağlarda.' },
      { icon: '⬛', t: 'Granit', d: 'Ege masifi: büyük kristalli, sert. Günümüzde aşınmış yuvarlatılmış bloklar.' },
    ],
  },
  fossil: {
    title: 'Fosil',
    items: [
      { icon: '🐚', t: 'Deniz kabukları', d: 'İç Anadolu: deniz fosileri yaygın. Denizin varlığının kanıtı, 65M yıl.' },
      { icon: '🦴', t: 'Kemik fosili', d: 'Kapadokya bölgesi: memeliler fosili. Ruhsatsız almak yasal değil.' },
      { icon: '🌿', t: 'Bitki fosili', d: 'Kömür damarı yakınları: eğrelti, lepidodendron. Karbon dönemi belirteci.' },
      { icon: '⚠️', t: 'Yasal', d: 'Fosil almak yasaktır. Fotoğrafla belgele. Müzeye bildir: bilimsel katkı.' },
    ],
  },
};

export default function GeologyHike() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('rocks');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060402', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪨 Jeoloji Yürüyüşü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kayaçlar · fosil · formasyon</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#78716c' : '#0e0c08', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e0c08', borderRadius: 14, padding: 14, border: '1px solid #78716c33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #18160e' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#d6d3d1' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
