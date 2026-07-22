import React, { useState, useRef } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const CATEGORIES = [
  { id: 'genel', label: 'Otomatik', icon: '🔍' },
  { id: 'fish',  label: 'Balık',    icon: '🐟' },
  { id: 'animal',label: 'Hayvan',   icon: '🦊' },
  { id: 'bird',  label: 'Kuş',      icon: '🦅' },
  { id: 'plant', label: 'Bitki',    icon: '🌿' },
];

const STATUS_COLORS = { LC: '#22c55e', NT: '#f59e0b', VU: '#f97316', EN: '#ef4444', CR: '#dc2626' };
const STATUS_NAMES  = { LC: 'Az Endişe', NT: 'Neredeyse Tehdit', VU: 'Hassas', EN: 'Tehlike', CR: 'Kritik Tehlike' };

export default function AIIdentify() {
  const [category, setCategory] = useState('genel');
  const [image, setImage]       = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState('');
  const [drag, setDrag]         = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) { setError('Lütfen bir görsel dosyası seçin.'); return; }
    setError(''); setResult(null);
    setImageUrl(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = e => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const identify = async () => {
    if (!image) return;
    setLoading(true); setError('');
    try {
      const { data } = await axios.post(`${API}/identify`, { image_base64: image, category });
      setResult(data.data);
    } catch {
      setError('Tanımlama başarısız. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setImage(null); setImageUrl(null); setResult(null); setError(''); };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>🔍 AI Tür Tanımlama</h1>
        <p>Fotoğraf yükle → Anında tür analizi al</p>
      </div>

      <div style={{ padding: 16 }}>
        {/* Category selector */}
        <div className="filter-tabs" style={{ marginBottom: 16 }}>
          {CATEGORIES.map(c => (
            <button key={c.id} className={`filter-tab ${category === c.id ? 'active' : ''}`}
              onClick={() => setCategory(c.id)}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Upload or result */}
        {!result ? (
          <>
            {!imageUrl ? (
              <div
                className={`upload-zone ${drag ? 'drag-over' : ''}`}
                onDrop={handleDrop}
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onClick={() => fileRef.current.click()}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>📸</div>
                <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: 16, marginBottom: 6 }}>Fotoğraf Yükle</div>
                <div style={{ color: '#4a6741', fontSize: 13 }}>Sürükle bırak veya tıkla</div>
                <div style={{ color: '#4a6741', fontSize: 12, marginTop: 4 }}>JPG, PNG, WEBP desteklenir</div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={e => handleFile(e.target.files[0])} />
              </div>
            ) : (
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
                <img src={imageUrl} alt="Yüklenen" style={{ width: '100%', maxHeight: 280, objectFit: 'cover' }} />
                <button onClick={reset} style={{
                  position: 'absolute', top: 8, right: 8,
                  background: '#0008', border: 'none', borderRadius: '50%',
                  width: 32, height: 32, color: '#fff', fontSize: 16, cursor: 'pointer',
                }}>✕</button>
              </div>
            )}

            {error && <div style={{ color: '#fca5a5', fontSize: 13, margin: '8px 0' }}>⚠️ {error}</div>}

            {imageUrl && (
              <button className="btn-primary" onClick={identify} disabled={loading} style={{ marginTop: 8 }}>
                {loading ? <><div className="spinner" style={{ width: 18, height: 18 }} /> Analiz ediliyor…</> : '🔍 Tür Tanımla'}
              </button>
            )}

            {!imageUrl && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, color: '#4a6741', marginBottom: 10, textAlign: 'center' }}>
                  Tanımlayabileceklerimiz:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    ['🐟', 'Balık Türleri', '200+ tür'],
                    ['🦊', 'Av Hayvanları', '50+ tür'],
                    ['🦅', 'Kuşlar', '400+ tür'],
                    ['🌿', 'Bitkiler', '1000+ tür'],
                  ].map(([ic, nm, cnt]) => (
                    <div key={nm} className="card-dark" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 24 }}>{ic}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{nm}</div>
                        <div style={{ fontSize: 11, color: '#4a6741' }}>{cnt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Result view */
          <div className="result-card fade-in">
            {imageUrl && (
              <img src={imageUrl} alt="Analiz" style={{ width: '100%', maxHeight: 220, objectFit: 'cover' }} />
            )}
            <div className="result-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{result.species_name}</div>
                  <div style={{ fontSize: 13, color: '#86efac', fontStyle: 'italic' }}>{result.scientific_name}</div>
                </div>
                <div className={`tag tag-${result.category === 'balık' ? 'blue' : result.category === 'kuş' ? 'amber' : 'green'}`}>
                  {result.category}
                </div>
              </div>
              {/* Confidence */}
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#4a6741', marginBottom: 4 }}>
                  <span>Güven oranı</span><span style={{ color: '#86efac', fontWeight: 600 }}>{result.confidence}%</span>
                </div>
                <div className="conf-bar"><div className="conf-fill" style={{ width: `${result.confidence}%` }} /></div>
              </div>
            </div>

            <div style={{ padding: 16 }}>
              {[
                { icon: '📝', label: 'Açıklama', value: result.description },
                { icon: '🌍', label: 'Yaşam Alanı', value: result.habitat },
                { icon: '📏', label: 'Boyut', value: result.size_info },
                { icon: '🍽️', label: 'Beslenme', value: result.diet },
                { icon: '🎣', label: 'Avlama İpuçları', value: result.fishing_tips },
                { icon: '⚖️', label: 'Yasal Düzenleme', value: result.regulations },
                { icon: '📅', label: 'En İyi Sezon', value: result.best_season },
                { icon: '💡', label: 'Biliyor muydun?', value: result.fun_fact },
              ].filter(r => r.value).map(row => (
                <div key={row.label} style={{ marginBottom: 12, borderBottom: '1px solid #22c55e11', paddingBottom: 12 }}>
                  <div style={{ fontSize: 11, color: '#4a6741', marginBottom: 3, fontWeight: 600 }}>{row.icon} {row.label}</div>
                  <div style={{ fontSize: 13, color: '#a0c4a0', lineHeight: 1.6 }}>{row.value}</div>
                </div>
              ))}

              {result.conservation_status && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="tag" style={{
                    background: `${STATUS_COLORS[result.conservation_status] || '#22c55e'}22`,
                    color: STATUS_COLORS[result.conservation_status] || '#22c55e',
                    border: `1px solid ${STATUS_COLORS[result.conservation_status] || '#22c55e'}33`,
                  }}>
                    🌱 {result.conservation_status}
                  </div>
                  <span style={{ fontSize: 12, color: '#4a6741' }}>{STATUS_NAMES[result.conservation_status]}</span>
                </div>
              )}

              <button className="btn-primary" style={{ marginTop: 16 }} onClick={reset}>
                ↩ Yeni Fotoğraf Yükle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
