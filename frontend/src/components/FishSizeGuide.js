import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Minimum legal sizes (cm) based on Turkish fisheries regulations (Su Ürünleri Yönetmeliği)
const SPECIES = [
  { id: 1, name: 'Levrek',        tr: 'Dicentrarchus labrax',   min: 25, trophy: 60, water: 'Tuzlu',  icon: '🐟', accent: '#06b6d4', note: 'Tüm sularda geçerlidir.' },
  { id: 2, name: 'Lüfer',         tr: 'Pomatomus saltatrix',    min: 20, trophy: 50, water: 'Tuzlu',  icon: '🐟', accent: '#3b82f6', note: '20-25 cm arası "kofana" sınıfı.' },
  { id: 3, name: 'Çipura',        tr: 'Sparus aurata',          min: 20, trophy: 45, water: 'Tuzlu',  icon: '🐟', accent: '#f59e0b', note: 'Akdeniz ve Ege\'de yaygın.' },
  { id: 4, name: 'Kalkan',        tr: 'Scophthalmus maeoticus', min: 45, trophy: 80, water: 'Tuzlu',  icon: '🐠', accent: '#a855f7', note: 'Karadeniz\'de yüksek minimum boy.' },
  { id: 5, name: 'Barbun',        tr: 'Mullus surmuletus',      min: 13, trophy: 28, water: 'Tuzlu',  icon: '🐟', accent: '#fb923c', note: 'Av mevsimi: Mayıs-Ekim.' },
  { id: 6, name: 'Palamut',       tr: 'Sarda sarda',            min: 30, trophy: 65, water: 'Tuzlu',  icon: '🐟', accent: '#22c55e', note: 'Sonbahar göçünde asgari gözetilmeli.' },
  { id: 7, name: 'Kefal',         tr: 'Mugilidae sp.',          min: 20, trophy: 50, water: 'Tuzlu',  icon: '🐟', accent: '#34d399', note: 'Hem tuzlu hem tatlı sularda bulunur.' },
  { id: 8, name: 'Orfoz',         tr: 'Epinephelus marginatus', min: 45, trophy: 90, water: 'Tuzlu',  icon: '🐠', accent: '#ef4444', note: 'Nesli tehlikede — çoğu bölgede yasak.' },
  { id: 9, name: 'Sazan',         tr: 'Cyprinus carpio',        min: 25, trophy: 70, water: 'Tatlı',  icon: '🐡', accent: '#84cc16', note: 'Tatlı su barajlarında yaygın.' },
  { id: 10, name: 'Alabalık',     tr: 'Salmo trutta',           min: 22, trophy: 55, water: 'Tatlı',  icon: '🐡', accent: '#38bdf8', note: 'Dağ nehirleri ve soğuk göllerde.' },
  { id: 11, name: 'Turna',        tr: 'Esox lucius',            min: 35, trophy: 80, water: 'Tatlı',  icon: '🐡', accent: '#f59e0b', note: 'Yırtıcı tür, spinning ile avlanır.' },
  { id: 12, name: 'Yayın Balığı', tr: 'Silurus glanis',         min: 45, trophy: 150, water: 'Tatlı', icon: '🐡', accent: '#6b7280', note: 'Avrupa\'nın en büyük tatlı su balığı.' },
];

const MAX_CM = 150;

function SizeBar({ min, trophy, current }) {
  const W = 260;
  const scale = v => Math.min(1, v / MAX_CM) * W;
  const capped = current ? Math.min(current, MAX_CM + 5) : null;

  const minX   = scale(min);
  const troX   = scale(trophy);
  const curX   = capped ? scale(capped) : null;

  const legal = capped && capped >= min;

  return (
    <svg viewBox={`0 0 ${W} 28`} width="100%" style={{ overflow: 'visible', display: 'block' }}>
      {/* Track */}
      <rect x={0} y={10} width={W} height={8} rx={4} fill="#374151" />
      {/* Legal zone */}
      <rect x={minX} y={10} width={Math.max(0, troX - minX)} height={8} rx={0} fill="#22c55e44" />
      {/* Trophy zone */}
      <rect x={troX} y={10} width={Math.max(0, W - troX)} height={8} rx={0} fill="#f59e0b22" />
      {/* Min line */}
      <rect x={minX - 1} y={6} width={2} height={16} rx={1} fill="#ef4444" />
      <text x={minX} y={4} textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">{min}</text>
      {/* Trophy line */}
      <rect x={troX - 1} y={6} width={2} height={16} rx={1} fill="#f59e0b" />
      <text x={troX} y={4} textAnchor="middle" fill="#f59e0b" fontSize="8">{trophy}</text>
      {/* Current marker */}
      {curX !== null && (
        <>
          <polygon points={`${curX},6 ${curX - 5},22 ${curX + 5},22`} fill={legal ? '#22c55e' : '#ef4444'} />
        </>
      )}
    </svg>
  );
}

