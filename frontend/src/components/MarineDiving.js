import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  basics: {
    title: 'Temeller',
    items: [
      { icon: '🤿', t: 'Serbest Dalış', d: 'Nefes tutarak yapılan dalış; disk kayıkları, lagün ve berrak koy sularında ideal.' },
      { icon: '🅰️', t: 'SCUBA Dalısı', d: 'Tüplü dalış 18-40 metre derinliklere iner; PADI sertifikası gereklidir.' },
      { icon: '🌡️', t: 'Su Sıcaklığı', d: 'Ege denizinde yaz 26-28C; Karadeniz kıyısında daha soğuk, 20-24C.' },
      { icon: '🌊', t: 'Görüş Mesafesi', d: 'Akdeniz en iyi görüş; sağlıklı koşullarda 20-30 metre görüş mümkün.' },
      { icon: '⚠️', t: 'Güvenlik', d: 'Asla yalnız dalış; buddy sistemi, dive flag ve yüzey işaretleme zorunlu.' },
    ],
  },
  sites: {
    title: 'Lokasyonlar',
    items: [
      { icon: '🏝️', t: 'Bodrum Yarımadası', d: 'Berrak Ege suyuyla batık gemi ve antik liman kalıntıları dalgıçlar için efsane.' },
      { icon: '🌊', t: 'Kaş-Kekova', d: 'Su altı antik şehir kalıntıları ve mercan kayalıkları dünyaca ünlüdür.' },
      { icon: '🐟', t: 'Antalya Körfezi', d: 'Korunan körfez; yunus, kefal ve deniz kaplumbağası gözlemi mümkün.' },
      { icon: '⚓', t: 'Batıklar', d: 'İkinci Dünya Savaşı ve antik dönem batıkları Ege boyunca birçok noktada.' },
      { icon: '🌿', t: 'Posidonia Çayırları', d: 'Akdeniz denizotu çayırları biyoçeşitlilik açısından kritik; zarar vermeyiniz.' },
    ],
  },
};

export default function MarineDiving() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('basics');
  const data = TABS[tab];
  const accent = '#0c4a6e';
  const bg = '#000a14';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🤿 Deniz Dalışı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001828', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#38bdf8',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001c30', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#7dd3fc', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
