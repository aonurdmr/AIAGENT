import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🧗', t: 'Parmak tutusu', d: 'Kucuk tutamak: kanca kavrami (crimp). Parmak eklemleri asar: azar azar.' },
      { icon: '🦶', t: 'Ayak isiyonu', d: 'Kaya tırmanis: ayak yerlestirme yari kadin. Kaya tabani, sert tutuş.' },
      { icon: '💪', t: 'Kol gecisi', d: 'Dirsek altinda kalmak: kolları uzat, tendon yormak yerine kemik dayan.' },
      { icon: '🧠', t: 'Proje yaklasim', d: 'Zor blok: once goz at, teker teker hareket planla, sonra dene.' },
    ],
  },
  safety: {
    title: 'Guvenlik',
    items: [
      { icon: '🛡️', t: 'Crash pad', d: 'Blok altına mat: en az 1 kisisel pad. Parcalar halinde kapla zemini.' },
      { icon: '👥', t: 'Spotter', d: 'Spotter: dususte kafayi korumak icin eller hazir. Yakalamak degil.' },
      { icon: '🧤', t: 'Magnezyum', d: 'Toz magnezyum: kayganlasi engeller. Fazlası tırmaniş yuzeyini bozar.' },
      { icon: '🔙', t: 'Isınma', d: 'Soğuk tendon: Yavaşça baslatin. Kolay blok ile isinma, sonra zoru dene.' },
    ],
  },
};

export default function BoulderingGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060206', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧗 Bouldering Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · güvenlik · kaya tırmanış</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#9333ea' : '#0e0618', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e0618', borderRadius: 14, padding: 14, border: '1px solid #9333ea33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #180c28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#d946ef' }}>{item.t}</div>
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
