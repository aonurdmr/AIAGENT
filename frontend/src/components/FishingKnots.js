import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KNOTS = [
  {
    id: 'palomar', name: 'Palomar Düğümü', icon: '💪', accent: '#22c55e',
    strength: 95, difficulty: 1, use: 'İğne bağlama',
    desc: 'En güçlü ve öğrenmesi en kolay iğne düğümü. Her avlanma için standart.',
    steps: [
      'Misina ipini katlayıp iğne deliğinden geçir (çift kat)',
      'Katlı misina ile bir bağ düğümü yap',
      'İğneyi katlı ipiğin ilmeğinden geçir',
      'Her iki uçtan sıkıştır',
      'Islat ve iyice çek',
    ],
    bestFor: ['Tüm iğne boyutları', 'Tüm misina tipleri', 'Her av şartı'],
    avoid: 'Sadece braided (örgülü) misina ile zor olabilir — alternatif: Uni düğümü',
  },
  {
    id: 'improved_clinch', name: 'Geliştirilmiş Clinch', icon: '🪝', accent: '#3b82f6',
    strength: 85, difficulty: 1, use: 'İğne bağlama',
    desc: 'Dünyanın en yaygın balıkçı düğümü. 20 lb altı misinalarda mükemmel.',
    steps: [
      'İğne deliğinden misinanın ucunu geçir (15 cm)',
      'Uzun kısma doğru 5-7 kez sar',
      'Misinanın ucunu ilk boşluktan geçir',
      'Oluşan ilmekten tekrar geçir',
      'Islak durumda yavaşça sıkıştır',
    ],
    bestFor: ['Monofilament misina', '20 lb ve altı', 'Jig bağlama'],
    avoid: '20 lb üzeri için Palomar veya Uni tercih et',
  },
  {
    id: 'uni', name: 'Uni Düğümü', icon: '🔗', accent: '#f59e0b',
    strength: 90, difficulty: 2, use: 'İğne & lider bağlama',
    desc: 'Çok amaçlı düğüm. İğne bağlamak için de, iki misinanın uç uca bağlanması için de çalışır.',
    steps: [
      'Misina ucunu iğneden geçir ve çift kat koy',
      'Uzun kısma doğru bir ilmek yap',
      'İlmek içinden 4-6 kez geçir',
      'Her iki ucu çekerek sıkıştır',
      'Islat, kaydır, sıkıştır',
    ],
    bestFor: ['Braided misina ile iğne', 'Ekstra güç gereken durum', 'Fluorocarbon lider'],
    avoid: 'Çok katmanlı misinalarda dikkatli — düğüm sızabilir',
  },
  {
    id: 'fg', name: 'FG Düğümü', icon: '⚡', accent: '#ef4444',
    strength: 99, difficulty: 4, use: 'Braid → Fluorocarbon/Mono lider',
    desc: 'Modern balıkçılığın en güçlü lider-ana misina bağlantısı. Halka sorunsuz geçer.',
    steps: [
      'Braidi çapraz yaparak lider misinanın üstüne 15-20 kez sar',
      'Her turda sıkı gerilim tut',
      'Aksi yönde 5-7 kez daha sar',
      'Half-hitch düğümüyle kilitle (3-4 kez)',
      'Son yarım düğüm ters at ve kes',
    ],
    bestFor: ['PE braid + fluorocarbon lider', 'Uzun mesafe atış', 'Spinning olta'],
    avoid: 'Yüksek rüzgarda veya dalga varken öğrenilmesi zor — önce evde pratik',
  },
  {
    id: 'blood', name: 'Blood Düğümü', icon: '🩸', accent: '#a78bfa',
    strength: 80, difficulty: 3, use: 'Misina birleştirme',
    desc: 'İki benzer çaplı misinanın uç uca bağlanması için. Lider bağlantısı ve misina takviyesi.',
    steps: [
      'İki misina ucunu 15 cm bindirerek tut',
      'Sol misina ile sağa doğru 5 kez sar',
      'Ucunu ortadan geçir',
      'Sağ misina ile de sola doğru 5 kez sar',
      'Ucunu aynı boşluktan ters yönde geçir, çek',
    ],
    bestFor: ['Aynı çap misina birleştirme', 'Monofilament ekle', 'Tippet birleştirme fly fishing'],
    avoid: 'Farklı çaplı misinaları bağlama — FG veya Uni tercih et',
  },
  {
    id: 'loop', name: 'Perfection Loop', icon: '⭕', accent: '#10b981',
    strength: 95, difficulty: 2, use: 'İlmek oluşturma',
    desc: 'Lider ucunda ilmek yapmak için mükemmel. Snap ve swivel takma kolaylaşır.',
    steps: [
      'Misinanın ucunda 10 cm ilmek yap',
      'İkinci bir büyük ilmek yap (ilk ilmeğin önünde)',
      'Küçük ilmeği büyük ilmeğin üstüne al',
      'Küçük ilmeği büyük ilmekten geçir',
      'Yavaşça sıkıştır — mükemmel ilmek oluşur',
    ],
    bestFor: ['Lider ucu ilmeği', 'Değiştirilebilir lider sistemi', 'Fly fishing tippet'],
    avoid: 'İlmek boyutunu tutarlı tutmak dikkat ister — son çekim öncesi kontrol et',
  },
];

function StrengthBar({ value, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, background: '#374151', borderRadius: 4, height: 6 }}>
        <div style={{ width: `${value}%`, background: accent, height: '100%', borderRadius: 4 }} />
      </div>
      <span style={{ fontSize: 11, color: accent, fontWeight: 700, width: 32 }}>{value}%</span>
    </div>
  );
}

const DIFF_LABELS = ['', '⭐ Kolay', '⭐⭐ Orta', '⭐⭐⭐ Zor', '⭐⭐⭐⭐ Uzman'];

export default function FishingKnots() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? KNOTS : KNOTS.filter(k => {
    if (filter === 'easy') return k.difficulty <= 2;
    if (filter === 'hook') return k.use.includes('İğne');
    if (filter === 'join') return k.use.includes('birleştirme') || k.use.includes('lider');
    return true;
  });

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪢 Balıkçı Düğümleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>6 temel düğüm · adım adım & güç karşılaştırması</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[['all', '🪢 Tümü'], ['easy', '⭐ Kolay'], ['hook', '🪝 İğne'], ['join', '🔗 Birleştirme']].map(([id, lbl]) => (
          <button key={id} onClick={() => setFilter(id)} style={{
            flexShrink: 0, background: filter === id ? '#22c55e' : '#1f2937', color: filter === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: filter === id ? '#22c55e' : '#374151',
            borderRadius: 10, padding: '7px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {filtered.map(k => {
          const open = sel === k.id;
          return (
            <div key={k.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : k.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${k.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 26 }}>{k.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{k.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>{k.use} · {DIFF_LABELS[k.difficulty]}</div>
                    </div>
                  </div>
                  <div style={{ width: 60 }}>
                    <StrengthBar value={k.strength} accent={k.accent} />
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${k.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{k.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 ADIMLAR</div>
                    {k.steps.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4, display: 'flex', gap: 8 }}>
                        <span style={{ color: k.accent, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {s}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>✅ EN İYİ KULLANIM</div>
                    {k.bestFor.map(b => <div key={b} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}><span style={{ color: k.accent }}>•</span> {b}</div>)}
                  </div>
                  <div style={{ background: '#ef444415', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 600, marginBottom: 3 }}>⚠️ DİKKAT</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{k.avoid}</div>
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
