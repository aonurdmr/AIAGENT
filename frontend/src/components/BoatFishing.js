import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const METHODS = [
  {
    id: 'trolling', name: 'Troll (Çekme)', icon: '⛵', accent: '#06b6d4',
    target: 'Lüfer, palamut, orkinos, torik',
    technique: [
      '3-6 km/s tekne hızı — yem suda titreşir',
      'Hat uzunluğu: 30-80m tekne arkasında',
      'Renk dönüşümlü caydırıcı + kaşık + canlı yem',
      'Derinlik kontrolü: downrigger veya ağırlık',
      'Birden fazla hat — yelpaze düzeni ile daha geniş alan',
    ],
    tip: 'S dönüşü yap — iç hatta yavaşlama tetikler saldırıyı.',
  },
  {
    id: 'jigging', name: 'Jigging (Dipten)', icon: '⚓', accent: '#f59e0b',
    target: 'Levrek, lahoz, orfoz, iskorpit',
    technique: [
      'Metal jig (50-300g) dibe kadar indir',
      'Hızlı yukarı çek, yavaş aşağı bırak — yoyo hareketi',
      'Dip balığı artık jiging tercih eder',
      '60-200m derinlik için ideal',
      'Tekne akıntıda sürüklenirken daha etkili',
    ],
    tip: 'Jiging aksiyonu harikası: 3 hızlı çekiş, 1 serbest bırakış — tekrarla.',
  },
  {
    id: 'anchoring', name: 'Demirleyerek Av', icon: '🪝', accent: '#22c55e',
    target: 'Sazan, levrek, çipura, zargana',
    technique: [
      'Akıntının yukarısına demir at',
      'Canlı veya boilie yemi akıntıyla gönder',
      'Uzun hat (50m+) — geniş alan tarama',
      'Berley (öğütülmüş yem) akıntıya bırak — balık çekicilik',
      'Gece demirli av — ışık balığı toplar',
    ],
    tip: 'Gece ışık kaynağı: su altı ışık veya lamba — zooplankton toplar, balık gelir.',
  },
  {
    id: 'fly_boat', name: 'Tekneden Sinek Oltası', icon: '🪰', accent: '#a78bfa',
    target: 'Çipura, lahoz, büyük levrek',
    technique: [
      'Kayıktan veya küçük tekneden kıyı yapılarını hedefle',
      'Büyük streamer veya popper — su yüzeyi',
      'Tekne sabit dur — motor kapa',
      'Rüzgar arkandan at — mesafeyi uzat',
      'Küçük körfez ve koy — çipura için ideal',
    ],
    tip: 'Kayak + sinek oltası: en sakin ve etkili kıyı balıkçılığı kombinasyonu.',
  },
];

export default function BoatFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛵ Tekne Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Troll · jiging · demirli av · tekneden sinek oltası</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {METHODS.map(m => {
          const open = sel === m.id;
          return (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : m.id)} style={{
                background: '#060c18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${m.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{m.target}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#060c18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${m.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: m.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 TEKNİK</div>
                  {m.technique.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {t}</div>)}
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
