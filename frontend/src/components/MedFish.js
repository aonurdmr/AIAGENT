import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'gilthead', name: 'Çipura (Dorada)', icon: '🐡', accent: '#f59e0b',
    habitat: 'Sığ kumlu koy ve kayalık · 0-30m',
    season: 'Yıl boyu — kış göç eder · yazın kıyıda',
    methods: ['Dip rig ile midye ve ığrıp yemi', 'Sahte yem: jig ve soft plastic', 'Surf casting: 50-100m açıkta kumsal', 'Serbest yüzer ile kıyı kayalık'],
    tip: 'Akşam dalgakıran ve kayalık dibinde büyük çipura — gece aktif.',
  },
  {
    id: 'seabass', name: 'Levrek (Labraks)', icon: '🐟', accent: '#06b6d4',
    habitat: 'Kaya dibinde · dalgakıran · ağız bölgesi',
    season: 'Yıl boyu — sonbahar en aktif',
    methods: ['Yapay yem: stickbait, popper, soft lure', 'Canlı yem: hamsi, sardalya', 'Ağız avı: gel-git saatinde', 'Dalgakıran dibine jig'],
    tip: 'Levrek topwater yemi mükemmel alır — gün batımı popper en etkili.',
  },
  {
    id: 'mullet', name: 'Kefal', icon: '🐠', accent: '#22c55e',
    habitat: 'Tuzlu-tatlı su geçişi · liman ve lagün',
    season: 'Tüm yıl · kış göç eder açığa',
    methods: ['Çok küçük kanca: No.10-12', 'Yem: ekmek hamuru, alg, küçük solcan', 'Yüzerli olta — hızlı çekiş vermeden bekle', 'Akıntıya karşı sunma — suyun içinde yüzen yem'],
    tip: 'Kefal avı sabır gerektirir — gün ortasında kıyıda besleniyorlar.',
  },
  {
    id: 'dentex', name: 'Sinarit (Dişli Balık)', icon: '🦈', accent: '#a78bfa',
    habitat: 'Derin kayalık · 20-100m',
    season: 'Yaz-sonbahar · kayalık dipte',
    methods: ['Jigging: 60-150g ağır jig derin suya', 'Canlı yem: küçük olta balığı', 'Dip rig: 50-80m kayalıkta', 'Tekne üzerinden dikey jigging'],
    tip: 'Sinarit 10 kg+ olabilir — kalın misina ve güçlü makara şart.',
  },
  {
    id: 'octopus', name: 'Ahtapot', icon: '🐙', accent: '#ef4444',
    habitat: 'Kayalık dip ve çatlaklar · 0-30m',
    season: 'Yaz-sonbahar',
    methods: ['Octopus jig (yaygın): ağır metal jig, canlı taklit', 'El ile yakalama: kayalık arasında', 'Gece dalış ile ışık', 'Gündüz dip boyunca yavaş jig çekiş'],
    tip: 'Ahtapot yuvası: boş midye ve kaf kabukları yuvası yakınında — işaret.',
  },
];

export default function MedFish() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Akdeniz Balıkları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Çipura · levrek · kefal · sinarit · ahtapot rehberi</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SPECIES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#041018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.habitat}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, marginTop: 8, marginBottom: 4 }}>📅 <span style={{ fontWeight: 700 }}>Sezon:</span> {s.season}</div>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginBottom: 4 }}>🎣 YÖNTEMLERİ</div>
                  {s.methods.map((m, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>• {m}</div>)}
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
