import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🦅', t: 'Sahin', d: 'Accipiter nisus: kucuk, hizli. Orman icinde bocek boyunda kus avlar.' },
      { icon: '🦁', t: 'Kartalı sahin', d: 'Falco peregrinus: serbest dususte 300km/s. Yuksekten pike yapar.' },
      { icon: '🐦', t: 'Kerkenez', d: 'Falco tinnunculus: titresim ile yerinde dururken avlanir. Yol kenari.' },
      { icon: '🌀', t: 'Kirklangiç', d: 'Milvus: kuyruğu catal, serbest plan. Sehir ve kiy kirlangi carpa.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🌤️', t: 'Termikal', d: 'Gunes ısındikca termik: buyuk sahin termikte yuzelir. Ogle iyi.' },
      { icon: '🔭', t: 'Gozlem noktasi', d: 'Yuksek tepe veya dag etegi: uçan tahta kuşların goc rotası.' },
      { icon: '🍂', t: 'Goc donemi', d: 'Eylul-Kasim: guneye goc. Bozburun gecidi Turkiyenin en onemlisi.' },
      { icon: '📷', t: 'Fotograflama', d: 'Hiz: panning teknigi. 1/2000s+ enstantane. Termik noktasinda bekle.' },
    ],
  },
};

export default function HawkWatching() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦅 Yırtıcı Kuş Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · termikal · göç gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#b45309' : '#0c0e00', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c0e00', borderRadius: 14, padding: 14, border: '1px solid #b4530933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #181c00' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#d97706' }}>{item.t}</div>
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
