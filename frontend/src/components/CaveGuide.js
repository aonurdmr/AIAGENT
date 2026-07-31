import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CAVES = [
  {
    id: 'damlatas', name: 'Damlataş Mağarası', region: 'Alanya, Antalya', icon: '🦇', accent: '#06b6d4',
    type: 'Stalaktit-Stalagmit',
    length: '150 m · açık alan',
    temp: 'Yıl boyu +22°C, %95 nem',
    depth: '14-20 m',
    wildlife: 'Mağara örümceği, yarasa kolonisi',
    access: 'Alanya merkezi — araçla kolay, bilet gerekli',
    tip: 'Astım ve bronşit için terapi amaçlı kullanılır. Nem çok yüksek — kamera camı buğulanır.',
    status: '✅ Turizm mağarası — rehberli tur',
  },
  {
    id: 'karain', name: 'Karain Mağarası', region: 'Antalya', icon: '🏛️', accent: '#f59e0b',
    type: 'Arkeolojik mağara',
    length: '100 m uzunluk · üç ana oda',
    temp: '+15°C sabit',
    depth: 'Deniz seviyesi 450 m üzerinde',
    wildlife: 'Arkeolojik bulgular — Homo erectus izleri',
    access: 'Antalya\'ya 27 km · araçla erişilebilir',
    tip: 'Türkiye\'nin en önemli prehistorik mağarası. Paleolitik kamp alanı. Müze de mevcut.',
    status: '✅ Arkeolojik sit alanı — korunuyor',
  },
  {
    id: 'dupnisa', name: 'Dupnisa Mağarası', region: 'Kırklareli, Trakya', icon: '💎', accent: '#a78bfa',
    type: 'Jeotermal mağara',
    length: '4 km keşfedilmiş tünel',
    temp: '+12°C',
    depth: 'Yeraltı nehiri mevcut',
    wildlife: 'Yarasa kolonisi (25.000+), mağara kertenkelesi',
    access: 'Kırklareli\'ne 40 km · ormanlık yol',
    tip: 'Türkiye\'nin kuzeybatısındaki en büyük mağara. Yeraltı nehiri ses efekti muhteşem.',
    status: '✅ Ziyarete açık — rehber eşliğinde',
  },
  {
    id: 'ballica', name: 'Ballıca Mağarası', region: 'Tokat', icon: '🌟', accent: '#22c55e',
    type: 'Sıralı salona (terdit) mağara',
    length: '680 m turizm bölümü',
    temp: '+14°C',
    depth: '6 salon · 65 m derinlik',
    wildlife: 'Çeşitli yarasa türleri, mağara böceği',
    access: 'Tokat\'a 30 km',
    tip: 'Helezonik sütun oluşumları nadir. Türkiye\'nin en önemli mağaralarından biri.',
    status: '✅ Turizm mağarası',
  },
  {
    id: 'keskin', name: 'Keskin Mağarası', region: 'Kırıkkale', icon: '🔦', accent: '#ef4444',
    type: 'Kireçtaşı mağarası',
    length: '500 m keşfedilmiş',
    temp: '+11°C',
    depth: '40 m',
    wildlife: 'Yarasa kolonisi, mağara örümcekleri',
    access: 'Kırıkkale\'ye 20 km',
    tip: 'Mağara araştırmacıları için aktif keşif sahası. Yeni tüneller hâlâ keşfediliyor.',
    status: '⚠️ Yalnız girme — rehber ve ekipman şart',
  },
];

const EQUIPMENT = [
  { icon: '🔦', item: 'Kafa feneri', detail: 'En az 3 pilli, yedek pil zorunlu. LED tercih et.' },
  { icon: '⛑️', item: 'Mağara kaskı', detail: 'Düşen taş ve alçak tavan için mutlak şart' },
  { icon: '🧤', item: 'Eldiven', detail: 'Kaya kavramak ve soğuktan korumak için' },
  { icon: '🥾', item: 'Çelik burunlu bot', detail: 'Çamurlu, kaygan zemin için — spor ayakkabı giyme' },
  { icon: '🎽', item: 'Katmanlı kıyafet', detail: 'Mağara içi serin — sweatshirt + yağmurluk' },
  { icon: '🧭', item: 'Harita & pusula', detail: 'GPS çalışmaz — kağıt plan ve harita şart' },
];

const SAFETY_RULES = [
  'Asla yalnız girme — minimum 3 kişi ideal',
  'Giriş saatini dışarıda birine bildirin',
  'Stalaktit ve stalagmitlere dokunmayın — 100 yıllık büyüme',
  'Yabancı nesne bırakma — mağara ekosistemleri hassas',
  'Yarasalara mesafe koru — rabies vektörü olabilir',
  '112 koordinatlarını girişte GPS ile not al',
];

export default function CaveGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState('caves');

  return (
    <div style={{ background: '#06080f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦇 Mağara Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 mağara · speleolojiyi keşfet</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['caves','Mağaralar'],['equipment','Ekipman'],['safety','Güvenlik']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#0c1220', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'caves' && CAVES.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#0c1220', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 28 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>📍 {c.region} · {c.type}</div>
                    </div>
                  </div>
                  <span style={{ background: c.accent + '22', color: c.accent, borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>{c.temp}</span>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c1220', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  {[['📏 Uzunluk', c.length], ['📉 Derinlik', c.depth], ['🦇 Yaban Hayatı', c.wildlife], ['🚗 Erişim', c.access]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                      <span style={{ color: c.accent, fontWeight: 600 }}>{l}: </span>
                      <span style={{ color: '#d1d5db' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: c.accent, fontWeight: 600, marginBottom: 3 }}>💡 ÖZELLIK</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.6 }}>{c.tip}</div>
                  </div>
                  <div style={{ background: '#1f2937', borderRadius: 8, padding: '6px 10px', marginTop: 6 }}>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>{c.status}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'equipment' && (
          <div style={{ background: '#0c1220', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🎒 Mağara Ekipmanı</div>
            {EQUIPMENT.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, paddingBottom: 10, borderBottom: i < EQUIPMENT.length-1 ? '1px solid #1a2535' : 'none' }}>
                <span style={{ fontSize: 20 }}>{e.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#06b6d4' }}>{e.item}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{e.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'safety' && (
          <div style={{ background: '#0c1220', borderRadius: 14, padding: 14, border: '1px solid #ef444422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: 10 }}>⚠️ Mağara Güvenliği</div>
            {SAFETY_RULES.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>{i+1}.</span>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>{r}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
