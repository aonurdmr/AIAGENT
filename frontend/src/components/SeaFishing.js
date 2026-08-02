import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'surf', name: 'Surf Casting', icon: '🎣', accent: '#06b6d4',
    desc: 'Uzun mesafe kıyıdan atış',
    target: 'Çipura, levrek, kefal, dil balığı',
    setup: '4-5m ağır olta · 200-300m 0.30 misina · spider rig veya carolina',
    technique: ['Hakim rüzgar için taraf seç — rüzgar için değil karşı için', 'Dip ağırlığı 60-100g taş zemin için', 'Canlı yem: yer kurdu, midye, kerevit', 'Gece avlanma kefal için daha etkili'],
    season: 'Mart-Kasım · akşam-gece ideal',
    tip: 'Dalga kırma noktaları (break) çipura ve levrek için altın alan — dalganın kırdığı yere at.',
  },
  {
    id: 'jigging', name: 'Deniz Jigging', icon: '🦑', accent: '#a78bfa',
    desc: 'Metal jig ile dip ve orta su avı',
    target: 'Palamut, lüfer, sarıkanat, torik',
    setup: 'Jig olta 1.8-2.4m · PE 1.0-1.5 · FC 30-40lb lider · 40-200g metal jig',
    technique: ['Jigi dibe indir, hızlı çek-bırak hareketi', 'Lüfer: hızlı yoyo hareketi', 'Palamut: yavaş sallama, bait jig de etkili', 'Akıntı olan yerlerde jig daha doğal iner'],
    season: 'Eylül-Aralık palamut & lüfer zirvesi',
    tip: 'Martılar dalıyorsa altında sürü var — o noktaya jig at.',
  },
  {
    id: 'trolling', name: 'Trolling (Çekme)', icon: '⛵', accent: '#22c55e',
    desc: 'Tekne ile yemi çekerek avlama',
    target: 'Palamut, orkinos, lüfer, torik',
    setup: '50-80lb örgülü ip · wire lider · canlı yem ya da büyük kaşık',
    technique: ['Tekne hızı 4-7 knot (türe göre)', 'Derinlik: yüzey sürüsü için çiçek düzenek', 'İpi 30-80m uzat — sürüyü aramak için', 'Sonar ile balık katmanını bul'],
    season: 'Eylül-Kasım palamut; yaz torik',
    tip: 'Trolling tekne izinde de balık kovalar — kıç tarafına en azından 1 olta bırak.',
  },
  {
    id: 'bottom', name: 'Dip Balıkçılığı', icon: '🪝', accent: '#ef4444',
    desc: 'Sabit ağırlıkla dip avı',
    target: 'İskorpit, fener balığı, dil balığı, mezgit',
    setup: '2.4-3m orta olta · 0.30-0.40 mono · 100-200g ağırlık · 2-3 kanca paternosta',
    technique: ['Kayalık dip = iskorpit · kumlu dip = dil balığı', 'Canlı yem: yer kurdu, midye, mürekkep balığı', 'Ağırlığı dibe koyduktan sonra hafif gergin tut', 'Gece derinliğe çekil — büyük dipler gece aktif'],
    season: 'Yıl boyu · kış en kalın balık',
    tip: 'İskorpit zehirli dorsal yüzgeç — yakalayınca dikkatli tut, eldiven şart.',
  },
];

const LOCATIONS = [
  { icon: '🌊', place: 'İstanbul Boğazı', fish: 'Lüfer, palamut, levrek, kefal', season: 'Ekim-Aralık zirve' },
  { icon: '🏖️', place: 'Ege Kıyıları', fish: 'Çipura, levrek, kalamar, izmarit', season: 'Yıl boyu · yaz çipura' },
  { icon: '⛵', place: 'Karadeniz Açık Su', fish: 'Palamut, torik, orkinos', season: 'Eylül-Kasım' },
  { icon: '🏝️', place: 'Akdeniz Koyları', fish: 'Karagöz, sargoz, kötek, çipura', season: 'Yıl boyu · kış dip' },
  { icon: '🌅', place: 'Çanakkale Boğazı', fish: 'Palamut geçişi, lüfer, kefal', season: 'Kasım-Aralık' },
];

export default function SeaFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#030c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Deniz Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 yöntem · surf, jig, trolling, dip avı</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['methods','Yöntemler'],['locations','Bölgeler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#061020', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'methods' && METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#061020', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.desc} · {m.season}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#061020', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 12, marginTop: 8, marginBottom: 4 }}><span style={{ color: m.accent, fontWeight: 600 }}>🎯 Hedef: </span><span style={{ color: '#d1d5db' }}>{m.target}</span></div>
                  <div style={{ fontSize: 12, marginBottom: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>⚙️ Kurulum: </span><span style={{ color: '#d1d5db' }}>{m.setup}</span></div>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginBottom: 4 }}>📋 TEKNİK</div>
                  {m.technique.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {t}</div>)}
                  <div style={{ background: m.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {m.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'locations' && (
          <div style={{ background: '#061020', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>📍 Türkiye Deniz Balıkçılığı Bölgeleri</div>
            {LOCATIONS.map((l, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < LOCATIONS.length-1 ? '1px solid #0d2030' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 24 }}>{l.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#67e8f9' }}>{l.place}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 1 }}>{l.fish}</div>
                    <div style={{ fontSize: 11, color: '#06b6d4', marginTop: 2 }}>📅 {l.season}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
