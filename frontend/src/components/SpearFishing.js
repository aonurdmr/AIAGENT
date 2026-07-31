import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FISH_TARGETS = [
  { id: 'balikapi', name: 'Balıkapı (Orfoz)', sci: 'Epinephelus marginatus', icon: '🐟', accent: '#ef4444', depth: '5–25m', season: 'Yaz-Sonbahar', size: '30–80 cm', approach: 'Mağara girişlerinde bekle. Baş kaldırmadan yavaş yaklaş. Kısa mesafeye gir.', protect: true },
  { id: 'levrek', name: 'Levrek', sci: 'Dicentrarchus labrax', icon: '🐠', accent: '#3b82f6', depth: '2–15m', season: 'Sonbahar-Kış', size: '35–80 cm', approach: 'Akıntılı alanlar, kayalık kenarlar. Davranışa göre ilerle — panikleme.', protect: false },
  { id: 'cipura', name: 'Çipura', sci: 'Sparus aurata', icon: '🐡', accent: '#f59e0b', depth: '3–30m', season: 'Yaz-Sonbahar', size: '25–60 cm', approach: 'Posidonia yatakları. Sabah erken en aktif dönem.', protect: false },
  { id: 'karagoz', name: 'Karagöz', sci: 'Diplodus vulgaris', icon: '🐟', accent: '#8b5cf6', depth: '2–20m', season: 'Yaz', size: '20–40 cm', approach: 'Sığ kayalık. Grup halinde — birini vurursan diğerleri kaçmaz.', protect: false },
  { id: 'izmarit', name: 'İzmarit', sci: 'Spicara smaris', icon: '🐟', accent: '#06b6d4', depth: '1–10m', season: 'İlkbahar-Yaz', size: '12–25 cm', approach: 'Yüzme sürüsü. Sürü ortasına girerek en büyüğü hedefle.', protect: false },
];

const TECHNIQUES = [
  {
    id: 'ambush', name: 'Pusu Tekniği', icon: '🪨',
    desc: 'Kayaların altında, mağara ağzında veya yosun yatağının kenarında hareketsiz bekleyerek balığın yaklaşmasını sağlamak.',
    steps: ['Dip boyunca nişanlı uzan', 'Minimum hareket — nefes kontrolü', 'Balık kendi kendine yaklaşacak', '4–6 m mesafede tetik'],
    pros: 'Daha büyük balık. Daha az enerji harcama.', cons: 'Uzun bekleme. Soğuma riski.',
  },
  {
    id: 'drift', name: 'Sürüklenme Tekniği', icon: '🌊',
    desc: 'Akıntıyla birlikte yavaşça sürüklenerek balığa tepeden yukarıdan yaklaşmak.',
    steps: ['Yüzeyde nefes al', 'Diyagonal dalış', 'Akıntıyu kulllan — enerji harcama', '3–5 m mesafede ateş'],
    pros: 'Geniş alan tarama. Doğal hareket.', cons: 'Akıntı kontrolü zor. Koordinasyon gerektirir.',
  },
  {
    id: 'blue_water', name: 'Açık Su Tekniği', icon: '💙',
    desc: 'Açık mavi suda pelagik balıklar için; yüzeyde yatarak veya belirli derinlikte bekleme.',
    steps: ['Yüzeyde hareketsiz uzan', '10–20 dk bekleme', 'Ton balığı, palamut vb. yaklaşır', 'Kısa anlık atış fırsatı'],
    pros: 'Büyük pelagik balık fırsatı.', cons: 'Tehlikeli — daima buddy diving.',
  },
];

const SAFETY_RULES = [
  'Asla YALNIZ dalma yapma — buddy diving zorunlu',
  'Hiperventilasyon yasak — senkop riski yaratır',
  'Bayrak (alpha flag) kullanmadan açık suda dalma',
  'Geçerli CMAS veya SSI freediving sertifikası tavsiye edilir',
  'Zıpkınla ateş yalnızca balık göründüğünde, yön kontrol edilmişken',
  'Deniz altında silah şarjlı tutulur, yüzeyde boşaltılır',
  'Yasak bölgeler: Koruma alanları, marina çevresi, yüzme alanları',
];

