import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Dip olta', d: 'Camur dibinde sazan ve yayinbalik: agir kursunum ile dip arama teknigi.' },
      { icon: '🪱', t: 'Solucan yemi', d: 'Camurlu sular icin dogal yem: solucan + mısır kombinasyonu ideal.' },
      { icon: '🌊', t: 'Akıntı okuma', d: 'Camurlu nehirde akıntı yonu: balik her zaman akıntı karsısına bakar.' },
      { icon: '⚓', t: 'Agir sinker', d: 'Camur dibinde tutsun: 30-60g kursunum. Yumusak zemin icin genis uç.' },
    ],
  },
  spots: {
    title: 'Noktalar',
    items: [
      { icon: '🌀', t: 'Girdap arkası', d: 'Nehir bükümlerinin ic tarafi: camur birikir, balik yem bulur.' },
      { icon: '🌿', t: 'Batak kenari', d: 'Batak kenarı sazan cennetidir: yem bol, gizlenme alanı fazla.' },
      { icon: '🏗️', t: 'Kopru ayagi', d: 'Beton ayak dibinde camur + golgede sazan ve kefal bekler.' },
      { icon: '🌾', t: 'Saplaklık', d: 'Koy icindeki sapaklik: balik yemini saglar ve avcidan saklar.' },
    ],
  },
};

export default function MudFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🟤 Çamurlu Su Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · noktalar · yem seçimi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a16207' : '#100c00', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100c00', borderRadius: 14, padding: 14, border: '1px solid #a1620733' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1c1600' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#d97706' }}>{item.t}</div>
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
