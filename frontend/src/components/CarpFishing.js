import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'method', name: 'Method Feeder', icon: '🪣', accent: '#22c55e',
    desc: 'Plastik kafes içine topak yem koyarak kastığın noktada yem saçımı sağlar.',
    rig: 'Kısa lider (10–20 cm), iğne yemin içinde veya yanında',
    bait: ['Sazan peleti', 'Boilies (küçük)', 'Mısır + tatlandırıcı', 'Solucan'],
    depth: '0.5–3m', range: '20–60m', season: 'Yaz-Sonbahar',
    tip: 'Method feeder + vanilya aromalı pelet = klasik formül.',
  },
  {
    id: 'hair', name: 'Hair Rig', icon: '🪡', accent: '#f59e0b',
    desc: 'Yem doğrudan iğneye bağlı değil, iğne kuyruğuna bağlı ince ip (hair) üzerinde.',
    rig: 'Sazan iğnesi (10–12 no), 4–6 cm hair, boilie durdurucu',
    bait: ['Boilies', 'Corn (mısır)', 'Pop-up'],
    depth: '1–5m', range: '30–100m', season: 'Tüm yıl',
    tip: 'Hair rig sazan için standart. Uzak noktalara atış için ağır şok lider şart.',
  },
  {
    id: 'float', name: 'Şamandıralı Av', icon: '🔴', accent: '#3b82f6',
    desc: 'Klasik yüzey veya yarı dip şamandıra. Kısa mesafe, görsel uyarı.',
    rig: 'Waggler veya stick float, 30–60cm batya derinliği',
    bait: ['Ekmek', 'Mısır', 'Hamur', 'Solucan'],
    depth: '0.5–3m', range: '5–25m', season: 'İlkbahar-Yaz',
    tip: 'Sabah erken sakin gölet yüzeyinde ekmek kabuğuyla mükemmel sonuç.',
  },
  {
    id: 'pellet', name: 'PVA Çanta Yöntemi', icon: '🛍️', accent: '#8b5cf6',
    desc: 'Suda eriyen PVA torbaya yem doldurarak atış yapma. Yem doğru noktaya saçılır.',
    rig: 'PVA torbası + ağırlık + hair rig içeride',
    bait: ['Küçük pelet', 'Sazan yemi', 'Mısır taneleri'],
    depth: '2–6m', range: '30–80m', season: 'Yaz-Kış',
    tip: 'PVA torba nemden etkilenir. Yarı donmuş pelet kullan — uzun süre tutunur.',
  },
];

const SPOTS = [
  { name: 'Keban Barajı', region: 'Elazığ', size: 'Büyük', record: '32 kg', species: ['Sazan', 'Yayın', 'Turna'], tip: 'Büyük sazan için Eylül–Kasım ideal.' },
  { name: 'Atatürk Barajı', region: 'Şanlıurfa', size: 'Büyük', record: '28 kg', species: ['Sazan', 'Tilapia', 'Yayın'], tip: 'Gece avı daha verimli. Tekneli gidilmesi önerilir.' },
  { name: 'Büyükçekmece Gölü', region: 'İstanbul', size: 'Orta', record: '18 kg', species: ['Sazan', 'Kefal', 'Levrek'], tip: 'İstanbul\'a yakın. Sabah erken sazlık kenarı.' },
  { name: 'Eğirdir Gölü', region: 'Isparta', size: 'Büyük', record: '22 kg', species: ['Sazan', 'Alabalık', 'Levrek'], tip: 'Temiz su. Method feeder pelet ile mükemmel.' },
  { name: 'Terkos Gölü', region: 'İstanbul', size: 'Orta', record: '14 kg', species: ['Sazan', 'Turna'], tip: 'İzin gerektiren alanlar var. Kontrol edin.' },
];

const BAITS = [
  { name: 'Boilies', icon: '⚪', use: 'Uzak mesafe, büyük sazan. 14–20mm.', flavor: 'Strawberry, Scopex, Squid & Octopus' },
  { name: 'Pellet', icon: '🟤', use: 'Method feeder ile. 4–8mm.', flavor: 'Halibut, Salmon, Sazan Özel' },
  { name: 'Pop-up', icon: '🟡', use: 'Dip yemi. Sazanı yüksekten sunar.', flavor: 'Parlak renk — flouro sarı/turuncu' },
  { name: 'Mısır', icon: '🌽', use: 'Ucuz, etkili. Taze veya konserve.', flavor: 'Tatlı + limon aroması ekle' },
  { name: 'Groundbait', icon: '🟠', use: 'Zemin yemi — balığı noktaya çeker.', flavor: 'Fındık + vanilya karışımı popüler' },
];

export default function CarpFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('techniques');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Sazan Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Carp fishing · teknikler, yemler & Türkiye noktaları</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['techniques', '🎣 Teknikler'], ['spots', '📍 Noktalar'], ['baits', '🪱 Yemler']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#22c55e' : '#1f2937', color: tab === id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#22c55e' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'techniques' && TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.range} · {t.season}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{t.desc}</div>
                  {[['🪝 Takım', t.rig], ['📏 Derinlik', t.depth]].map(([lbl, val]) => (
                    <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🪱 YEM SEÇENEKLERİ</div>
                    {t.bait.map(b => <div key={b} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2, display: 'flex', gap: 6 }}><span style={{ color: t.accent }}>•</span>{b}</div>)}
                  </div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: t.accent, fontWeight: 600, marginBottom: 3 }}>💡 İPUCU</div>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>{t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'spots' && SPOTS.map((s, i) => (
          <div key={i} style={{ background: '#1f2937', borderRadius: 14, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>📍 {s.name}</div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>{s.region} · {s.size} gölet/baraj</div>
              </div>
              <span style={{ background: '#22c55e22', color: '#22c55e', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>🏆 {s.record}</span>
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
              {s.species.map(sp => <span key={sp} style={{ background: '#37415188', borderRadius: 20, padding: '2px 7px', fontSize: 10, marginRight: 4, color: '#d1d5db' }}>{sp}</span>)}
            </div>
            <div style={{ background: '#22c55e15', borderRadius: 8, padding: '7px 10px' }}>
              <div style={{ fontSize: 11, color: '#22c55e' }}>💡 {s.tip}</div>
            </div>
          </div>
        ))}

        {tab === 'baits' && BAITS.map((b, i) => (
          <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #374151' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 26 }}>{b.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{b.use}</div>
            <div style={{ background: '#374151', borderRadius: 8, padding: '6px 10px' }}>
              <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, marginBottom: 2 }}>AROMA</div>
              <div style={{ fontSize: 11, color: '#d1d5db' }}>{b.flavor}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
