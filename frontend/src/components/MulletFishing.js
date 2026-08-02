import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  fishing: {
    title: 'Avcılık',
    items: [
      { icon: '🐟', t: 'Kefal', d: 'Mugil cephalus ve Chelon labrosus; saglikli su gostergesi; kiyi bolgelerinde.' },
      { icon: '🎣', t: 'Yöntemler', d: 'Fanyalı olta, serpme ağ ve deniz kalıbı; kefal en çok ekmek kırıntısı yemi sever.' },
      { icon: '🌅', t: 'En İyi Saat', d: 'Sabah erken ve akşam saatleri yüzey beslenme aktivitesi en yüksek.' },
      { icon: '🌊', t: 'Lokasyonlar', d: 'Liman ağızları, bataklık deltalari ve kirlenmiş olmayan iç körfezler.' },
      { icon: '📏', t: 'Yasal Boyut', d: 'Minimum 20 cm; üst boyut sınırı yok; yoğun balıkçılık bölgelerinde kota.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Tuzlu Kefal', d: 'Tuz kabuğuna sarılmış fırın kefal; nemini koruyarak mükemmel pişirme.' },
      { icon: '🥚', t: 'Havyar', d: 'Kefal yumurtası (botargo) tuzlanıp kurutularak Türk-İtalyan lüks ürünü.' },
      { icon: '🍋', t: 'Zeytinyağlı', d: 'Sarımsak, dereotu ve limon suyu ile ızgara; Ege kıyılarının klasiği.' },
      { icon: '🧅', t: 'Tencere', d: 'Soğan ve domates ile yavaş pişirme; kılçık erimeye başlar, eti yumuşar.' },
      { icon: '🫙', t: 'Marine', d: 'Sirke, kekik ve defne yaprağıyla sirkeli kefal; meze olarak servis.' },
    ],
  },
};

export default function MulletFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fishing');
  const data = TABS[tab];
  const accent = '#0891b2';
  const bg = '#000c14';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#cffafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐟 Kefal Rehberi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001828', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#22d3ee',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001e30', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#67e8f9', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
