import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const SPECIES_LIST = [
  { id: 'levrek',   label: 'Levrek',   icon: '🐟' },
  { id: 'sazan',    label: 'Sazan',    icon: '🐠' },
  { id: 'alabalik', label: 'Alabalık', icon: '🐡' },
  { id: 'turna',    label: 'Turna',    icon: '🦈' },
  { id: 'sudak',    label: 'Sudak',    icon: '🐟' },
];

const LOCATIONS = [
  { id: 'kıyı',  label: 'Kıyı',   icon: '🏖️' },
  { id: 'tekne', label: 'Tekne',  icon: '⛵' },
  { id: 'göl',   label: 'Göl',    icon: '💧' },
  { id: 'dere',  label: 'Dere',   icon: '🏔️' },
];

const GEAR_ICONS = {
  rod:   '🎣',
  reel:  '⚙️',
  line:  '〰️',
  hook:  '🪝',
  lure:  '🌀',
};

const GEAR_LABELS = {
  rod:   'Kamış',
  reel:  'Makara',
  line:  'Misina',
  hook:  'İğne',
  lure:  'Yem / Lure',
};

function GearCard({ type, data, color }) {
  const isLure = type === 'lure';
  return (
    <div style={{
      background: 'var(--s2)', border: '1px solid var(--border)',
      borderRadius: 14, padding: 14, marginBottom: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: color + '20', border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
        }}>{GEAR_ICONS[type]}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{GEAR_LABELS[type]}</div>
          {!isLure && <div style={{ fontSize: 11, color: color, fontWeight: 600 }}>{data.model || data.main}</div>}
        </div>
      </div>

      {isLure ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {data.map((l, i) => (
            <span key={i} style={{
              fontSize: 11, color: color, background: color + '15',
              borderRadius: 8, padding: '3px 9px', border: `1px solid ${color}30`,
            }}>{l}</span>
          ))}
        </div>
      ) : (
        <div>
          {Object.entries(data).filter(([k]) => k !== 'model' && k !== 'main').map(([key, val]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 10, color: 'var(--t-mute)', textTransform: 'capitalize' }}>
                {key === 'action' ? 'Aksiyon' : key === 'power' ? 'Güç' : key === 'gear' ? 'Dişli Oran' : key === 'drag' ? 'Fren' : key === 'leader' ? 'Lider' : key === 'type' ? 'Tip' : key === 'size' ? 'Boyut' : key}
              </span>
              <span style={{ fontSize: 10, color: '#fff', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{val}</span>
            </div>
          ))}
          {data.tip && (
            <div style={{ fontSize: 11, color: '#fbbf24', marginTop: 6, fontStyle: 'italic' }}>
              💡 {data.tip}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GearSelector() {
  const [species,  setSpecies]  = useState('levrek');
  const [method,   setMethod]   = useState('spinning');
  const [location, setLocation] = useState('kıyı');
  const [data,     setData]     = useState(null);
  const [loading,  setLoading]  = useState(false);

  const spColor = {
    levrek:'#38bdf8', sazan:'#f59e0b', alabalik:'#22c55e', turna:'#84cc16', sudak:'#c084fc'
  }[species] || '#22c55e';

  const load = async (sp, mt, loc) => {
    setLoading(true);
    try {
      const { data: d } = await axios.get(`${API}/gear-selector?species=${sp}&method=${mt}&location=${loc}`);
      setData(d);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(species, method, location); }, []);

  const handleSpecies = (s) => { setSpecies(s); setMethod('spinning'); load(s, 'spinning', location); };
  const handleMethod  = (m) => { setMethod(m); load(species, m, location); };
  const handleLoc     = (l) => { setLocation(l); load(species, method, l); };

  return (
    <div className="page fade-in">
      <div style={{
        background: 'linear-gradient(160deg, #00100a 0%, #001a10 60%)',
        padding: '52px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🎣 Ekipman Seçici</h1>
        <p style={{ fontSize: 13, color: 'var(--t-mute)' }}>Türe ve yönteme göre optimal ekipman</p>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Species */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 6 }}>TÜR</div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
            {SPECIES_LIST.map(sp => (
              <button key={sp.id} onClick={() => handleSpecies(sp.id)} style={{
                flexShrink: 0, padding: '7px 12px', borderRadius: 16, cursor: 'pointer',
                background: species === sp.id ? spColor + '20' : 'var(--s2)',
                border: `1px solid ${species === sp.id ? spColor + '60' : 'var(--border)'}`,
                color: species === sp.id ? spColor : 'var(--t-mute)',
                fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
              }}>{sp.icon} {sp.label}</button>
            ))}
          </div>
        </div>

        {/* Method */}
        {data?.available_methods && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 6 }}>YÖNTEM</div>
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
              {data.available_methods.map(m => (
                <button key={m} onClick={() => handleMethod(m)} style={{
                  flexShrink: 0, padding: '7px 12px', borderRadius: 16, cursor: 'pointer',
                  background: method === m ? spColor + '20' : 'var(--s2)',
                  border: `1px solid ${method === m ? spColor + '60' : 'var(--border)'}`,
                  color: method === m ? spColor : 'var(--t-mute)',
                  fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', textTransform: 'capitalize',
                }}>{m === 'spinning' ? '🌀 Spinning' : m === 'bottom' ? '⚓ Bottom' : m === 'fly' ? '🪰 Fly' : m}</button>
              ))}
            </div>
          </div>
        )}

        {/* Location */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 6 }}>LOKASYON</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {LOCATIONS.map(l => (
              <button key={l.id} onClick={() => handleLoc(l.id)} style={{
                flex: 1, padding: '6px 4px', borderRadius: 10, cursor: 'pointer',
                background: location === l.id ? spColor + '20' : 'var(--s2)',
                border: `1px solid ${location === l.id ? spColor + '60' : 'var(--border)'}`,
                color: location === l.id ? spColor : 'var(--t-mute)',
                fontSize: 11, fontWeight: 600,
              }}>{l.icon}<br />{l.label}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div className="spinner" />
          </div>
        ) : data ? (
          <>
            {/* Header */}
            <div style={{
              background: spColor + '10', border: `1px solid ${spColor}35`,
              borderRadius: 14, padding: '12px 14px', marginBottom: 14,
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: spColor, marginBottom: 2 }}>
                {SPECIES_LIST.find(s=>s.id===species)?.icon} {SPECIES_LIST.find(s=>s.id===species)?.label} — {data.method.charAt(0).toUpperCase() + data.method.slice(1)} Setup
              </div>
              <div style={{ fontSize: 11, color: 'var(--t-mid)', lineHeight: 1.5 }}>{data.tip}</div>
            </div>

            {/* Gear cards */}
            {data.gear && (
              <>
                {['rod', 'reel', 'line', 'hook', 'lure'].map(key => (
                  data.gear[key] && <GearCard key={key} type={key} data={data.gear[key]} color={spColor} />
                ))}
              </>
            )}

            <div style={{
              fontSize: 11, color: 'var(--t-mute)', textAlign: 'center',
              padding: '8px 0 20px', lineHeight: 1.5,
            }}>
              💡 Ekipman önerileri genel rehber niteliğindedir. Usta balıkçı tercihlerinize göre uyarlayın.
            </div>
          </>
        ) : null}

      </div>
    </div>
  );
}
