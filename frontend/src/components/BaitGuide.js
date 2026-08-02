import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const SEASONS = [
  { id: '',          label: 'Tüm Sezonlar', icon: '📅' },
  { id: 'ilkbahar', label: 'İlkbahar',     icon: '🌸' },
  { id: 'yaz',      label: 'Yaz',          icon: '☀️' },
  { id: 'sonbahar', label: 'Sonbahar',      icon: '🍂' },
  { id: 'kış',      label: 'Kış',          icon: '❄️' },
];

const TYPE_COLOR = {
  'Doğal': '#22c55e',
  'Yapay': '#3b82f6',
  'Hazır': '#f59e0b',
};

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: 10, color: i <= rating ? '#fbbf24' : '#334155' }}>★</span>
      ))}
    </div>
  );
}

function BaitCard({ bait }) {
  const [expanded, setExpanded] = useState(false);
  const tc = TYPE_COLOR[bait.type] || '#94a3b8';
  return (
    <div onClick={() => setExpanded(!expanded)} style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 16, padding: '14px', marginBottom: 8, cursor: 'pointer',
      transition: 'border-color .2s',
      borderColor: expanded ? tc + '60' : 'var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: tc + '15', border: `1px solid ${tc}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>{bait.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>{bait.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StarRating rating={bait.rating} />
            <span style={{
              fontSize: 10, fontWeight: 700, color: tc,
              background: tc + '15', borderRadius: 6, padding: '2px 6px',
            }}>{bait.type}</span>
          </div>
        </div>
        <div style={{ fontSize: 14, color: 'var(--t-mute)', transition: 'transform .2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>▾</div>
      </div>

      {expanded && (
        <div style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--t-mid)', lineHeight: 1.6 }}>{bait.tip}</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
            {bait.seasons.map(s => (
              <span key={s} style={{
                fontSize: 10, color: 'var(--t-mute)', background: 'var(--s3)',
                borderRadius: 6, padding: '2px 7px', border: '1px solid var(--border)',
              }}>
                {s === 'ilkbahar' ? '🌸' : s === 'yaz' ? '☀️' : s === 'sonbahar' ? '🍂' : '❄️'} {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BaitGuide() {
  const [allSpecies, setAllSpecies] = useState([]);
  const [speciesId, setSpeciesId]   = useState('sazan');
  const [season, setSeason]         = useState('');
  const [data, setData]             = useState(null);
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    axios.get(`${API}/bait-guide?species=sazan`).then(r => {
      setAllSpecies(r.data.all_species || []);
      setData(r.data);
    }).catch(() => {});
  }, []);

  const load = async (sp, s) => {
    setLoading(true);
    try {
      const { data: d } = await axios.get(`${API}/bait-guide?species=${sp}&season=${s}`);
      setData(d);
    } catch {}
    setLoading(false);
  };

  const handleSpecies = (id) => { setSpeciesId(id); load(id, season); };
  const handleSeason  = (s)  => { setSeason(s);  load(speciesId, s);  };

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #0c1a00 0%, #162400 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🪱 Yem Rehberi</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Tür ve sezon bazlı yem önerileri</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Season selector */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>SEZON</div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
            {SEASONS.map(s => (
              <button key={s.id} onClick={() => handleSeason(s.id)} style={{
                flexShrink: 0, padding: '7px 12px', borderRadius: 20, cursor: 'pointer',
                background: season === s.id ? 'var(--a-glow)' : 'var(--s2)',
                border: season === s.id ? '1px solid var(--border-lg)' : '1px solid var(--border)',
                color: season === s.id ? 'var(--a-light)' : 'var(--t-mute)',
                fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
              }}>{s.icon} {s.label}</button>
            ))}
          </div>
        </div>

        {/* Species selector */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 8 }}>TÜR</div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
            {allSpecies.map(sp => (
              <button key={sp.id} onClick={() => handleSpecies(sp.id)} style={{
                flexShrink: 0, padding: '7px 12px', borderRadius: 20, cursor: 'pointer',
                background: speciesId === sp.id ? 'var(--a-glow)' : 'var(--s2)',
                border: speciesId === sp.id ? '1px solid var(--border-lg)' : '1px solid var(--border)',
                color: speciesId === sp.id ? 'var(--a-light)' : 'var(--t-mute)',
                fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
              }}>
                {sp.water === 'salt' ? '🌊' : '💧'} {sp.label.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Result header */}
        {data && (
          <div style={{
            background: 'var(--s2)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '10px 14px', marginBottom: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{data.label}</div>
              <div style={{ fontSize: 11, color: 'var(--t-mute)' }}>
                {data.water === 'salt' ? '🌊 Tuzlu Su' : '💧 Tatlı Su'} · {data.baits.length} yem önerisi
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {Object.entries(TYPE_COLOR).map(([type, color]) => (
                <div key={type} style={{ textAlign: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, margin: '0 auto 2px' }} />
                  <div style={{ fontSize: 9, color: 'var(--t-mute)' }}>{type}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bait list */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div className="spinner" />
          </div>
        ) : data?.baits?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t-mute)' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🪱</div>
            <div>Bu sezon için yem önerisi bulunamadı</div>
          </div>
        ) : (
          <>
            {data?.baits?.map((b, i) => <BaitCard key={i} bait={b} />)}
            <div style={{
              fontSize: 11, color: 'var(--t-mute)', textAlign: 'center',
              padding: '8px 0 20px', lineHeight: 1.5,
            }}>
              💡 Yem seçimi hava koşullarına ve su sıcaklığına göre değişebilir
            </div>
          </>
        )}

      </div>
    </div>
  );
}
