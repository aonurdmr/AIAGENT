import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PLANTS = [
  {
    id: 'greens', name: 'Yabani Yeşillikler', icon: '🌿', accent: '#22c55e',
    safety: 'Çoğunlukla güvenli — yıka ve kaynat',
    items: [
      { name: 'Isırgan Otu', desc: 'Genç sürgünler — kaynat ve dokunma yok', use: 'Çorba, ıspanak gibi' },
      { name: 'Karahindiba', desc: 'Tüm bitki yenilebilir — çiçek, yaprak, kök', use: 'Salata, çay, kavurma' },
      { name: 'Semizotu', desc: 'Kırmızı gövde, yuvarlak yaprak — tarlada', use: 'Çiğ veya sote' },
      { name: 'Yabani Pazı', desc: 'Sulak alan yakını — geniş yeşil yaprak', use: 'Sarma, çorba' },
    ],
    tip: 'Kırmızı veya mor meyve rengi uyarı — yeşil bitki daha güvenli genelde.',
  },
  {
    id: 'roots', name: 'Kök & Soğan', icon: '🧅', accent: '#f59e0b',
    safety: 'Pişirmek zorunlu — ham toksik olabilir',
    items: [
      { name: 'Yabani Sarımsak', desc: 'Sarımsak koku veriyorsa gerçek — vermiyor koku = zehirli', use: 'Her yemekte' },
      { name: 'Meşe Palamudu', desc: 'Tanen — uzun süre suda beklet veya kaynat', use: 'Un veya kavurma' },
      { name: 'Eğrelti Otu Filizi', desc: 'Genç kıvrık filiz — haşla, toksini yok et', use: 'Sebze gibi' },
      { name: 'Yabani Soğan', desc: 'Soğan koku şart — koku yok = ölümcül yabancı', use: 'Pişirilmiş' },
    ],
    tip: 'Sarımsak ve soğan ailesini koku ile teyit et — görünüm aldatır, koku aldatmaz.',
  },
  {
    id: 'berries', name: 'Meyveler & Böğürtlen', icon: '🫐', accent: '#a78bfa',
    safety: 'Dikkatli — beyaz ve sarı meyve kural 1: yeme',
    items: [
      { name: 'Ahududu', desc: 'Kırmızı — tatlı, dikenli çalı', use: 'Doğrudan ye veya çay' },
      { name: 'Böğürtlen', desc: 'Siyah olgunca — ham yeşilken zehirli', use: 'Olgunca ye' },
      { name: 'Alıç', desc: 'Kırmızı-portakal küçük meyve — kuzey ormanı', use: 'Pişirerek reçel' },
      { name: 'Muşmula', desc: 'Don vurmuşken yenilebilir — ham sert ve acı', use: 'Don vurduktan sonra' },
    ],
    tip: 'Kural: Beyaz veya sarı meyveyi asla yeme. Kırmızı ve siyah = büyük ihtimalle güvenli.',
  },
];

export default function WildEdibles() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040c06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Yabani Besinler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yeşillikler · kökler · meyveler — güvenli toplama</div>
      </div>

      <div style={{ background: '#1a1a04', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f59e0b33' }}>
        <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>⚠️ UYARI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Yabani bitkileri kesinlikle emin olmadan yeme. Şüphe duyduğunda bırak. İlk kez deniyorsan küçük miktarda dene ve 4 saat bekle.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {PLANTS.map(p => {
          const open = sel === p.id;
          return (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : p.id)} style={{
                background: '#080e08', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${p.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{p.safety}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#080e08', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${p.accent}33`, borderTop: 'none' }}>
                  {p.items.map((it, i) => (
                    <div key={i} style={{ marginTop: 10, padding: '8px 10px', background: p.accent + '10', borderRadius: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: p.accent }}>{it.name}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 1 }}>{it.desc}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>🍽️ {it.use}</div>
                    </div>
                  ))}
                  <div style={{ background: p.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {p.tip}</div>
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
