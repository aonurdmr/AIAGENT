import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const LURES = [
  {
    id: 1, name: 'Metal Jig', icon: '🔩', category: 'Jig',
    depth: '5-200m', weight: '10-200g',
    species: ['Lüfer', 'Palamut', 'Lahoz', 'Orkinos', 'Amberjack'],
    seasons: ['İlkbahar', 'Yaz', 'Sonbahar'],
    water: ['Açık deniz', 'Kayalık'],
    technique: 'Hızlı jigging: düşür ve hızlıca çek. Slow-pitch: yavaş, ritmik sallama.',
    tips: [
      'Koyu renk sabah, parlak renk güneşli havalarda',
      'İğne keskinliğini her avdan önce kontrol et',
      '150g+ ağırlık derin sularda şarttır',
    ],
    accent: '#f59e0b',
  },
  {
    id: 2, name: 'Maket Balık', icon: '🐟', category: 'Tırtıllı',
    depth: '0-10m', weight: '5-40g',
    species: ['Levrek', 'Zargana', 'Kofana', 'Lüfer'],
    seasons: ['İlkbahar', 'Yaz', 'Sonbahar'],
    water: ['Kıyı', 'Körfez'],
    technique: 'Sabit hızda çekiş veya dur-git staccato hareketi.',
    tips: [
      'Yüzme derinliği yeme takılıysa yüzücüyü değiştir',
      'Sabah erken saatlerde yüzey modellerini kullan',
      'Renk seçiminde hedef balığın yemi taklit edilmeli',
    ],
    accent: '#22c55e',
  },
  {
    id: 3, name: 'Popper', icon: '💥', category: 'Yüzey',
    depth: '0-0.5m', weight: '10-60g',
    species: ['Lüfer', 'Kofana', 'Orfoz', 'Lahoz'],
    seasons: ['Yaz', 'Sonbahar'],
    water: ['Kıyı', 'Açık deniz'],
    technique: 'Fırlatıp bırak, sonra hızlı kısa çekişlerle su sıçratsın.',
    tips: [
      'Yüzey kırılmaları görüldüğünde ideal',
      'Sabah ve akşam altın saatlerinde en etkili',
      'Büyük boy popper büyük lüfer çeker',
    ],
    accent: '#ef4444',
  },
  {
    id: 4, name: 'Soft Bait', icon: '🪱', category: 'Silikon',
    depth: '1-30m', weight: '1-20g',
    species: ['Levrek', 'Çipura', 'Barbun', 'Karagöz'],
    seasons: ['Tüm yıl'],
    water: ['Kayalık', 'Kıyı', 'Körfez'],
    technique: 'Texas rig, drop shot veya Carolina rig ile yavaş dip tarama.',
    tips: [
      'Şeffaf veya baz renk bulanık suda daha iyi',
      'Soğuk sularda hareketi yavaşlat',
      'Yaşayan yem gibi hareket ettirilmeli',
    ],
    accent: '#a855f7',
  },
  {
    id: 5, name: 'Spinner', icon: '🌀', category: 'Spinner',
    depth: '0-5m', weight: '3-15g',
    species: ['Alabalık', 'Yayın', 'Levrek'],
    seasons: ['İlkbahar', 'Yaz'],
    water: ['Nehir', 'Göl'],
    technique: 'Akıntıya karşı at, kanat döndürecek kadar yavaş çek.',
    tips: [
      'Balmumu rengine sahip kanatlar tatlı suda etkili',
      'Nehir kavşaklarında ve döneçlerde kullan',
      'Hızı değiştirerek yırtıcının ilgisini çek',
    ],
    accent: '#06b6d4',
  },
  {
    id: 6, name: 'Kaşık (Spoon)', icon: '🥄', category: 'Spoon',
    depth: '1-50m', weight: '5-80g',
    species: ['Palamut', 'Lüfer', 'Alabalık', 'Levrek'],
    seasons: ['Sonbahar', 'Kış'],
    water: ['Kıyı', 'Açık deniz', 'Göl'],
    technique: 'Yavaş çekim veya jigging kombinasyonu.',
    tips: [
      'Altın kaşık tuzlu suda, gümüş tatlı suda daha etkili',
      'Dalış derinliğini tel geçirişiyle ayarla',
      'Palamut göçlerinde ağır model şart',
    ],
    accent: '#fbbf24',
  },
  {
    id: 7, name: 'Octopus Jig', icon: '🐙', category: 'Jig',
    depth: '20-100m', weight: '50-300g',
    species: ['Ahtapot', 'Mürekkepbalığı', 'Orfoz'],
    seasons: ['Yaz', 'Sonbahar'],
    water: ['Açık deniz', 'Kayalık'],
    technique: 'Dibi bul, yavaş sürükle, zaman zaman yukarı fırlat.',
    tips: [
      'Kırmızı ve turuncu renkler ahtapot için ideal',
      'Yavaş hareket avı tetikler',
      'Sabah erken saatler en verimli',
    ],
    accent: '#f87171',
  },
  {
    id: 8, name: 'Crank Bait', icon: '🎣', category: 'Tırtıllı',
    depth: '2-8m', weight: '7-30g',
    species: ['Levrek', 'Sazan', 'Turna', 'Yayın'],
    seasons: ['İlkbahar', 'Sonbahar'],
    water: ['Göl', 'Baraj', 'Nehir'],
    technique: 'Sabit hızda çek, engele takılırsa dur-git uygula.',
    tips: [
      'Dudak boyutu yüzme derinliğini belirler',
      'Rattling (sesli) modeller bulanık suda etkili',
      'Balık aktifken hızlı, soğukta yavaş',
    ],
    accent: '#3b82f6',
  },
];

