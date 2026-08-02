import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  locations: {
    title: 'Lokasyonlar',
    items: [
      { icon: '🗺️', t: 'Mağara Balığı', d: 'Doğu Anadolu mağara sistemleri; yeraltı akarsularında körleşmiş özel türler.' },
      { icon: '🌊', t: 'Yeraltı Suları', d: 'Karstik alanlarda yüzey sulara bağlı yeraltı nehirleri; Toros sismik alanlar.' },
      { icon: '🔦', t: 'Işıksız Ortam', d: 'Mağara balıkları görme organını yitirmiş; titreşim duyusu gelişmiş.' },
      { icon: '🏔️', t: 'Toroslar', d: 'Toros karstı kapsamlı mağara sistemi; Antalya-Mersin arası yoğun.' },
      { icon: '🧪', t: 'Bilimsel Önemi', d: 'Endemik körbalık türleri biyoçeşitlilik araştırması için kritik öneme sahip.' },
    ],
  },
  cave: {
    title: 'Dalış',
    items: [
      { icon: '🤿', t: 'Mağara Dalışı', d: 'Sertifikalı mağara dalıcı eğitimi zorunlu; acemi için kesinlikle girilmez.' },
      { icon: '🔦', t: 'Ekipman', d: 'Üç bağımsız ışık kaynağı; yedek tüp ve rehber ip şart; hiç taviz yok.' },
      { icon: '🧲', t: 'Yön Bulma', d: 'Mağarada kaybolmak ölüm riski; ip bırakma ve planlı dalış zorunlu.' },
      { icon: '🌡️', t: 'Su Sıcaklığı', d: 'Yeraltı suları 12-16°C; uzun dalışlarda drysuit; hipotermi riski ciddi.' },
      { icon: '👤', t: 'Eğitim', d: 'CMAS veya PADI mağara sertifikasyonu; Türkiye aktif mağara dalış kursları.' },
    ],
  },
};

export default function CaveFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('locations');
  const data = TABS[tab];
  const accent = '#374151';
  const bg = '#040404';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f3f4f6', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🔦 Mağara Balığı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#0e0e0e', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#111111', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
