import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🏖️', t: 'Kumul oluşumu', d: 'Rüzgar kumu taşır, bitki tutar. Pionner türler: deniz aklığı, kum kamışı.' },
      { icon: '🦎', t: 'Fauna', d: 'Kum kertenkelesi, kum yılanı, bodur kirpi. Yüzeyde iz arama.' },
      { icon: '🌿', t: 'Flora', d: 'Akdeniz kumulları: porsuk çalısı, deniz soğanı, kum menekşesi.' },
      { icon: '📍', t: 'Türkiye kumulları', d: 'Patara, İğneada, Göksu deltası: en büyük doğal kumul sistemleri.' },
    ],
  },
  activity: {
    title: 'Aktivite',
    items: [
      { icon: '🚶', t: 'Yürüyüş', d: 'Kumul üzerinde iz: kolay kaybolma. Belirgin referans noktası belirle.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Altın saat: kumul gölgeleri çizgiler çizer. Sabah taze iz iz. Makro.' },
      { icon: '🌅', t: 'Gün doğumu', d: 'Kumulda gün doğumu: batıya bakan yüz aydınlanır erken. Konumlan.' },
      { icon: '⚠️', t: 'Koruma', d: 'Araç yasak. Bitki üzerine basma. İz yoldan çıkma. Kumul kırılgan.' },
    ],
  },
};

export default function SandDunes() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('ecology');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏖️ Kumul Ekolojisi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekoloji · fauna · aktivite</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a16207' : '#100e00', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100e00', borderRadius: 14, padding: 14, border: '1px solid #a1620733' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1a1800' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fde047' }}>{item.t}</div>
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
