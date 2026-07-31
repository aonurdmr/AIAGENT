import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES_LIST = ['Levrek', 'Çipura', 'Palamut', 'Torik', 'Alabalık', 'Sazan', 'Yayın', 'Lüfer', 'İstavrit', 'Kefal', 'Barbun', 'Orfoz'];

const RECORDS = [
  { species: 'Levrek', holder: 'Türkiye Rekoru', weight: 9200, length: 87, location: 'Marmara Denizi', year: 2019 },
  { species: 'Çipura', holder: 'Türkiye Rekoru', weight: 7800, length: 75, location: 'Ege Denizi', year: 2021 },
  { species: 'Palamut', holder: 'Türkiye Rekoru', weight: 4200, length: 68, location: 'İstanbul Boğazı', year: 2018 },
  { species: 'Torik', holder: 'Türkiye Rekoru', weight: 12500, length: 105, location: 'Marmara Denizi', year: 2020 },
  { species: 'Alabalık', holder: 'Türkiye Rekoru', weight: 3800, length: 62, location: 'Çoruh Nehri', year: 2017 },
  { species: 'Sazan', holder: 'Türkiye Rekoru', weight: 22000, length: 102, location: 'Keban Barajı', year: 2015 },
  { species: 'Yayın', holder: 'Türkiye Rekoru', weight: 55000, length: 198, location: 'Fırat Nehri', year: 2016 },
  { species: 'Lüfer', holder: 'Türkiye Rekoru', weight: 3100, length: 58, location: 'İstanbul Boğazı', year: 2022 },
];

const LS_KEY = 'personal_best_v1';
function loadRecords() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
}
function saveRecords(val) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(val)); } catch {}
}

function emptyForm() {
  return { species: 'Levrek', weight: '', length: '', location: '', date: new Date().toISOString().slice(0, 10), notes: '' };
}

