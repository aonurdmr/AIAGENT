import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  knots: {
    title: 'Temel Dugumler',
    items: [
      { icon: '🔵', t: 'Olta baglama', d: 'Balıkci dugumu (Clinch): uc misina halkadan gec, kendine sar, ac.' },
      { icon: '🟢', t: 'Iki ipi birle', d: 'Blood knot: iki ipin ucunu ters yonde sar, ortada birlestir.' },
      { icon: '🟡', t: 'Palanga dugumu', d: 'Pulley / Block hitch: tekne ipinin direğe bagli ana dugumu.' },
      { icon: '🔴', t: 'Ringa dugumu', d: 'Taklanmaz, acilmaz. Misina ucuna halka yaparken ideal.' },
    ],
  },
  safety: {
    title: 'Guvenlik & Ipuclari',
    items: [
      { icon: '⚠️', t: 'Dugum mukavemeti', d: 'Her dugum ipin yaklasik yuzde 70-90 gerilim dayanımı azaltır.' },
      { icon: '💧', t: 'Islak test', d: 'Dugum iserken islatilmalidir. Kuru cerece itmez, kayar.' },
      { icon: '🔪', t: 'Acil cozme', d: 'Soguk suda eli donmus ellerle acilabilen dugum sec: bowline idealdir.' },
      { icon: '🪢', t: 'Pratik', d: 'Her dugumu karmada gozleriniz kapali da baglayin. Saha gercek.' },
    ],
  },
};

export default function MarineKnots() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('knots');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪢 Denizci Dugum Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Temel dugumler · guvenlik · teknikler</div>
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
