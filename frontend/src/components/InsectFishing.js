import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BAITS = [
  {
    id: 'fly', name: 'Suni Sinek (Fly)', icon: '🪰', accent: '#f59e0b',
    target: 'Alabalık, kefal, sazan',
    types: [
      'Kuru sinek (Dry fly): yüzeyde — yaz sabahları en etkili',
      'Islak sinek (Wet fly): su altında — genel amaçlı',
      'Nimf: larva taklidi — dip balıkları için',
      'Streamer: küçük balık taklidi — levrek ve yayın',
    ],
    season: 'Yaz-sonbahar · sabah 6-10 · akşam 17-19',
    tip: 'Alabalık doğal böcek seçer — mevsim böceğini taklit et.',
  },
  {
    id: 'lure', name: 'Yapay Yem (Lure)', icon: '🎣', accent: '#3b82f6',
    target: 'Levrek, turna, yayın balığı',
    types: [
      'Kaşık (Spoon): dönerek ışık saçar — predatörleri çeker',
      'Mepps spinner: titreşim + ışık — nehir akıntısında',
      'Jig: dip vuruşu — ağır, dip avcısı için',
      'Rapala crankbait: gerçekçi balık hareketi — levrek',
    ],
    season: 'İlkbahar-yaz · sabah erken ve akşam üstü',
    tip: 'Levrek kaşık rengine tepki verir — altın renk bulutlu, gümüş açık günde.',
  },
  {
    id: 'live', name: 'Canlı Yem', icon: '🪱', accent: '#22c55e',
    target: 'Sazan, yayın, kefal',
    types: [
      'Solucan: evrensel — sazan, levrek, kefal hepsi yer',
      'Mısır: sazan için mükemmel — az maliyetli',
      'Ekmek hamuru: sazan ve kefal — rıhtım balıkçılığı',
      'Canlı balık: büyük yayın balığı için — yerel mevzuatı kontrol et',
    ],
    season: 'Yıl boyu · sabah ve akşam en etkili',
    tip: 'Solucanı ortasından takma — uçlar serbest oynasın, daha doğal görünür.',
  },
  {
    id: 'boilie', name: 'Boilie & Pasta', icon: '🟤', accent: '#a78bfa',
    target: 'Sazan, çipura (salon balıkçılığı)',
    types: [
      'Boilie: pişmiş top yem — sazan avının temel yemi',
      'Method feeder: boilie etrafı kıyma ile — hızlı cezbedici',
      'PVA çantası: suda eriyen torba içi yem — hassas sunum',
      'Koku caydırıcı (attractor): çilek, vanilya, muz — sazan sevdiği',
    ],
    season: 'Yaz-sonbahar · gece dahil etkili',
    tip: 'Boilie boyutu önemli: 10mm küçük balık, 20mm büyük sazan için.',
  },
];

const MATCH_TIPS = [
  { fish: 'Sazan', bait: 'Boilie (çilek/vanilya) veya mısır', rig: 'Hair rig · Method feeder · 8-10lb misina' },
  { fish: 'Levrek', bait: 'Kaşık (gümüş) veya jig', rig: 'PE misina 1-2 · hızlı çekim · kıyı dibi' },
  { fish: 'Alabalık', bait: 'Kuru sinek veya küçük mepps', rig: 'Fly rod · ince misina · sabah saatler' },
  { fish: 'Yayın', bait: 'Büyük canlı balık veya kalamar', rig: 'Ağır rig · 30lb+ misina · gece' },
  { fish: 'Turna', bait: 'Büyük kaşık veya streamer', rig: 'Çelik lider (keskin diş) · sığ su' },
];

export default function InsectFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('baits');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪱 Yem & Suni Yem Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Sinek · yapay yem · canlı yem · boilie — tür bazlı seçim</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['baits','Yem Tipleri'],['match','Tür Eşleştirme']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#0c1008', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'baits' && BAITS.map(b => {
          const open = sel === b.id;
          return (
            <div key={b.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : b.id)} style={{
                background: '#0c1008', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${b.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{b.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{b.target}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c1008', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${b.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: b.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 YEM ÇEŞİTLERİ</div>
                  {b.types.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {t}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>📅 Sezon: </span><span style={{ color: '#d1d5db' }}>{b.season}</span></div>
                  <div style={{ background: b.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {b.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'match' && (
          <div style={{ background: '#0c1008', borderRadius: 14, padding: 14, border: '1px solid #f59e0b22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🎯 Türe Göre Yem Seçimi</div>
            {MATCH_TIPS.map((m, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < MATCH_TIPS.length-1 ? '1px solid #141c10' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fde68a', marginBottom: 4 }}>🐟 {m.fish}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 2 }}>🪱 {m.bait}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>⚙️ {m.rig}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
