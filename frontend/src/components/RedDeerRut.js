import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  rut: {
    title: 'Sürtme',
    items: [
      { icon: '🦌', t: 'Sürtme dönemi', d: 'Eylül-Ekim: kızıl geyik bağırma sezonu. Türkiye: Kaçkar ve Uludağ.' },
      { icon: '🔊', t: 'Bağırma', d: 'Erkek bağırtısı: derin, uzak mesafeden duyulur. Önce erken sabah.' },
      { icon: '🌲', t: 'Habitat', d: 'Yoğun ormanda beslenip açıklıkta sesi bulur. Geyik: ormandan çıkar.' },
      { icon: '⚠️', t: 'Güvenlik', d: 'Sürtme dönemi erkek tehlikeli: saldırabilir. 100m uzaktan izle.' },
    ],
  },
  watch: {
    title: 'Gözlem',
    items: [
      { icon: '🌅', t: 'Sabah erken', d: 'Gün doğumundan itibaren 2 saat: en aktif dönem. Akşam da iyi.' },
      { icon: '🔭', t: 'Dürbün', d: '10x42: orman açıklığını tara. Geyik açıkta otlar, gündüz ormana girer.' },
      { icon: '🌬️', t: 'Rüzgar', d: 'Rüzgarı arka al: koku fark ettirir. Geyik rüzgara göre konumlanır.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Boynuz: sonbahar lekeli ışıkta etkileyici. 400mm: güvenli mesafede.' },
    ],
  },
};

export default function RedDeerRut() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('rut');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060200', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦌 Kızıl Geyik Bağırması</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Sürtme · gözlem · güvenlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#92400e' : '#100600', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100600', borderRadius: 14, padding: 14, border: '1px solid #92400e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1a0e00' : 'none' }}>
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