const CATEGORIES = ['Tümü', 'Jig', 'Tırtıllı', 'Yüzey', 'Silikon', 'Spinner', 'Spoon'];

function DepthBar({ depth }) {
  const match = depth.match(/(\d+)-(\d+)/);
  if (!match) return null;
  const lo  = +match[1];
  const hi  = +match[2];
  const pct = Math.min(100, Math.round((hi / 200) * 100));
  const loPct = Math.round((lo / 200) * 100);
  return (
    <div style={{ background: '#374151', borderRadius: 4, height: 6, position: 'relative', flex: 1 }}>
      <div style={{ position: 'absolute', left: `${loPct}%`, width: `${pct - loPct}%`, height: '100%', background: '#06b6d4', borderRadius: 4 }} />
    </div>
  );
}

function LureCard({ lure, onClick }) {
  return (
    <div onClick={() => onClick(lure)} style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${lure.accent}44`, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>{lure.icon}</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{lure.name}</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>{lure.category} · {lure.weight}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11, color: '#6b7280' }}>{lure.depth}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
        <div style={{ fontSize: 10, color: '#6b7280', whiteSpace: 'nowrap' }}>Derinlik</div>
        <DepthBar depth={lure.depth} />
        <div style={{ fontSize: 10, color: '#6b7280', whiteSpace: 'nowrap' }}>200m</div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {lure.species.slice(0, 3).map(s => (
          <span key={s} style={{ fontSize: 11, background: '#374151', color: '#d1d5db', borderRadius: 10, padding: '2px 8px' }}>{s}</span>
        ))}
        {lure.species.length > 3 && <span style={{ fontSize: 11, color: '#6b7280' }}>+{lure.species.length - 3}</span>}
      </div>
    </div>
  );
}

function LureDetail({ lure, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 44, background: lure.accent + '22', borderRadius: 14, padding: '8px 12px', border: `2px solid ${lure.accent}44` }}>{lure.icon}</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{lure.name}</div>
            <div style={{ fontSize: 13, color: '#9ca3af' }}>{lure.category} · {lure.weight} · {lure.depth}</div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { label: 'Derinlik', value: lure.depth, icon: '📐' },
            { label: 'Ağırlık', value: lure.weight, icon: '⚖️' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Species */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🐟 HEDEF TÜRLER</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {lure.species.map(s => (
              <span key={s} style={{ background: lure.accent + '22', color: lure.accent, border: `1px solid ${lure.accent}44`, borderRadius: 20, padding: '5px 14px', fontSize: 13, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Water types */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🌊 SU TİPİ</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {lure.water.map(w => (
              <span key={w} style={{ background: '#1e3a5f', color: '#93c5fd', border: '1px solid #3b82f644', borderRadius: 20, padding: '5px 14px', fontSize: 12 }}>{w}</span>
            ))}
          </div>
        </div>

        {/* Seasons */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>📅 SEZON</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {lure.seasons.map(s => (
              <span key={s} style={{ background: '#374151', color: '#d1d5db', borderRadius: 20, padding: '5px 14px', fontSize: 12 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Technique */}
        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>🎯 TEKNİK</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{lure.technique}</div>
        </div>

        {/* Tips */}
        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '12px 14px', border: '1px solid #3b82f644' }}>
          <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 8 }}>💡 PRO TAVSİYELER</div>
          {lure.tips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
              <span style={{ color: lure.accent, fontWeight: 700, flexShrink: 0 }}>·</span>
              <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LureGuide() {
  const navigate = useNavigate();
  const [cat, setCat]     = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => LURES.filter(l => {
    const matchCat = cat === 'Tümü' || l.category === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || l.name.toLowerCase().includes(q) || l.species.some(s => s.toLowerCase().includes(q));
    return matchCat && matchSearch;
  }), [cat, search]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪝 Sahte Yem Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 kategori · teknik ve tür rehberi</div>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Yem adı veya hedef tür…"
          style={{ width: '100%', boxSizing: 'border-box', background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}
        />
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            background: cat === c ? '#3b82f6' : '#1f2937', color: cat === c ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: cat === c ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
          }}>{c}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} yem türü</div>
        {filtered.map(l => <LureCard key={l.id} lure={l} onClick={setSelected} />)}
      </div>

      {selected && <LureDetail lure={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
