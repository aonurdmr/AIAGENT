import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const PARKS = [
  {
    id: 1, name: 'Kaçkar Dağları Milli Parkı', region: 'Karadeniz', province: 'Rize / Artvin',
    lat: 40.85, lng: 41.10, area: '51,550 ha', established: 1994,
    activities: ['Trekking', 'Dağcılık', 'Doğa yürüyüşü', 'Fotoğrafçılık'],
    wildlife: ['Dağ keçisi', 'Ayı', 'Kurt', 'Kartal'],
    highlights: 'Türkiye\'nin en yüksek yaylaları ve buzul gölleri. Çimil-Verçenik patikaları.',
    accent: '#22c55e', icon: '⛰️',
  },
  {
    id: 2, name: 'Köprülü Kanyon Milli Parkı', region: 'Akdeniz', province: 'Antalya',
    lat: 37.12, lng: 31.48, area: '36,614 ha', established: 1973,
    activities: ['Rafting', 'Kanyoning', 'Kamp', 'Doğa yürüyüşü'],
    wildlife: ['Kız kartal', 'Anadolu parsı', 'Su samuru'],
    highlights: 'Türkiye\'nin en popüler rafting güzergahı. Roma dönemi köprüler.',
    accent: '#06b6d4', icon: '🏞️',
  },
  {
    id: 3, name: 'Göreme Milli Parkı ve Kapadokya', region: 'İç Anadolu', province: 'Nevşehir',
    lat: 38.64, lng: 34.85, area: '9,576 ha', established: 1986,
    activities: ['Sıcak hava balonu', 'Yürüyüş', 'Peri bacası turu'],
    wildlife: ['Tilki', 'Tavşan', 'Sürüngenler'],
    highlights: 'UNESCO Dünya Mirası. Erozyon ile şekillenen benzersiz peyzaj ve yeraltı şehirleri.',
    accent: '#f59e0b', icon: '🎈',
  },
  {
    id: 4, name: 'Dilek Yarımadası Büyük Menderes Deltası', region: 'Ege', province: 'Aydın',
    lat: 37.68, lng: 27.16, area: '27,675 ha', established: 1966,
    activities: ['Deniz yüzme', 'Dalış', 'Kuş gözlemi', 'Yürüyüş'],
    wildlife: ['Su samuru', 'Karaca', 'Flamingo', 'Pelikaan'],
    highlights: 'Ege\'nin en temiz koyu Kavakköy. Antik Miletos ve Didyma yakınında.',
    accent: '#38bdf8', icon: '🏖️',
  },
  {
    id: 5, name: 'Ağrı Dağı Milli Parkı', region: 'Doğu Anadolu', province: 'Ağrı',
    lat: 39.70, lng: 44.30, area: '88,240 ha', established: 2004,
    activities: ['Dağcılık', 'Trekking', 'Fotoğrafçılık'],
    wildlife: ['Dağ keçisi', 'Geyik', 'Kartal'],
    highlights: 'Türkiye\'nin en yüksek zirvesi (5137m). Nuh\'un Gemisi efsanesinin yurdu.',
    accent: '#a855f7', icon: '🏔️',
  },
  {
    id: 6, name: 'Küre Dağları Milli Parkı', region: 'Karadeniz', province: 'Kastamonu / Bartın',
    lat: 41.72, lng: 33.68, area: '37,479 ha', established: 2000,
    activities: ['Kamp', 'Doğa yürüyüşü', 'Dağ bisikleti', 'Kuş gözlemi'],
    wildlife: ['Kara akbaba', 'Ayı', 'Vaşak', 'Su samuru'],
    highlights: 'Avrupa\'nın sürekliliği olan nadir ormanlarından. Valla Kanyonu.',
    accent: '#34d399', icon: '🌲',
  },
  {
    id: 7, name: 'Münzur Vadisi Milli Parkı', region: 'Doğu Anadolu', province: 'Tunceli',
    lat: 39.18, lng: 39.15, area: '42,400 ha', established: 1971,
    activities: ['Rafting', 'Trekking', 'Botanik yürüyüşü'],
    wildlife: ['Anadolu parsı', 'Dağ keçisi', 'Kartal'],
    highlights: 'Alevi kültürünün kalbi. Yüzlerce endemik bitki türü. Kristal berraklığında nehir.',
    accent: '#3b82f6', icon: '🏞️',
  },
  {
    id: 8, name: 'Yedigöller Milli Parkı', region: 'Karadeniz', province: 'Bolu',
    lat: 40.93, lng: 31.77, area: '1,091 ha', established: 1965,
    activities: ['Doğa yürüyüşü', 'Fotoğrafçılık', 'Kamp'],
    wildlife: ['Ayı', 'Geyik', 'Domuz', 'Su samuru'],
    highlights: '7 göl ve karaçam ormanı. Sonbahar renkleri için Türkiye\'nin en gözde noktası.',
    accent: '#f87171', icon: '🍂',
  },
];