export default function PersonalBest() {
  const navigate = useNavigate();
  const [records, setRecords] = useState(loadRecords);
  const [tab, setTab] = useState('mine');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [editIdx, setEditIdx] = useState(null);

  function submit() {
    if (!form.weight || !form.species) return;
    const entry = { ...form, weight: parseFloat(form.weight) * 1000, length: parseFloat(form.length) || 0, id: Date.now() };
    let next;
    if (editIdx !== null) {
      next = records.map((r, i) => i === editIdx ? entry : r);
      setEditIdx(null);
    } else {
      next = [...records, entry];
    }
    saveRecords(next);
    setRecords(next);
    setForm(emptyForm());
    setShowForm(false);
  }

  function del(i) {
    const next = records.filter((_, idx) => idx !== i);
    saveRecords(next);
    setRecords(next);
  }

  function startEdit(r, i) {
    setForm({ ...r, weight: (r.weight / 1000).toFixed(2) });
    setEditIdx(i);
    setShowForm(true);
  }

  // Best per species from personal records
  const personalBest = {};
  records.forEach(r => {
    if (!personalBest[r.species] || r.weight > personalBest[r.species].weight) {
      personalBest[r.species] = r;
    }
  });

  const INPUT = { background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '10px 12px', fontSize: 13, width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏆 Kişisel Rekorlar</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kişisel en büyük balık kaydı ve Türkiye rekorları</div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['mine', '🏅 Benim Rekorlarım'], ['records', '🇹🇷 Türkiye Rekorları']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#f59e0b' : '#1f2937', color: tab === id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#f59e0b' : '#374151',
            borderRadius: 10, padding: '10px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'mine' && (
          <div>
            <button onClick={() => { setShowForm(!showForm); setForm(emptyForm()); setEditIdx(null); }}
              style={{ width: '100%', background: '#22c55e', border: 'none', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 12 }}>
              {showForm ? '✕ Kapat' : '+ Yeni Kayıt Ekle'}
            </button>

            {showForm && (
              <div style={{ background: '#1f2937', borderRadius: 14, padding: 16, border: '1px solid #374151', marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 12 }}>
                  {editIdx !== null ? '✏️ KAYDIMI GÜNCELLE' : '🐟 YENİ REKORUM'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Tür</div>
                    <select value={form.species} onChange={e => setForm(v => ({ ...v, species: e.target.value }))} style={INPUT}>
                      {SPECIES_LIST.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Tarih</div>
                    <input type="date" value={form.date} onChange={e => setForm(v => ({ ...v, date: e.target.value }))} style={INPUT} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Ağırlık (kg)</div>
                    <input type="number" step="0.01" value={form.weight} onChange={e => setForm(v => ({ ...v, weight: e.target.value }))} style={INPUT} placeholder="2.35" />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Boy (cm)</div>
                    <input type="number" value={form.length} onChange={e => setForm(v => ({ ...v, length: e.target.value }))} style={INPUT} placeholder="48" />
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Yer</div>
                  <input value={form.location} onChange={e => setForm(v => ({ ...v, location: e.target.value }))} style={INPUT} placeholder="İstanbul Boğazı..." />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Not (isteğe bağlı)</div>
                  <input value={form.notes} onChange={e => setForm(v => ({ ...v, notes: e.target.value }))} style={INPUT} placeholder="Kullandığım yem, hava durumu..." />
                </div>
                <button onClick={submit} style={{ width: '100%', background: '#22c55e', border: 'none', color: '#fff', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  {editIdx !== null ? '✓ Güncelle' : '✓ Kaydet'}
                </button>
              </div>
            )}

            {records.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🏅</div>
                <div style={{ fontSize: 14 }}>Henüz kişisel rekorum yok.</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Yukarıdan ilk kaydını ekle!</div>
              </div>
            ) : (
              records.slice().sort((a, b) => b.weight - a.weight).map((r, i) => {
                const origIdx = records.indexOf(r);
                const natRec = RECORDS.find(nr => nr.species === r.species);
                const pctOfRecord = natRec ? Math.min(100, Math.round((r.weight / natRec.weight) * 100)) : null;
                return (
                  <div key={r.id || i} style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 8, border: '1px solid #374151' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>🐟 {r.species}</div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{r.date} · {r.location || '—'}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#f59e0b' }}>{(r.weight / 1000).toFixed(2)} kg</div>
                        {r.length > 0 && <div style={{ fontSize: 11, color: '#6b7280' }}>{r.length} cm</div>}
                      </div>
                    </div>
                    {pctOfRecord !== null && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 10, color: '#6b7280' }}>
                          <span>Türkiye Rekoruna Oranı</span>
                          <span style={{ color: pctOfRecord >= 80 ? '#22c55e' : '#9ca3af' }}>{pctOfRecord}%</span>
                        </div>
                        <div style={{ background: '#374151', borderRadius: 4, height: 5 }}>
                          <div style={{ width: `${pctOfRecord}%`, height: 5, borderRadius: 4, background: pctOfRecord >= 80 ? '#22c55e' : '#3b82f6' }} />
                        </div>
                      </div>
                    )}
                    {r.notes && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6, fontStyle: 'italic' }}>"{r.notes}"</div>}
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button onClick={() => startEdit(r, origIdx)} style={{ flex: 1, background: '#374151', border: 'none', color: '#9ca3af', borderRadius: 8, padding: '6px 0', fontSize: 11, cursor: 'pointer' }}>✏️ Düzenle</button>
                      <button onClick={() => del(origIdx)} style={{ flex: 1, background: '#450a0a', border: 'none', color: '#fca5a5', borderRadius: 8, padding: '6px 0', fontSize: 11, cursor: 'pointer' }}>🗑️ Sil</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {tab === 'records' && (
          <div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>🇹🇷 Türkiye'nin tür bazında balık rekorları</div>
            {RECORDS.map((r, i) => (
              <div key={i} style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 8, border: '1px solid #374151' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb' }}>🐟 {r.species}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{r.location} · {r.year}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>Boy: {r.length} cm</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#f59e0b' }}>{(r.weight / 1000).toFixed(1)} kg</div>
                    <div style={{ fontSize: 10, color: '#6b7280' }}>{r.weight.toLocaleString()} gr</div>
                  </div>
                </div>
                {personalBest[r.species] && (
                  <div style={{ marginTop: 8, background: '#052e16', borderRadius: 8, padding: '8px 10px', border: '1px solid #16a34a33' }}>
                    <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 600 }}>Benim Rekorum: </span>
                    <span style={{ fontSize: 11, color: '#d1d5db' }}>{(personalBest[r.species].weight / 1000).toFixed(2)} kg — {personalBest[r.species].location || '—'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
