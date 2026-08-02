import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FLIES = [
  {
    id: 'dry', name: 'Kuru Sinek (Dry Fly)', icon: '🪰', accent: '#f59e0b',
    desc: 'Su yüzeyinde yüzen yapay sinek. Balığın doğal böcek aldığı durumlarda kullanılır.',
    season: 'İlkbahar–Yaz (Mayıs–Ağustos)', water: 'Sakin alanlar, rüzgarsız yüzeyler',
    technique: 'Mümkün olduğunca nazik suya bırakın. Drift serbest olmalı.',
    patterns: ['Adams', 'Elk Hair Caddis', 'Parachute Adams', 'Blue Winged Olive'],
    targetFish: ['Alabalık', 'Kayabalığı'],
  },
  {
    id: 'nymph', name: 'Nimf (Nymph)', icon: '🐛', accent: '#10b981',
    desc: 'Su altında larva taklidi. Balığın yüzde yetmişi besinini nimfle alır.',
    season: 'Tüm yıl (en iyi: Eylül–Nisan)', water: 'Dip akıntı, taşlar arasındaki çukurlar',
    technique: 'Ağır nimf, hızlı su. Derinlik ve hız ayarı kritik. Gösterge kullanımı önerilir.',
    patterns: ["Hare's Ear", 'Pheasant Tail', 'Copper John', 'Zebra Midge'],
    targetFish: ['Alabalık', 'Dere Alabalığı'],
  },
  {
    id: 'streamer', name: 'Streamer', icon: '🐟', accent: '#3b82f6',
    desc: 'Balık veya küçük canlı taklidi, su altında aktif hareketle kullanılır.',
    season: 'Sonbahar–Kış (Ekim–Şubat)', water: 'Derin havuzlar, bariyer altları',
    technique: 'Strip çekişleri ile balığı kışkırtın. Yavaş–hızlı–yavaş ritmi.',
    patterns: ['Woolly Bugger', 'Clouser Minnow', 'Sculpin', 'Muddler Minnow'],
    targetFish: ['Büyük Alabalık', 'Levrek'],
  },
  {
    id: 'wet', name: 'Islak Sinek (Wet Fly)', icon: '💧', accent: '#8b5cf6',
    desc: 'Yüzeyin hemen altında boğulmuş böcek taklidi. Klasik yöntem, basit teknik.',
    season: 'İlkbahar–Sonbahar', water: 'Her türlü dere ve ırmak',
    technique: 'Swing tekniği: sineği akıntı karşısına at, suluktan sürüklensin.',
    patterns: ['March Brown', 'Soft Hackle Partridge', 'Teal & Silver'],
    targetFish: ['Alabalık', 'Kayabalığı'],
  },
];

const LOCATIONS = [
  { name: 'Fırtına Vadisi', region: 'Rize', river: 'Fırtına Deresi', season: 'Nisan–Temmuz', fish: 'Dere Alabalığı', difficulty: 'Orta', tip: 'Yağmur sonrası su yükselir; nimf ile derine inin.' },
  { name: 'Ayder – Huser Çayı', region: 'Rize', river: 'Huser Çayı', season: 'Mayıs–Ağustos', fish: 'Brown Trout', difficulty: 'Kolay', tip: 'Kuru sinekle akşamüstü 17–20 arası en verimli.' },
  { name: 'Kızılırmak Kolları', region: 'Sivas–Kayseri', river: 'Çeşitli kollar', season: 'Mart–Haziran', fish: 'Alabalık', difficulty: 'Orta', tip: 'Bölge yönetmeliklerini kontrol edin.' },
  { name: 'Köprülü Kanyon', region: 'Antalya', river: 'Köprüçay', season: 'Ekim–Nisan', fish: 'Yayın, Siraz', difficulty: 'Zor', tip: 'Derin akıntı — güçlü streamer kullanın.' },
  { name: 'Mudurnu Çayı', region: 'Bolu', river: 'Mudurnu Çayı', season: 'Yıl boyu', fish: 'Alabalık', difficulty: 'Kolay', tip: 'İstanbul\'a yakın. Hafta sonları kalabalık olabilir.' },
];

const KNOTS = [
  { name: 'Surgeons Knot', use: 'İki ip birleştirme (farklı çap)', stars: 5 },
  { name: 'Blood Knot', use: 'Benzer çaplı ip birleştirme', stars: 4 },
  { name: 'Clinch Knot', use: 'Olta ucu – sinek bağlama', stars: 5 },
  { name: 'Nail Knot', use: 'Ana olta – lider bağlama', stars: 4 },
  { name: 'Loop to Loop', use: 'Hızlı lider değişimi', stars: 5 },
];

const DIFF_COLOR = { 'Kolay': '#22c55e', 'Orta': '#f59e0b', 'Zor': '#ef4444' };

export default function FlyFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('flies');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Sinek Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Fly fishing tekniği, sinekler & Türkiye noktaları</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['flies', '🪰 Sinekler'], ['spots', '📍 Noktalar'], ['knots', '🪢 Düğümler']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#06b6d4' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#06b6d4' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'flies' && (
          <div>
            {FLIES.map(f => {
              const open = sel === f.id;
              return (
                <div key={f.id} style={{ marginBottom: 8 }}>
                  <div onClick={() => setSel(open ? null : f.id)} style={{
                    background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                    padding: '14px 16px', border: `1px solid ${f.accent}33`, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 28 }}>{f.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{f.name}</div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>{f.season}</div>
                        </div>
                      </div>
                      <span style={{ color: '#6b7280', fontSize: 16 }}>{open ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {open && (
                    <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${f.accent}33`, borderTop: 'none' }}>
                      <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{f.desc}</div>
                      {[['💧 Su Tipi', f.water], ['🎯 Hedef', f.targetFish.join(', ')]].map(([lbl, val]) => (
                        <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                          <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span>
                        </div>
                      ))}
                      <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                        <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>🎣 TEKNİK</div>
                        <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{f.technique}</div>
                      </div>
                      <div style={{ background: f.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: f.accent, fontWeight: 600, marginBottom: 4 }}>🪰 ÖRÜNTÜLER</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {f.patterns.map(p => (
                            <span key={p} style={{ background: '#37415188', borderRadius: 20, padding: '3px 8px', fontSize: 11, color: '#d1d5db' }}>{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'spots' && (
          <div>
            {LOCATIONS.map((loc, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 14, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>📍 {loc.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{loc.region} · {loc.river}</div>
                  </div>
                  <span style={{ background: DIFF_COLOR[loc.difficulty] + '22', color: DIFF_COLOR[loc.difficulty], borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>{loc.difficulty}</span>
                </div>
                {[['🐟 Balık', loc.fish], ['📅 Sezon', loc.season]].map(([lbl, val]) => (
                  <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span>
                  </div>
                ))}
                <div style={{ background: '#06b6d415', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                  <div style={{ fontSize: 11, color: '#06b6d4' }}>💡 {loc.tip}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'knots' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>Sinek balıkçılığında olta (fly line), lider (leader) ve tippet birleşimleri özel düğümler gerektirir.</div>
            </div>
            {KNOTS.map((k, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb' }}>{k.name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{k.use}</div>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} style={{ color: s <= k.stars ? '#06b6d4' : '#374151', fontSize: 14 }}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
