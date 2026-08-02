import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const SPOTS = [
  {
    id: 1, name: 'Boğaziçi Akıntı Geçidi', city: 'İstanbul', region: 'Marmara',
    type: 'Kıyı', lat: 41.07, lng: 29.05,
    depth: '15-80m', bestSeason: ['Kasım', 'Aralık', 'Ocak', 'Şubat'],
    species: ['Lüfer', 'Palamut', 'Torik', 'Kalkan'],
    methods: ['Pilara', 'Tekne avı', 'Troll'],
    rating: 5, difficulty: 'Orta',
    access: 'Tekne gerekli',
    tip: 'Palamut göçü Ekim–Kasım arası Boğaz içinde yoğunlaşır. Sabah erken saatler en verimli pencere.',
    accent: '#06b6d4',
  },
  {
    id: 2, name: 'Datça Açığı', city: 'Muğla', region: 'Ege',
    type: 'Açık Deniz', lat: 36.73, lng: 27.68,
    depth: '80-400m', bestSeason: ['Nisan', 'Mayıs', 'Haziran', 'Eylül'],
    species: ['Orkinos', 'Kılıç', 'Mahi-mahi', 'Amberjack'],
    methods: ['Derin troll', 'Jigging', 'Canlı yem'],
    rating: 5, difficulty: 'Zor',
    access: 'Offshore tekne gerekli',
    tip: 'Yaz aylarında büyük pelagik av için Türkiye\'nin en verimli noktalarından biri.',
    accent: '#3b82f6',
  },
  {
    id: 3, name: 'Sapanca Gölü', city: 'Sapanca', region: 'Marmara',
    type: 'Göl', lat: 40.69, lng: 30.25,
    depth: '2-60m', bestSeason: ['Mart', 'Nisan', 'Eylül', 'Ekim'],
    species: ['Sazan', 'Levrek', 'Yayın', 'Turna'],
    methods: ['Feeder', 'Spinner', 'Worm'],
    rating: 4, difficulty: 'Kolay',
    access: 'Kıyıdan erişilebilir',
    tip: 'İl sınırları içinde kalan güzergahta denetim sık. Ruhsatınızı yanınızda bulundurun.',
    accent: '#22c55e',
  },
  {
    id: 4, name: 'Karadeniz Surf Şeridi', city: 'Sinop', region: 'Karadeniz',
    type: 'Surf', lat: 42.03, lng: 35.15,
    depth: '0-15m', bestSeason: ['Mayıs', 'Haziran', 'Temmuz', 'Ağustos'],
    species: ['İstavrit', 'Barbun', 'Mezgit', 'Lüfer'],
    methods: ['Surf casting', 'Sahil oltalama'],
    rating: 4, difficulty: 'Kolay',
    access: 'Kıyıdan erişilebilir',
    tip: 'Fırtına sonrası 1-2 gün beklenmesi tavsiye edilir; dipten gelen yem bolluğu artar.',
    accent: '#38bdf8',
  },
  {
    id: 5, name: 'Eğirdir Gölü', city: 'Isparta', region: 'İç Anadolu',
    type: 'Göl', lat: 37.87, lng: 30.85,
    depth: '1-15m', bestSeason: ['Temmuz', 'Ağustos', 'Eylül'],
    species: ['Sazan', 'Alabalık', 'Sudak', 'Yayın'],
    methods: ['Feeder', 'Fly fishing', 'Spinning'],
    rating: 4, difficulty: 'Kolay',
    access: 'Kıyıdan ve tekne',
    tip: 'Alabalık avı için Mayıs–Haziran ideal. Gölün kuzey koyları derin ve verimli.',
    accent: '#34d399',
  },
  {
    id: 6, name: 'İskenderun Körfezi', city: 'Hatay', region: 'Akdeniz',
    type: 'Körfez', lat: 36.60, lng: 36.17,
    depth: '5-200m', bestSeason: ['Mart', 'Nisan', 'Ekim', 'Kasım'],
    species: ['Çipura', 'Levrek', 'Barbun', 'Adet'],
    methods: ['Feeder', 'Float', 'Jigging'],
    rating: 4, difficulty: 'Orta',
    access: 'Kıyı ve tekne',
    tip: 'Yaz döneminde deniz sıcaklığı 28°C\'yi geçer; balıklar derine çekilir.',
    accent: '#f59e0b',
  },
  {
    id: 7, name: 'Çoruh Nehri', city: 'Artvin', region: 'Karadeniz',
    type: 'Nehir', lat: 41.18, lng: 41.82,
    depth: '1-8m', bestSeason: ['Nisan', 'Mayıs', 'Haziran'],
    species: ['Alabalık', 'Bıyıklı balık', 'Siraz'],
    methods: ['Fly fishing', 'Spinner', 'Worm'],
    rating: 5, difficulty: 'Orta',
    access: 'Kıyıdan erişilebilir',
    tip: 'Türkiye\'nin en verimli alabalık nehrilerinden. Uluslararası fly fishing destinasyonu.',
    accent: '#a855f7',
  },
  {
    id: 8, name: 'Bozcaada Güney Burnu', city: 'Çanakkale', region: 'Ege',
    type: 'Kaya', lat: 39.78, lng: 26.06,
    depth: '3-40m', bestSeason: ['Nisan', 'Mayıs', 'Eylül', 'Ekim'],
    species: ['Orfoz', 'İzmarit', 'Karagöz', 'Sinarit'],
    methods: ['Kaya oltalama', 'Bottom fishing'],
    rating: 5, difficulty: 'Zor',
    access: 'Kaya geçişi · ulaşım zor',
    tip: 'Kayalık zemin nedeniyle misina ve olta kaybı yüksek. Yedek takımlar şart.',
    accent: '#ef4444',
  },
];

