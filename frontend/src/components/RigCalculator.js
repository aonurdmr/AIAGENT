import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES_DATA = {
  'Levrek':  { avgKg: 2,  maxKg: 12, hookSize: [1, 2],   lineKg: [4, 6],   leadG: [20, 40], method: 'Jig / Sahte yem', color: '#06b6d4' },
  'Çipura':  { avgKg: 1,  maxKg: 6,  hookSize: [4, 6],   lineKg: [3, 5],   leadG: [30, 60], method: 'Dip olta',         color: '#f59e0b' },
  'Lüfer':   { avgKg: 1,  maxKg: 5,  hookSize: [1, 2, 4], lineKg: [4, 6],  leadG: [15, 30], method: 'Paraketa',         color: '#3b82f6' },
  'Alabalık':{ avgKg: 0.5,maxKg: 3,  hookSize: [8, 10],  lineKg: [2, 4],   leadG: [5, 15],  method: 'Fly / Spinner',    color: '#22c55e' },
  'Sazan':   { avgKg: 3,  maxKg: 30, hookSize: [2, 4],   lineKg: [8, 12],  leadG: [60, 120],method: 'Boilies / Feeder', color: '#84cc16' },
  'Palamut': { avgKg: 0.8,maxKg: 4,  hookSize: [1, 2],   lineKg: [4, 6],   leadG: [10, 25], method: 'İmitasyon / Jig',  color: '#a855f7' },
  'Hamsi':   { avgKg: 0.05,maxKg:0.2,hookSize: [12, 14], lineKg: [1, 2],   leadG: [8, 15],  method: 'Sabiki takım',     color: '#fbbf24' },
  'Kalkan':  { avgKg: 2,  maxKg: 15, hookSize: [1, 2],   lineKg: [6, 10],  leadG: [80, 150],method: 'Dip paraketa',     color: '#7c3aed' },
  'Turna':   { avgKg: 1.5,maxKg: 10, hookSize: [2, 4],   lineKg: [6, 10],  leadG: [10, 30], method: 'Maket balık / Jig',color: '#22c55e' },
  'Kefal':   { avgKg: 0.5,maxKg: 3,  hookSize: [6, 8],   lineKg: [3, 5],   leadG: [15, 30], method: 'Ekmek / Pasta yem',color: '#f97316' },
};

const WATER_TYPES = ['Deniz', 'Göl', 'Nehir'];
const DEPTHS = ['Yüzey (0-3m)', 'Orta (3-10m)', 'Dip (10m+)'];

const HOOK_LABEL = size => size <= 2 ? `No.${size} (Büyük)` : size <= 6 ? `No.${size} (Orta)` : `No.${size} (Küçük)`;
const LINE_LABEL = kg => kg < 4 ? `${kg} kg (İnce)` : kg < 8 ? `${kg} kg (Orta)` : `${kg} kg (Kalın)`;

function InfoRow({ label, value, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #374151' }}>
      <div style={{ fontSize: 13, color: '#9ca3af' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: color || '#f9fafb' }}>{value}</div>
    </div>
  );
}

