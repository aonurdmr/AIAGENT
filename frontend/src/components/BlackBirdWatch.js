import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🐦‍⬛', t: 'Karatavuk', d: 'Turdus merula; erkek tamamen siyah, dişi kahverengi; turuncu gaga erkekte.' },
      { icon: '🎵', t: 'Ötüş', d: 'Sabah korosu sanatçısı; karmaşık, yankılı ötüş Nisan-Temmuz arası en yoğun.' },
      { icon: '🌳', t: 'Habitat', d: 'Bahçeler, parklar, orman kenarları ve meyve bahçeleri; şehirlere uyum sağlamış.' },
      { icon: '🥚', t: 'Üreme', d: 'Nisan-Temmuz 3-5 yumurta; kupkuru yaprak ve çamurla gizlenmiş yuva.' },
      { icon: '🍎', t: 'Beslenme', d: 'Solucan, böcek, meyve ve böğürtlen; bahçe toprağını eşeleyerek beslenme.' },
    ],
  },
  record: {
    title: 'Kayıt',
    items: [
      { icon: '📱', t: 'Merlin Uygulaması', d: 'Cornell Lab ses kaydı analizi ile ötüşten tür tespiti; ücretsiz ve güçlü.' },
      { icon: '🎙️', t: 'Ses Kaydı', d: 'Sabah erken saatlerde yarım saat kayıt; diğer seslerden ayrıştırma için.' },
      { icon: '📓', t: 'Gözlem Defteri', d: 'Tarih, saat, konum ve davranış notu; yıllar içinde fenoloji verisi oluşturur.' },
      { icon: '📊', t: 'eBird Girişi', d: 'Her gözlemi eBird platformuna girin; bilim için değerli uzun dönem veri.' },
      { icon: '📸', t: 'Fotoğraf', d: 'Dişi ve genç bireyleri kaydedin; tüy detayları tür ve yaş belirlemeyi kolaylaştırır.' },
    ],
  },
};

export default function BlackBirdWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#1d4ed8';
  const bg = '#000410';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐦 Karatavuk</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#000c24', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#001030', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
