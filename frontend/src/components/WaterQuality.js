import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const PARAMS = [
  { key: 'ph', label: 'pH', unit: '', min: 6.5, max: 8.5, ideal: [7.0, 7.8], icon: '🧪', desc: 'Asitlik/bazlık ölçüsü. 7 = nötr. Balıklar için 6.5-8.5 aralığı kritik.' },
  { key: 'temp', label: 'Su Sıcaklığı', unit: '°C', min: 0, max: 35, ideal: [10, 22], icon: '🌡️', desc: 'Büyük çoğunluk balıklar için ideal 10-22°C. Alabalık 8-18°C, levrek 18-26°C sever.' },
  { key: 'oxygen', label: 'Çözünmüş Oksijen', unit: 'mg/L', min: 0, max: 14, ideal: [7, 12], icon: '💨', desc: '7 mg/L altı balıklar için stresli. 4 mg/L altı kritik.' },
  { key: 'turbidity', label: 'Bulanıklık', unit: 'NTU', min: 0, max: 100, ideal: [0, 25], icon: '🌊', desc: '25 NTU altı genellikle iyi. Yüksek değer görsel avcılığı zorlaştırır.' },
  { key: 'nitrate', label: 'Nitrat', unit: 'mg/L', min: 0, max: 50, ideal: [0, 10], icon: '🌱', desc: '10 mg/L altı iyi. 50 mg/L üstü balıklar için toksik.' },
];

const SPOTS = [
  { id: 1, name: 'Sapanca Gölü', region: 'Marmara', icon: '🏞️', type: 'Göl' },
  { id: 2, name: 'Fırat Nehri', region: 'Doğu Anadolu', icon: '🏔️', type: 'Nehir' },
  { id: 3, name: 'Köyceğiz Gölü', region: 'Ege', icon: '🌿', type: 'Göl' },
  { id: 4, name: 'Göksu Nehri', region: 'Akdeniz', icon: '🌊', type: 'Nehir' },
  { id: 5, name: 'Manyas Gölü', region: 'Marmara', icon: '🦢', type: 'Göl' },
  { id: 6, name: 'Sakarya Nehri', region: 'Marmara', icon: '🏞️', type: 'Nehir' },
];

const STORAGE_KEY = 'water_quality_logs';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function save(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function qualityScore(values) {
  let score = 100;
  PARAMS.forEach(p => {
    const v = values[p.key];
    if (v === undefined || v === '') return;
    const num = parseFloat(v);
    if (isNaN(num)) return;
    const [lo, hi] = p.ideal;
    if (num < lo) score -= Math.min(20, (lo - num) / lo * 30);
    else if (num > hi) score -= Math.min(20, (num - hi) / hi * 30);
  });
  return Math.max(0, Math.round(score));
}

function scoreColor(s) {
  if (s >= 80) return '#22c55e';
  if (s >= 60) return '#f59e0b';
  return '#ef4444';
}

function scoreLabel(s) {
  if (s >= 80) return 'İyi';
  if (s >= 60) return 'Orta';
  return 'Kötü';
}

function ParamInput({ p, value, onChange }) {
  const num = parseFloat(value);
  const hasValue = !isNaN(num) && value !== '';
  const [lo, hi] = p.ideal;
  const inRange = hasValue && num >= lo && num <= hi;
  const color = !hasValue ? '#6b7280' : inRange ? '#22c55e' : '#f59e0b';

  return (
    <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#f9fafb' }}>{p.icon} {p.label}</div>
        <div style={{ fontSize: 11, color: '#6b7280' }}>İdeal: {p.ideal[0]}–{p.ideal[1]} {p.unit}</div>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input type="number" value={value} onChange={e => onChange(e.target.value)}
          placeholder={`${p.min}–${p.max}`}
          style={{ flex: 1, background: '#111827', border: `1px solid ${color}`, color: '#f9fafb', borderRadius: 8, padding: '8px 12px', fontSize: 16, fontWeight: 700 }}
        />
        <div style={{ fontSize: 12, color: '#6b7280', minWidth: 32 }}>{p.unit}</div>
        {hasValue && <span style={{ fontSize: 16 }}>{inRange ? '✅' : '⚠️'}</span>}
      </div>
      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 6, lineHeight: 1.5 }}>{p.desc}</div>
    </div>
  );
}

