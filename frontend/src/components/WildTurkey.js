import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CALLS = [
  { name: 'Yelp', d: 'Temel hindi cagri. Kisa, yukseleyici sesler. Cift-gun cagrisinin temeli.' },
  { name: 'Cluck', d: 'Tek, kisa tik sesi. Sakinlestirici — yaklasan hindiyle temas saglar.' },
  { name: 'Purr', d: 'Alçak, surdurulen gurultu. Rahatlamis hindi sesi. Stres yok anlami.' },
  { name: 'Cutt', d: 'Agresif, kesik kesik yuksek ses. Disi avlama doneminde rekabetci etkisi.' },
  { name: 'Gobble', d: 'Erkek gobbling sesi. Cagri aleti ile yapmak riskli — diger avcilari ceker.' },
];

const TIPS = [
  { icon: '🌅', t: 'Saflak zamani', d: 'Gunesin dogusu: hindilar inip besilenmeye baslat. En iyi pencere.' },
  { icon: '🌿', t: 'Gizlenme', d: 'Agac koku kontrol. Hindi rengi gormez ama hareket algilama ustasi.' },
  { icon: '🦃', t: 'Cagri sikligi', d: 'Az cagir. Fazla ses dogal degil. Sessizlik sonra ani ses etkili.' },
  { icon: '📍', t: 'Konum', d: 'Hindi gels-i bekleme: erkek erkege gitmez — sen onu tuzaga cek.' },
];

export default function WildTurkey() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('calls');

  return (
    <div style={{ background: '#060804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦃 Yabani Hindi Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Cagri turleri · zamanlama · teknikler</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['calls','Cagrilar'],['tips','Teknikler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#0e1208', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'calls' && (
          <div style={{ background: '#0e1208', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🦃 Hindi Cagri Tipleri</div>
            {CALLS.map((c, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < CALLS.length-1 ? '1px solid #141a0c' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{c.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0e1208', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f59e0b22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
