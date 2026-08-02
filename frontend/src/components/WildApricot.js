import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🍑', t: 'Yabani Kayisi', d: 'Prunus armeniaca; Anadolu nun anayurdu; Malatya ilinin mucizesi.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Haziran-Temmuz; meyve tam olgunlasinca daldan duser ya da kopar.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Yuvarlak parlak yapraklar; Mart-Nisan pembe-beyaz cicekler; pürüzsüz kabuk.' },
      { icon: '🧺', t: 'Toplama', d: 'Elle veya bez serip silkeleyerek; olgun meyveler birkaç günde kararır.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Dogu Anadolu dag etekleri; Malatya, Elazig, Erzincan; Orta Anadolu platosu.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🌞', t: 'Güneşte Kurutma', d: 'Kükürt olmadan doğal kurutma; koyu kahverengi ama kimyasalsız; Malatya usulü.' },
      { icon: '🍯', t: 'Reçel', d: 'Yabani kayısı reçeli çok çekirdekli ve yoğun; vanilya ile mükemmel.' },
      { icon: '🍑', t: 'Hoşaf', d: 'Kuruyemiş ve kuru kayısıyla pişirilmiş komposto; geleneksel sofralar.' },
      { icon: '🌰', t: 'Çekirdeği', d: 'Kayısı çekirdeği bitter badem tadında; pestodan içeceğe kullanılır; az yiyin.' },
      { icon: '🫙', t: 'Pestil', d: 'Püre halindeki kayısı ince yayılıp güneşte kurutulan meyve pestili.' },
    ],
  },
};

export default function WildApricot() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#ea580c';
  const bg = '#0c0200';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fff7ed', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍑 Yabani Kayısı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0800', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fb923c',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180600', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fdba74', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
