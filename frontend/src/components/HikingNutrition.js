import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  food: {
    title: 'Besin',
    items: [
      { icon: '🥜', t: 'Trail mix', d: 'Fındık + kuru meyve + çikolata: kalori yoğun, hafif. 100g = 550 kcal.' },
      { icon: '🍫', t: 'Enerji barı', d: 'Karbonhidrat + protein: 1 saat öncesi tüket. Aktivite süresince küçük porsiyonlar.' },
      { icon: '🫙', t: 'Fıstık ezmesi', d: 'Protein + yağ: uzun süreli enerji. Kraker ile taşıması kolay.' },
      { icon: '🥩', t: 'Kurutulmuş et', d: 'Jerky: protein + tuz. Elektrolit kaybı için tuz önemli. Hafif.' },
    ],
  },
  hydrate: {
    title: 'Hidrasyon',
    items: [
      { icon: '💧', t: 'Su hesabı', d: 'Saatte 500ml minimum. Sıcak + çıkış: 1L. Susuzluk hissi geç gelir.' },
      { icon: '🧂', t: 'Elektrolit', d: 'Terleme: tuz, potasyum, magnezyum kaybı. Tablet veya tuzlu atıştıralık ekle.' },
      { icon: '🫖', t: 'Çay', d: 'Bitki çayı: hidrasyon + mental toparlanma. Kafein dikkat: fazlası diüretik.' },
      { icon: '⚠️', t: 'Aşırı su', d: 'Hiponatremi: çok su az tuz. Semptom: baş ağrısı, bulantı. Dengeli tut.' },
    ],
  },
};

export default function HikingNutrition() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('food');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🥜 Yürüyüş Beslenmesi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Besin · hidrasyon · enerji</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a16207' : '#0e0c00', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0e0c00', borderRadius: 14, padding: 14, border: '1px solid #a1620733' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1a1800' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fde047' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
