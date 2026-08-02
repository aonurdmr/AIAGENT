import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🐦', t: 'Kumkuşları', d: 'Calidris ve Tringa cinsleri; uzun bacak ve gaga profili karakteristik.' },
      { icon: '🌊', t: 'Habitat', d: 'Koy kenarları, bataklıklar, balık çiftlikleri ve nehir deltalarında görülür.' },
      { icon: '🍂', t: 'Göç Yoğunluğu', d: 'Temmuz-Kasım en yoğun geçiş; en çok Marmara ve Ege kıyılarında.' },
      { icon: '🔭', t: 'Gözlem Noktaları', d: 'Kızılırmak deltası, Gediz deltası ve Dalyan lagünü en verimli lokasyonlar.' },
      { icon: '📸', t: 'Fotoğraf', d: 'Sabah ışığı ve akşam güneşi geri plana almak tüy detayını netleştirir.' },
    ],
  },
  species: {
    title: 'Türler',
    items: [
      { icon: '⚫', t: 'Kızıl Kumkuşu', d: 'Calidris canutus; gri kış tüyü, yuvarlak vücut; büyük sürüler halinde göç.' },
      { icon: '🟤', t: 'Cılıbıt', d: 'Charadrius hiaticula; göğüste siyah bant; kıyı bölgelerinde yaygın.' },
      { icon: '⚪', t: 'Uzun Kuyruk', d: 'Limosa limosa; uzun düz gaga; bataklık ve sulak alanlarda beslenme.' },
      { icon: '🔵', t: 'Kırmızı Bacaklı', d: 'Tringa totanus; kırmızı bacak ve gaga dibi; çığlık vari özellikli ses.' },
      { icon: '🟡', t: 'Altın Yağmurcun', d: 'Pluvialis apricaria; altın renkli tüyler; kısa çim ve tarlalarda.' },
    ],
  },
};

export default function SandpiperWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#0369a1';
  const bg = '#000810';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐦 Kumkuşu Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001428', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#38bdf8',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001828', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#7dd3fc', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
