import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  ecology: {
    title: 'Ekoloji',
    items: [
      { icon: '🌳', t: 'Mese Turleri', d: 'Quercus robur, Q. cerris ve Q. pubescens Turkiye mese ormanlari icin tipiktir.' },
      { icon: '🐿️', t: 'Mese Hayati', d: 'Sincap, porsuk, kizilercik ve sari orumcek mese ormanlari sakinleridir.' },
      { icon: '🍄', t: 'Mantar Birligi', d: 'Mikorizal mantarlar mese kokleriyle simbiyoz iliski kurarak karsilkli faydaladir.' },
      { icon: '🌿', t: 'Alt Kat Bitkileri', d: 'Boyagotu, ormangulu, maisgulu ve geyikotu meseligin alt tabakasini olusturur.' },
      { icon: '🐦', t: 'Kus Yaşamı', d: 'Agac kavalicisi, orman ispinozi ve yaban guvercini mese ormanlarina ozeldir.' },
    ],
  },
  survival: {
    title: 'Yararlanma',
    items: [
      { icon: '🌰', t: 'Palam Toplama', d: 'Ekim-Kasim arasi toplanan palamut; hasilatanmis, salatalik veya un yapiminda.' },
      { icon: '🌿', t: 'Orman Bitkileri', d: 'Mese altindaki kuzukulagi, kilicot ve ormancik yenilebilir taze bitkileridir.' },
      { icon: '🪵', t: 'Odun Kalitesi', d: 'Mese odunu yakit degerinde en yuksek BTU saglayan turler arasindadir.' },
      { icon: '🍂', t: 'Kompost', d: 'Mese yapraklari yavas compost olmasi ile asit seviyeli toprak duzelticisi saglar.' },
      { icon: '🔬', t: 'Palamut Tanen', d: 'Mese kabugundaki tanen tabaklik, dogal boyacilik ve saglik amacli kullanilir.' },
    ],
  },
};

export default function OakForest() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('ecology');
  const data = TABS[tab];
  const accent = '#713f12';
  const bg = '#060200';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fefce8', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌳 Meşe Ormanı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0a00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#ca8a04',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fde047', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
