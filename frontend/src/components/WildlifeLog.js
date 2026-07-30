import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES_TYPES = ['Tümü', 'Balık', 'Kuş', 'Memeli', 'Sürüngen', 'Bitki', 'Diğer'];
const SEASONS = { 3: 'İlkbahar', 4: 'İlkbahar', 5: 'İlkbahar', 6: 'Yaz', 7: 'Yaz', 8: 'Yaz', 9: 'Sonbahar', 10: 'Sonbahar', 11: 'Sonbahar', 12: 'Kış', 1: 'Kış', 2: 'Kış' };

const EXAMPLE_LOGS = [
  { id: 1, species: 'Levrek', type: 'Balık', icon: '🐟', date: '2026-07-15', location: 'Çeşme Koyu', notes: 'Sabah 06:30, 45 cm, serbest bıraktım.', count: 1, photo: false },
  { id: 2, species: 'Flamingo', type: 'Kuş', icon: '🦩', date: '2026-05-20', location: 'Tuz Gölü', notes: 'Yaklaşık 200 bireylik kolonı gözlemledim.', count: 200, photo: false },
  { id: 3, species: 'Tilki', type: 'Memeli', icon: '🦊', date: '2026-06-08', location: 'Uludağ Etekleri', notes: 'Akşam karanlığında orman kenarında.', count: 1, photo: false },
  { id: 4, species: 'Karahindiba', type: 'Bitki', icon: '🌼', date: '2026-04-03', location: 'Boğaziçi Kıyısı', notes: 'Çiçeklenme başlamış.', count: null, photo: false },
];

const EMPTY_FORM = { species: '', type: 'Balık', icon: '🐟', date: '', location: '', notes: '', count: '' };
const TYPE_ICONS  = { Balık: '🐟', Kuş: '🦅', Memeli: '🦊', Sürüngen: '🦎', Bitki: '🌿', Diğer: '🌿' };

