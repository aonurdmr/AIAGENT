import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'DEMO_KEY';

async function fetchAPOD(date) {
  const params = date ? `&date=${date}` : '';
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function dateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const FISHING_TIPS = [
  'Yeni ay döneminde balıklar derin sularda avlanır. Gece oltası deneyin.',
  'Dolunay gecelerinde yüzey balıkçılığı verimlidir — ışık böcek çeker.',
  'Hilal döneminde sabah 04-07 arası en aktif balıkçılık saatidir.',
  'İlk dört dönemde balık hareketliliği orta düzeydedir.',
];

export default function NasaAPOD() {
  const navigate = useNavigate();
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');
  const [archive, setArchive] = useState([]);

  useEffect(() => {
    load(null);
    Promise.all(
      [-1, -2, -3].map(offset => fetchAPOD(dateOffset(offset)).catch(() => null))
    ).then(results => setArchive(results.filter(Boolean)));
  }, []);

  async function load(selectedDate) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPOD(selectedDate || undefined);
      setApod(data);
    } catch (e) {
      setError('NASA verisi yüklenemedi. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  }

  const handleDate = (e) => {
    setDate(e.target.value);
    if (e.target.value) load(e.target.value);
  };

  const todayTip = FISHING_TIPS[new Date().getDate() % FISHING_TIPS.length];

  return (
    <div style={{ background: '#080b14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🚀 NASA Günün Görseli</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
          Astronomy Picture of the Day · NASA · evrenin her gün bir penceresi
        </div>
      </div>

      <div style={{ padding: '0 16px 14px' }}>
        <input type="date" value={date} onChange={handleDate}
          max={new Date().toISOString().slice(0, 10)}
          min="1995-06-16"
          style={{ background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 10, padding: '10px 14px', fontSize: 14, width: '100%', boxSizing: 'border-box' }} />
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: 60, color: '#6b7280' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🔭</div>
          <div>Evren yükleniyor…</div>
        </div>
      )}

      {error && (
        <div style={{ margin: '0 16px', background: '#450a0a', borderRadius: 12, padding: 16, color: '#f87171', fontSize: 13 }}>
          ⚠️ {error}
        </div>
      )}

      {apod && !loading && (
        <div>
          {apod.media_type === 'image' ? (
            <div style={{ position: 'relative' }}>
              <img src={apod.hdurl || apod.url} alt={apod.title}
                style={{ width: '100%', maxHeight: 320, objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, #080b14)', height: 80 }} />
            </div>
          ) : apod.media_type === 'video' ? (
            <div style={{ margin: '0 16px', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden' }}>
              <iframe src={apod.url} title={apod.title} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen />
            </div>
          ) : null}

          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ fontSize: 11, color: '#818cf8', fontWeight: 600, marginBottom: 4 }}>
              📅 {new Date(apod.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              {apod.copyright && ` · © ${apod.copyright}`}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#f9fafb', marginBottom: 10 }}>{apod.title}</div>
            <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{apod.explanation}</div>
          </div>

          <div style={{ margin: '16px 16px 0', background: '#0f172a', borderRadius: 14, padding: '14px 16px', border: '1px solid #1e3a5f' }}>
            <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 6 }}>🌙 AY VE BALIKÇILIK</div>
            <div style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6 }}>{todayTip}</div>
          </div>
        </div>
      )}

      {archive.length > 0 && (
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📚 SON 3 GÜN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {archive.map(a => (
              <div key={a.date} onClick={() => { setDate(a.date); setApod(a); }}
                style={{ background: '#1f2937', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center' }}>
                {a.media_type === 'image' && a.url && (
                  <img src={a.url} alt={a.title} style={{ width: 60, height: 44, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                )}
                <div>
                  <div style={{ fontSize: 12, color: '#818cf8' }}>{new Date(a.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f9fafb', marginTop: 2 }}>{a.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ margin: '16px 16px 0', background: '#1c1f26', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151' }}>
        <div style={{ fontSize: 10, color: '#6b7280' }}>📡 NASA APOD API (api.nasa.gov) · 1995'ten bugüne her gün · Ücretsiz DEMO_KEY</div>
      </div>
    </div>
  );
}
