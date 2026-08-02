import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  habitat: {
    title: 'Habitat',
    items: [
      { icon: '🐟', t: 'Somon Türkiye', d: 'Salmo trutta labrax: Karadeniz somonu. Büyük nehirlerde üreme göçü.' },
      { icon: '🌊', t: 'Nehir göçü', d: 'Denizden nehire: doğduğu yere döner. Ekim-Kasım piki. Zonguldak, Sakarya.' },
      { icon: '🏔️', t: 'Üreme alanı', d: 'Çakıl tabanlı sığ bölüm: yumurta bırakır. Soğuk, oksijenli su şart.' },
      { icon: '📅', t: 'Sezon', d: 'Eylül-Kasım: göç dönemi. Av büyük ölçüde yasak. Gözlem amaçlı git.' },
    ],
  },
  watch: {
    title: 'Gözlem',
    items: [
      { icon: '🌊', t: 'Atlama noktası', d: 'Şelale altı: somon atlayış efor gösterir. Sabah saatlerinde güneş.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Hızlı enstantane: 1/500s üzeri dondurma. Somon havada iken.' },
      { icon: '🎣', t: 'Yasal av', d: 'Kısıtlı izinle sport fishing. Doğal stok çok düşük. Serbest bırak.' },
      { icon: '🔬', t: 'Bilimsel değer', d: 'Nüfus araştırması: etikli balık bildirimi araştırmacılara yardım eder.' },
    ],
  },
};

export default function SalmonFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('habitat');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040010', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Somon Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Habitat · göç · gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#be123c' : '#080020', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#080020', borderRadius: 14, padding: 14, border: '1px solid #be123c33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #100030' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fda4af' }}>{item.t}</div>
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
