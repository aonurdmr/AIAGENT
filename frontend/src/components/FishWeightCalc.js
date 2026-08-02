import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Different weight formulas by body shape
const SPECIES_DB = [
  { id: 1, name: 'Levrek', en: 'Sea Bass', icon: '🐟', shape: 'fusiform', k: 0.0118, unit: 'kg', note: 'Formül: (boy × çevre²) / 800' },
  { id: 2, name: 'Lüfer', en: 'Bluefish', icon: '🐟', shape: 'fusiform', k: 0.0112, unit: 'kg', note: 'İnce gövde; lüfer için düzeltme faktörü uygulandı.' },
  { id: 3, name: 'Sazan', en: 'Carp', icon: '🐡', shape: 'deep', k: 0.0200, unit: 'kg', note: 'Derin gövde için k değeri yüksek.' },
  { id: 4, name: 'Turna', en: 'Pike', icon: '🐡', shape: 'elongated', k: 0.0082, unit: 'kg', note: 'Uzun ince gövde; turna için özel katsayı.' },
  { id: 5, name: 'Alabalık', en: 'Trout', icon: '🐡', shape: 'fusiform', k: 0.0125, unit: 'kg', note: 'Gökkuşağı ve Anadolu alabalığı.' },
  { id: 6, name: 'Çipura', en: 'Sea Bream', icon: '🐟', shape: 'deep', k: 0.0195, unit: 'kg', note: 'Yassı derin gövde.' },
  { id: 7, name: 'Yayın', en: 'Catfish', icon: '🐡', shape: 'elongated', k: 0.0088, unit: 'kg', note: 'Yayın için gövde genişliği kritik.' },
  { id: 8, name: 'Kefal', en: 'Mullet', icon: '🐟', shape: 'fusiform', k: 0.0130, unit: 'kg', note: 'Hem tuzlu hem tatlı su.' },
];

// Girth-based formula: weight(kg) = (length_cm * girth_cm^2) / (k * 10000)
// Simplified version: weight = k * length * girth^2 / 10000
function calcWeight(sp, lengthCm, girthCm) {
  if (!lengthCm || !girthCm) return null;
  const w = (sp.k * lengthCm * girthCm * girthCm) / 10000;
  return w;
}

// Condition factor (Fulton's K)
function conditionFactor(weight_g, length_cm) {
  if (!weight_g || !length_cm) return null;
  return (100000 * weight_g) / Math.pow(length_cm, 3);
}

function conditionLabel(k) {
  if (k > 2.0) return { label: 'Mükemmel kondisyon', color: '#22c55e' };
  if (k > 1.5) return { label: 'İyi kondisyon', color: '#84cc16' };
  if (k > 1.0) return { label: 'Orta kondisyon', color: '#f59e0b' };
  return { label: 'Zayıf kondisyon', color: '#ef4444' };
}

