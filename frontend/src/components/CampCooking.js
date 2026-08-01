import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RECIPES = [
  {
    id: 'fire', name: 'Ateşte Pişirme', icon: '🔥', accent: '#f97316',
    method: 'Açık ateş ve köz',
    dishes: [
      { name: 'Domuz şiş', steps: 'Yağsız et — tuzla ov — kor ateşte döndür — 20 dak', time: '25 dak' },
      { name: 'Kamp çorbası', steps: 'Tencere — su kaynat — erişteler + kuru sebze + tuz', time: '15 dak' },
      { name: 'Köz patates', steps: 'Alüminyum folyoya sar — köze göm — 30 dak', time: '35 dak' },
      { name: 'Balık ızgara', steps: 'Temizle — tuzla — tel ızgaraya koy — köz üstünde 10 dak', time: '15 dak' },
    ],
    tip: 'Yağsız et daha az duman çıkarır — hayvanları çekmez.',
  },
  {
    id: 'stove', name: 'Kamp Ocağı', icon: '⛽', accent: '#3b82f6',
    method: 'Gaz veya alkol ocak',
    dishes: [
      { name: 'Yulaf ezmesi', steps: 'Su kaynat — yulaf ekle — 3 dak karıştır — fındık ekle', time: '5 dak' },
      { name: 'Pirinç + konserve', steps: 'Pirinç kaynat — konserve fasulye veya ton balığı karıştır', time: '20 dak' },
      { name: 'Makarna', steps: 'Tuzlu su kaynat — makarna pişir — hazır sos karıştır', time: '15 dak' },
      { name: 'Kahve', steps: 'Fransız presi veya Türk kahvesi — sıcak su + öğütülmüş kahve', time: '5 dak' },
    ],
    tip: 'Gaz tüp soğukta verim kaybeder — çadırda ısıt.',
  },
  {
    id: 'survival', name: 'Hayatta Kalma Mutfağı', icon: '🌿', accent: '#22c55e',
    method: 'Doğadan toplanarak',
    dishes: [
      { name: 'Papatyalı çay', steps: 'Taze papatya — kaynar suda 10 dak demlendirme', time: '15 dak' },
      { name: 'Isırgan çorbası', steps: 'Eldiven ile topla — kaynar suda blanch — tuzlu suda pişir', time: '20 dak' },
      { name: 'Kavrulmuş meşe palamudu', steps: 'Kavur — toksini azalır — un gibi öğüt — ekmek', time: '1 saat' },
      { name: 'Balık güveç', steps: 'Temizlenmiş balık + yabani ot — taş kapla — köze göm', time: '40 dak' },
    ],
    tip: 'Isırgan elleri yakar — kaynar suda 1 dak haşlama tozu etkisiz kılar.',
  },
];

const ESSENTIALS = [
  { item: 'Tuz + baharatlar', weight: '50g', note: 'Her yemekte gerekli — küçük şişe' },
  { item: 'Zeytinyağı', weight: '100ml', note: 'Pişirme + enerji kaynağı' },
  { item: 'Kuru erişteler', weight: '150g', note: 'Hızlı + hafif + doyurucu' },
  { item: 'Yulaf ezmesi', weight: '200g', note: 'Sabah enerjisi — uzun süre tok tutar' },
  { item: 'Fındık karışımı', weight: '100g', note: 'Yüksek kalori — snack' },
  { item: 'Çay / kahve', weight: '50g', note: 'Moral + ısı + kafeyin' },
];

export default function CampCooking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('recipes');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0704', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍳 Kamp Mutfağı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ateş · ocak · hayatta kalma mutfağı — tarif & malzeme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['recipes','Tarifler'],['essentials','Temel Malzeme']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#100a06', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'recipes' && RECIPES.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#100a06', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{r.method}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100a06', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  {r.dishes.map((d, i) => (
                    <div key={i} style={{ marginTop: 10, padding: '8px 10px', background: r.accent + '10', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: r.accent }}>{d.name}</div>
                        <div style={{ fontSize: 11, color: '#9ca3af' }}>⏱️ {d.time}</div>
                      </div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{d.steps}</div>
                    </div>
                  ))}
                  <div style={{ background: r.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {r.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'essentials' && (
          <div style={{ background: '#100a06', borderRadius: 14, padding: 14, border: '1px solid #f9731622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>🎒 Kamp Çantası Temel Gıdaları</div>
            {ESSENTIALS.map((e, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < ESSENTIALS.length-1 ? '1px solid #1a1008' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fed7aa' }}>{e.item}</div>
                  <div style={{ fontSize: 11, color: '#f97316' }}>{e.weight}</div>
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{e.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
