import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  clean: {
    title: 'Hazırlık',
    items: [
      { icon: '🔪', t: 'Yolma', d: 'Keklik ve hindi: sicak su (60°C) daldırma sonrası tuy yolma kolaylasır.' },
      { icon: '🧊', t: 'Dinclenme', d: 'Taze avlanan et: 12-24 saat buzdolabinda beklet. Et gevser, lezzet artar.' },
      { icon: '🧂', t: 'Marinasyon', d: 'Yaban hindi: agir etli kus. 24 saat salamura sert eti yumusatir.' },
      { icon: '🍋', t: 'Limon', d: 'Ayiklama sonrası limon suyu: kokuyu giderir, eti acitirir.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Yavaş pisirme', d: 'Yaban hindisi: uzun sureli dusuk isi. 150°C 3-4 saat nefis olur.' },
      { icon: '🏕️', t: 'Kamp tenceresi', d: 'Gogus eti ince dilim: yag + sogan + domates tencere gulasch.' },
      { icon: '🧅', t: 'Sogan-sarimsak', d: 'Yabani kus eti her zaman ihtiyac duyar: kavrulmus sogan temel tadi verir.' },
      { icon: '🌿', t: 'Ot dolmasi', d: 'Karin bosluguna: adacagi, kekik, limon kabuğu. Folyo ile kor ustunde.' },
    ],
  },
};

export default function TurkeyCooking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('clean');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦃 Yaban Hindi Pişirme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hazırlık · marinasyon · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#b45309' : '#120800', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#120800', borderRadius: 14, padding: 14, border: '1px solid #b4530933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1e1000' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{item.t}</div>
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