function Gauge({ label, value, max, unit, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ background: '#111827', borderRadius: 12, padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 800, color }}>{value} <span style={{ fontSize: 11, color: '#6b7280' }}>{unit}</span></div>
      </div>
      <div style={{ background: '#374151', borderRadius: 6, height: 8, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 6, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

export default function RigCalculator() {
  const navigate = useNavigate();
  const [species, setSpecies]   = useState('Levrek');
  const [water, setWater]       = useState('Deniz');
  const [depth, setDepth]       = useState('Orta (3-10m)');
  const [targetKg, setTargetKg] = useState(2);
  const [showSpec, setShowSpec] = useState(false);

  const sp = SPECIES_DATA[species];

  const result = useMemo(() => {
    const w = Math.min(Math.max(targetKg, 0.1), sp.maxKg);
    const factor = w / sp.avgKg;

    const hookIdx = factor > 1.5 ? 0 : factor < 0.5 ? Math.min(1, sp.hookSize.length - 1) : 0;
    const hook    = sp.hookSize[hookIdx] || sp.hookSize[0];

    const lineBase = sp.lineKg[0] + (factor - 1) * (sp.lineKg[1] - sp.lineKg[0]);
    const line     = Math.max(sp.lineKg[0], Math.min(sp.lineKg[sp.lineKg.length - 1], Math.round(lineBase)));

    const depthMult = depth.startsWith('Dip') ? 1.3 : depth.startsWith('Orta') ? 1.0 : 0.7;
    const waterMult = water === 'Nehir' ? 1.2 : water === 'Göl' ? 1.0 : 1.0;
    const leadBase  = sp.leadG[0] + (sp.leadG[1] - sp.leadG[0]) * Math.min((w / sp.maxKg), 1);
    const lead      = Math.round(leadBase * depthMult * waterMult / 5) * 5;

    const rodPwr = line * 1.5;

    return { hook, line, lead, rodPwr, method: sp.method };
  }, [species, water, depth, targetKg, sp]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{ padding: '20px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Olta Seti Hesaplayıcı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hedef balığa göre optimal setup</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 14, border: '1px solid #374151' }}>
          <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>HEDEF TÜR</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {Object.entries(SPECIES_DATA).map(([name, d]) => (
              <button key={name} onClick={() => { setSpecies(name); setTargetKg(d.avgKg); }} style={{
                background: species === name ? d.color : '#374151',
                color: species === name ? '#fff' : '#9ca3af',
                border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>{name}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>SU TİPİ</div>
            {WATER_TYPES.map(w => (
              <button key={w} onClick={() => setWater(w)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: water === w ? '#22c55e22' : 'none', border: 'none',
                color: water === w ? '#22c55e' : '#9ca3af', borderRadius: 8,
                padding: '6px 10px', fontSize: 12, fontWeight: water === w ? 700 : 400, cursor: 'pointer', marginBottom: 2,
              }}>{water === w ? '● ' : '○ '}{w}</button>
            ))}
          </div>
          <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>DERİNLİK</div>
            {DEPTHS.map(d => (
              <button key={d} onClick={() => setDepth(d)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: depth === d ? '#3b82f622' : 'none', border: 'none',
                color: depth === d ? '#60a5fa' : '#9ca3af', borderRadius: 8,
                padding: '6px 10px', fontSize: 12, fontWeight: depth === d ? 700 : 400, cursor: 'pointer', marginBottom: 2,
              }}>{depth === d ? '● ' : '○ '}{d.split(' ')[0]}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 14, border: '1px solid #374151' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600 }}>HEDEF AĞIRLIK</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: sp.color }}>{targetKg} kg</div>
          </div>
          <input type="range" min="0.1" max={sp.maxKg} step="0.1"
            value={targetKg} onChange={e => setTargetKg(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: sp.color }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 11, color: '#6b7280' }}>0.1 kg</span>
            <span style={{ fontSize: 11, color: '#6b7280' }}>Ortalama: {sp.avgKg} kg</span>
            <span style={{ fontSize: 11, color: '#6b7280' }}>Max: {sp.maxKg} kg</span>
          </div>
        </div>

        <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 14, border: `1px solid ${sp.color}44` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb', marginBottom: 16 }}>⚙️ Önerilen Setup</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <Gauge label="İP ÇEKİŞ GÜCÜ" value={result.line} max={20} unit="kg" color={sp.color} />
            <Gauge label="KURŞUN" value={result.lead} max={200} unit="g" color="#f59e0b" />
          </div>

          <InfoRow label="İğne Numarası" value={HOOK_LABEL(result.hook)} color={sp.color} />
          <InfoRow label="Misina / İp" value={LINE_LABEL(result.line)} />
          <InfoRow label="Kamış Gücü" value={`${result.rodPwr.toFixed(0)} kg test`} />
          <InfoRow label="Tavsiye Yöntem" value={result.method} color="#9ca3af" />

          <button onClick={() => setShowSpec(!showSpec)} style={{
            width: '100%', background: '#374151', color: '#9ca3af', border: 'none',
            borderRadius: 10, padding: '10px', fontSize: 12, cursor: 'pointer', marginTop: 14,
          }}>{showSpec ? '▲ Daha az' : '▼ Tür özellikleri'}</button>

          {showSpec && (
            <div style={{ marginTop: 14 }}>
              <InfoRow label="Türün Maks. Boyu" value={`${sp.maxKg} kg`} />
              <InfoRow label="Ortalama Ağırlık" value={`${sp.avgKg} kg`} />
            </div>
          )}
        </div>

        <div style={{
          background: '#1c3461', border: '1px solid #3b82f6',
          borderRadius: 12, padding: 14, fontSize: 13, color: '#dbeafe',
        }}>
          💡 Bu hesaplama, hedef balığın ağırlığı, derinlik ve su tipine göre dinamik olarak hesaplanır. Gerçek koşullara göre ±%20 sapma normal kabul edilir.
        </div>
      </div>
    </div>
  );
}
