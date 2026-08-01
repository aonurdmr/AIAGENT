import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  plan: {
    title: 'Planlama',
    items: [
      { icon: '⏰', t: 'Kalkis saati', d: 'Zirve gun dogumunda: 1 saat yuruyus = 2 saat onceden kalk, gece yol.' },
      { icon: '🌡️', t: 'Gece soogugu', d: 'Gece dag: 0-5C normal. Fazladan katman, soguk eli bekliyorsun.' },
      { icon: '🔦', t: 'Kafa lambasi', d: 'Kafa lambasi olmadan karanlikta zirveye cikma. Batarya tam olsun.' },
      { icon: '🗺️', t: 'Rota oncesi', d: 'Gece yuruyus: rota onceden hazirla, catal noktalarini bel. Kayabilirsin.' },
    ],
  },
  experience: {
    title: 'Deneyim',
    items: [
      { icon: '🌅', t: 'Altin saat', d: 'Zirve gun dogumu: ilk isik rengi ve golge oyunu, fotografinin dorugu.' },
      { icon: '🏔️', t: 'Gundogumu gokyuzu', d: 'Temiz hava: horizon turuncu, kirmizi, gumus gecis. 15 dakika suresi.' },
      { icon: '🦅', t: 'Sabah kus', d: 'Sabah erken kuslari havada: akbaba, sahin termik arayan ilk saatler.' },
      { icon: '❄️', t: 'Cim don', d: 'Gece don noktalari: cim ve tas donmuş olabilir. Ayak adımlarına dikkat.' },
    ],
  },
};

export default function SunriseHiking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('plan');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌄 Gündoğumu Yürüyüşü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Planlama · gece yürüyüş · deneyim</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#ea580c' : '#120800', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#120800', borderRadius: 14, padding: 14, border: '1px solid #ea580c33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1e1000' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fb923c' }}>{item.t}</div>
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
