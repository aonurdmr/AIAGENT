import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '🌿', t: 'Nane Tanıma', d: 'Mentha spicata; dişli yapraklar, dik sap ve güçlü taze mentol kokusu.' },
      { icon: '💧', t: 'Habitat', d: 'Nemli dere kenarları, sulak alan çevreleri ve bahçe sınırlarında kendiliğinden yetişir.' },
      { icon: '📅', t: 'Toplama Dönemi', d: 'Nisan-Ekim arası toplanabilir; çiçeklenmeden önce en güçlü aromadadır.' },
      { icon: '✂️', t: 'Hasat', d: 'Üst yaprakları kesin; bitkinin kökü ve alt 1/3 kısmını zarar vermeden bırakın.' },
      { icon: '☀️', t: 'Kurutma', d: 'Demet halinde ters asarak gölgede 1-2 haftada veya 35C fırında 2 saatte kurur.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🫖', t: 'Nane Çayı', d: 'Taze veya kuru yapraklardan demlenen çay sindirim için vazgeçilmez şifaydır.' },
      { icon: '🥗', t: 'Salata', d: 'Taze nane yaprakları tabule, cacık ve Ege salatalarında anahtar malzeme.' },
      { icon: '🍦', t: 'Tatlı', d: 'Nane yaprakları çikolata, dondurma ve sorbede serinletici tat katar.' },
      { icon: '💊', t: 'Tıbbi Kullanım', d: 'IBS semptomlari için mentol kapsülleri, ayrıca baş ağrısı ve mide krampları.' },
      { icon: '🧴', t: 'Kişisel Bakım', d: 'Nane yağı diş macunu, saç bakım ve cilt serinletici ürünlerde yaygındır.' },
    ],
  },
};

export default function WildMint() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#059669';
  const bg = '#000e08';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#d1fae5', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Nane</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001c10', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#34d399',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#002018', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#6ee7b7', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
