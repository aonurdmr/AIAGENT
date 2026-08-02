import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  safety: {
    title: 'Güvenlik',
    items: [
      { icon: '🌡️', t: 'Su sicakligi', d: 'Soguk gol suyu ani hipotermiye yol acar. 20°C altında yuzme dikkatli.' },
      { icon: '🌿', t: 'Tahtakurusu & alg', d: 'Siyanobakteri (mavi-yesil alg): zehirli olabilir. Renk degisimi varsa girme.' },
      { icon: '👀', t: 'Gorsel engel', d: 'Golun koyusi dibe gorsel engel. Cikis noktası ve rotayi onceden belirle.' },
      { icon: '🤿', t: 'Dalma yasagi', d: 'Gol dibindeki kayalık ve drenaj yapıları ciddi risk. Dalma yasakli.' },
    ],
  },
  tips: {
    title: 'İpuçları',
    items: [
      { icon: '🏊', t: 'Kıyı yüzme', d: 'Derine gitme. Kiyiya paralel yuzme her zaman daha guvenli.' },
      { icon: '🦺', d: 'Can yelegı: acik su yuzme icin. Calisıyor mu once kontrol et.', t: 'Can yelegi' },
      { icon: '🌅', t: 'Sabah yuzme', d: 'Alg acisi sabah az. Ogle gunes şiddetli UV, alglar aktif.' },
      { icon: '🧴', t: 'Cilt bakimi', d: 'Tuzlu gol? Sonrasi temiz su ile yıka. Kalsiyum birikimi deri tahrisi.' },
    ],
  },
};

export default function LakeSwimming() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('safety');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏊 Gölde Güvenli Yüzme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güvenlik · alg · ipuçları</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#3b82f6' : '#041018', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041018', borderRadius: 14, padding: 14, border: '1px solid #3b82f633' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081c28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>{item.t}</div>
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
