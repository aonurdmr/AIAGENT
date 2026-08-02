import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  biology: {
    title: 'Biyoloji',
    items: [
      { icon: '🐦', t: 'Tür Tanımı', d: 'Karabatak (Phalacrocorax carbo); siyah tüyleri, kanca gagası ve uzun boyunuyla tanınır.' },
      { icon: '🏊', t: 'Dalış Yeteneği', d: 'Su altında 60 saniyeye kadar 10 metre derinliğe dalabilir.' },
      { icon: '🪺', t: 'Yuvalama', d: 'Koloniler halinde ağaç tepelerinde veya kayalıklarda yuva yapar.' },
      { icon: '🐟', t: 'Beslenme', d: 'Günde 400-600 gram balık tüketir; sazan, levrek ve yayın balığı tercih eder.' },
      { icon: '👐', t: 'Kanat Kurutma', d: 'Suyu geçirmeyen yağı olmayan kanatlarını açarak güneşte kurutur.' },
    ],
  },
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🦅', t: 'V Formasyonu', d: 'Göç mevsiminde gruplar halinde V düzeninde uçar ve izlenmesi kolaydır.' },
      { icon: '🌊', t: 'Gözlem Yerleri', d: 'Büyük göller, nehir ağızları ve kıyı şeridi en iyi lokasyonlardır.' },
      { icon: '📅', t: 'Göç Dönemi', d: 'Ekim-Kasım ve Mart-Nisan arası göç dalgaları gözlemlenebilir.' },
      { icon: '📷', t: 'Fotoğraf İpuçları', d: 'Suya dalış anı veya kanat kurutma pozu ikonik karelerdir.' },
      { icon: '🔭', t: 'Ekipman', d: '10x42 dürbün ile kaya veya ağaç konma noktaları koloni gözlemi için idealdir.' },
    ],
  },
};

export default function CormorantWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('biology');
  const data = TABS[tab];
  const accent = '#0369a1';
  const bg = '#000810';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐦 Karabatak Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001824', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#001220', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
