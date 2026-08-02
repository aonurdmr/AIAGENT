import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🐷', t: 'Domuz ve Köpek', d: 'Eğitimli köpekler ve domuzlar trüf kokusunu 1 metre derinliğe kadar algılar.' },
      { icon: '🌳', t: 'Meşe Altları', d: 'Quercus türleri altında, yaşlı meşe kökleri yakınında yoğun trüf oluşur.' },
      { icon: '📅', t: 'Sezon', d: 'Kış trüfü Aralık-Şubat; yaz trüfü Temmuz-Eylül aylarında olgunlaşır.' },
      { icon: '🗺️', t: 'Türkiye Lokasyonları', d: 'Konya, Afyon ve Uşak ovalarında Terfezia türleri doğal olarak bulunur.' },
      { icon: '🌧️', t: 'Yağmur Sonrası', d: 'Sonbahar yağmurlarından 2-3 hafta sonra toprak altında oluşum artar.' },
    ],
  },
  cook: {
    title: 'Mutfak',
    items: [
      { icon: '🍳', t: 'Sade Pişirme', d: 'Yumurtayla birlikte tereyağlı tavada; trüf aroması tam ortaya çıkar.' },
      { icon: '🧀', t: 'Peynir ve Makarna', d: 'Taze trüf rendelenip sıcak makarna veya risotto üzerine eklenir.' },
      { icon: '🫙', t: 'Saklama', d: 'Pirinç içinde buzdolabında 1 hafta; taze kullanım en iyi aromayı verir.' },
      { icon: '🧈', t: 'Trüf Yağı', d: 'Zeytinyağına trüf dilimleyip 1 hafta bekleterek ev yapımı trüf yağı yapılır.' },
      { icon: '🍽️', t: 'Servis', d: 'Sunum öncesi ince dilimlenmiş trüf; salata, çorba ve et üzerinde mükemmel.' },
    ],
  },
};

export default function TruffleHunting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#92400e';
  const bg = '#0a0400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍄 Trüf Avı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1a0a00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fbbf24',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#140800', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fcd34d', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