function SpeciesCard({ sp, onClick }) {
  return (
    <div onClick={() => onClick(sp)} style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${sp.accent}44`, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>{sp.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{sp.name}</div>
            <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic' }}>{sp.tr}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#6b7280' }}>Min. boy</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#ef4444' }}>{sp.min} cm</div>
        </div>
      </div>
      <SizeBar min={sp.min} trophy={sp.trophy} current={null} />
      <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
        <div style={{ fontSize: 10, color: '#ef4444' }}>● Min {sp.min}cm</div>
        <div style={{ fontSize: 10, color: '#f59e0b' }}>● Trofi {sp.trophy}cm</div>
        <div style={{ fontSize: 10, color: sp.water === 'Tuzlu' ? '#06b6d4' : '#84cc16', marginLeft: 'auto' }}>{sp.water}</div>
      </div>
    </div>
  );
}

function MeasureDetail({ sp, onClose }) {
  const [inputCm, setInputCm] = useState('');
  const measured = parseFloat(inputCm) || 0;
  const legal = measured >= sp.min;
  const isTrophy = measured >= sp.trophy;

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 32 }}>{sp.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{sp.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>{sp.tr}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { label: 'Min. Boy', value: `${sp.min} cm`, color: '#ef4444' },
            { label: 'Trofi Boy', value: `${sp.trophy} cm`, color: '#f59e0b' },
            { label: 'Su Tipi', value: sp.water, color: sp.water === 'Tuzlu' ? '#06b6d4' : '#84cc16' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Boy ölçer */}
        <div style={{ background: '#374151', borderRadius: 12, padding: '14px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>📏 AVLANAN BALIĞI ÖLÇÜN</div>
          <input
            type="number" value={inputCm} onChange={e => setInputCm(e.target.value)}
            placeholder="Boy (cm)"
            style={{ width: '100%', boxSizing: 'border-box', background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 10, padding: '12px 14px', fontSize: 18, fontWeight: 700, marginBottom: 10 }}
          />
          {measured > 0 && (
            <div style={{
              textAlign: 'center', padding: '14px', borderRadius: 10,
              background: isTrophy ? '#451a03' : legal ? '#14532d' : '#450a0a',
              border: `1px solid ${isTrophy ? '#f59e0b44' : legal ? '#22c55e44' : '#f8717144'}`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{isTrophy ? '🏆' : legal ? '✅' : '❌'}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: isTrophy ? '#fbbf24' : legal ? '#86efac' : '#f87171' }}>
                {isTrophy ? 'Trofi Boy!' : legal ? 'Yasal — tutabilirsiniz' : 'Küçük — serbest bırakın'}
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                {measured} cm {legal ? `(min. ${sp.min} cm üstü)` : `(min. ${sp.min} cm altında)`}
              </div>
            </div>
          )}
          {measured > 0 && <SizeBar min={sp.min} trophy={sp.trophy} current={measured} />}
        </div>

        <div style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', border: '1px solid #374151' }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>📋 NOT</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{sp.note}</div>
        </div>
      </div>
    </div>
  );
}

const WATER_TYPES = ['Tümü', 'Tuzlu', 'Tatlı'];

export default function FishSizeGuide() {
  const navigate = useNavigate();
  const [water, setWater]   = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => SPECIES.filter(sp => {
    const matchWater = water === 'Tümü' || sp.water === water;
    const q = search.toLowerCase();
    const matchSearch = !q || sp.name.toLowerCase().includes(q);
    return matchWater && matchSearch;
  }), [water, search]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📏 Boy Kılavuzu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yasal minimum avlanma boyları (Türkiye mevzuatı)</div>
      </div>

      {/* Legal note */}
      <div style={{ margin: '0 16px 14px', background: '#1e3a5f', borderRadius: 14, padding: '12px 16px', border: '1px solid #3b82f644' }}>
        <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>⚖️ YASAL ÇERÇEVE</div>
        <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.6 }}>
          Su Ürünleri Yönetmeliği (1380 sayılı Kanun) kapsamındaki minimum boylar. Her yıl bakanlık tebliğiyle güncellenebilir.
        </div>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Balık türü ara…"
          style={{ width: '100%', boxSizing: 'border-box', background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}
        />
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {WATER_TYPES.map(w => (
          <button key={w} onClick={() => setWater(w)} style={{
            background: water === w ? '#3b82f6' : '#1f2937', color: water === w ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: water === w ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{w}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} tür · tıkla ve ölç</div>
        {filtered.map(sp => <SpeciesCard key={sp.id} sp={sp} onClick={setSelected} />)}
      </div>

      {selected && <MeasureDetail sp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
