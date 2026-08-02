import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  essentials: {
    title: 'Temel',
    items: [
      { icon: '👟', t: 'Ayakkabı', d: 'Bileği destekleyen su geçirmez hiking botu; agresif zemin için Vibram taban şart.' },
      { icon: '🎒', t: 'Sırt Çantası', d: 'Günlük için 20-30L, çok günlük için 50-70L; yük dağılımı kalça destekli olmalı.' },
      { icon: '🧥', t: 'Yağmurluk', d: 'Gore-Tex veya eşdeğer su/nefes alabilir membran; her çantanın içinde olmalı.' },
      { icon: '💧', t: 'Su Sistemleri', d: 'Hidrasyon torbası veya 1-2L termos; ağır rotalarda su filtresi de ekleyin.' },
      { icon: '🗺️', t: 'Navigasyon', d: 'Topografik harita + pusula temel; GPS ve offline harita uygulaması yedek.' },
    ],
  },
  advanced: {
    title: 'Gelişmiş',
    items: [
      { icon: '⛏️', t: 'Yürüyüş Bastonu', d: 'Karbon fiber hafif bastonlar diz üzerindeki baskıyı %25 azaltır.' },
      { icon: '🌞', t: 'Güneş Koruması', d: 'SPF 50+ güneş kremi, güneş gözlüğü ve şapka; yüksek rakımda UV şiddetlenir.' },
      { icon: '🏕️', t: 'Uyku Ekipmanı', d: 'Termal başlangıç sıcaklığına göre tulum; şişme mat ısı yalıtımı için zorunlu.' },
      { icon: '🔦', t: 'Aydınlatma', d: '300+ lumen kafa lambası + yedek pil; solar power bank uzun rotalar için.' },
      { icon: '🍫', t: 'Enerji Yönetimi', d: 'Saat başı 200-300 kalori; muz cipsi, kuruyemiş ve enerji barları ideal.' },
    ],
  },
};

export default function HikingGear() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('essentials');
  const data = TABS[tab];
  const accent = '#374151';
  const bg = '#060606';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f9fafb', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🎒 Doğa Yürüyüşü Ekipmanı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#111827', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#9ca3af',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#111827', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
