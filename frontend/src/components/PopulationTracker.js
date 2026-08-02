import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

const SPECIES = [
  {
    id: 1, name: 'Levrek', en: 'Sea Bass', icon: '🐟', accent: '#06b6d4', water: 'Tuzlu',
    trend: 'Stabil', status: 'İyi',
    population: [55, 60, 65, 70, 80, 90, 95, 90, 80, 70, 60, 55],
    best_months: [5, 6, 7, 8],
    notes: 'Yaz aylarında kıyı bölgelerine yaklaşır. Akdeniz stoğu son 5 yılda iyileşme gösterdi.',
  },
  {
    id: 2, name: 'Lüfer', en: 'Bluefish', icon: '🐟', accent: '#3b82f6', water: 'Tuzlu',
    trend: 'Azalıyor', status: 'Dikkat',
    population: [30, 30, 35, 50, 60, 70, 70, 75, 85, 90, 70, 40],
    best_months: [8, 9, 10],
    notes: 'Sonbahar göçü en yoğun dönem. Stoklar baskı altında — sürdürülebilir avlanma önerilir.',
  },
  {
    id: 3, name: 'Palamut', en: 'Bonito', icon: '🐟', accent: '#22c55e', water: 'Tuzlu',
    trend: 'Stabil', status: 'İyi',
    population: [20, 20, 25, 30, 40, 55, 70, 75, 85, 90, 75, 35],
    best_months: [8, 9, 10],
    notes: 'Sonbahar göçünde Karadeniz\'den Ege\'ye geçer. Boğaz geçişi Eylül-Kasım.',
  },
  {
    id: 4, name: 'Sazan', en: 'Carp', icon: '🐡', accent: '#84cc16', water: 'Tatlı',
    trend: 'Artıyor', status: 'İyi',
    population: [60, 55, 65, 80, 90, 95, 90, 85, 80, 75, 70, 65],
    best_months: [3, 4, 5, 9],
    notes: 'Tatlı su barajlarında bol. İlkbahar ve sonbahar dönemleri en aktif.',
  },
  {
    id: 5, name: 'Alabalık', en: 'Trout', icon: '🐡', accent: '#38bdf8', water: 'Tatlı',
    trend: 'Azalıyor', status: 'Dikkat',
    population: [80, 80, 75, 65, 50, 35, 25, 30, 50, 70, 80, 80],
    best_months: [1, 2, 10, 11],
    notes: 'Sıcak yaz aylarında aktivite düşer. Soğuk dağ nehirleri tercih eder.',
  },
  {
    id: 6, name: 'Kalkan', en: 'Turbot', icon: '🐠', accent: '#a855f7', water: 'Tuzlu',
    trend: 'Azalıyor', status: 'Koruma',
    population: [40, 40, 45, 55, 70, 75, 70, 65, 60, 55, 45, 40],
    best_months: [4, 5, 6],
    notes: 'Karadeniz stoğu ciddi baskı altında. Minimum boy 45 cm kesinlikle uygulanmalı.',
  },
  {
    id: 7, name: 'Yayın Balığı', en: 'Catfish', icon: '🐡', accent: '#6b7280', water: 'Tatlı',
    trend: 'Stabil', status: 'İyi',
    population: [50, 50, 60, 70, 80, 90, 95, 90, 80, 70, 60, 50],
    best_months: [5, 6, 7, 8],
    notes: 'Yaz aylarında gece aktif. Büyük barajlarda 100kg+ örnekler raporlanmış.',
  },
  {
    id: 8, name: 'Orfoz', en: 'Grouper', icon: '🐠', accent: '#ef4444', water: 'Tuzlu',
    trend: 'Azalıyor', status: 'Koruma',
    population: [25, 25, 30, 35, 45, 50, 55, 55, 50, 40, 30, 25],
    best_months: [5, 6, 7],
    notes: 'Nesli tehlikede. Birçok bölgede avlanması yasak. Mavi Yüzgeç kampanyasına destek olun.',
  },
];

const STATUS_COLORS = { 'İyi': '#22c55e', 'Dikkat': '#f59e0b', 'Koruma': '#ef4444' };
const TREND_ICONS = { 'Artıyor': '📈', 'Stabil': '📊', 'Azalıyor': '📉' };

