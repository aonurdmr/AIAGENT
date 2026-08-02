import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SPOT_TYPES = [
  { id: 'fishing', label: 'Balıkçılık', icon: '🎣', color: '#06b6d4' },
  { id: 'hunting', label: 'Avlanma',    icon: '🏹', color: '#f59e0b' },
  { id: 'camping', label: 'Kamp',       icon: '⛺', color: '#22c55e' },
  { id: 'trail',   label: 'Yürüyüş',   icon: '🥾', color: '#84cc16' },
  { id: 'bird',    label: 'Kuş Gözlemi',icon: '🦅', color: '#38bdf8' },
  { id: 'other',   label: 'Diğer',      icon: '📍', color: '#a855f7' },
];

const EXAMPLE_SPOTS = [
  { id: 1, name: 'Boğaz Çıkışı', type: 'fishing', lat: 41.12, lng: 29.05, notes: 'Levrek sezonu Ekim-Mart arası çok iyi.', rating: 5, date: '2026-06-10' },
  { id: 2, name: 'Kaz Dağları Kamp', type: 'camping', lat: 39.70, lng: 26.88, notes: 'Dere kenarı, güzel görünüm. Yazın dolup taşıyor.', rating: 4, date: '2026-07-01' },
  { id: 3, name: 'Manyas Kuş Cenneti', type: 'bird', lat: 40.20, lng: 27.97, notes: 'Göçmen kuşlar Mart-Nisan\'da pik yapıyor.', rating: 5, date: '2026-04-15' },
  { id: 4, name: 'Uludağ Yürüyüş Başlangıcı', type: 'trail', lat: 40.09, lng: 29.10, notes: 'Zirve rotası 6 saat, erken başlayın.', rating: 4, date: '2026-05-20' },
];

const EMPTY_FORM = { name: '', type: 'fishing', lat: '', lng: '', notes: '', rating: 4 };

const REGIONS = [
  { name: 'Marmara', lat: 40.5, lng: 29.0 },
  { name: 'Ege', lat: 38.5, lng: 27.5 },
  { name: 'Akdeniz', lat: 37.0, lng: 31.0 },
  { name: 'Karadeniz', lat: 41.0, lng: 36.5 },
  { name: 'İç Anadolu', lat: 39.5, lng: 33.0 },
  { name: 'Doğu Anadolu', lat: 39.0, lng: 42.0 },
];

function Stars({ rating, setRating }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} onClick={() => setRating && setRating(s)} style={{
          background: 'none', border: 'none', fontSize: 20, cursor: setRating ? 'pointer' : 'default',
          color: s <= rating ? '#fbbf24' : '#374151', padding: 0,
        }}>★</button>
      ))}
    </div>
  );
}

function SpotCard({ spot, onDelete, onSelect }) {
  const t = SPOT_TYPES.find(x => x.id === spot.type) || SPOT_TYPES[5];
  return (
    <div style={{
      background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10,
      border: `1px solid ${t.color}44`, cursor: 'pointer',
    }} onClick={() => onSelect(spot)}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, background: t.color + '22',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
        }}>{t.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>{spot.name}</div>
            <button onClick={e => { e.stopPropagation(); onDelete(spot.id); }} style={{
              background: 'none', border: 'none', color: '#6b7280', fontSize: 16, cursor: 'pointer', padding: 0,
            }}>🗑️</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center' }}>
            <span style={{ background: t.color + '33', color: t.color, borderRadius: 8, padding: '1px 8px', fontSize: 11, fontWeight: 600 }}>{t.label}</span>
            <Stars rating={spot.rating} />
          </div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
            📍 {spot.lat?.toFixed(3)}, {spot.lng?.toFixed(3)} · 📅 {spot.date}
          </div>
          {spot.notes && <p style={{ fontSize: 13, color: '#9ca3af', margin: '6px 0 0', lineHeight: 1.5 }}>{spot.notes.slice(0, 80)}{spot.notes.length > 80 ? '…' : ''}</p>}
        </div>
      </div>
    </div>
  );
}

