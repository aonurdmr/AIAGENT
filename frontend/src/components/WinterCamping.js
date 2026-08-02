import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  gear: {
    title: 'Ekipman',
    items: [
      { icon: '🏕️', t: 'Çadir Secimi', d: '4-mevsim veya kar cıpası ile guclendirilmis codir; kar altinda dayanikli olmali.' },
      { icon: '🛌', t: 'Uyku Tulumu', d: '-15 C veya alti derecelendirmeli tulumlarda yuksek loft tuy dolgu gereklidir.' },
      { icon: '🔥', t: 'Isıtma', d: 'Propan veya butan yanıcı ile calistirilabilen kamp sobasi; karbon monoksit uyarisi.' },
      { icon: '🧤', t: 'Giyim', d: 'Baz kat+orta kat+dis katman sistemi; pamuk kesinlikle kullanilmaz.' },
      { icon: '💧', t: 'Su Yonetimi', d: 'Su pisirmeli olarak altin; buz seyahat sırasında cozundurulmeli.' },
    ],
  },
  tips: {
    title: 'Taktikler',
    items: [
      { icon: '❄️', t: 'Kar Hendegi', d: 'Cıkar altinda kar hendegi kaz; ruzgar koruması saglar ve nemden korur.' },
      { icon: '🌡️', t: 'Hipotermiden Korunma', d: 'Titreme ve kari kars kalmak belirtisidir; hemen sicak icecek ve katmanlama.' },
      { icon: '👢', t: 'Ayakkabi', d: 'Yalitimli bot ve guvenilir krampon gune kıyı karda kaymayi onler.' },
      { icon: '☀️', t: 'Gunduz Kamp', d: 'Sicaklik gunduz yuksek oldugunda ekipman kurutmak icin en iyi firsattir.' },
      { icon: '🍲', t: 'Enerji Beslenme', d: 'Sogukta kaloriye ihtiyac artar; pişirilmis yemekler ve yuksekcalori atistirmalik.' },
    ],
  },
};

export default function WinterCamping() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('gear');
  const data = TABS[tab];
  const accent = '#1e40af';
  const bg = '#000414';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>❄️ Kış Kampı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#000e28', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#60a5fa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001228', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#93c5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
