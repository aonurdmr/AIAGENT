import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ZONES = [
  {
    id: 1, region: 'Marmara', name: 'Kocaeli Ormanları', province: 'Kocaeli',
    lat: 40.85, lng: 29.90,
    type: 'Devlet Av Sahası', access: 'İzin Gerekli',
    species: ['Domuz', 'Tilki', 'Tavşan', 'Çulluk'],
    season: { start: 'Ekim', end: 'Ocak' },
    area: '12,400 ha', difficulty: 'Orta',
    permit: 'Orman Genel Müdürlüğü izni + ruhsat',
    notes: 'Hafta sonu girişleri yoğundur. Sabah erken gitmenizi öneririz.',
    accent: '#3b82f6',
  },
  {
    id: 2, region: 'Ege', name: 'Boztepe Av Sahası', province: 'Manisa',
    lat: 38.61, lng: 27.43,
    type: 'Serbest Av Sahası', access: 'Ruhsatla Serbest',
    species: ['Keklik', 'Bıldırcın', 'Tavşan', 'Tilki'],
    season: { start: 'Eylül', end: 'Şubat' },
    area: '8,200 ha', difficulty: 'Kolay',
    permit: 'Av ruhsatı yeterli',
    notes: 'Keklik yoğunluğu yüksek. Köpekle avcılık ideal.',
    accent: '#f59e0b',
  },
  {
    id: 3, region: 'Karadeniz', name: 'Kaçkar Etekleri', province: 'Rize',
    lat: 40.92, lng: 40.52,
    type: 'Dağ Av Sahası', access: 'Özel İzin',
    species: ['Ayı', 'Domuz', 'Dağ Keçisi', 'Karaca'],
    season: { start: 'Kasım', end: 'Aralık' },
    area: '45,000 ha', difficulty: 'Zor',
    permit: 'Büyük av özel kotası + rehber zorunlu',
    notes: 'Yüksek rakım. Fiziksel kondisyon şart. Rehberli avlanma zorunludur.',
    accent: '#22c55e',
  },
  {
    id: 4, region: 'İç Anadolu', name: 'Tuz Gölü Çevresi', province: 'Konya',
    lat: 38.75, lng: 33.40,
    type: 'Sulak Alan', access: 'Sezonluk',
    species: ['Ördek', 'Kaz', 'Sakarca', 'Boz Kaz'],
    season: { start: 'Ekim', end: 'Şubat' },
    area: '22,500 ha', difficulty: 'Kolay',
    permit: 'Sulak alan ruhsatı + koordinatöre bildirim',
    notes: 'Göçmen kuş geçişi Ekim-Kasım arası yoğundur. Pusu avcılığı idealdir.',
    accent: '#06b6d4',
  },
  {
    id: 5, region: 'Doğu Anadolu', name: 'Ağrı Dağı Etekleri', province: 'Ağrı',
    lat: 39.70, lng: 44.30,
    type: 'Büyük Av Sahası', access: 'Kotayla Sınırlı',
    species: ['Dağ Keçisi', 'Erkek Geyik', 'Karaca', 'Domuz'],
    season: { start: 'Eylül', end: 'Kasım' },
    area: '68,000 ha', difficulty: 'Çok Zor',
    permit: 'OGM büyük av kotası (sınırlı sayıda)',
    notes: 'Yılda 50 kota. 3-4 ay önceden başvuru gerekli.',
    accent: '#a855f7',
  },
  {
    id: 6, region: 'Akdeniz', name: 'Toros Dağları', province: 'Antalya',
    lat: 37.10, lng: 31.20,
    type: 'Karma Av Sahası', access: 'Ruhsatla Serbest',
    species: ['Domuz', 'Tilki', 'Çakal', 'Keklik'],
    season: { start: 'Ekim', end: 'Mart' },
    area: '35,000 ha', difficulty: 'Orta',
    permit: 'Standart av ruhsatı',
    notes: 'Kış avı için ideal iklim. Kaya keklikleri için mükemmel habitat.',
    accent: '#ef4444',
  },
  {
    id: 7, region: 'Güneydoğu', name: 'Dicle Vadisi', province: 'Diyarbakır',
    lat: 37.91, lng: 40.22,
    type: 'Serbest Av Sahası', access: 'Ruhsatla Serbest',
    species: ['Tavşan', 'Tilki', 'Keklik', 'Bıldırcın'],
    season: { start: 'Eylül', end: 'Ocak' },
    area: '15,000 ha', difficulty: 'Kolay',
    permit: 'Av ruhsatı yeterli',
    notes: 'Ovalık arazi. Araçla ulaşım kolay. Tarlalık alanda bıldırcın yoğun.',
    accent: '#f59e0b',
  },
  {
    id: 8, region: 'Orta Karadeniz', name: 'Yeşilırmak Havzası', province: 'Tokat',
    lat: 40.31, lng: 36.55,
    type: 'Devlet Av Sahası', access: 'İzin Gerekli',
    species: ['Domuz', 'Karaca', 'Çulluk', 'Tavşan'],
    season: { start: 'Ekim', end: 'Şubat' },
    area: '19,800 ha', difficulty: 'Orta',
    permit: 'İl Özel İdaresi izni + OGM onay',
    notes: 'Nehir kenarları karaca için ideal. Domuz avı tüm yıl serbest.',
    accent: '#22c55e',
  },
];

