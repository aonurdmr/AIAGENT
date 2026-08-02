import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  { name: 'Yeşil Kertenkele', n: 'Lacerta viridis', d: 'Parlak yeşil erkek. Çalılık ve kayalık. Güneşlenir.' },
  { name: 'Duvar Kertenkelesi', n: 'Podarcis muralis', d: 'Gri-kahve. Duvar ve taş arasında. Çok hızlı.' },
  { name: 'Camgöz Skink', n: 'Chalcides ocellatus', d: 'Gümüş benekli. Yumuşak zemin. Yüzücü hareketi.' },
  { name: 'Krallıburunlu Keler', n: 'Agama stellio', d: 'Büyük, dikenli. Kaya ve taş duvarda güneşleme.' },
  { name: 'Sürünen Kertenkelesi', n: 'Ablepharus kitaibelii', d: 'Küçük, parlak. Taş altı ve kuru ot. Göz kapağı yok.' },
];

const TIPS = [
  { icon: '☀️', t: 'Güneşlenme Zamanı', d: 'Sabah 10-12 arası. Soğuktan sonra güneşlenme zorunlu.' },
  { icon: '🪨', t: 'Habitat', d: 'Taş, duvar, kayalık: güneşleme ve saklanma birlikte bulur.' },
  { icon: '🎯', t: 'Yaklaşım', d: 'Yavaş, alçak, doğrusal değil açılı. Raptiye taşı gerisinden.' },
  { icon: '📸', t: 'Fotoğraf', d: 'Odak: göz. Hızlı netleme — kaçmadan bir saniye.' },
];

export default function LizardGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');

  return (
    <div style={{ background: '#060a02', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦎 Kertenkele Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye kertenkeleleri · habitat · gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['species','Türler'],['tips','Gözlem']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0c1004', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && (
          <div style={{ background: '#0c1004', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🦎 Türkiye Kertenkelesi</div>
            {SPECIES.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SPECIES.length-1 ? '1px solid #141c08' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{s.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0c1004', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #22c55e22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
