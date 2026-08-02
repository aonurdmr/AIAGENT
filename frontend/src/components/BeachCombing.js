import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  finds: {
    title: 'Ne Bulunur',
    items: [
      { icon: '🐚', t: 'Deniz kabuklari', d: 'Cardium, Murex, Cypraea: Akdeniz kıyısında. Sabah dusuk gelgitte.' },
      { icon: '💎', t: 'Deniz camı', d: 'Kullanılmış cam denizde parlar, kıyıya vurur. Koleksiyon ve takı.' },
      { icon: '🪨', t: 'Taş', d: 'Pürüzsüz deniz tası ve jasper/flint türleri kıyı kordon kenarında.' },
      { icon: '🌊', t: 'Deniz kirecci', d: 'Cuttlebone (Sepia kemigi): kuşlar icin kalsiyum. Kurutulur kullanilir.' },
    ],
  },
  tips: {
    title: 'İpuçları',
    items: [
      { icon: '🌅', t: 'Sabah erken', d: 'Firtina sonrası sabah en zengin kıyı. Gelgit yukselince en iyi kabuklari bulur.' },
      { icon: '👁️', t: 'Zemin tarama', d: 'Yavaş yuru, gozun zeminde. Islak kum renkleri cikis noktasi.' },
      { icon: '🚫', t: 'Canlı organizma', d: 'Canlı yuva, canlı kabuk ve canliları alma. Sadece bos kabuk.' },
      { icon: '📋', t: 'Yasalar', d: 'Bazi ulusal parklar: her turlu toplamaya karsi yasak. Uyarılara uyu.' },
    ],
  },
};

export default function BeachCombing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('finds');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐚 Sahil Toplama</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ne bulunur · ipuçları · kurallar</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#041018', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041018', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081c28' : 'none' }}>
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
