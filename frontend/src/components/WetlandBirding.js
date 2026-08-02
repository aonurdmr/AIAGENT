import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  {
    id: 'duck', name: 'Yaban Ördeği', icon: '🦆', accent: '#06b6d4',
    habitat: 'Sulak alan, göl kıyısı, delta',
    id_tips: ['Erkek yeşilbaş: metalik yeşil baş, sarı gaga', 'Dişi: kahverengi benekli, turuncu gaga', 'Kışın sürü oluşturur — Su üstünde kümeler'],
    hunting: ['Pusuda kapak ve çağrı ile av — şafakta', 'Su üstünde hedef: önde veya yana — 35m max', 'Çelik saçma zorunlu — sulak alanda kurşun yasak'],
    season: 'Kasım - Şubat · sürü geçiş zamanları',
  },
  {
    id: 'goose', name: 'Yaban Kazı', icon: '🪿', accent: '#22c55e',
    habitat: 'Tarla, nehir kıyısı, büyük sulak alan',
    id_tips: ['Gri kaz: kahverengi gövde, turuncu gaga', 'Büyük boyut — 3-5 kg', 'V formasyonunda göç — yüksek irtifada'],
    hunting: ['Tarla kapağı: yem alanlarında sabah', 'Çağrı cihazı: double-cluck ve moan sesi', 'Uzun atış: 45m+ — #2 çelik saçma'],
    season: 'Ekim - Ocak · göç döneminde yoğun',
  },
  {
    id: 'snipe', name: 'Suçuluk (Snipe)', icon: '🐦', accent: '#f59e0b',
    habitat: 'Islak çayır, bataklık kenarı, sazlık',
    id_tips: ['Uzun gaga — zemine saplama beslenmesi', 'Kahverengi çizgili üst — çok iyi kamuflaj', 'Baskınca zikzak uçuşu — zor av'],
    hunting: ['Köpekle çöktürme — flushing', 'Zikzak uçuşu bekle — sonra at — 20m yakın', 'Tek tüfek 12 kalibre — çıkıcı av'],
    season: 'Eylül - Kasım · göç zamanı en yoğun',
  },
  {
    id: 'heron', name: 'Balıkçıl', icon: '🦢', accent: '#a78bfa',
    habitat: 'Nehir, göl, sulak alan — sığ su',
    id_tips: ['Büyük gri kuş — 1m+ boy', 'Uzun S-boyun — uçuşta büker', 'Tek tek beslenme — yem bekler sessizce'],
    hunting: ['KORUMA ALTINDA — av yasak', 'Fotoğrafçılık için ideal — sabah sığ suda bekler', '10m yakına kadar yaklaşılabilir sabır ile'],
    season: 'Yıl boyu — gözlem için her mevsim',
  },
];

export default function WetlandBirding() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020a0e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦆 Sulak Alan Kuşları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ördek · kaz · suçuluk · balıkçıl — tanıma & av</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SPECIES.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#061018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.habitat}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#061018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🔍 TANIM</div>
                  {s.id_tips.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {t}</div>)}
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>🏹 AV / GÖZLEM</div>
                  {s.hunting.map((h, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {h}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>📅 Sezon: </span><span style={{ color: '#d1d5db' }}>{s.season}</span></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
