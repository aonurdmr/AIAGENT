import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FIRE_TYPES = [
  {
    id: 'teepee', name: 'Tipi Ateşi', icon: '🔥', accent: '#ef4444',
    desc: 'Başlangıç için ideal. İnce dallar merkeze, kalınlar dışa doğru dizilir. Hızlı tutuşur.',
    steps: ['Kuru ot veya kağıt çekirdek hazırla', 'İnce kuru dallar çekirdek etrafına tipi gibi diz', 'Orta ve kalın odunları dışa katman katman koy', 'Rüzgarın geldiği taraftan ateşle', 'Yavaşça kalın odun ekle'],
    best: 'Hızlı başlangıç, yemek pişirme başlangıcı',
  },
  {
    id: 'log', name: 'Log Cabin Ateşi', icon: '🪵', accent: '#f97316',
    desc: 'Uzun yanma süresi. Odunlar kütük evi gibi katmanlanır. Gecelik ateş için ideal.',
    steps: ['İki kalın kütük yan yana koy', 'Dikey olarak üstüne iki kütük daha (çapraz)', 'Her katman küçülerek yukarı', 'En üste tipi tarzı çekirdek koy', 'Üstten başlayarak ateşle'],
    best: 'Gecelik ateş, uzun ısıtma, az müdahale',
  },
  {
    id: 'star', name: 'Yıldız Ateşi', icon: '⭐', accent: '#f59e0b',
    desc: 'Odun tasarrufu yapan teknik. Uzun odunlar içe doğru itilir, yandıkça ilerlenir.',
    steps: ['Büyük odunları yıldız şeklinde merkeze doğru diz', 'Sadece uçları yanıyor olsun', 'Yandıkça içe it', 'Sönerken az itmek yerine az ittir', 'Sabah hala kor olabilir'],
    best: 'Yakıt tasarrufu, ormanda uzun ekspedisyon',
  },
  {
    id: 'dakota', name: 'Dakota Çukuru Ateşi', icon: '🕳️', accent: '#10b981',
    desc: 'Gizli, dumansız, verimli. İki çukur, hava kanalıyla mükemmel yanma.',
    steps: ['20 cm çaplı, 30 cm derin ana çukur kaz', 'Yanında 10 cm çaplı, eğimli hava tüneli kaz', 'İki çukur birbirine bağlı olacak', 'Ana çukura odun koy ve ateşle', 'Hava tüneli doğal hava akışı sağlar'],
    best: 'Rüzgarlı hava, gizlilik, uzun pişirme',
  },
];

const SAFETY_RULES = [
  { icon: '📍', rule: 'Ateşi çevreleyen 3 metre içindeki tüm yanıcı malzemeyi temizle' },
  { icon: '💧', rule: 'Yanında her zaman en az 4 litre su veya kum bulundur' },
  { icon: '🌬️', rule: 'Şiddetli rüzgarda ateş yakma — kıvılcım yayılabilir' },
  { icon: '🌳', rule: 'Ağaç dallarının altında ateş yakma — alevler yukarı yayılır' },
  { icon: '👁️', rule: 'Ateşi asla tek başına bırakma — söndürülene kadar gözetim şart' },
  { icon: '🚫', rule: 'Plastik, boyalı ahşap veya çam kozalağı yakma — zehirli gaz' },
  { icon: '🏕️', rule: 'Kamp alanlarında mevcut ocak alanını kullan — yeni yer açma' },
  { icon: '📵', rule: 'Kuru, rüzgarlı hava uyarısı varsa ateş yakma yasağına uy' },
];

const EXTINGUISH_STEPS = [
  'Odun eklemeyi kes, ateşin küçülmesine izin ver',
  'Su ya da kum ile kor üzerini tamamen kapat',
  'Karıştır, tekrar ıslatama devam et',
  'Ellerin ile kor sıcaklığını test et — hala sıcaksa devam et',
  'Hiç duman veya sis çıkmıyorsa ve soğuksa söndürülmüş',
  'Kumu veya toprağı üstüne kapat — bitik görünse de bırakma',
];

const RISK_LEVELS = [
  { level: 'Düşük', color: '#22c55e', desc: 'Nemli hava, yağmur sonrası, kış', action: 'Standart önlem yeterli' },
  { level: 'Orta', color: '#f59e0b', desc: 'Normal kuru hava, hafif rüzgar', action: 'Ekstra su hazır tut, söndürme planı yap' },
  { level: 'Yüksek', color: '#ef4444', desc: 'Sıcak, kuru ve rüzgarlı', action: 'Mümkünse ateş yakma, sadece tüp ocak kullan' },
  { level: 'Çok Yüksek', color: '#7c3aed', desc: 'Ormanlık alanda kuraklık dönemi', action: 'Ateş yakmak yasak — tüp ocak zorunlu' },
];

export default function CampFireSafety() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🔥 Kamp Ateşi Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 ateş tipi · söndürme · yangın riski</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[['types', '🔥 Tipler'], ['safety', '🛡️ Güvenlik'], ['risk', '⚠️ Risk']].map(([id, lbl]) => (
          <button key={id} onClick={() => { setTab(id); setSel(null); }} style={{
            flex: 1, background: tab === id ? '#f97316' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#f97316' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'types' && FIRE_TYPES.map(f => {
          const open = sel === f.id;
          return (
            <div key={f.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : f.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${f.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>✅ {f.best}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${f.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{f.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 KURULUM</div>
                    {f.steps.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 8 }}>
                        <span style={{ color: f.accent, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'safety' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>✅ SÖNDÜRME ADIMLARI</div>
              {EXTINGUISH_STEPS.map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 5, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#f97316', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {s}
                </div>
              ))}
            </div>
            {SAFETY_RULES.map((r, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{r.icon}</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{r.rule}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'risk' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>Orman yangını riski hava koşullarına göre dramatik değişir. Orman genel müdürlüğü uyarılarını ve meteoroloji tahminlerini takip edin.</div>
            </div>
            {RISK_LEVELS.map(r => (
              <div key={r.level} style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: `1px solid ${r.color}33` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: r.color }}>{r.level}</span>
                  <span style={{ background: r.color + '22', color: r.color, borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 700 }}>Risk</span>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{r.desc}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', fontWeight: 600 }}>→ {r.action}</div>
              </div>
            ))}
            <div style={{ background: '#ef444415', borderRadius: 12, padding: '12px 14px', border: '1px solid #ef444433', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>📞 Orman Yangını: 177</div>
              <div style={{ fontSize: 11, color: '#d1d5db' }}>Yangın görürsen anında ara — sönmekte olsa bile bildir.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
