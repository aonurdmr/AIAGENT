import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const TYPES = [
  { id: 'fishing', icon: '🎣', label: 'Balıkçılık', color: '#3b82f6' },
  { id: 'hunting', icon: '🏹', label: 'Avcılık',   color: '#ef4444' },
  { id: 'camping', icon: '⛺', label: 'Kamp',       color: '#22c55e' },
  { id: 'birdwatching', icon: '🦅', label: 'Kuş Gözlemi', color: '#f59e0b' },
];

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [form, setForm] = useState({
    type: 'fishing', species: '', location_name: '',
    lat: '', lng: '', weight: '', length: '', notes: '', weather_conditions: '',
  });

  useEffect(() => {
    axios.get(`${API}/activities`).then(r => setActivities(r.data)).finally(() => setLoading(false));
  }, []);

  const submit = async () => {
    if (!form.type || !form.location_name) return;
    const payload = {
      ...form,
      lat: parseFloat(form.lat) || 0,
      lng: parseFloat(form.lng) || 0,
      weight: form.weight ? parseFloat(form.weight) : null,
      length: form.length ? parseFloat(form.length) : null,
    };
    const { data } = await axios.post(`${API}/activities`, payload);
    setActivities(prev => [data, ...prev]);
    setShowForm(false);
    setForm({ type: 'fishing', species: '', location_name: '', lat: '', lng: '', weight: '', length: '', notes: '', weather_conditions: '' });
  };

  const typeConfig = (t) => TYPES.find(x => x.id === t) || TYPES[0];

  const totals = TYPES.map(t => ({
    ...t, count: activities.filter(a => a.type === t.id).length,
  }));

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>📋 Aktivite Günlüğü</h1>
            <p>Tüm outdoor anlarını kaydet</p>
          </div>
          <button className="btn-primary" style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }}
            onClick={() => setShowForm(true)}>+ Kaydet</button>
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {/* Summary */}
        <div className="stat-grid" style={{ marginBottom: 16 }}>
          {totals.map(t => (
            <div key={t.id} className="stat-card">
              <div style={{ fontSize: 20 }}>{t.icon}</div>
              <div className="num" style={{ color: t.color, fontSize: 20 }}>{t.count}</div>
              <div className="label">{t.label}</div>
            </div>
          ))}
          <div className="stat-card">
            <div style={{ fontSize: 20 }}>📊</div>
            <div className="num" style={{ fontSize: 20 }}>{activities.length}</div>
            <div className="label">Toplam</div>
          </div>
        </div>

        {/* Activities */}
        <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
          Son Aktiviteler
        </h3>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div className="spinner" />
          </div>
        ) : activities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#4a6741' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>Henüz aktivite yok</div>
            <div style={{ fontSize: 12 }}>İlk kaydını eklemek için + Kaydet'e bas</div>
          </div>
        ) : (
          activities.map(act => {
            const cfg = typeConfig(act.type);
            return (
              <div key={act.id} className="post-card" style={{ marginBottom: 8, padding: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: cfg.color + '22', border: `1px solid ${cfg.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}>{cfg.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>
                        {act.species || cfg.label}
                      </div>
                      <div style={{ fontSize: 11, color: '#4a6741' }}>{formatDate(act.date)}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#4a6741', marginBottom: 4 }}>
                      📍 {act.location_name || 'Konum belirtilmedi'}
                    </div>
                    {(act.weight || act.length) && (
                      <div style={{ fontSize: 12, color: '#86efac', marginBottom: 4 }}>
                        {act.weight && `⚖️ ${act.weight} kg`}
                        {act.weight && act.length && '  '}
                        {act.length && `📏 ${act.length} cm`}
                      </div>
                    )}
                    {act.notes && (
                      <div style={{ fontSize: 12, color: '#a0c4a0', lineHeight: 1.5 }}>{act.notes}</div>
                    )}
                    {act.weather_conditions && (
                      <div style={{ fontSize: 11, color: '#4a6741', marginTop: 4 }}>
                        🌤️ {act.weather_conditions}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add activity modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: '#000a', zIndex: 200,
          display: 'flex', alignItems: 'flex-end', overflowY: 'auto',
        }} onClick={() => setShowForm(false)}>
          <div style={{
            background: '#122212', borderRadius: '20px 20px 0 0',
            padding: 20, width: '100%', maxWidth: 430, margin: '0 auto',
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>📝 Aktivite Kaydet</h3>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 6 }}>Aktivite Türü</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {TYPES.map(t => (
                  <button key={t.id} onClick={() => setForm(p => ({ ...p, type: t.id }))} style={{
                    flex: 1, padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: form.type === t.id ? t.color + '33' : '#0f1f0f',
                    border: `1px solid ${form.type === t.id ? t.color : '#22c55e22'}`,
                    color: form.type === t.id ? t.color : '#4a6741', fontSize: 14, display: 'flex',
                    flexDirection: 'column', alignItems: 'center', gap: 2,
                  }}>
                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                    <span style={{ fontSize: 9, fontWeight: 600 }}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {[
              ['Tür/Hedef', 'species', 'text', 'ör. Sazan, Keklik…'],
              ['Konum *', 'location_name', 'text', 'ör. Sapanca Gölü'],
              ['Hava Koşulları', 'weather_conditions', 'text', 'ör. Açık, 20°C'],
            ].map(([lb, key, tp, ph]) => (
              <div key={key} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 4 }}>{lb}</label>
                <input type={tp} placeholder={ph} className="input-field" value={form[key]}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
              </div>
            ))}

            {form.type === 'fishing' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                {[['Ağırlık (kg)', 'weight'], ['Boy (cm)', 'length']].map(([lb, key]) => (
                  <div key={key}>
                    <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 4 }}>{lb}</label>
                    <input type="number" placeholder="0" className="input-field" value={form[key]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: '#4a6741', display: 'block', marginBottom: 4 }}>Notlar</label>
              <textarea className="input-field" placeholder="Deneyimini anlat…" value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} style={{ minHeight: 70 }} />
            </div>

            <button className="btn-primary" onClick={submit}>✓ Kaydet</button>
            <button className="btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
              onClick={() => setShowForm(false)}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
}
