import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🫒', t: 'Yabani Zeytin', d: 'Olea europaea subsp. oleaster; kultive zeytin ile kucuk meyveli yabani formu.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Ekim-Aralik; yabani zeytinler kultive ceste once koyulasir ve yumusur.' },
      { icon: '🌳', t: 'Agac Ozelligi', d: 'Kultive zeytinden daha dikenli; kucuk gümüssi yaprak, kucuk siyah meyve.' },
      { icon: '🧺', t: 'Toplama', d: 'Dal silkelemek veya yerden toplama; dokme zeytinler daha olgun olur.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Ege ve Akdeniz kiyilari; maki aralikları; zeytinlik bahceleri cevresi.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🫙', t: 'Salamura', d: 'Acı giderilmiş yabani zeytin kuru tuzda 2 hafta; sonra su ile yıkayıp yağa.' },
      { icon: '🫒', t: 'Yağ Çıkarma', d: 'Yeterli meyve ile küçük kolu presleme; lezzet ve kalite kültive kadar iyi.' },
      { icon: '🌿', t: 'Zeytin Yaprağı', d: 'Zeytin yaprağı çayı antihipertansif etkili; geleneksel Ege şifa bitkisi.' },
      { icon: '🧴', t: 'Kozmetik', d: 'Saf zeytin yağı cilt nemlendirici, saç maskesi; balmumla dudak kremi.' },
      { icon: '🔥', t: 'Odun', d: 'Zeytin odunu yoğun ve uzun yanar; barbekü ve taş fırın için ideal.' },
    ],
  },
};

export default function WildOlive() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#4d7c0f';
  const bg = '#030800';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ecfccb', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🫒 Yabani Zeytin</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#081400', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#86efac',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#061000', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#a3e635', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
