import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'trap', name: 'Tuzak ile Kerevit Avı', icon: '🪤', accent: '#f97316',
    desc: 'Tel kafes tuzakla toplu av',
    steps: [
      'Metal tel kafes: 30x20x10cm — tabanı kapalı',
      'Yem: taze balık kafası veya sakatat (en etkili)',
      'Yemi tuzak ortasına tel ile bağla',
      'Tuzağı dip akıntı olmayan yere bırak',
      'İp ile kıyıya bağla veya şamandıra koy',
      'Sabah ve akşam kontrol: 6-8 saatte bir',
    ],
    season: 'Mayıs-Ekim, su sıcaklığı 15 derece üstünde',
    tip: 'Çok büyük kereviti bırak — yavru üremesi için küçükleri de bırak.',
  },
  {
    id: 'hand', name: 'Elde Yakalama', icon: '✋', accent: '#22c55e',
    desc: 'Taş altında elle arama',
    steps: [
      'Berrak sığ nehir ve dere — taş altında saklanır',
      'Taşı çevirmeden önce kerevit kaçış yönünü tahmin et',
      'Taşı kaldır, kerevit su içinde geriye doğru fırlar',
      'Hızla kıstır: baş kısmından tut — kıskacı tutma',
      'Soğuk su: kerevit yavaş, yakalamak daha kolay',
      'Gece el feneri ile arama: kerevit gece daha aktif',
    ],
    season: 'Tüm sezon, gece en kolay',
    tip: 'Eldiven koru — kerevit kıskacı acıtır.',
  },
  {
    id: 'cook', name: 'Kerevit Pişirme', icon: '🍲', accent: '#a78bfa',
    desc: 'Taze yakalanmış kerevit mutfağa',
    steps: [
      'Taze kereviti 1 saat temiz suda beklet — temizlenir',
      'Kaynayan tuzlu su: dereotu, limon, defne',
      'Canlı kereviti suya bırak — 8-12 dakika kaynat',
      'Koyu kırmızı renk ve antipot şeklinde kıvrılma: hazır',
      'Buz suya al: pişirme durur, kabuk soyma kolay',
      'Et: kuyruk altında — kıskac içinde de et var',
    ],
    season: '-',
    tip: 'İsveç usulü: tatlı su + dereotu + tuz ile kaynat, gece soğutarak ye.',
  },
];

export default function CrayfishGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080e06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦞 Kerevit Avı Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tuzak · elle yakalama · pişirme — tatlı su kereviti</div>
      </div>

      <div style={{ background: '#0e1808', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f9731633' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>📋 YASAL DURUM</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Yerli sinyal kereviti koruma altında bazı illerde. İstilacı Amerikan kereviti avlanabilir. Bölge kuralını kontrol et.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#0e1808', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.desc}</div>
                  </div>
                  {m.season !== '-' && <div style={{ fontSize: 9, color: m.accent }}>{m.season}</div>}
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e1808', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 ADIMLAR</div>
                  {m.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {m.tip}</div>
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