const TYPES    = ['Tümü', 'Kıyı', 'Açık Deniz', 'Göl', 'Nehir', 'Surf', 'Kaya', 'Körfez'];
const REGIONS  = ['Tümü', 'Marmara', 'Ege', 'Karadeniz', 'Akdeniz', 'İç Anadolu'];

function Stars({ n }) {
  return (
    <span style={{ color: '#f59e0b', fontSize: 13 }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
  );
}

function TypeBadge({ type, accent }) {
  const icons = { Kıyı: '🏖️', 'Açık Deniz': '⛵', Göl: '🏞️', Nehir: '🌊', Surf: '🏄', Kaya: '🪨', Körfez: '🌅' };
  return (
    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: accent + '22', color: accent, fontWeight: 600 }}>
      {icons[type] || '📍'} {type}
    </span>
  );
}

function SpotCard({ spot, onClick }) {
  return (
    <div onClick={() => onClick(spot)} style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${spot.accent}33`, cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{spot.name}</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{spot.city} · {spot.region}</div>
          <div style={{ marginTop: 4 }}><Stars n={spot.rating} /></div>
        </div>
        <TypeBadge type={spot.type} accent={spot.accent} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        {spot.species.map(s => (
          <span key={s} style={{ fontSize: 11, background: '#374151', color: '#d1d5db', borderRadius: 10, padding: '2px 8px' }}>{s}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
        <div style={{ fontSize: 12, color: '#6b7280' }}>📐 {spot.depth}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>🎣 {spot.access}</div>
      </div>
    </div>
  );
}

function SpotDetail({ spot, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ borderLeft: `4px solid ${spot.accent}`, paddingLeft: 12, marginBottom: 14 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{spot.name}</div>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>{spot.city} · {spot.region}</div>
          <Stars n={spot.rating} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { icon: '📐', label: 'Derinlik', value: spot.depth },
            { icon: '🔓', label: 'Erişim',   value: spot.access },
            { icon: '⚡', label: 'Zorluk',   value: spot.difficulty },
            { icon: '🎣', label: 'Tür',      value: spot.type },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Best season */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>📅 EN İYİ SEZON</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {spot.bestSeason.map(m => (
              <span key={m} style={{ background: spot.accent + '22', color: spot.accent, border: `1px solid ${spot.accent}44`, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Species */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🐟 HEDEF TÜRLER</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {spot.species.map(s => (
              <span key={s} style={{ background: '#374151', color: '#f9fafb', borderRadius: 20, padding: '6px 14px', fontSize: 13, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Methods */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🎣 YÖNTEMLER</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {spot.methods.map(m => (
              <span key={m} style={{ background: '#1e3a5f', color: '#93c5fd', border: '1px solid #3b82f644', borderRadius: 20, padding: '4px 12px', fontSize: 12 }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>💡 UZMAN TAVSİYESİ</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{spot.tip}</div>
        </div>

        <a href={`https://www.google.com/maps?q=${spot.lat},${spot.lng}`} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', background: '#06b6d4', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
          🗺️ Google Haritada Aç
        </a>
      </div>
    </div>
  );
}

export default function FishingSpots() {
  const navigate = useNavigate();
  const [type,   setType]   = useState('Tümü');
  const [region, setRegion] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => SPOTS.filter(s => {
    const matchType   = type   === 'Tümü' || s.type   === type;
    const matchRegion = region === 'Tümü' || s.region === region;
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || s.species.some(sp => sp.toLowerCase().includes(q));
    return matchType && matchRegion && matchSearch;
  }), [type, region, search]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Balıkçılık Noktaları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye'nin en iyi 8 balıkçılık alanı</div>
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Şehir, nokta veya tür ara…"
          style={{ width: '100%', boxSizing: 'border-box', background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}
        />
      </div>

      <div style={{ padding: '0 16px 8px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {TYPES.map(t => (
          <button key={t} onClick={() => setType(t)} style={{
            background: type === t ? '#06b6d4' : '#1f2937', color: type === t ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: type === t ? '#06b6d4' : '#374151',
            borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {REGIONS.map(r => (
          <button key={r} onClick={() => setRegion(r)} style={{
            background: region === r ? '#3b82f6' : '#1f2937', color: region === r ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: region === r ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
          }}>{r}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} nokta</div>
        {filtered.map(s => <SpotCard key={s.id} spot={s} onClick={setSelected} />)}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🎣</div>
            <div>Sonuç bulunamadı</div>
          </div>
        )}
      </div>

      {selected && <SpotDetail spot={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