function WeightBar({ estimated, actual, max }) {
  const W = 260;
  const scale = v => Math.min(1, v / max) * W;
  const eX = scale(estimated || 0);
  const aX = actual ? scale(actual) : null;

  return (
    <svg viewBox={`0 0 ${W} 28`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      <rect x={0} y={10} width={W} height={8} rx={4} fill="#374151" />
      {estimated && <rect x={0} y={10} width={eX} height={8} rx={4} fill="#3b82f655" />}
      {estimated && <rect x={eX - 1} y={6} width={2} height={16} rx={1} fill="#3b82f6" />}
      {estimated && <text x={eX} y={4} textAnchor="middle" fill="#3b82f6" fontSize="8">{estimated.toFixed(2)}kg</text>}
      {aX !== null && (
        <>
          <polygon points={`${aX},6 ${aX-5},22 ${aX+5},22`} fill="#22c55e" />
          <text x={aX} y={27} textAnchor="middle" fill="#22c55e" fontSize="8">ölçülen</text>
        </>
      )}
    </svg>
  );
}

export default function FishWeightCalc() {
  const navigate = useNavigate();
  const [species, setSpecies] = useState(SPECIES_DB[0]);
  const [length, setLength] = useState('');
  const [girth, setGirth] = useState('');
  const [actualWeight, setActualWeight] = useState('');

  const estimated = useMemo(() => {
    const l = parseFloat(length), g = parseFloat(girth);
    if (!l || !g || l <= 0 || g <= 0) return null;
    return calcWeight(species, l, g);
  }, [species, length, girth]);

  const actual = parseFloat(actualWeight) || null;
  const cf = actual && length ? conditionFactor(actual * 1000, parseFloat(length)) : null;
  const cfInfo = cf ? conditionLabel(cf) : null;

  const maxBar = Math.max(
    (estimated || 0) * 1.3,
    (actual || 0) * 1.3,
    species.name === 'Yayın' ? 100 : species.name === 'Sazan' ? 50 : 20,
  );

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⚖️ Balık Kilo Hesaplama</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Boy + çevre ölçüsü ile ağırlık tahmini</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Species picker */}
        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 14, border: '1px solid #374151' }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🐟 TÜR</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SPECIES_DB.map(sp => (
              <button key={sp.id} onClick={() => setSpecies(sp)} style={{
                background: species.id === sp.id ? '#3b82f6' : '#374151',
                color: species.id === sp.id ? '#fff' : '#9ca3af',
                border: 'none', borderRadius: 20, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{sp.icon} {sp.name}</button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 14, border: '1px solid #374151' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>📏 BOY (cm)</div>
              <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder="45"
                style={{ width: '100%', boxSizing: 'border-box', background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '12px 14px', fontSize: 20, fontWeight: 700 }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>🔄 ÇEVRE (cm)</div>
              <input type="number" value={girth} onChange={e => setGirth(e.target.value)} placeholder="22"
                style={{ width: '100%', boxSizing: 'border-box', background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '12px 14px', fontSize: 20, fontWeight: 700 }} />
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 16, lineHeight: 1.5 }}>
            💡 Çevre = balığın en geniş yerinden ölçülen çevre. Bant metre ile göbek hizasından ölçün.
          </div>

          {/* Result */}
          {estimated !== null && (
            <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '16px', marginBottom: 14, border: '1px solid #3b82f644', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#93c5fd', marginBottom: 4 }}>TAHMİNİ AĞIRLIK</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#60a5fa', lineHeight: 1 }}>{estimated.toFixed(2)}</div>
              <div style={{ fontSize: 18, color: '#60a5fa' }}>kg</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 8 }}>{species.note}</div>
            </div>
          )}

          <WeightBar estimated={estimated} actual={actual} max={maxBar} />
        </div>

        {/* Optional actual weight for condition factor */}
        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 14, border: '1px solid #374151' }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>⚖️ GERÇEK AĞIRLIK (opsiyonel, kg)</div>
          <input type="number" step="0.01" value={actualWeight} onChange={e => setActualWeight(e.target.value)} placeholder="1.85"
            style={{ width: '100%', boxSizing: 'border-box', background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '12px 14px', fontSize: 18, fontWeight: 700, marginBottom: 10 }} />

          {cf && cfInfo && (
            <div style={{ background: cfInfo.color + '18', borderRadius: 10, padding: '12px 14px', border: `1px solid ${cfInfo.color}44`, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: cfInfo.color }}>{cf.toFixed(2)}</div>
              <div style={{ fontSize: 13, color: cfInfo.color, fontWeight: 700 }}>{cfInfo.label}</div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>Fulton Kondisyon Faktörü (K)</div>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>📐 FORMÜL HAKKINDA</div>
          <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>
            Tahmini ağırlık = k × boy × çevre² / 10000. Her türün vücut yapısına göre k katsayısı ayarlanmıştır. Uzun–ince balıklar (turna, yayın) için k düşük, derin–yuvarlak balıklar (sazan, çipura) için k yüksektir.
          </div>
        </div>
      </div>
    </div>
  );
}
