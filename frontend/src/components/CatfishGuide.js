import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Dip olta', d: 'Yayinbalik dip sever: agir sinker, koku yayilan yem. Gece aktif.' },
      { icon: '🌙', t: 'Gece avcilik', d: 'Yayinbalik: gece cikip dip arar. Gece 22-02 en verimli saatler.' },
      { icon: '🍖', t: 'Koku yemi', d: 'Koku yayan yemler: bozulmus et, peynir, kan. Yayinbalik bulur.' },
      { icon: '💪', t: 'Guc', d: 'Buyuk yayinbalik: 50kg+ olabilir. Sarkin olta, fren sistemi dogrulanmis ol.' },
    ],
  },
  spots: {
    title: 'Noktalar',
    items: [
      { icon: '🌀', t: 'Derin havuz', d: 'Nehir bükumu dip havuzu: yayinbalik gun boyunca burada durur.' },
      { icon: '🪵', t: 'Batan agac', d: 'Dalgıca batan agac altı: yayinbaligi ilgi ceker, saklanma nokta.' },
      { icon: '🌡️', t: 'Sicak su', d: 'Gunes goren sığ: yayinbalik sabah burada isinmak ister. Sabah ilk.' },
      { icon: '🔀', t: 'Akarsu bilesimi', d: 'Iki nehrin birlestigi nokta: yayinbalik yem yogunlugunda bekler.' },
    ],
  },
};

export default function CatfishGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#04080a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Yayın Balığı Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · noktalar · gece avcılığı</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#374151' : '#0c1014', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c1014', borderRadius: 14, padding: 14, border: '1px solid #37415133' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #141a20' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af' }}>{item.t}</div>
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
