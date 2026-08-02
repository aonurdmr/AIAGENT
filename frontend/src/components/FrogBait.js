import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  { icon: '🎣', t: 'Yüzey kurbağa yemi', d: 'Silikon veya plastik kurbağa — yüzeyden çekme hareketi. Sazan ve levrek.' },
  { icon: '🪝', t: 'Kanca kurulumu', d: 'Weedless kanca: yosun ve su bitkileri arasında takılmaz. Kurbağa yemi şart.' },
  { icon: '🌊', t: 'Çekme tekniği', d: 'Yavaş çek, dur, tekrar çek. Kurbağa gibi davrandır — yüzeyden vazgeçme.' },
  { icon: '🌿', t: 'En iyi spotlar', d: 'Nilüfer, saz, batıklar. Kurbağa yemi "kirli" sularda parlıyor.' },
];

const TIPS = [
  { icon: '🌅', t: 'Zaman', d: 'Sabah erken ve akşam — su yüzeyi sakin, levrek aktif.' },
  { icon: '🎨', t: 'Renk seçimi', d: 'Yeşil doğal sularda. Parlak sarı/portakal düşük ışıkta.' },
  { icon: '🐸', t: 'Gerçek kurbağa', d: 'Canlı kurbağa yayın balığı için mükemmel — hareket kendi kendine.' },
  { icon: '⚡', t: 'Vuruşta bekleme', d: 'Balık vurunca hemen kavrama. 1-2 saniye bekle, sonra kanca sapla.' },
];

export default function FrogBait() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');

  return (
    <div style={{ background: '#040a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐸 Kurbağa Yem Teknikleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yüzey yemi · kanca kurulumu · çekme tekniği</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['methods','Yöntemler'],['tips','Teknikler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0a1208', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'methods' && METHODS.map((m, i) => (
          <div key={i} style={{ background: '#0a1208', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #22c55e22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{m.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{m.d}</div>
              </div>
            </div>
          </div>
        ))}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0a1208', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #22c55e22' }}>
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
