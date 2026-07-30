import React, { useState } from 'react';

// Weight (kg) ≈ (length_cm ^ exp) * factor
// Based on standard fisheries L-W relationship: W = a * L^b
const SPECIES = [
  { id: 'sazan',     label: 'Sazan (Carp)',            icon: '🐠', a: 0.0000220, b: 3.10 },
  { id: 'levrek',    label: 'Levrek (Bass)',            icon: '🐟', a: 0.0000090, b: 3.16 },
  { id: 'alabalik',  label: 'Alabalık (Trout)',         icon: '🐡', a: 0.0000058, b: 3.20 },
  { id: 'turna',     label: 'Turna (Pike)',             icon: '🐟', a: 0.0000040, b: 3.08 },
  { id: 'sudak',     label: 'Sudak (Zander)',           icon: '🐠', a: 0.0000050, b: 3.06 },
  { id: 'carassin',  label: 'Kadife Balığı (Tench)',    icon: '🐡', a: 0.0000160, b: 3.06 },
  { id: 'barbun',    label: 'Barbun (Mullet)',          icon: '🐟', a: 0.0000120, b: 3.05 },
  { id: 'karagoz',   label: 'Karagöz (Bream)',         icon: '🐠', a: 0.0000300, b: 2.95 },
  { id: 'cipura',    label: 'Çipura (Sea Bream)',      icon: '🐡', a: 0.0000150, b: 3.10 },
  { id: 'yayın',     label: 'Yayın Balığı (Catfish)',  icon: '🦈', a: 0.0000030, b: 3.14 },
];

const SIZE_CLASS = [
  { max: 0.2,  label: 'Küçük',    color: '#94a3b8', tip: 'Bırakmayı düşün — büyüsün daha iyi!' },
  { max: 0.5,  label: 'Orta',     color: '#22c55e', tip: 'İyi boyda bir avlanma!' },
  { max: 1.5,  label: 'İyi',      color: '#3b82f6', tip: 'Güzel bir av, tebrikler!' },
  { max: 3.0,  label: 'Büyük',    color: '#f59e0b', tip: 'Harika bir av! Fotoğraf çek!' },
  { max: 999,  label: 'Rekor',    color: '#ef4444', tip: '🏆 Bu bir rekor olabilir! Tartı ile doğrula!' },
];

function getClass(w) {
  return SIZE_CLASS.find(c => w < c.max) || SIZE_CLASS[SIZE_CLASS.length - 1];
}

export default function FishCalc() {
  const [speciesId, setSpeciesId] = useState('sazan');
  const [length, setLength]       = useState('');
  const [result, setResult]       = useState(null);

  const sp = SPECIES.find(s => s.id === speciesId);

  const calculate = () => {
    const l = parseFloat(length);
    if (!l || l <= 0 || l > 300) return;
    const w = sp.a * Math.pow(l, sp.b);
    setResult({ weight: Math.round(w * 1000) / 1000, length: l });
  };

  const cls = result ? getClass(result.weight) : null;

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #00100d 0%, #002820 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>⚖️ Balık Kilo Hesabı</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Boy × tür × formül ile ağırlık tahmini</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Species picker */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>
            TÜR SEÇ
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6 }}>
            {SPECIES.map(s => (
              <button key={s.id} onClick={() => { setSpeciesId(s.id); setResult(null); }} style={{
                padding: '10px 12px', borderRadius: 12, textAlign: 'left', cursor: 'pointer',
                background: speciesId === s.id ? 'var(--a-glow)' : 'var(--s2)',
                border: speciesId === s.id ? '1px solid var(--border-lg)' : '1px solid var(--border)',
                color: speciesId === s.id ? 'var(--a-light)' : 'var(--t-mute)',
                fontSize: 12, fontWeight: 600, transition: 'all .2s',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Length input */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>
            UZUNLUK (CM)
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              className="input-field"
              placeholder="ör. 45"
              value={length}
              onChange={e => { setLength(e.target.value); setResult(null); }}
              onKeyDown={e => e.key === 'Enter' && calculate()}
              style={{ fontSize: 20, fontWeight: 700, textAlign: 'center' }}
            />
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, color: 'var(--t-mute)', padding: '0 10px',
              background: 'var(--s3)', borderRadius: 10, border: '1px solid var(--border)',
              whiteSpace: 'nowrap',
            }}>cm</span>
          </div>
        </div>

        {/* Quick length presets */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {[20, 30, 40, 50, 60, 80].map(l => (
            <button key={l} onClick={() => { setLength(String(l)); setResult(null); }} style={{
              flex: 1, padding: '7px 4px', borderRadius: 10, cursor: 'pointer',
              background: length == l ? 'var(--a-glow)' : 'var(--s2)',
              border: length == l ? '1px solid var(--border-lg)' : '1px solid var(--border)',
              color: length == l ? 'var(--a-light)' : 'var(--t-mute)',
              fontSize: 11, fontWeight: 600, transition: 'all .2s',
            }}>{l}</button>
          ))}
        </div>

        <button className="btn-primary" onClick={calculate} disabled={!length || parseFloat(length) <= 0}
          style={{ marginBottom: 14 }}>
          ⚖️ Hesapla
        </button>

        {/* Result */}
        {result && cls && (
          <div className="fade-in">
            <div style={{
              background: cls.color + '10',
              border: `1px solid ${cls.color}35`,
              borderRadius: 18, padding: 20, marginBottom: 14, textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 50% 0%, ${cls.color}15, transparent 70%)`,
              }} />
              <div style={{ fontSize: 40, marginBottom: 4, position: 'relative' }}>{sp?.icon}</div>
              <div style={{ fontSize: 13, color: 'var(--t-mute)', marginBottom: 4, position: 'relative' }}>
                {sp?.label} · {result.length} cm
              </div>
              <div style={{ fontSize: 52, fontWeight: 900, color: cls.color, lineHeight: 1, position: 'relative' }}>
                {result.weight}
              </div>
              <div style={{ fontSize: 18, color: 'var(--t-mute)', marginBottom: 8, position: 'relative' }}>kg (tahmini)</div>
              <div style={{
                display: 'inline-block', background: cls.color + '20', borderRadius: 20,
                padding: '4px 14px', fontSize: 12, fontWeight: 700, color: cls.color,
                border: `1px solid ${cls.color}40`, position: 'relative', marginBottom: 8,
              }}>{cls.label}</div>
              <div style={{ fontSize: 12, color: 'var(--t-mid)', lineHeight: 1.5, position: 'relative' }}>
                {cls.tip}
              </div>
            </div>

            {/* Formula note */}
            <div style={{
              background: 'var(--s2)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '10px 14px', marginBottom: 14,
              fontSize: 11, color: 'var(--t-mute)', lineHeight: 1.6,
            }}>
              📐 Formül: W = {sp?.a} × L^{sp?.b?.toFixed(2)}<br />
              Bu standart balıkçılık L-W ilişkisi formülüdür. Gerçek ağırlık %10-15 sapabilir.
            </div>

            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginBottom: 14 }}
              onClick={() => setResult(null)}>
              🔄 Yeni Hesaplama
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
