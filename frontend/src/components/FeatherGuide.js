import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FEATHERS = [
  { name: 'Kanat tüyü', d: 'Asimetrik. Uzun ve sert. Uçuş için. Türe göre uzunluk ve şekil değişir.' },
  { name: 'Kuyruk tüyü', d: 'Daha simetrik. Manevra için. Kavşak çizgisi merkez.' },
  { name: 'Örtü tüyü', d: 'Küçük, gövde kaplar. Izolasyon ve su tutmazlık.' },
  { name: 'Tüy (ince)', d: 'Yumuşak, kozanağa benzer. Isı tutma. Yavru ve kış.' },
  { name: 'Tarak tüy', d: 'Tüy gövdesi çatallı. Baykuşta ses yutucu özellik.' },
];

const ID_TIPS = [
  { icon: '🔍', t: 'Şekil ve Asimetri', d: 'Kanat = asimetrik. Kuyruk = simetrik. Birinci kural.' },
  { icon: '🎨', t: 'Renk ve Desen', d: 'Renkten tür tahmini. Yine de DNA kimliği için dikkatli ol.' },
  { icon: '📏', t: 'Boyut', d: 'Uzunluk ile tür sınırını dar. Yavru tüyü küçüktür.' },
  { icon: '🦅', t: 'Bağlam', d: 'Nerede buldun? Habitata göre tür havuzu daralır.' },
  { icon: '⚖️', t: 'Yasal not', d: 'Türkiye\'de koruma altındaki türlerin tüyünü toplamak yasak olabilir.' },
];

export default function FeatherGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');

  return (
    <div style={{ background: '#060806', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪶 Tüy Tanıma Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tüy türleri · tanıma ipuçları</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['types','Tüy Türleri'],['tips','Tanıma']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a78bfa' : '#0c0e0c', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'types' && (
          <div style={{ background: '#0c0e0c', borderRadius: 14, padding: 14, border: '1px solid #a78bfa33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 10 }}>🪶 Tüy Tipleri</div>
            {FEATHERS.map((f, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < FEATHERS.length-1 ? '1px solid #141414' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#c4b5fd' }}>{f.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{f.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && ID_TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0c0e0c', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #a78bfa22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
