import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BIRDS = [
  { name: 'Büyük Ak Balıkçıl', n: 'Ardea alba', d: 'Beyaz, uzun boyun. Sığ su. Yavaş adımlarla balık avlar.' },
  { name: 'Gri Balıkçıl', n: 'Ardea cinerea', d: 'Gri, siyah kaş. Nehir ve gol. Yıl boyu Türkiye.' },
  { name: 'Küçük Batağan', n: 'Tachybaptus ruficollis', d: 'Küçük, kırmızı boyun yaz. Gölde dalar. Gizli uçar.' },
  { name: 'Sakarca Kazı', n: 'Anser albifrons', d: 'Kışlak. Sürü halinde. Delta ve göl kenarı çimen.' },
  { name: 'Leylek', n: 'Ciconia ciconia', d: 'Yaz göçmeni. Baca ve direk yuvası. Kurbağa avlar.' },
  { name: 'Turna', n: 'Grus grus', d: 'Göç kışlakçı. Kışın ovada sürü. Uzun çağrı sesi belirgin.' },
];

const TIPS = [
  { icon: '🌅', t: 'Sabah Gözlemi', d: 'Balıkçıllar sabah aktif. Leylek ve turnalar öğlenin termalinde yükselir.' },
  { icon: '🔭', t: 'Uzak Yaklaşım', d: 'Su kuşları ürkmeden uzaktan gözlem gerektirir. 200m minimum.' },
  { icon: '📍', t: 'Delta ve Ağızlar', d: 'Türkiye delta — Gediz, Kızılırmak, Göksu: uluslararası öneme sahip.' },
  { icon: '🚤', t: 'Tekne Gözlemi', d: 'Sessiz kürek veya elektrikli tekne — motor kuşu korkutur.' },
];

export default function WaterBirds() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('birds');

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦢 Su Kuşları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · habitat · gözlem teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['birds','Türler'],['tips','Gözlem']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#040e14', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'birds' && (
          <div style={{ background: '#040e14', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🦢 Su Kuşu Türleri</div>
            {BIRDS.map((b, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < BIRDS.length-1 ? '1px solid #081620' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#22d3ee' }}>{b.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{b.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{b.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#040e14', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #06b6d422' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#06b6d4' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
