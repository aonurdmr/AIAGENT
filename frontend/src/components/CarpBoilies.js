import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RECIPES = [
  { name: 'Mısır Bazlı', ing: 'Mısır unu · yumurta · mısır aroması', d: 'Klasik sazan yemi. Yaz-sonbahar. Sarı renk dikkat çeker.' },
  { name: 'Karaciğer Boilies', ing: 'Dana karaciğer · buğday gluten · yumurta', d: 'Kış ve soğuk su. Yüksek protein. Derin koku yayılımı.' },
  { name: 'Meyve Karışımı', ing: 'Çilek aroması · hindistancevizi · melas', d: 'Yüksek karamel koku. Tatlı aroma düşük sıcaklıkta azalır.' },
  { name: 'Balık Unu', ing: 'Sardalye unu · halibut · yumurta', d: 'En etkili protein yemi. Her mevsim. Yırtıcıyı da çekebilir.' },
];

const TIPS = [
  { icon: '🫙', t: 'Dip Çekici (Dip)', d: 'Boilies pişirilir, 24 saat dipte bekletilir. Koku katmanlanır.' },
  { icon: '🌡️', t: 'Suda Çözünme', d: 'Soğuk suda koku dağılımı yavaş. Kış için pop-up tercih et.' },
  { icon: '📏', t: 'Boyut Seçimi', d: '10mm küçük: hızlı tüketim. 20mm büyük: irice sazan filtreler.' },
  { icon: '🎣', t: 'Pop-up vs. Dip', d: 'Pop-up: dipte görünür. Dip boilies: sazan taban tarar.' },
  { icon: '🧊', t: 'Saklama', d: 'Taze: buzdolabı 2 hafta. Dondurulmuş 6 ay. Güneşte bozulur.' },
];

export default function CarpBoilies() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('recipes');

  return (
    <div style={{ background: '#060804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Boilies Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tarif · teknik · saklama</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['recipes','Tarifler'],['tips','Teknik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#0e1008', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'recipes' && (
          <div style={{ background: '#0e1008', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🎣 Boilies Tarifleri</div>
            {RECIPES.map((r, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < RECIPES.length-1 ? '1px solid #161208' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>{r.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>{r.ing}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{r.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0e1008', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f59e0b22' }}>
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
