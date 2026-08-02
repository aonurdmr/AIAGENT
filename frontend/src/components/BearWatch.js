import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  biology: {
    title: 'Biyoloji',
    items: [
      { icon: '🐻', t: 'Boz Ayı', d: 'Ursus arctos; Türkiye Karadeniz ormanlık dağlık bölgelerinde yaklaşık 1000 birey.' },
      { icon: '🌿', t: 'Beslenmesi', d: 'Omnivor; bal, meyveler, kozalak, böcek ve fırsatçı olarak küçük memeliler.' },
      { icon: '❄️', t: 'Kış Uykusu', d: 'Aralık-Mart arası inlerde düşük aktiviteli uyku; gerçek hibernasyon değil.' },
      { icon: '🏔️', t: 'Habitat', d: 'Karadeniz, Doğu Anadolu ve Toros dağlarının yoğun orman ve yayla alanları.' },
      { icon: '🐾', t: 'İz Özellikleri', d: 'Ön pençe izi 15-20 cm; 5 parmak ve tırnak izleri belirgin şekilde görünür.' },
    ],
  },
  safety: {
    title: 'Güvenlik',
    items: [
      { icon: '🔔', t: 'Ses Çıkarma', d: 'Yürürken konuşun veya zil kullanın; sürpriz karşılaşmayı önlemenin yolu.' },
      { icon: '🌬️', t: 'Koku Yönetimi', d: 'Yiyecekleri ayıdan uzakta saklayın; çadırda asla yiyecek bırakmayın.' },
      { icon: '🏃', t: 'Karşılaşmada', d: 'Sakince geri çekilin; koşmayın ve göz temasını sürdürün, küçük görünün.' },
      { icon: '💨', t: 'Ayı Spreyi', d: 'Biber gazlı ayı spreyi 9 metre etkili; rüzgar yönünü daima kontrol edin.' },
      { icon: '📱', t: 'Bildirim', d: 'Doğal Hayatı Koruma vakfına veya yerel ormancılık işletmesine görsel raporlayın.' },
    ],
  },
};

export default function BearWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('biology');
  const data = TABS[tab];
  const accent = '#78350f';
  const bg = '#0c0400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐻 Boz Ayı Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1e0800', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#d97706',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180600', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fbbf24', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
