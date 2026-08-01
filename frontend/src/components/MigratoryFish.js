import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FISH = [
  { name: 'Lüfer', n: 'Bluefish', d: 'İstanbul Boğazı goc. Eylül-Kasım. Sürü halinde. Jig ve minnow.' },
  { name: 'Palamut', n: 'Atlantic Bonito', d: 'Yazın Karadeniz, kışın Ege. Boğazda geçiş. Hızlı trol.' },
  { name: 'Torik', n: 'Bluefin Tuna (juvenile)', d: 'Genç orkinos. Yaz Karadeniz. Canlı yem veya büyük jig.' },
  { name: 'Kılıç Balığı', n: 'Swordfish', d: 'Yaz aylarında Ege ve Akdeniz. Gece yüzey. Uzun olta.' },
  { name: 'Alabalık (Dere)', n: 'Brown Trout', d: 'Kış-ilkbahar yumurtlama için ırmak yukarı göc. Doğal akarsuda.' },
];

const TIPS = [
  { icon: '🗓️', t: 'Zamanlama', d: 'Boğaz geçişlerini yerel balıkçı derneklerinden ve takvimlerden öğren.' },
  { icon: '🌊', t: 'Akıntı Takibi', d: 'Göç akıntıyla. Rüzgar yönü değişince geçiş gecikir.' },
  { icon: '🐟', t: 'Sürü Sinyali', d: 'Martı ve deniz kuşu yoğunluğu sürünün üstünde. Hızla git.' },
  { icon: '🎣', t: 'Ekipman', d: 'Hızlı jig veya trol. Tek iğne barbsiz — büyük balık zararlanmasın.' },
  { icon: '⚖️', t: 'Kota', d: 'Göç balıklarında kota ve boy sınırı — yerel mevzuat değişir.' },
];

export default function MigratoryFish() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fish');

  return (
    <div style={{ background: '#020a10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Göç Eden Balıklar</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · zamanlama · av teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['fish','Türler'],['tips','Av İpuçları']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#040e14', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'fish' && (
          <div style={{ background: '#040e14', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🐟 Göç Eden Türler</div>
            {FISH.map((f, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < FISH.length-1 ? '1px solid #081420' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#22d3ee' }}>{f.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{f.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{f.d}</div>
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
