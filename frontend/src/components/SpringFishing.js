import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  spots: {
    title: 'Noktalar',
    items: [
      { icon: '🌊', t: 'Nehir agzi', d: 'Ilkbaharda balik nehir agizlarinda yoğunlasir. Akarsu + durgun su gecisi.' },
      { icon: '🌿', t: 'Sazlik kenari', d: 'Su bitkileri filizlenince balik saklanir. Sazlik kenarinda yem birakin.' },
      { icon: '🪨', t: 'Tas alti', d: 'Ilkbaharda suyun isi dengesiz: balik tas alti girintilerinde isinan su arar.' },
      { icon: '🌸', t: 'Cicek agaci alti', d: 'Nehir uzerindeki agaclar ciceklenince bocekler duser: balik bekler.' },
    ],
  },
  tips: {
    title: 'Teknikler',
    items: [
      { icon: '🪱', t: 'Solucan yemi', d: 'Ilkbahar yagmurlari solucan cikartir: dogal yem. Taze topraktan topla.' },
      { icon: '🎣', t: 'Yuzey yem', d: 'Su isindikca balik yukari cikar. Floating lure ile yuzey avlanmasi verimli.' },
      { icon: '⏰', t: 'Sabah erken', d: 'Ilkbahar sabahi 07-10 arasi: su serin, balik aktif. Aksam ikinci sirada.' },
      { icon: '🌡️', t: 'Su sicakligi', d: '12-16°C: levrek ve sazan en aktif. Termometre kullanarak ideal noktayi bul.' },
    ],
  },
};

export default function SpringFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('spots');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌸 İlkbahar Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Noktalar · teknikler · mevsim ipuçları</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#34d399' : '#040e08', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#040e08', borderRadius: 14, padding: 14, border: '1px solid #34d39933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081a10' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#6ee7b7' }}>{item.t}</div>
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