const LEGAL = [
  { rule: 'Minimum boy limitleri', note: 'Normal amatör limitleri geçerli' },
  { rule: 'Tüple dalış + zıpkın', note: 'YASAK (Türkiye dahil çoğu ülke)' },
  { rule: 'Orfoz/Dusky Grouper', note: 'Av yasağı — ülkeye göre değişir' },
  { rule: 'Alpha dalış bayrağı', note: 'Zorunlu (teknede veya yüzdürme)' },
  { rule: 'Günlük miktar', note: 'Standart amatör kurallar geçerli' },
];

export default function SpearFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fish');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0c1222', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🤿 Zıpkın Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hedef türler, teknikler & yasal kurallar</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['fish', '🐟 Hedef Türler'], ['tech', '🎯 Teknikler'], ['safety', '⚠️ Güvenlik']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#06b6d4' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#06b6d4' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'fish' && FISH_TARGETS.map(f => {
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
                      <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{f.sci} · {f.depth}</div>
                    </div>
                  </div>
                  {f.protect ? (
                    <span style={{ background: '#ef444422', color: '#ef4444', border: '1px solid #ef444444', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>🔒 Korumalı</span>
                  ) : (
                    <span style={{ background: '#22c55e22', color: '#22c55e', border: '1px solid #22c55e44', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>✓ Serbest</span>
                  )}
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${f.accent}33`, borderTop: 'none' }}>
                  <div style={{ marginTop: 8 }}>
                    {[['📅 Sezon', f.season], ['📏 Boy', f.size]].map(([lbl, val]) => (
                      <div key={lbl} style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
                        <span style={{ fontWeight: 600, color: '#6b7280' }}>{lbl}:</span> <span style={{ color: '#d1d5db' }}>{val}</span>
                      </div>
                    ))}
                    <div style={{ background: f.accent + '15', borderRadius: 8, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: f.accent, fontWeight: 600, marginBottom: 3 }}>🎯 YAKLAŞIM TEKNİĞİ</div>
                      <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{f.approach}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'tech' && TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: '1px solid #374151', cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: '1px solid #374151', borderTop: 'none' }}>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginTop: 8, marginBottom: 8 }}>{t.desc}</div>
                  <div style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 ADIMLAR</div>
                    {t.steps.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3, display: 'flex', gap: 8 }}>
                        <span style={{ color: '#06b6d4', fontWeight: 700 }}>{i + 1}.</span> {s}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div style={{ background: '#22c55e15', borderRadius: 8, padding: '7px 10px' }}>
                      <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, marginBottom: 2 }}>👍 AVANTAJ</div>
                      <div style={{ fontSize: 11, color: '#d1d5db' }}>{t.pros}</div>
                    </div>
                    <div style={{ background: '#ef444415', borderRadius: 8, padding: '7px 10px' }}>
                      <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 600, marginBottom: 2 }}>👎 DEZAVANTAJ</div>
                      <div style={{ fontSize: 11, color: '#d1d5db' }}>{t.cons}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'safety' && (
          <div>
            <div style={{ background: '#ef444415', borderRadius: 14, padding: 14, border: '1px solid #ef444433', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>⚠️ GÜVENLİK KURALLARI</div>
              {SAFETY_RULES.map((r, i) => (
                <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 6, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>!</span> {r}
                </div>
              ))}
            </div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginBottom: 10 }}>⚖️ YASAL ÇERÇEVE</div>
              {LEGAL.map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, paddingBottom: 8, borderBottom: i < LEGAL.length - 1 ? '1px solid #374151' : 'none' }}>
                  <div style={{ fontSize: 12, color: '#f9fafb', fontWeight: 500 }}>{l.rule}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', textAlign: 'right', maxWidth: 160 }}>{l.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
