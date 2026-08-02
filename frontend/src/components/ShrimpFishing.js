import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  method: {
    title: 'Yöntem',
    items: [
      { icon: '🦐', t: 'Gece ışıklı', d: 'Karides ışığa gelir: el feneri ile sığlıkta. Net veya kepçe ile topla.' },
      { icon: '🎣', t: 'Tuzak sepet', d: 'Küçük sepet tuzak: balık başı yem. Sığ koy ve taşlık.' },
      { icon: '🌊', t: 'Kayalık arama', d: 'Taş altı: karides sığınır. Taşı nazikçe kaldır, kepçe hazır tut.' },
      { icon: '📍', t: 'Nokta', d: 'Deniz çayırı altı: doğal karides habitatı. Sığ ve sakin körfez.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Kavurma', d: 'Tereyağı + sarımsak: yüksek ateş 3 dk. Kabuğuyla pişirmek daha lezzetli.' },
      { icon: '🍋', t: 'Haşlama', d: 'Tuzlu kaynar su: 2 dk. Hemen buz suya: pişirme durur, renkli kalır.' },
      { icon: '🌶️', t: 'Baharat', d: 'Kırmızı biber + limon: deniz ürünü klasiği. Sarımsak ekmeğiyle servis.' },
      { icon: '⚠️', t: 'Tazelik', d: 'Karides en hızlı bozulan: pişir ya da 1 saat içinde buzla muhafaza et.' },
    ],
  },
};

export default function ShrimpFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('method');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080000', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦐 Karides Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yöntem · nokta · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#9f1239' : '#140200', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#140200', borderRadius: 14, padding: 14, border: '1px solid #9f123933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1e0400' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fb7185' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