const REGIONS = ['Tümü', 'Karadeniz', 'Ege', 'Akdeniz', 'İç Anadolu', 'Doğu Anadolu'];

function ParkCard({ park, onClick }) {
  return (
    <div onClick={() => onClick(park)} style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${park.accent}44`, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>{park.icon}</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{park.name}</div>
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>{park.province} · {park.region}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: '#6b7280' }}>{park.established}</div>
          <div style={{ fontSize: 11, color: park.accent, fontWeight: 600 }}>{park.area}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {park.activities.slice(0, 3).map(a => (
          <span key={a} style={{ fontSize: 11, background: park.accent + '22', color: park.accent, borderRadius: 10, padding: '2px 8px', fontWeight: 600 }}>{a}</span>
        ))}
        {park.activities.length > 3 && <span style={{ fontSize: 11, color: '#6b7280' }}>+{park.activities.length - 3}</span>}
      </div>
    </div>
  );
}

function ParkDetail({ park, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '88vh', overflowY: 'auto', padding: '20px 16px 48px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 32 }}>{park.icon}</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#f9fafb' }}>{park.name}</div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{park.province} · {park.region}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, margin: '14px 0' }}>
          {[
            { label: 'Alan', value: park.area, icon: '📐' },
            { label: 'Kuruluş', value: park.established, icon: '📅' },
            { label: 'Bölge', value: park.region, icon: '🗺️' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🏕️ AKTİVİTELER</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {park.activities.map(a => (
              <span key={a} style={{ background: park.accent + '22', color: park.accent, border: `1px solid ${park.accent}44`, borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600 }}>{a}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>🦌 YABAN HAYATI</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {park.wildlife.map(w => (
              <span key={w} style={{ background: '#374151', color: '#d1d5db', borderRadius: 20, padding: '5px 14px', fontSize: 12 }}>{w}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>✨ ÖNE ÇIKANLAR</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{park.highlights}</div>
        </div>

        <a href={`https://www.google.com/maps?q=${park.lat},${park.lng}`} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', background: '#22c55e', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
          🗺️ Haritada Göster
        </a>
      </div>
    </div>
  );
}

export default function NationalParks() {
  const navigate = useNavigate();
  const [region, setRegion] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => PARKS.filter(p => {
    const matchRegion = region === 'Tümü' || p.region === region;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.province.toLowerCase().includes(q);
    return matchRegion && matchSearch;
  }), [region, search]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Milli Parklar</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye'nin korunan doğal alanları</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 16px 14px' }}>
        {[
          { label: 'Toplam Park', value: PARKS.length, color: '#22c55e' },
          { label: 'Bölge', value: REGIONS.length - 1, color: '#3b82f6' },
          { label: 'Toplam Alan', value: '200K+ ha', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: '1px solid #374151' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 16px 10px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Park adı veya il ara…"
          style={{ width: '100%', boxSizing: 'border-box', background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}
        />
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {REGIONS.map(r => (
          <button key={r} onClick={() => setRegion(r)} style={{
            background: region === r ? '#22c55e' : '#1f2937', color: region === r ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: region === r ? '#22c55e' : '#374151',
            borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
          }}>{r}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>{filtered.length} park</div>
        {filtered.map(p => <ParkCard key={p.id} park={p} onClick={setSelected} />)}
      </div>

      {selected && <ParkDetail park={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
