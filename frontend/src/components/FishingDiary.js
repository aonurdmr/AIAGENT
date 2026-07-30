import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'fishing_diary';

const METHODS = ['Olta', 'Jigging', 'Trolling', 'Fly fishing', 'El oltası', 'Uzatma', 'Diğer'];
const WEATHER_OPT = ['Güneşli', 'Parçalı bulutlu', 'Bulutlu', 'Rüzgarlı', 'Yağmurlu'];
const WATER_OPT = ['Sakin', 'Hafif dalgalı', 'Dalgalı', 'Akıntılı', 'Bulanık'];

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function save(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

const EMPTY_FORM = {
  date: new Date().toISOString().slice(0, 10),
  location: '', method: 'Olta',
  weather: 'Güneşli', water: 'Sakin',
  duration: '', species: '', count: '', weight: '',
  bait: '', notes: '',
};

function EntryCard({ entry, onDelete }) {
  const [open, setOpen] = useState(false);
  const hasSpecies = entry.species && entry.count;

  return (
    <div style={{ background: '#1f2937', borderRadius: 14, marginBottom: 10, border: '1px solid #374151', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', background: 'none', border: 'none', padding: '14px 16px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>
            📍 {entry.location || 'Bilinmeyen Konum'}
          </div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
            {new Date(entry.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
            {entry.duration ? ` · ${entry.duration} saat` : ''}
            {hasSpecies ? ` · ${entry.count}× ${entry.species}` : ''}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {entry.weight && <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>⚖️ {entry.weight}kg</span>}
          <span style={{ color: '#6b7280', fontSize: 14 }}>{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div style={{ padding: '0 16px 14px', borderTop: '1px solid #374151' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}>
            {[
              { label: 'Yöntem', value: entry.method, icon: '🎣' },
              { label: 'Hava', value: entry.weather, icon: '⛅' },
              { label: 'Su Durumu', value: entry.water, icon: '🌊' },
              { label: 'Yem/Kurşun', value: entry.bait || '-', icon: '🪱' },
            ].map(s => (
              <div key={s.label} style={{ background: '#374151', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, color: '#6b7280' }}>{s.icon} {s.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#f9fafb', marginTop: 1 }}>{s.value}</div>
              </div>
            ))}
          </div>
          {entry.notes && (
            <div style={{ marginTop: 10, background: '#374151', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>📝 NOTLAR</div>
              <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{entry.notes}</div>
            </div>
          )}
          <button onClick={onDelete} style={{ marginTop: 10, background: 'none', border: 'none', color: '#4b5563', fontSize: 12, cursor: 'pointer', padding: 0 }}>🗑️ Sil</button>
        </div>
      )}
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}

const INPUT = { background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '10px 12px', fontSize: 14, width: '100%', boxSizing: 'border-box' };
const SELECT = { ...INPUT };

export default function FishingDiary() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(load);
  const [form, setForm] = useState(EMPTY_FORM);
  const [tab, setTab] = useState('gecmis');
  const [adding, setAdding] = useState(false);

  const set = useCallback((key, val) => setForm(f => ({ ...f, [key]: val })), []);

  const handleSave = () => {
    if (!form.location) return;
    const entry = { id: Date.now(), ...form };
    const updated = [entry, ...entries];
    setEntries(updated);
    save(updated);
    setForm(EMPTY_FORM);
    setAdding(false);
    setTab('gecmis');
  };

  const deleteEntry = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    save(updated);
  };

  const totalCatch = entries.reduce((s, e) => s + (parseInt(e.count) || 0), 0);
  const totalWeight = entries.reduce((s, e) => s + (parseFloat(e.weight) || 0), 0);
  const totalHours = entries.reduce((s, e) => s + (parseFloat(e.duration) || 0), 0);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📔 Balıkçılık Günlüğü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Seans kayıtları · kişisel istatistikler</div>
      </div>

      {/* Stats */}
      <div style={{ margin: '0 16px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { label: 'Toplam Seans', value: entries.length, icon: '📅' },
          { label: 'Toplam Av', value: totalCatch, icon: '🐟' },
          { label: 'Toplam Saat', value: totalHours.toFixed(1), icon: '⏱️' },
        ].map(s => (
          <div key={s.label} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 10px', textAlign: 'center', border: '1px solid #374151' }}>
            <div style={{ fontSize: 18 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#f9fafb', marginTop: 2 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>
      {totalWeight > 0 && (
        <div style={{ margin: '0 16px 14px', background: '#14532d', borderRadius: 12, padding: '10px 14px', border: '1px solid #22c55e44', textAlign: 'center' }}>
          <span style={{ fontSize: 13, color: '#86efac' }}>⚖️ Toplam av ağırlığı: <strong>{totalWeight.toFixed(2)} kg</strong></span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        {[['gecmis', `📖 Kayıtlar (${entries.length})`], ['yeni', '➕ Yeni Seans']].map(([key, label]) => (
          <button key={key} onClick={() => { setTab(key); if (key === 'yeni') setAdding(true); }} style={{
            background: tab === key ? '#3b82f6' : '#1f2937',
            color: tab === key ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === key ? '#3b82f6' : '#374151',
            borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'gecmis' ? (
        <div style={{ padding: '0 16px' }}>
          {entries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🎣</div>
              <div>Henüz kayıt yok. "Yeni Seans" ile başlayın.</div>
            </div>
          ) : (
            entries.map(e => <EntryCard key={e.id} entry={e} onDelete={() => deleteEntry(e.id)} />)
          )}
        </div>
      ) : (
        <div style={{ padding: '0 16px' }}>
          <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151' }}>
            <FormField label="📅 TARİH">
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={INPUT} />
            </FormField>
            <FormField label="📍 KONUM *">
              <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Balıkçılık yaptığınız yer" style={INPUT} />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <FormField label="🎣 YÖNTEM">
                <select value={form.method} onChange={e => set('method', e.target.value)} style={SELECT}>
                  {METHODS.map(m => <option key={m}>{m}</option>)}
                </select>
              </FormField>
              <FormField label="⏱️ SÜRE (saat)">
                <input type="number" value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="3.5" style={INPUT} />
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <FormField label="⛅ HAVA">
                <select value={form.weather} onChange={e => set('weather', e.target.value)} style={SELECT}>
                  {WEATHER_OPT.map(w => <option key={w}>{w}</option>)}
                </select>
              </FormField>
              <FormField label="🌊 SU">
                <select value={form.water} onChange={e => set('water', e.target.value)} style={SELECT}>
                  {WATER_OPT.map(w => <option key={w}>{w}</option>)}
                </select>
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <FormField label="🐟 TÜR">
                <input value={form.species} onChange={e => set('species', e.target.value)} placeholder="Levrek" style={INPUT} />
              </FormField>
              <FormField label="🔢 ADET">
                <input type="number" value={form.count} onChange={e => set('count', e.target.value)} placeholder="3" style={INPUT} />
              </FormField>
              <FormField label="⚖️ KG">
                <input type="number" step="0.1" value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="1.2" style={INPUT} />
              </FormField>
            </div>
            <FormField label="🪱 YEM / KURŞUN">
              <input value={form.bait} onChange={e => set('bait', e.target.value)} placeholder="Suni yem, doğal yem…" style={INPUT} />
            </FormField>
            <FormField label="📝 NOTLAR">
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Koşullar, strateji, notlar…" rows={3}
                style={{ ...INPUT, resize: 'vertical', fontFamily: 'inherit' }} />
            </FormField>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button onClick={handleSave} style={{ flex: 1, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>💾 Kaydet</button>
              <button onClick={() => { setForm(EMPTY_FORM); setTab('gecmis'); }} style={{ background: '#374151', color: '#9ca3af', border: 'none', borderRadius: 10, padding: 14, fontSize: 14, cursor: 'pointer' }}>İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
