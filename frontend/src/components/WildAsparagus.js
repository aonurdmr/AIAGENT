import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  collect: {
    title: 'Toplama',
    items: [
      { icon: '🌱', t: 'Erken Filizler', d: 'Mart-Nisan aylarında topraktan yeni çıkan filizler en lezzetlisidir.' },
      { icon: '🌿', t: 'Tanıma', d: 'Asparagus acutifolius ve A. officinalis; ince dik filizler, tüysü dalcıklar.' },
      { icon: '🏔️', t: 'Habitat', d: 'Makilik alanlar, zeytinlikler ve kireçli yamaçlarda Ege ve Akdeniz bölgesi.' },
      { icon: '✂️', t: 'Hasat', d: 'Filizleri toprak seviyesinden kesin; köklere zarar vermeden sürdürülebilir toplama.' },
      { icon: '⚠️', t: 'Uyarı', d: 'Olgun kırmızı meyveleri zehirlidir; yalnızca genç yeşil filizler yenir.' },
    ],
  },
  recipe: {
    title: 'Tarif',
    items: [
      { icon: '🍳', t: 'Yumurtalı Kavurma', d: 'Zeytinyağında sarımsakla soteleyin, üzerine yumurta kırıp pişirin.' },
      { icon: '🥗', t: 'Zeytinyağlı', d: 'Haşlanmış kuşkonmaz limon suyu ve zeytinyağıyla soğuk servis edilir.' },
      { icon: '🍝', t: 'Risotto', d: 'Arpa şehriyesi veya risotto pirinciyle taze kuşkonmaz mükemmel uyum.' },
      { icon: '🧀', t: 'Fırın', d: 'Parmesan rendesi ve zeytinyağıyla 200°C fırında 15 dakika közleme.' },
      { icon: '🫙', t: 'Saklama', d: 'Nemli bezde buzdolabında 3-4 gün; taze toplama sonrası hemen tüketin.' },
    ],
  },
};

export default function WildAsparagus() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('collect');
  const data = TABS[tab];
  const accent = '#4d7c0f';
  const bg = '#030a00';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ecfccb', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Kuşkonmaz</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#0a1400', borderRadius: 10, overflow: 'hidden' }}>
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