const REGIONS = ['Tümü', 'Marmara', 'Ege', 'Karadeniz', 'Orta Karadeniz', 'İç Anadolu', 'Doğu Anadolu', 'Akdeniz', 'Güneydoğu'];
const DIFFICULTIES = { Kolay: '#34d399', Orta: '#f59e0b', Zor: '#f87171', 'Çok Zor': '#a855f7' };
const ACCESS_COLORS = { 'Ruhsatla Serbest': '#34d399', 'Sezonluk': '#f59e0b', 'İzin Gerekli': '#fb923c', 'Özel İzin': '#f87171', 'Kotayla Sınırlı': '#a855f7' };

function ZoneCard({ zone, onClick }) {
  return (
    <div onClick={() => onClick(zone)} style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${zone.accent}44`, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{zone.name}</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{zone.province} · {zone.region}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: (ACCESS_COLORS[zone.access] || '#6b7280') + '22', color: ACCESS_COLORS[zone.access] || '#6b7280', fontWeight: 600 }}>{zone.access}</span>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: (DIFFICULTIES[zone.difficulty] || '#6b7280') + '22', color: DIFFICULTIES[zone.difficulty] || '#6b7280', fontWeight: 600 }}>{zone.difficulty}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        {zone.species.map(s => (
          <span key={s} style={{ fontSize: 11, background: '#374151', color: '#d1d5db', borderRadius: 10, padding: '2px 8px' }}>{s}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
        <div style={{ fontSize: 12, color: '#6b7280' }}>📅 {zone.season.start} – {zone.season.end}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>📐 {zone.area}</div>
      </div>
    </div>
  );
}

function ZoneDetail({ zone, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ borderLeft: `4px solid ${zone.accent}`, paddingLeft: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{zone.name}</div>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>{zone.province} · {zone.region} · {zone.type}</div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { icon: '📅', label: 'Sezon',   value: `${zone.season.start} – ${zone.season.end}` },
            { icon: '📐', label: 'Alan',    value: zone.area },
            { icon: '⛰️', label: 'Zorluk',  value: zone.difficulty },
            { icon: '🔓', label: 'Erişim',  value: zone.access },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Species */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🏹 AV TÜRLERİ</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {zone.species.map(s => (
              <span key={s} style={{ background: zone.accent + '22', color: zone.accent, border: `1px solid ${zone.accent}44`, borderRadius: 20, padding: '6px 14px', fontSize: 13, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Permit */}
        <div style={{ marginBottom: 14, background: '#1e3a5f', borderRadius: 12, padding: '12px 14px', border: '1px solid #3b82f644' }}>
          <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>📋 İZİN GEREKLİLİKLERİ</div>
          <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>{zone.permit}</div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 14, background: '#374151', borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>💡 NOTLAR</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{zone.notes}</div>
        </div>

        {/* Map link */}
        <a href={`https://www.google.com/maps?q=${zone.lat},${zone.lng}`} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', background: '#3b82f6', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
          🗺️ Google Haritada Aç
        </a>
      </div>
    </div>
  );
}

export default function HuntingZones() {
  const navigate = useNavigate();
  const [region, setRegion] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => ZONES.filter(z => {
    const matchRegion = region === 'Tümü' || z.region === region;
    const q = search.toLowerCase();
    const matchSearch = !q || z.name.toLowerCase().includes(q) || z.province.toLowerCase().includes(q) || z.species.some(s => s.toLowerCase().includes(q));
    return matchRegion && matchSearch;
  }), [region, search]);

  const stats = {
    total: ZONES.length,
    free: ZONES.filter(z => z.access === 'Ruhsatla Serbest').length,
    regions: [...new Set(ZONES.map(z => z.region))].length,
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏹 Av Bölgeleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye'nin onaylı av sahaları</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 16px 14px' }}>
        {[
          { label: 'Toplam Saha', value: stats.total, color: '#f59e0b' },
          { label: 'Serbest',     value: stats.free,  color: '#34d399' },
          { label: 'Bölge',       value: stats.regions, color: '#60a5fa' },
        ].map(s => (
          <div key={s.label} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: '1px solid #374151' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ padding: '0 16px 10px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Bölge, il veya tür ara…"
          style={{ width: '100%', boxSizing: 'border-box', background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}
        />
      </div>

      {/* Region filter */}
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {REGIONS.map(r => (
          <button key={r} onClick={() => setRegion(r)} style={{
            background: region === r ? '#f59e0b' : '#1f2937',
            color: region === r ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: region === r ? '#f59e0b' : '#374151',
            borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
            whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
          }}>{r}</button>
        ))}
      </div>

      {/* Zone list */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} av sahası</div>
        {filtered.map(z => <ZoneCard key={z.id} zone={z} onClick={setSelected} />)}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🏹</div>
            <div>Sonuç bulunamadı</div>
          </div>
        )}
      </div>

      {/* Legal note */}
      <div style={{ margin: '16px 16px 0', background: '#1e3a5f', borderRadius: 14, padding: '12px 16px', border: '1px solid #3b82f644' }}>
        <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>⚖️ YASAL UYARI</div>
        <div style={{ fontSize: 12, color: '#bfdbfe', lineHeight: 1.6 }}>
          Avlanma 4915 Sayılı Kara Avcılığı Kanunu kapsamında ruhsat gerektirir. Koruma altındaki türlerin avlanması yasaktır.
          Her sezon Tarım ve Orman Bakanlığı tebliğini takip edin.
        </div>
      </div>

      {selected && <ZoneDetail zone={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