function PopChart({ data, accent, best_months }) {
  const W = 280, H = 60;
  const max = Math.max(...data);
  const pts = data.map((v, i) => [i * (W / 11), H - (v / max) * H]);
  const polyline = pts.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `${pts.map(([x, y]) => `${x},${y}`).join(' ')} ${W},${H} 0,${H}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      {/* Best month bands */}
      {best_months.map(m => {
        const x0 = m * (W / 11);
        const x1 = (m + 1) * (W / 11);
        return <rect key={m} x={x0} y={0} width={x1 - x0} height={H} fill={accent + '22'} />;
      })}
      {/* Area fill */}
      <polygon points={area} fill={accent + '18'} />
      {/* Line */}
      <polyline points={polyline} fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Points */}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill={accent} />
      ))}
    </svg>
  );
}

function SpeciesCard({ sp, onClick }) {
  const statusColor = STATUS_COLORS[sp.status] || '#6b7280';
  return (
    <div onClick={() => onClick(sp)} style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${sp.accent}44`, cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 24 }}>{sp.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{sp.name}</div>
          <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic' }}>{sp.en}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span style={{ fontSize: 11, background: statusColor + '22', color: statusColor, border: `1px solid ${statusColor}44`, borderRadius: 20, padding: '2px 8px', fontWeight: 700 }}>{sp.status}</span>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>{TREND_ICONS[sp.trend]} {sp.trend}</span>
        </div>
      </div>
      <PopChart data={sp.population} accent={sp.accent} best_months={sp.best_months} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {MONTHS.map((m, i) => (
          <span key={m} style={{ fontSize: 8, color: sp.best_months.includes(i) ? sp.accent : '#4b5563', fontWeight: sp.best_months.includes(i) ? 700 : 400 }}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function SpeciesDetail({ sp, onClose }) {
  const statusColor = STATUS_COLORS[sp.status] || '#6b7280';
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 44 }}>{sp.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{sp.name}</div>
            <div style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic', marginBottom: 4 }}>{sp.en}</div>
            <span style={{ fontSize: 12, background: statusColor + '22', color: statusColor, border: `1px solid ${statusColor}44`, borderRadius: 20, padding: '3px 10px', fontWeight: 700 }}>{sp.status}</span>
          </div>
        </div>

        <div style={{ background: '#0f172a', borderRadius: 12, padding: '12px 14px', marginBottom: 14, overflow: 'hidden' }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>📊 YILLIK AKTİVİTE (vurgulanan = en iyi dönem)</div>
          <PopChart data={sp.population} accent={sp.accent} best_months={sp.best_months} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {MONTHS.map((m, i) => (
              <span key={m} style={{ fontSize: 8, color: sp.best_months.includes(i) ? sp.accent : '#4b5563', fontWeight: sp.best_months.includes(i) ? 700 : 400 }}>{m}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Trend', value: `${TREND_ICONS[sp.trend]} ${sp.trend}`, color: sp.trend === 'Artıyor' ? '#22c55e' : sp.trend === 'Azalıyor' ? '#ef4444' : '#9ca3af' },
            { label: 'Su Tipi', value: sp.water, color: sp.water === 'Tuzlu' ? '#06b6d4' : '#84cc16' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🗓️ EN İYİ AV AYLARI</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {sp.best_months.map(m => (
              <span key={m} style={{ background: sp.accent + '22', color: sp.accent, border: `1px solid ${sp.accent}44`, borderRadius: 20, padding: '5px 14px', fontSize: 13, fontWeight: 700 }}>{MONTHS[m]}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 STOK DURUMU</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{sp.notes}</div>
        </div>
      </div>
    </div>
  );
}

export default function PopulationTracker() {
  const navigate = useNavigate();
  const [water, setWater] = useState('Tümü');
  const [selected, setSelected] = useState(null);

  const filtered = SPECIES.filter(sp => water === 'Tümü' || sp.water === water);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📊 Tür Popülasyon Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 tür · aylık aktivite ve stok durumu</div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {['Tümü', 'Tuzlu', 'Tatlı'].map(w => (
          <button key={w} onClick={() => setWater(w)} style={{
            background: water === w ? '#3b82f6' : '#1f2937',
            color: water === w ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: water === w ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{w}</button>
        ))}
      </div>

      <div style={{ margin: '0 16px 14px', display: 'flex', gap: 10 }}>
        {[['İyi', '#22c55e'], ['Dikkat', '#f59e0b'], ['Koruma', '#ef4444']].map(([label, color]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: '#9ca3af' }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {filtered.map(sp => <SpeciesCard key={sp.id} sp={sp} onClick={setSelected} />)}
      </div>

      {selected && <SpeciesDetail sp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
