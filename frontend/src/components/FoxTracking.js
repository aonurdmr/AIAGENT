import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  track: {
    title: 'İz Takibi',
    items: [
      { icon: '🐾', t: 'Pençe İzi Özellikleri', d: 'Tilki izi eliptik formda, 4-5 cm uzunluğunda ve tırnak izleri belirgindir.' },
      { icon: '❄️', t: 'Karda İz Okuma', d: 'Kar üzerinde tek sıra iz bırakır, arka ayağını ön ayağının üzerine tam basar.' },
      { icon: '🌿', t: 'Toprak İzleri', d: 'Nemli toprakta derin izler, kuru toprakta yüzeysel çizikler bırakır.' },
      { icon: '💩', t: 'Dışkı Analizi', d: 'Spiral bükülmüş dışkı, uç kısmı sivri ve tüy/kemik kalıntısı içerir.' },
      { icon: '🏃', t: 'Yürüyüş Deseni', d: 'Çapraz yürüyüş deseni, hız artınca dörtnala koşuya geçer.' },
    ],
  },
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🌆', t: 'Aktif Saatler', d: 'Alacakaranlıktan gece yarısına, bazen gün içinde de görülebilir.' },
      { icon: '🏡', t: 'İn Konumları', d: 'Toprağın altında kazılan inler veya çalılık kenarlarında korunaklı yerler.' },
      { icon: '🗣️', t: 'Sesleri', d: 'Köpek benzeri havlama, yüksek ses ilginç çığlık sesi bilhassa çiftleşme sezonunda.' },
      { icon: '📷', t: 'Fotoğraf Taktiği', d: 'Uzak mesafeden termal kamera veya şafak ışığında geniş açı lens kullanın.' },
      { icon: '🌱', t: 'Yem İstasyonu', d: 'Düzenli bırakılan yem ile tilki habitasyonunu evcilleştirmeden gözlemlenebilir.' },
    ],
  },
};

export default function FoxTracking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('track');
  const data = TABS[tab];
  const accent = '#c2410c';
  const bg = '#0c0200';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ffedd5', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦊 Tilki İz Takibi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#200800', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fb923c',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180400', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fdba74', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
