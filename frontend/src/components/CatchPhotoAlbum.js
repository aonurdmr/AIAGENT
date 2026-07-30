import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'catch_photos';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function save(photos) { localStorage.setItem(STORAGE_KEY, JSON.stringify(photos)); }

const SPECIES_LIST = ['Levrek', 'Lüfer', 'Palamut', 'Sazan', 'Alabalık', 'Çipura', 'Kefal', 'Turna', 'Yayın', 'Diğer'];

function PhotoCard({ photo, onDelete, onClick }) {
  return (
    <div onClick={() => onClick(photo)} style={{ background: '#1f2937', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', border: '1px solid #374151', position: 'relative' }}>
      {photo.dataUrl ? (
        <img src={photo.dataUrl} alt={photo.species} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ width: '100%', height: 140, background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🐟</div>
      )}
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb', marginBottom: 2 }}>{photo.species}</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {photo.weight && <span style={{ fontSize: 11, color: '#22c55e' }}>⚖️ {photo.weight}kg</span>}
          {photo.length && <span style={{ fontSize: 11, color: '#06b6d4' }}>📏 {photo.length}cm</span>}
        </div>
        <div style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>
          {photo.location && `📍 ${photo.location.slice(0, 20)} · `}
          {new Date(photo.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
        </div>
      </div>
      <button onClick={e => { e.stopPropagation(); onDelete(photo.id); }} style={{ position: 'absolute', top: 6, right: 6, background: '#000000aa', border: 'none', color: '#fff', borderRadius: '50%', width: 28, height: 28, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🗑️</button>
    </div>
  );
}

function PhotoDetail({ photo, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000c', zIndex: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}>✕</button>
      {photo.dataUrl && (
        <img src={photo.dataUrl} alt={photo.species} style={{ maxWidth: '95vw', maxHeight: '65vh', objectFit: 'contain', borderRadius: 12, marginBottom: 16 }} />
      )}
      <div onClick={e => e.stopPropagation()} style={{ background: '#1f2937', borderRadius: 16, padding: '16px 20px', width: '90%', maxWidth: 400 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#f9fafb', marginBottom: 8 }}>{photo.species}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
          {[
            { label: 'Ağırlık', value: photo.weight ? `${photo.weight}kg` : '-', icon: '⚖️' },
            { label: 'Boy', value: photo.length ? `${photo.length}cm` : '-', icon: '📏' },
            { label: 'Konum', value: photo.location || '-', icon: '📍' },
            { label: 'Tarih', value: new Date(photo.date).toLocaleDateString('tr-TR'), icon: '📅' },
          ].map(s => (
            <div key={s.label} style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb', marginTop: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>
        {photo.notes && <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6 }}>{photo.notes}</div>}
      </div>
    </div>
  );
}

export default function CatchPhotoAlbum() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(load);
  const [adding, setAdding] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ species: 'Levrek', weight: '', length: '', location: '', notes: '', date: new Date().toISOString().slice(0, 10) });
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileRef = useRef();

  const set = useCallback((key, val) => setForm(f => ({ ...f, [key]: val })), []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPreviewUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const photo = { id: Date.now(), ...form, dataUrl: previewUrl || null };
    const updated = [photo, ...photos];
    setPhotos(updated);
    save(updated);
    setForm({ species: 'Levrek', weight: '', length: '', location: '', notes: '', date: new Date().toISOString().slice(0, 10) });
    setPreviewUrl(null);
    setAdding(false);
  };

  const deletePhoto = (id) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    save(updated);
    if (detail?.id === id) setDetail(null);
  };

  const INPUT = { background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '10px 12px', fontSize: 14, width: '100%', boxSizing: 'border-box' };

  const totalWeight = photos.reduce((s, p) => s + (parseFloat(p.weight) || 0), 0);
  const biggestFish = photos.reduce((max, p) => {
    const w = parseFloat(p.weight) || 0;
    return w > (parseFloat(max?.weight) || 0) ? p : max;
  }, null);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📸 Av Fotoğraf Albümü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kişisel av kaydı ve fotoğraf koleksiyonu</div>
      </div>

      {/* Stats */}
      {photos.length > 0 && (
        <div style={{ margin: '0 16px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <div style={{ background: '#1f2937', borderRadius: 12, padding: '10px', textAlign: 'center', border: '1px solid #374151' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#f9fafb' }}>{photos.length}</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>Toplam Av</div>
          </div>
          <div style={{ background: '#1f2937', borderRadius: 12, padding: '10px', textAlign: 'center', border: '1px solid #374151' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#22c55e' }}>{totalWeight.toFixed(1)}kg</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>Toplam Ağırlık</div>
          </div>
          <div style={{ background: '#1f2937', borderRadius: 12, padding: '10px', textAlign: 'center', border: '1px solid #374151' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>{biggestFish?.species || '-'}</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>🏆 {biggestFish?.weight ? `${biggestFish.weight}kg` : 'En Büyük'}</div>
          </div>
        </div>
      )}

      <div style={{ padding: '0 16px 14px' }}>
        <button onClick={() => setAdding(!adding)} style={{ width: '100%', background: adding ? '#374151' : '#22c55e', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          {adding ? '✕ İptal' : '📸 Yeni Av Ekle'}
        </button>
      </div>

      {adding && (
        <div style={{ margin: '0 16px 14px', background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151' }}>
          {/* Photo upload */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>📷 FOTOĞRAF</div>
            <input type="file" accept="image/*" ref={fileRef} onChange={handleFile} style={{ display: 'none' }} />
            {previewUrl ? (
              <div style={{ position: 'relative' }}>
                <img src={previewUrl} alt="preview" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 10 }} />
                <button onClick={() => setPreviewUrl(null)} style={{ position: 'absolute', top: 6, right: 6, background: '#ef4444', border: 'none', color: '#fff', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: 14 }}>✕</button>
              </div>
            ) : (
              <button onClick={() => fileRef.current.click()} style={{ width: '100%', background: '#374151', border: '2px dashed #4b5563', color: '#9ca3af', borderRadius: 10, padding: 20, fontSize: 14, cursor: 'pointer' }}>
                📷 Fotoğraf seç veya çek
              </button>
            )}
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>🐟 TÜR</div>
            <select value={form.species} onChange={e => set('species', e.target.value)} style={INPUT}>
              {SPECIES_LIST.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>⚖️ AĞIRLIK (kg)</div>
              <input type="number" step="0.01" value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="1.85" style={INPUT} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>📏 BOY (cm)</div>
              <input type="number" value={form.length} onChange={e => set('length', e.target.value)} placeholder="45" style={INPUT} />
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>📍 KONUM</div>
            <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Balık tuttuğunuz yer" style={INPUT} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>📅 TARİH</div>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={INPUT} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>📝 NOTLAR</div>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Yem, koşullar, anı..." rows={2}
              style={{ ...INPUT, resize: 'vertical', fontFamily: 'inherit' }} />
          </div>

          <button onClick={handleSave} style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            💾 Kaydet
          </button>
        </div>
      )}

      <div style={{ padding: '0 16px' }}>
        {photos.length === 0 && !adding ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📸</div>
            <div>Albümünüz boş. Yukarıdan ilk avınızı ekleyin!</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {photos.map(p => <PhotoCard key={p.id} photo={p} onDelete={deletePhoto} onClick={setDetail} />)}
          </div>
        )}
      </div>

      {detail && <PhotoDetail photo={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}
