import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  migration: {
    title: 'Göç',
    items: [
      { icon: '🦅', t: 'Güzergah', d: 'Beyaz leylek: İstanbul Boğazı ve Çanakkale üzerinden Afrika\'ya gider.' },
      { icon: '📅', t: 'Geçiş', d: 'Ağustos-Eylül: sonbahar güney göçü. Nisan-Mayıs: kuzey dönüşü.' },
      { icon: '🌡️', t: 'Termal', d: 'Termal hava akıntısı üzerinde süzülür. Boğaz: en dar geçiş, yoğun.' },
      { icon: '📊', t: 'Sayım', d: 'Kuş Araştırma Derneği: boğaz sayımı. Her yıl binlerce leylek sayılır.' },
    ],
  },
  watch: {
    title: 'Gözlem',
    items: [
      { icon: '📍', t: 'İstanbul', d: 'Küçük Çamlıca, Sarıyer: Ağustos-Eylül sabahları binlerce leylek.' },
      { icon: '🔭', t: 'Dürbün', d: '10x42 veya teleskop: uzak sürü takibi. Mavi gökyüzü zemini kritik.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Süzülen leylek: 1/1000s enstantane dondurur. Sürü ile birlikte.' },
      { icon: '🕊️', t: 'Yuvalama', d: 'Türkiye\'de yuvalar: köy ve kasabada baca üstü yuvalar. Şans eseri bul.' },
    ],
  },
};

export default function StorkMigration() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('migration');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040c00', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦅 Leylek Göçü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güzergah · gözlem · sayım</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#4d7c0f' : '#061600', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#061600', borderRadius: 14, padding: 14, border: '1px solid #4d7c0f33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #0a2000' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a3e635' }}>{item.t}</div>
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
