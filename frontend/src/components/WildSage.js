import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Toplama',
    items: [
      { icon: '🌿', t: 'Tanıma', d: 'Adaçayı; gümüşi-yeşil kadifemsi yapraklar, güçlü aromatik koku ve mor çiçekleriyle ayırt edilir.' },
      { icon: '⛰️', t: 'Habitat', d: 'Kireçli, taşlı ve iyi drene olan güney yamaçlarda doğal olarak yetişir.' },
      { icon: '📅', t: 'Mevsim', d: 'Mayıs-Temmuz çiçeklenme öncesinde veya Eylül hasat için en ideal dönemdir.' },
      { icon: '✂️', t: 'Toplama', d: 'Üst 1/3 kısmı makasla kesilir; kökü ve ana gövdesi zarar görmez.' },
      { icon: '🌞', t: 'Kurutma', d: 'Sıcak havadar gölgede demet halinde ters asarak 1-2 hafta kurutulur.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍗', t: 'Mutfakta', d: 'Yağlı etleri sindirimi kolaylaştırır; kuzu, kaz ve domuz yemeklerinde vazgeçilmezdir.' },
      { icon: '🫖', t: 'Adaçayı Çayı', d: 'Boğaz ağrısı ve soğuk için 2-3 yaprak demlenip bal ile içilir.' },
      { icon: '🧴', t: 'Cilt Bakımı', d: 'Antibakteriyel özellikleri ile sivilce ve yara iyileşmesinde kullanılır.' },
      { icon: '🏠', t: 'Tütsü', d: 'Kurutulmuş demet yakılarak mekanlar aromatize edilir, geleneksel temizleme ritüeli.' },
      { icon: '💊', t: 'Tıbbi Kullanım', d: 'Menopoz belirtilerini hafiflettiği ve bellek desteklediği klinik çalışmalarla gösterilmiştir.' },
    ],
  },
};

export default function WildSage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#7c3aed';
  const bg = '#060010';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f3e8ff', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Adaçayı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#100020', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#a78bfa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#0e0020', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#c4b5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