function LogCard({ log, onDelete }) {
  const month = log.date ? parseInt(log.date.split('-')[1]) : 6;
  const season = SEASONS[month] || 'Yaz';
  const SEASON_COLOR = { 'İlkbahar': '#22c55e', 'Yaz': '#f59e0b', 'Sonbahar': '#f97316', 'Kış': '#06b6d4' };

  return (
    <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 12, border: '1px solid #374151' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, background: '#374151',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0,
        }}>{log.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb' }}>{log.species}</div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 1 }}>
                <span style={{ background: SEASON_COLOR[season] + '33', color: SEASON_COLOR[season], borderRadius: 8, padding: '1px 7px', marginRight: 6, fontSize: 11, fontWeight: 600 }}>{season}</span>
                {log.type}
              </div>
            </div>
            <button onClick={() => onDelete(log.id)} style={{
              background: 'none', border: 'none', color: '#6b7280', fontSize: 18, cursor: 'pointer', padding: 4,
            }}>🗑️</button>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 12, color: '#9ca3af', flexWrap: 'wrap' }}>
            <span>📅 {log.date}</span>
            <span>📍 {log.location}</span>
            {log.count && <span>🔢 {log.count} birey</span>}
          </div>
          {log.notes && (
            <p style={{ fontSize: 13, color: '#d1d5db', margin: '8px 0 0', lineHeight: 1.5 }}>{log.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WildlifeLog() {
  const navigate = useNavigate();
  const [logs, setLogs]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('wildlife_logs') || 'null') || EXAMPLE_LOGS; } catch { return EXAMPLE_LOGS; }
  });
  const [filter, setFilter]   = useState('Tümü');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]        = useState(EMPTY_FORM);
  const [sortBy, setSortBy]    = useState('date');

  useEffect(() => {
    localStorage.setItem('wildlife_logs', JSON.stringify(logs));
  }, [logs]);

  const addLog = () => {
    if (!form.species.trim() || !form.date || !form.location.trim()) return;
    const newLog = {
      ...form,
      id: Date.now(),
      icon: TYPE_ICONS[form.type] || '🌿',
      count: form.count ? parseInt(form.count) : null,
      photo: false,
    };
    setLogs(prev => [newLog, ...prev]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const deleteLog = (id) => setLogs(prev => prev.filter(l => l.id !== id));

  const visible = logs
    .filter(l => filter === 'Tümü' || l.type === filter)
    .sort((a, b) => sortBy === 'date' ? b.date.localeCompare(a.date) : a.species.localeCompare(b.species));

  const stats = {
    total: logs.length,
    types: [...new Set(logs.map(l => l.type))].length,
    species: [...new Set(logs.map(l => l.species))].length,
    thisMonth: logs.filter(l => {
      const m = new Date().toISOString().slice(0, 7);
      return l.date.startsWith(m);
    }).length,
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 80 }}>
      <div style={{ padding: '20px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>📓 Doğa Günlüğü</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Tür gözlem kayıtlarınız</div>
          </div>
          <button onClick={() => setShowForm(true)} style={{
            background: '#22c55e', color: '#fff', border: 'none',
            borderRadius: 12, padding: '10px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>+ Ekle</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: '0 16px 16px' }}>
        {[
          { label: 'Kayıt', value: stats.total, color: '#3b82f6' },
          { label: 'Tür', value: stats.species, color: '#22c55e' },
          { label: 'Kategori', value: stats.types, color: '#f59e0b' },
          { label: 'Bu Ay', value: stats.thisMonth, color: '#a855f7' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#1f2937', borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: '1px solid #374151',
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 8 }}>
          {SPECIES_TYPES.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              background: filter === t ? '#22c55e' : '#1f2937',
              color: filter === t ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: filter === t ? '#22c55e' : '#374151',
              borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
              whiteSpace: 'nowrap', cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setSortBy('date')} style={{
            background: sortBy === 'date' ? '#374151' : 'none', color: sortBy === 'date' ? '#f9fafb' : '#6b7280',
            border: '1px solid #374151', borderRadius: 8, padding: '5px 12px', fontSize: 12, cursor: 'pointer',
          }}>📅 Tarihe göre</button>
          <button onClick={() => setSortBy('alpha')} style={{
            background: sortBy === 'alpha' ? '#374151' : 'none', color: sortBy === 'alpha' ? '#f9fafb' : '#6b7280',
            border: '1px solid #374151', borderRadius: 8, padding: '5px 12px', fontSize: 12, cursor: 'pointer',
          }}>🔤 A-Z</button>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{visible.length} kayıt</div>
        {visible.map(log => <LogCard key={log.id} log={log} onDelete={deleteLog} />)}
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📓</div>
            <div>Henüz kayıt yok. + Ekle butonuyla başlayın.</div>
          </div>
        )}
      </div>

      {showForm && (
        <div onClick={() => setShowForm(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
          display: 'flex', alignItems: 'flex-end',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#1f2937', borderRadius: '20px 20px 0 0',
            padding: '24px 20px 36px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Yeni Gözlem Ekle</div>

            {[
              { label: 'Tür Adı *', key: 'species', placeholder: 'örn. Levrek, Kaya Kartalı...' },
              { label: 'Konum *', key: 'location', placeholder: 'örn. Çeşme Koyu, Uludağ...' },
              { label: 'Sayı (isteğe bağlı)', key: 'count', placeholder: 'Kaç birey?', type: 'number' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>{f.label}</div>
                <input
                  type={f.type || 'text'}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{
                    width: '100%', background: '#374151', border: '1px solid #4b5563',
                    borderRadius: 10, padding: '10px 14px', color: '#f9fafb', fontSize: 14, boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>Kategori</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SPECIES_TYPES.filter(t => t !== 'Tümü').map(t => (
                  <button key={t} onClick={() => setForm(p => ({ ...p, type: t }))} style={{
                    background: form.type === t ? '#22c55e' : '#374151',
                    color: form.type === t ? '#fff' : '#9ca3af',
                    border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 12, cursor: 'pointer',
                  }}>{TYPE_ICONS[t]} {t}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>Tarih *</div>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                style={{
                  width: '100%', background: '#374151', border: '1px solid #4b5563',
                  borderRadius: 10, padding: '10px 14px', color: '#f9fafb', fontSize: 14, boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>Notlar</div>
              <textarea
                value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="Gözlem detayları, davranış, boyut..."
                rows={3}
                style={{
                  width: '100%', background: '#374151', border: '1px solid #4b5563',
                  borderRadius: 10, padding: '10px 14px', color: '#f9fafb', fontSize: 14,
                  boxSizing: 'border-box', resize: 'none',
                }}
              />
            </div>

            <button onClick={addLog} style={{
              width: '100%', background: '#22c55e', color: '#fff', border: 'none',
              borderRadius: 12, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            }}>Kaydet</button>
          </div>
        </div>
      )}
    </div>
  );
}
