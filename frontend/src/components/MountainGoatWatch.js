import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  biology: {
    title: 'Biyoloji',
    items: [
      { icon: '🐐', t: 'Yaban Kecisi', d: 'Capra aegagrus; Tur kecisi Anadolu daglarinin en heyecan verici yerel turudur.' },
      { icon: '🏔️', t: 'Habitat', d: 'Dikik kayaliklar, uçurumlar ve 1500-3500 metre arasi daglik bolgeler.' },
      { icon: '🌿', t: 'Beslenmesi', d: 'Ot, otsu bitkiler, kabuk ve genc sursunler daglik habitatta bulabilecegi her sey.' },
      { icon: '🦌', t: 'Boynuzlar', d: 'Erkek tur kecisi yillik buyuyen geri eğimli sicimli uzun boynuzlariyla taninir.' },
      { icon: '🔴', t: 'Tehlike', d: 'Habitat kaybi ve kacak avcilik tur kecisini IUCN\'de gueçli tehlikede listesine koymustur.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '📍', t: 'Lokasyonlar', d: 'Munzur Dag Milli Parki, Kackar Daglari ve Bolkar yaylalari en iyi bolgelerdir.' },
      { icon: '🔭', t: 'Optik', d: '10x50 durbun ve geniş alan teleskop yuksek kayalık gozlemi icin idealdir.' },
      { icon: '🌅', t: 'En Iyi Vakit', d: 'Sabah ve aksam; ortaogleden sonra kayaliklar golgede kalinca gozlem zorlesir.' },
      { icon: '📸', t: 'Fotografi', d: '500-800mm lens ve hizli kisim süreci dagda hareket eden hayvan icin gerekmektedir.' },
      { icon: '⚠️', t: 'Koruma', d: 'Avlama tamamen yasaktir; gozlem calismalari doganin icinde yakin temastan kacinin.' },
    ],
  },
};

export default function MountainGoatWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('biology');
  const data = TABS[tab];
  const accent = '#374151';
  const bg = '#060606';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f9fafb', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐐 Yaban Keçisi Gözlemi</span>
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