function LogCard({ log, onDelete }) {
  const score = qualityScore(log.values);
  const color = scoreColor(score);
  return (
    <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${color}44` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{log.spot || 'Bilinmeyen Nokta'}</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{new Date(log.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color }}>{score}</div>
          <div style={{ fontSize: 11, color, fontWeight: 700 }}>{scoreLabel(score)}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        {PARAMS.map(p => log.values[p.key] ? (
          <span key={p.key} style={{ fontSize: 10, background: '#374151', color: '#9ca3af', borderRadius: 8, padding: '2px 8px' }}>
            {p.label}: {log.values[p.key]} {p.unit}
          </span>
        ) : null)}
      </div>
      <button onClick={onDelete} style={{ background: 'none', border: 'none', color: '#4b5563', fontSize: 12, cursor: 'pointer', padding: '4px 0', marginTop: 6 }}>🗑️ Sil</button>
    </div>
  );
}

export default function WaterQuality() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('kayit');
  const [values, setValues] = useState({});
  const [spot, setSpot] = useState('');
  const [customSpot, setCustomSpot] = useState('');
  const [logs, setLogs] = useState(load);

  const score = useMemo(() => qualityScore(values), [values]);

  const handleSave = () => {
    const hasAny = PARAMS.some(p => values[p.key] !== undefined && values[p.key] !== '');
    if (!hasAny) return;
    const spotName = spot || customSpot || 'Bilinmeyen Nokta';
    const log = { id: Date.now(), date: new Date().toISOString(), spot: spotName, values: { ...values } };
    const updated = [log, ...logs];
    setLogs(updated);
    save(updated);
    setValues({});
    setSpot('');
    setCustomSpot('');
    setTab('gecmis');
  };

  const deleteLog = (id) => {
    const updated = logs.filter(l => l.id !== id);
    setLogs(updated);
    save(updated);
  };

  const color = scoreColor(score);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>💧 Su Kalitesi Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>5 parametre · balıkçılık kalite skoru</div>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {[['kayit', '📝 Ölçüm Kaydet'], ['gecmis', `📊 Geçmiş (${logs.length})`]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            background: tab === key ? '#3b82f6' : '#1f2937',
            color: tab === key ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === key ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'kayit' ? (
        <div style={{ padding: '0 16px' }}>
          {/* Score preview */}
          <div style={{ background: '#1f2937', borderRadius: 14, padding: '14px 18px', marginBottom: 14, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ textAlign: 'center', minWidth: 72, height: 72, borderRadius: '50%', border: `3px solid ${color}`, background: color + '12', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 24, fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: 9, color, letterSpacing: '.04em' }}>SKOR</span>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color }}>{scoreLabel(score)} Su Kalitesi</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Değerleri girdikçe güncellenir</div>
            </div>
          </div>

          {/* Spot selection */}
          <div style={{ background: '#374151', borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>📍 KONUM</div>
            <select value={spot} onChange={e => setSpot(e.target.value)}
              style={{ width: '100%', background: '#111827', border: '1px solid #374151', color: spot ? '#f9fafb' : '#6b7280', borderRadius: 8, padding: '10px 12px', fontSize: 14, marginBottom: 8 }}>
              <option value="">Hazır nokta seç…</option>
              {SPOTS.map(s => <option key={s.id} value={s.name}>{s.icon} {s.name}</option>)}
            </select>
            {!spot && (
              <input value={customSpot} onChange={e => setCustomSpot(e.target.value)}
                placeholder="Veya özel konum yaz…"
                style={{ width: '100%', boxSizing: 'border-box', background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}
              />
            )}
          </div>

          {PARAMS.map(p => (
            <ParamInput key={p.key} p={p} value={values[p.key] || ''} onChange={v => setValues(prev => ({ ...prev, [p.key]: v }))} />
          ))}

          <button onClick={handleSave} style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 12, padding: 16, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
            💾 Ölçümü Kaydet
          </button>
        </div>
      ) : (
        <div style={{ padding: '0 16px' }}>
          {logs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>💧</div>
              <div>Henüz ölçüm yok. "Ölçüm Kaydet" sekmesinden başlayın.</div>
            </div>
          ) : (
            logs.map(log => <LogCard key={log.id} log={log} onDelete={() => deleteLog(log.id)} />)
          )}
        </div>
      )}
    </div>
  );
}
