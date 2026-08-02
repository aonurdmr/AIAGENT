import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  { icon: '🎣', t: 'Zıpkın', d: 'En geleneksel yöntem. Düz tüp veya kamlık. Gece dalısı avantajlı.' },
  { icon: '🪝', t: 'Tuzak (Fanus)', d: 'Porselen veya plastik fanus: ahtapot yuvalama kovuğu sever.' },
  { icon: '🎨', t: 'Egri Kalem Yemi', d: 'Plastik yem + taş. Sığ suda sürüt — merak eder ve sarılır.' },
  { icon: '🌊', t: 'Kıyı Kayalık', d: 'Alçak gelgit: kayaların altını bak. Elle yakalama mümkün.' },
];

const TIPS = [
  { icon: '🌙', t: 'Gece Avı', d: 'Gece: daha aktif, daha cesur. Dalıcı feneri ile kayalık keşfi.' },
  { icon: '📏', t: 'Boy Sınırı', d: 'Türkiye: minimum 750g. Küçükleri bırak.' },
  { icon: '🧠', t: 'Davranış', d: 'Renk değişimi tehlike işareti. Mürekkep fışkırması kaçış tepkisi.' },
  { icon: '🍳', t: 'Temizlik', d: 'Tutunduktan sonra hemen baş içini temizle. Mürekkep kesesi ayrı.' },
  { icon: '🎲', t: 'Dövme', d: 'Ahtapotu taşa çarp 30-40 kez: kasları gevşer, pişirmesi kolaylaşır.' },
];

export default function OctopusGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐙 Ahtapot Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yöntemler · ipuçları · temizleme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['methods','Yöntemler'],['tips','İpuçları']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#06101a', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'methods' && METHODS.map((m, i) => (
          <div key={i} style={{ background: '#06101a', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f9730622' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{m.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{m.d}</div>
              </div>
            </div>
          </div>
        ))}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#06101a', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f9730622' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
