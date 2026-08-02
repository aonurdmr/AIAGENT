import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OWLS = [
  { name: 'Kukumav', n: 'Tyto alba', d: 'Kalp yüzlü. Ambar ve kilise kulesinde. Sessiz uçuş. Kemirgen avcısı.' },
  { name: 'Puhu', n: 'Bubo bubo', d: 'En büyük baykuş. Kulak tüyleri. Alacakaranlık mağara. Tavşan ve tilki bile avlar.' },
  { name: 'Küçük Baykuş', n: 'Athene noctua', d: 'Küçük, sarı gözlü. Gündüz de aktif. Kaya ve duvar kovuğu.' },
  { name: 'Uzun Kulaklı Baykuş', n: 'Asio otus', d: 'Orman içi. Uzun kulak tüyü. Kış sürü davranışı nadir.' },
  { name: 'Ormankuşu Baykuşu', n: 'Strix aluco', d: 'Çizgili, büyük. Orman içi. Hoot sesi tipik.' },
];

const TIPS = [
  { icon: '🌙', t: 'Gece Gözlemi', d: 'Güneş battıktan 30 dakika — baykuş aktivite başlangıcı.' },
  { icon: '🎙️', t: 'Ses Tanıma', d: 'Her türün özgün sesi. Ses kaydedici ile arazi tanımlama.' },
  { icon: '🔦', t: 'Kırmızı Işık', d: 'Kırmızı led gece görüşünü bozmaz. Baykuşu da az etkiler.' },
  { icon: '🏚️', t: 'Habitat', d: 'Eski köy binaları, kilise kuleleri — kukumav için arama yeri.' },
  { icon: '📦', t: 'Kutu', d: 'Kukumav için standart kutu kurulumu — popülasyonu destekler.' },
];

export default function OwlGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('owls');

  return (
    <div style={{ background: '#04040e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦉 Baykuş Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye baykuşları · habitat · gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['owls','Türler'],['tips','Gözlem']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a78bfa' : '#080818', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'owls' && (
          <div style={{ background: '#080818', borderRadius: 14, padding: 14, border: '1px solid #a78bfa33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 10 }}>🦉 Türkiye Baykuşları</div>
            {OWLS.map((o, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < OWLS.length-1 ? '1px solid #0e0e1e' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#c4b5fd' }}>{o.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{o.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{o.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#080818', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #a78bfa22' }}>
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
