import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '⚓', t: 'Demirli tekne', d: 'Akıntıya karşı demirle: yem doğal süzülür. Zemin haritasına bak.' },
      { icon: '🎣', t: 'Trolling', d: 'Yavaş hareket: lure sürükle. Palamut, kolyoz için etkili. 2-4 knot.' },
      { icon: '🌊', t: 'Derin su jigging', d: '80-200m: metal jig, hızlı kalkış. Orkinos ve kılıç noktası.' },
      { icon: '🦈', t: 'Canlı yem', d: 'Sandal altına düşür: hamsi, istavrit. Büyük predatörler çeker.' },
    ],
  },
  safety: {
    title: 'Güvenlik',
    items: [
      { icon: '🦺', t: 'Can yeleği', d: 'Herkes için can yeleği zorunlu. Dalga aniden değişir. Hava tahmini.' },
      { icon: '📡', t: 'İletişim', d: 'VHF telsiz: denizde tek güvenilir. GSM kapsama alanı dışında olabilir.' },
      { icon: '🗺️', t: 'Konum', d: 'GPS koordinatı paylaş: kıyıya bırak. Her çıkışta güncel koordinat.' },
      { icon: '⛅', t: 'Hava', d: 'Poyraz, lodosa dönüşüm: aniden dalgalanır. Kıyıya dön, önce güvenlik.' },
    ],
  },
};

export default function BoatFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#010810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛵ Tekne Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · trolling · güvenlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#1e40af' : '#021020', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#021020', borderRadius: 14, padding: 14, border: '1px solid #1e40af33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #031830' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>{item.t}</div>
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
