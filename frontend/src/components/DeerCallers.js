import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CALLS = [
  { name: 'Bleat (Yavru sesi)', d: 'Dişi ve erkek yaklaşır. Plastik Bleat tüpü ile. Sürekli değil.' },
  { name: 'Rattle (Boynuz çarpması)', d: 'Dövüş simülasyonu. Baskın erkekleri çeker. Ekim-Kasım.' },
  { name: 'Grunt (Erkek homurtusu)', d: 'Kısa, derin ses. Bölge yakınındaki erkek merak eder.' },
  { name: 'Snort-Wheeze', d: 'Dominant erkek uyarısı. Rakip erkekler geri çekilir — dikkatli.' },
  { name: 'Doe Estrus', d: 'Çiftleşme dönemi dişi kokusu + ses. Kasım zirvesi.' },
];

const TIPS = [
  { icon: '📅', t: 'Dönem', d: 'Ekim-Kasım: rut dönemi — çağrı en etkili bu dönem.' },
  { icon: '💨', t: 'Rüzgar', d: 'Rüzgar sana doğru iken çağır. Koku yönetimi çağrıdan önce.' },
  { icon: '⏸️', t: 'Sabır', d: 'Çağrı sonrası en az 20-30 dakika bekle. Hareket etme.' },
  { icon: '🎯', t: 'Çağrı sıklığı', d: 'Fazla çağrı doğal değil. 3-4 dakikada bir, kısa.' },
  { icon: '📍', t: 'Pozisyon', d: 'Rüzgara karşı, yüksek pusuda — görme alanı ve koku yönetimi.' },
];

export default function DeerCallers() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('calls');

  return (
    <div style={{ background: '#060a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦌 Geyik Çağrısı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Çağrı türleri · zamanlama · teknik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['calls','Çağrılar'],['tips','Teknik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#0a1008', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'calls' && (
          <div style={{ background: '#0a1008', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🦌 Geyik Çağrı Türleri</div>
            {CALLS.map((c, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < CALLS.length-1 ? '1px solid #141a08' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{c.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0a1008', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f59e0b22' }}>
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
