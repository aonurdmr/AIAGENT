import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPOTS = [
  {
    id: 'structure', name: 'Su Altı Yapısı', icon: '🪨', accent: '#a78bfa',
    desc: 'Balık nerede gizlenir — yapı okuma',
    points: [
      'Batık ağaç ve dal — gölge + korunma + yem mirası',
      'Su altı kayalık — levrek ve lahoz barınma yeri',
      'Dip çukurları — ağır akıntıdan korunma, sazan toplar',
      'Su altı sırt (ridge) — akıntı kırıcı, balık bekler',
      'Beton köprü ayakları — gölge + yem tuzağı',
    ],
    tip: 'Eko sonar olmadan: rıhtım veya kayanın ucuna zıpkın at — yapıyı say.',
  },
  {
    id: 'vegetation', name: 'Su Bitkisi & Alg', icon: '🌿', accent: '#22c55e',
    desc: 'Bitki örtüsü balık yaşam alanı oluşturur',
    points: [
      'Saz yatakları — sazan, levrek, yılan balığı barınır',
      'Su zambağı gölgesi — oksijen + gölge, sıcakta levrek',
      'Yosun sınırı — yem balığı burada, predatör dışta bekler',
      'Temiz-kirli su sınırı — bulanık sulardan gelen besin',
      'Alg patlamasında balık dibe çekilir — dip yemi kullan',
    ],
    tip: 'Saz yatağının kenarına at — içine değil. Yem takılır, balık kenarda bekler.',
  },
  {
    id: 'flow', name: 'Akıntı Noktaları', icon: '💧', accent: '#06b6d4',
    desc: 'Su hareketi balığı yönlendirir',
    points: [
      'Akıntı kırıcı taş arkası — balık burada saatlerce bekler',
      'İki akıntının buluşması — girdap içi, yem birikir',
      'Şelale altı — oksijen yüksek, alabalık favori',
      'Nehrin iç büklümü — sığ, yavaş — balık dinlenme alanı',
      'Dışa bükülüm — derin, hızlı — büyük predatör bekleme',
    ],
    tip: 'Akıntının 3m gerisinde sabırla bekle — balık yorulunca yer.',
  },
  {
    id: 'season_spots', name: 'Mevsimsel Konum', icon: '📅', accent: '#f59e0b',
    desc: 'Mevsime göre balık nereye gider',
    points: [
      'İlkbahar: sığ, ılınan alanlar — yumurtlama bölgesi',
      'Yaz: derin, serin su — 5m+ derinlik, sabah-akşam sığ',
      'Sonbahar: orta derinlik — kış hazırlığı, yem alanları',
      'Kış: en derin nokta — sıcaklık en stabil, sazan kümelenir',
    ],
    tip: 'Termometre al — balık 15-20°C suyu sever. O tabakayı bul.',
  },
];

export default function FishingStructure() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#02080f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪨 Balık Yapı Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Su altı yapısı · bitki · akıntı · mevsimsel konum</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SPOTS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#060e18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#060e18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 SPOT NOKTALARI</div>
                  {s.points.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {p}</div>)}
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {s.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
