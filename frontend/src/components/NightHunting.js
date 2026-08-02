import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'spotlight', name: 'Işık ile Av (Spotlight)', icon: '🔦', accent: '#f59e0b',
    desc: 'Gece ışığı ile hayvan gözü yansıması',
    legal: 'Türkiye\'de çoğu bölgede YASAK — yalnızca yaban domuzu özel ruhsatla bazı bölgelerde',
    targets: 'Yaban domuzu (özel ruhsatlı bölgeler)',
    technique: [
      'Yavaş araç hareketi — tarlalar, orman yolları',
      '5-6 km/s hız — hayvanların kaçış süresi olmaması için değil gözlem için',
      'Işığı tutan gözleri sakın — hayvanın pozisyonunu belirle',
      'Ateşlemeden önce tür teyit et — gece yanılma riski yüksek',
    ],
    gear: '300.000 mum gücü spotlight · geniş alanlı ışık · şarjlı',
    tip: 'Gece avlanma öncesi mutlaka yerel mevzuatı oku — bölge bazlı farklılıklar var.',
  },
  {
    id: 'thermal', name: 'Termal Kamera', icon: '🌡️', accent: '#ef4444',
    desc: 'Isı farklılığını görüntüleme',
    legal: 'Gözlem amaçlı kullanım serbest · av amaçlı kullanım tartışmalı',
    targets: 'Tüm av türleri (tür tespiti için)',
    technique: [
      'Hayvan vücudu 37-38°C — çevre 5-20°C fark görünür',
      'Orman içinde dallar engel — açık alan daha etkili',
      'Termal: mesafe ve boyutu gösterir, tür tespiti yapar',
      'Kombine: termal + dürbün — gece gözlem sistemi',
    ],
    gear: 'FLIR Scout veya Pulsar Axion — 400m+ etki mesafesi',
    tip: 'Termal görüntüleyici av hayvanlarını stres yaratmadan bulmayı sağlar.',
  },
  {
    id: 'night_vision', name: 'Gece Görüş', icon: '👁️', accent: '#22c55e',
    desc: 'Düşük ışıkta görüntüleme',
    legal: 'Gözlem serbest · ateşleme sistemine entegre çoğu ülkede kısıtlı',
    targets: 'Genel gözlem, domuz bölgesi scouting',
    technique: [
      'Gen 1: uygun fiyat, kısa menzil 50-100m',
      'Gen 2: orta kalite, 150-200m',
      'Gen 3: profesyonel, 300m+',
      'Dijital NV: görüntü kayıt, telefon entegrasyonu',
    ],
    gear: 'Yukon NV monoküler veya Bresser Digital NV',
    tip: 'Ay fazını takip et: dolunayda hayvanlar erken kapanır, hilal gecesi daha aktif.',
  },
  {
    id: 'camera_trap', name: 'Kamera Tuzak', icon: '📷', accent: '#a78bfa',
    desc: 'Otomatik hareket tetiklemeli fotoğraf/video',
    legal: 'Tamamen yasal — gözlem ve keşif için ideal',
    targets: 'Tüm türler, gece habitatı araştırma',
    technique: [
      'Hareket sensorunu hayvan yolu üstüne kur',
      '80-120 cm yüksek — bel seviyesinde',
      'Gece IR modu: sessiz, görünmez kızılötesi',
      'Trigget hızı < 0.5 sn — hızlı geçen hayvanı kaçırma',
      'SD kart ve batarya kontrolü — 2 haftada bir kontrol',
    ],
    gear: 'Browning Strike Force veya Stealth Cam veya Bushnell Core',
    tip: 'Kamera tuzak 1 ayda 1000+ fotoğraf çeker — SD kart en az 64GB olsun.',
  },
];

const MOON_PHASES = [
  { phase: 'Yeni Ay', icon: '🌑', activity: 'Yüksek', desc: 'Karanlık — hayvanlar cesur, gece boyunca aktif' },
  { phase: 'Hilal', icon: '🌒', activity: 'Yüksek', desc: 'Az ışık — aktif, orta saatlerde de hareket var' },
  { phase: 'İlk Dördün', icon: '🌓', activity: 'Orta', desc: 'Orta ışık — şafak ve gece arası denge' },
  { phase: 'Dolunay', icon: '🌕', activity: 'Düşük', desc: 'Parlak — hayvanlar daha erken kapanır, şafak öncesi aktif' },
];

export default function NightHunting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tech');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#04060f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌙 Gece Av Teknikleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Spotlight · termal · gece görüş · kamera tuzak</div>
      </div>

      <div style={{ background: '#1a0808', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚖️ YASAL UYARI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye'de gece av büyük ölçüde kısıtlıdır. Spotlight ile av yasal değildir. Sadece yetkili bölgede domuz avı özel izinle mümkün. Lokal mevzuatı mutlaka kontrol et.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tech','Teknikler'],['moon','Ay Fazı']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#6366f1' : '#080c18', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tech' && TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#080c18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080c18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ background: '#ef444415', borderRadius: 8, padding: '6px 10px', marginTop: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 11, color: '#ef4444' }}>⚖️ {t.legal}</div>
                  </div>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginBottom: 4 }}>📋 TEKNİK</div>
                  {t.technique.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>⚙️ Ekipman: </span><span style={{ color: '#d1d5db' }}>{t.gear}</span></div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'moon' && (
          <div style={{ background: '#080c18', borderRadius: 14, padding: 14, border: '1px solid #6366f122' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#818cf8', marginBottom: 10 }}>🌙 Ay Fazı & Hayvan Aktivitesi</div>
            {MOON_PHASES.map((m, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < MOON_PHASES.length-1 ? '1px solid #0f1428' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 28 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{m.phase}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: m.activity === 'Yüksek' ? '#22c55e' : m.activity === 'Orta' ? '#f59e0b' : '#ef4444' }}>{m.activity}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{m.desc}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ background: '#6366f115', borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 Yeni ay 3 gün öncesi ve sonrası en iyi gece av zamanı. Dolunayda şafak öncesi 1 saat bekle.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
