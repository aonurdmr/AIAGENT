import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  spots: {
    title: 'Noktalar',
    items: [
      { icon: '🌀', t: 'Burgaç', d: 'Dönen su alanı: alabalık ve sazan soluklanır. Yavaş akış kenarda kalır.' },
      { icon: '🪨', t: 'Kayalık geçit', d: 'Su hızlanır, oksijenlenir. Alabalık rapids altında durur.' },
      { icon: '🌿', t: 'Saz altı', d: 'Su bitkisi gölgesi: sıcaktan kaçan balık. Yavaş mayt veya nymph at.' },
      { icon: '🌊', t: 'Kavşak', d: 'İki akıntı birleştiği nokta: koku ve yem birikir. En verimli nokta.' },
    ],
  },
  season: {
    title: 'Sezon',
    items: [
      { icon: '🌸', t: 'İlkbahar', d: 'Kar suyu: bulanık, yüksek. Parlak mayt, renkli suni yem. Ağır jig.' },
      { icon: '☀️', t: 'Yaz', d: 'Düşük berrak su: ince misina, küçük yem. Sabah ve akşam aktif.' },
      { icon: '🍂', t: 'Sonbahar', d: 'Üreme öncesi beslenme piki. En aktif av sezonu. Büyük yem dene.' },
      { icon: '❄️', t: 'Kış', d: 'Yavaş termoklin altı: ağır jig dipten yavaş çek. Sabır gerekir.' },
    ],
  },
};

export default function RiverFishingMap() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('spots');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a08', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏞️ Nehir Avı Haritası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Noktalar · sezon · teknik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#065f46' : '#031008', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#031008', borderRadius: 14, padding: 14, border: '1px solid #065f4633' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #051810' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#34d399' }}>{item.t}</div>
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
