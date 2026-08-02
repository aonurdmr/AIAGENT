import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Sabiki rig', d: 'Hamsi ve sardalya icin: sabiki donustu (minik kancalar). 3-6 kanca.' },
      { icon: '🌊', t: 'Akıntı okuma', d: 'Hamsi suru akintıyla gelir. Kiyida kopuk: hamsi var, iyidir.' },
      { icon: '🏔️', t: 'Derin nokta', d: 'Hamsi 0-30 m arasi: yuzey yakini aksamustu. Gece iskele altı.' },
      { icon: '🪣', t: 'Bol avlama', d: 'Hamsi: kucuk ve cok. 50-100 adet hedefle. Taze yem icin de kullanilir.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🍳', t: 'Tava tavasi', d: 'Un + tuz + baharat: derin yag da 3-4 dk. Krizlanti kizgin ve taze.' },
      { icon: '🧂', t: 'Tuzlama', d: 'Tuz kabi: kat kat hamsi + iri tuz. 1 ay: olgun taze tat peynirli.' },
      { icon: '🌿', t: 'Zeytinyagli', d: 'Firinda zeytinyagi + limon + maydanoz: 200°C 15 dk. Saglikli ve hafif.' },
      { icon: '🥖', t: 'Ekmek ustunde', d: 'Tuzlanmis hamsi + tereyagi + ekmek: Italyan tarz basit meze.' },
    ],
  },
};

export default function AnchoryFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Hamsi Avcılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · sürü · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0284c7' : '#04101a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04101a', borderRadius: 14, padding: 14, border: '1px solid #0284c733' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081a28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>{item.t}</div>
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
