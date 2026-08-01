import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  { name: 'Adi deniz salyangozu', d: 'Kayaliklarda. Siyah koni kabuk. 3-5cm. Merak sahibi — hareketsiz dur, gelir.' },
  { name: 'Mureks (Dikenkabuklu)', d: 'Derin sakin su. Boyasever — tarihi boya kaynagi. Yenilebilir ama nadir.' },
  { name: 'Turbulus (Yonca kabuklu)', d: 'Orta boy, agir kabuk. Lezzetli et. Orta Akdeniz kiyilarinda.' },
  { name: 'Haliotis (Deniz kulagi)', d: 'Duz, oval. Kayaya yapisik. Kalkmasini bekleme — hizli hareket eder.' },
];

const TIPS = [
  { icon: '🌊', t: 'En iyi gelgit', d: 'Alçak gelgit: kayalar cikar. 30dk oncesinden konum al.' },
  { icon: '🧂', t: 'Haslama', d: 'Tuzlu suda 15-20 dk. Kimyon veya defne yapragiyla. Kürdan ile cekilir.' },
  { icon: '🏺', t: 'Izgara', d: 'Kabukta direkt ates uzerine. Kendi suyu ile pisir. Zerdeçal ve limon.' },
  { icon: '📏', t: 'Toplanabilir boy', d: 'Minimum 3 cm. Kucukleri bırak, buyumeye birak.' },
  { icon: '🌡️', t: 'Temizlik', d: 'Soguğu suda 2 saat beklet — kiri bosaltir. Sonra hasla.' },
];

export default function SeaSnail() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐚 Deniz Salyangozları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Turler · toplama · pişirme rehberi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['species','Turler'],['tips','Toplama & Pisirme']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#06101a', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && (
          <div style={{ background: '#06101a', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🐚 Yenilebilir Turler</div>
            {SPECIES.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SPECIES.length-1 ? '1px solid #0c1c28' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#67e8f9' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#06101a', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #06b6d422' }}>
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
