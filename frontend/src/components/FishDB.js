import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// FishWatch public API — no auth, CORS-enabled
const FISHWATCH_URL = 'https://www.fishwatch.gov/api/species';

// Strip HTML tags from fishwatch descriptions
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim();
}

// Sustainability rank colour
function sustainColor(rank) {
  if (!rank) return '#6b7280';
  const r = rank.toLowerCase();
  if (r.includes('good') || r.includes('best'))   return '#34d399';
  if (r.includes('good alternative'))              return '#86efac';
  if (r.includes('avoid'))                         return '#f87171';
  return '#f59e0b';
}

function FishCard({ fish, onClick }) {
  const name    = fish['Species Name'] || fish['Common Name'] || 'Bilinmiyor';
  const habitat = stripHtml(fish['Habitat']).slice(0, 80) || '—';
  const rank    = fish['Fishing Rate'] || fish['Population Status'] || '';
  const img     = fish['Image Gallery']?.[0]?.src || null;

  return (
    <div onClick={() => onClick(fish)}
      style={{ background: '#1f2937', borderRadius: 14, overflow: 'hidden', border: '1px solid #374151', cursor: 'pointer', marginBottom: 10 }}>
      {img && (
        <img src={img} alt={name} style={{ width: '100%', height: 130, objectFit: 'cover' }}
          onError={e => { e.target.style.display = 'none'; }} />
      )}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb', flex: 1, marginRight: 8 }}>{name}</div>
          {rank && (
            <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600,
              background: sustainColor(rank) + '22', color: sustainColor(rank), whiteSpace: 'nowrap' }}>
              {rank.length > 16 ? rank.slice(0, 14) + '…' : rank}
            </span>
          )}
        </div>
        {fish['Scientific Name'] && (
          <div style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic', marginTop: 2 }}>{fish['Scientific Name']}</div>
        )}
        {habitat && (
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6, lineHeight: 1.5 }}>{habitat}{habitat.length === 80 ? '…' : ''}</div>
        )}
        {/* Nutrition mini-row */}
        {fish['Calories'] && (
          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            {[
              { label: 'Kalori', value: fish['Calories'] + ' kcal' },
              { label: 'Protein', value: fish['Protein'] ? fish['Protein'] + 'g' : '—' },
              { label: 'Yağ', value: fish['Fat, Total'] ? fish['Fat, Total'] + 'g' : '—' },
            ].map(n => (
              <div key={n.label} style={{ background: '#374151', borderRadius: 8, padding: '4px 8px', fontSize: 10 }}>
                <div style={{ color: '#9ca3af' }}>{n.label}</div>
                <div style={{ color: '#f9fafb', fontWeight: 700 }}>{n.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ fish, onClose }) {
  const name    = fish['Species Name'] || fish['Common Name'] || '';
  const img     = fish['Image Gallery']?.[0]?.src || null;

  const rows = [
    { label: '🌊 Habitat',       value: stripHtml(fish['Habitat']) },
    { label: '🗺️ Yaşam Alanı',   value: fish['Location'] },
    { label: '📊 Stok Durumu',   value: fish['Population Status'] },
    { label: '🎣 Avlanma Hızı',  value: fish['Fishing Rate'] },
    { label: '🔬 Biyoloji',      value: stripHtml(fish['Biology']).slice(0, 300) },
    { label: '🍽️ Tat Profili',   value: stripHtml(fish['Taste']).slice(0, 200) },
    { label: '👨‍🍳 Pişirme',       value: stripHtml(fish['Cooking']).slice(0, 200) },
  ].filter(r => r.value);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000a', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#1f2937', borderRadius: '20px 20px 0 0', width: '100%', maxHeight: '85vh', overflowY: 'auto', padding: '20px 16px 40px' }}>
        <div style={{ width: 36, height: 4, background: '#374151', borderRadius: 2, margin: '0 auto 16px' }} />
        {img && <img src={img} alt={name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12, marginBottom: 14 }}
          onError={e => { e.target.style.display = 'none'; }} />}
        <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb', marginBottom: 4 }}>{name}</div>
        {fish['Scientific Name'] && <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginBottom: 14 }}>{fish['Scientific Name']}</div>}

        {/* Nutrition */}
        {fish['Calories'] && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
            {[
              { label: 'Kalori', value: fish['Calories'] + ' kcal', color: '#f59e0b' },
              { label: 'Protein', value: (fish['Protein'] || '—') + (fish['Protein'] ? 'g' : ''), color: '#34d399' },
              { label: 'Toplam Yağ', value: (fish['Fat, Total'] || '—') + (fish['Fat, Total'] ? 'g' : ''), color: '#60a5fa' },
              { label: 'Omega-3', value: fish['Omega-3 Fatty Acids'] ? fish['Omega-3 Fatty Acids'] + 'g' : '—', color: '#a78bfa' },
              { label: 'Kolesterol', value: fish['Cholesterol'] ? fish['Cholesterol'] + 'mg' : '—', color: '#fb923c' },
              { label: 'Sodyum', value: fish['Sodium'] ? fish['Sodium'] + 'mg' : '—', color: '#f87171' },
            ].map(n => (
              <div key={n.label} style={{ background: '#374151', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: n.color }}>{n.value}</div>
                <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>{n.label}</div>
              </div>
            ))}
          </div>
        )}

        {rows.map(r => (
          <div key={r.label} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>{r.label}</div>
            <div style={{ fontSize: 13, color: '#f9fafb', lineHeight: 1.6 }}>{r.value || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CATEGORIES = ['Tümü', 'Tuna', 'Salmon', 'Shrimp', 'Cod', 'Bass', 'Snapper'];

export default function FishDB() {
  const navigate = useNavigate();
  const [allFish, setAllFish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(FISHWATCH_URL);
        if (!resp.ok) throw new Error('API error');
        const data = await resp.json();
        setAllFish(Array.isArray(data) ? data : []);
      } catch (e) {
        setError('Veri yüklenemedi. Lütfen internet bağlantınızı kontrol edin.');
      }
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allFish.slice(0, 40);
    const q = search.toLowerCase();
    return allFish.filter(f => {
      const name = (f['Species Name'] || f['Common Name'] || '').toLowerCase();
      const sci  = (f['Scientific Name'] || '').toLowerCase();
      return name.includes(q) || sci.includes(q);
    }).slice(0, 40);
  }, [allFish, search]);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Balık Veritabanı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>FishWatch · Besin değeri ve sürdürülebilirlik</div>
      </div>

      <div style={{ padding: '0 16px 12px' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Balık türü ara…"
          style={{ width: '100%', boxSizing: 'border-box', background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}
        />
      </div>

      <div style={{ padding: '0 16px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🐟</div>
            <div>FishWatch verisi yükleniyor…</div>
          </div>
        )}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#f87171' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>⚠️</div>
            <div>{error}</div>
          </div>
        )}
        {!loading && !error && (
          <>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>
              {filtered.length} tür gösteriliyor {allFish.length > 0 ? `(toplam ${allFish.length})` : ''}
            </div>
            {filtered.map((fish, i) => (
              <FishCard key={i} fish={fish} onClick={setSelected} />
            ))}
            {filtered.length === 0 && search && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
                <div>"{search}" için sonuç bulunamadı</div>
              </div>
            )}
          </>
        )}
      </div>

      {selected && <Detail fish={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