function SpotDetail({ spot, onClose }) {
  const t = SPOT_TYPES.find(x => x.id === spot.type) || SPOT_TYPES[5];
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1f2937', borderRadius: '20px 20px 0 0', padding: '24px 20px 36px', width: '100%', maxHeight: '70vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 36 }}>{t.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb' }}>{spot.name}</div>
            <span style={{ background: t.color + '33', color: t.color, borderRadius: 8, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{t.label}</span>
          </div>
        </div>
        <Stars rating={spot.rating} />
        <div style={{ display: 'flex', gap: 12, marginTop: 14, marginBottom: 14 }}>
          <div style={{ background: '#111827', borderRadius: 10, padding: '10px 14px', flex: 1 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>KOORDİNATLAR</div>
            <div style={{ fontSize: 14, color: '#f9fafb', marginTop: 4, fontFamily: 'monospace' }}>{spot.lat?.toFixed(5)}, {spot.lng?.toFixed(5)}</div>
          </div>
          <div style={{ background: '#111827', borderRadius: 10, padding: '10px 14px', flex: 1 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>EKLEME TARİHİ</div>
            <div style={{ fontSize: 14, color: '#f9fafb', marginTop: 4 }}>{spot.date}</div>
          </div>
        </div>
        {spot.notes && (
          <>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>NOTLAR</div>
            <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.6 }}>{spot.notes}</p>
          </>
        )}
        <a
          href={`https://www.google.com/maps?q=${spot.lat},${spot.lng}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'block', textAlign: 'center', background: '#1d4ed8', color: '#fff',
            borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', marginTop: 16,
          }}
        >🗺️ Google Maps'te Aç</a>
      </div>
    </div>
  );
}

export default function SpotMap() {
  const navigate = useNavigate();
  const [spots, setSpots] = useState(() => {
    try { return JSON.parse(localStorage.getItem('spot_map') || 'null') || EXAMPLE_SPOTS; } catch { return EXAMPLE_SPOTS; }
  });
  const [filter, setFilter]   = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [selected, setSelected] = useState(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => { localStorage.setItem('spot_map', JSON.stringify(spots)); }, [spots]);

  const addSpot = () => {
    if (!form.name.trim() || !form.lat || !form.lng) return;
    setSpots(prev => [{
      ...form, id: Date.now(), lat: parseFloat(form.lat), lng: parseFloat(form.lng),
      date: new Date().toISOString().slice(0, 10),
    }, ...prev]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const getMyLocation = () => {
    setLocating(true);
    navigator.geolocation?.getCurrentPosition(
      pos => {
        setForm(p => ({ ...p, lat: pos.coords.latitude.toFixed(5), lng: pos.coords.longitude.toFixed(5) }));
        setLocating(false);
      },
      () => setLocating(false)
    );
  };

  const deleteSpot = id => setSpots(prev => prev.filter(s => s.id !== id));

  const visible = filter === 'all' ? spots : spots.filter(s => s.type === filter);

  const stats = {
    total: spots.length,
    types: [...new Set(spots.map(s => s.type))].length,
    topRated: spots.filter(s => s.rating >= 5).length,
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{ padding: '20px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>🗺️ Favori Noktalarım</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kişisel balık, av ve kamp noktaları</div>
          </div>
          <button onClick={() => setShowForm(true)} style={{
            background: '#3b82f6', color: '#fff', border: 'none',
            borderRadius: 12, padding: '10px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>+ Nokta</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 16px 16px' }}>
        {[
          { label: 'Toplam Nokta', value: stats.total, color: '#3b82f6' },
          { label: 'Kategori', value: stats.types, color: '#22c55e' },
          { label: '5 Yıldız', value: stats.topRated, color: '#fbbf24' },
        ].map(s => (
          <div key={s.label} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: '1px solid #374151' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 16px 12px', overflowX: 'auto', display: 'flex', gap: 8 }}>
        <button onClick={() => setFilter('all')} style={{
          background: filter === 'all' ? '#374151' : '#1f2937',
          color: filter === 'all' ? '#f9fafb' : '#6b7280',
          border: '1px solid', borderColor: filter === 'all' ? '#6b7280' : '#374151',
          borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>Tümü ({spots.length})</button>
        {SPOT_TYPES.map(t => {
          const count = spots.filter(s => s.type === t.id).length;
          return (
            <button key={t.id} onClick={() => setFilter(t.id)} style={{
              background: filter === t.id ? t.color : '#1f2937',
              color: filter === t.id ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: filter === t.id ? t.color : '#374151',
              borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>{t.icon} {t.label} ({count})</button>
          );
        })}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{visible.length} nokta</div>
        {visible.map(spot => <SpotCard key={spot.id} spot={spot} onDelete={deleteSpot} onSelect={setSelected} />)}
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
            <div>Henüz nokta yok. + Nokta ile ekleyin.</div>
          </div>
        )}
      </div>

      {selected && <SpotDetail spot={selected} onClose={() => setSelected(null)} />}

      {showForm && (
        <div onClick={() => setShowForm(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#1f2937', borderRadius: '20px 20px 0 0', padding: '24px 20px 36px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Yeni Nokta Ekle</div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>NOKta ADI *</div>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="örn. Boğaz Çıkışı, Kamp Alanı..."
                style={{ width: '100%', background: '#374151', border: '1px solid #4b5563', borderRadius: 10, padding: '10px 14px', color: '#f9fafb', fontSize: 14, boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>KATEGORİ</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SPOT_TYPES.map(t => (
                  <button key={t.id} onClick={() => setForm(p => ({ ...p, type: t.id }))} style={{
                    background: form.type === t.id ? t.color : '#374151',
                    color: form.type === t.id ? '#fff' : '#9ca3af',
                    border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 12, cursor: 'pointer',
                  }}>{t.icon} {t.label}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>ENLİEM (Lat) *</div>
                <input value={form.lat} onChange={e => setForm(p => ({ ...p, lat: e.target.value }))} placeholder="41.00000" type="number" step="0.00001"
                  style={{ width: '100%', background: '#374151', border: '1px solid #4b5563', borderRadius: 10, padding: '10px 14px', color: '#f9fafb', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>BOYLAM (Lng) *</div>
                <input value={form.lng} onChange={e => setForm(p => ({ ...p, lng: e.target.value }))} placeholder="29.00000" type="number" step="0.00001"
                  style={{ width: '100%', background: '#374151', border: '1px solid #4b5563', borderRadius: 10, padding: '10px 14px', color: '#f9fafb', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            </div>

            <button onClick={getMyLocation} disabled={locating} style={{
              width: '100%', background: '#374151', color: '#9ca3af', border: '1px solid #4b5563',
              borderRadius: 10, padding: '10px', fontSize: 13, cursor: 'pointer', marginBottom: 14,
            }}>{locating ? '📡 Konum alınıyor...' : '📍 Mevcut Konumumu Kullan'}</button>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>PUAN</div>
              <Stars rating={form.rating} setRating={r => setForm(p => ({ ...p, rating: r }))} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>NOTLAR</div>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Bu nokta hakkında notlarınız..." rows={3}
                style={{ width: '100%', background: '#374151', border: '1px solid #4b5563', borderRadius: 10, padding: '10px 14px', color: '#f9fafb', fontSize: 14, boxSizing: 'border-box', resize: 'none' }} />
            </div>

            <button onClick={addSpot} style={{
              width: '100%', background: '#3b82f6', color: '#fff', border: 'none',
              borderRadius: 12, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            }}>Kaydet</button>
          </div>
        </div>
      )}
    </div>
  );
}
