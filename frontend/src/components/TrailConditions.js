import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LS_KEY = 'trail_conditions_v1';
function load() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; } }
function save(v) { try { localStorage.setItem(LS_KEY, JSON.stringify(v)); } catch {} }

const TRAILS = [
  { id: 'lycian', name: 'Likya Yolu', region: 'Antalya–Muğla', length: '540 km', diff: 'Zor', icon: '🏔️', accent: '#ef4444', segments: ['Fethiye–Kalkan', 'Kalkan–Kaş', 'Kaş–Finike', 'Finike–Antalya'] },
  { id: 'evliya', name: 'Evliya Çelebi Yolu', region: 'Kütahya–İzmir', length: '600 km', diff: 'Orta', icon: '🛤️', accent: '#f59e0b', segments: ['Kütahya–Uşak', 'Uşak–Selçuk', 'Selçuk–İzmir'] },
  { id: 'saint_paul', name: 'Aziz Pavlus Yolu', region: 'Antalya–Yalvaç', length: '500 km', diff: 'Orta-Zor', icon: '🌿', accent: '#22c55e', segments: ['Perge–Kremna', 'Kremna–Pisidya', 'Pisidya–Yalvaç'] },
  { id: 'carian', name: 'Karya Yolu', region: 'Muğla', length: '800 km', diff: 'Orta', icon: '⛵', accent: '#3b82f6', segments: ['Milas–Bodrum', 'Bodrum–Datça', 'Datça–Marmaris'] },
  { id: 'ida', name: 'Kazdağı / İda Yolu', region: 'Çanakkale–Balıkesir', length: '90 km', diff: 'Kolay-Orta', icon: '🌲', accent: '#10b981', segments: ['Altınoluk–Adatepe', 'Adatepe–Küçükkuyu'] },
  { id: 'frig', name: 'Frigya Yolu', region: 'Eskişehir–Afyon', length: '506 km', diff: 'Kolay', icon: '🗿', accent: '#8b5cf6', segments: ['Eskişehir–Mihalgazi', 'Mihalgazi–Afyon'] },
];

const COND_COLORS = { 'İyi': '#22c55e', 'Dikkatli': '#f59e0b', 'Kötü': '#ef4444', 'Bilinmiyor': '#6b7280' };
const COND_LEVELS = ['İyi', 'Dikkatli', 'Kötü'];

export default function TrailConditions() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('trails');
  const [sel, setSel] = useState(null);
  const [reports, setReports] = useState(load);
  const [form, setForm] = useState({ trail: TRAILS[0].id, segment: TRAILS[0].segments[0], condition: 'İyi', date: new Date().toISOString().slice(0, 10), note: '' });

  function addReport() {
    if (!form.trail) return;
    const next = [{ ...form, id: Date.now() }, ...reports];
    save(next);
    setReports(next);
    setForm(v => ({ ...v, note: '' }));
  }

  function getTrailCondition(trailId) {
    const r = reports.filter(x => x.trail === trailId);
    if (!r.length) return 'Bilinmiyor';
    return r[0].condition;
  }

  const INPUT = { background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '9px 11px', fontSize: 13, width: '100%', boxSizing: 'border-box' };
  const selTrail = TRAILS.find(t => t.id === form.trail);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🥾 Parkur Durumu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye yürüyüş rotaları · güncel durum bildirimi</div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['trails', '🗺️ Rotalar'], ['report', '📍 Bildir']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#84cc16' : '#1f2937', color: tab === id ? '#000' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#84cc16' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'trails' && (
          <div>
            {TRAILS.map(t => {
              const cond = getTrailCondition(t.id);
              const cc = COND_COLORS[cond];
              const open = sel === t.id;
              const trailReports = reports.filter(r => r.trail === t.id);
              return (
                <div key={t.id} style={{ marginBottom: 8 }}>
                  <div onClick={() => setSel(open ? null : t.id)} style={{
                    background: '#1f2937', borderRadius: open ? '12px 12px 0 0' : 12,
                    padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 26 }}>{t.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>{t.region} · {t.length} · {t.diff}</div>
                        </div>
                      </div>
                      <span style={{ background: cc + '22', color: cc, border: `1px solid ${cc}44`, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>{cond}</span>
                    </div>
                  </div>
                  {open && (
                    <div style={{ background: '#1f2937', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                      <div style={{ marginTop: 8, marginBottom: 8 }}>
                        <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, marginBottom: 6 }}>PARKUR BÖLÜMLERİ</div>
                        {t.segments.map(s => (
                          <div key={s} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4, display: 'flex', gap: 6 }}><span style={{ color: t.accent }}>▸</span> {s}</div>
                        ))}
                      </div>
                      {trailReports.length > 0 && (
                        <div>
                          <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, marginBottom: 6 }}>SON BİLDİRİMLER</div>
                          {trailReports.slice(0, 3).map(r => (
                            <div key={r.id} style={{ background: '#374151', borderRadius: 8, padding: '8px 10px', marginBottom: 6 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: 11, color: COND_COLORS[r.condition], fontWeight: 700 }}>{r.condition}</span>
                                <span style={{ fontSize: 10, color: '#6b7280' }}>{r.date} · {r.segment}</span>
                              </div>
                              {r.note && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>{r.note}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'report' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>📍 PARKUR DURUMU BİLDİR</div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Rota</div>
                <select value={form.trail} onChange={e => {
                  const t = TRAILS.find(x => x.id === e.target.value);
                  setForm(v => ({ ...v, trail: e.target.value, segment: t.segments[0] }));
                }} style={INPUT}>
                  {TRAILS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Bölüm</div>
                  <select value={form.segment} onChange={e => setForm(v => ({ ...v, segment: e.target.value }))} style={INPUT}>
                    {(selTrail?.segments || []).map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Durum</div>
                  <select value={form.condition} onChange={e => setForm(v => ({ ...v, condition: e.target.value }))} style={INPUT}>
                    {COND_LEVELS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Tarih</div>
                  <input type="date" value={form.date} onChange={e => setForm(v => ({ ...v, date: e.target.value }))} style={INPUT} />
                </div>
              </div>
              <input value={form.note} onChange={e => setForm(v => ({ ...v, note: e.target.value }))} style={{ ...INPUT, marginBottom: 10 }} placeholder="Ek not (çamur, kayalık, köprü hasarı...)" />
              <button onClick={addReport} style={{ width: '100%', background: '#84cc16', border: 'none', color: '#000', borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                📍 Bildirimi Kaydet
              </button>
            </div>

            {reports.length > 0 && (
              <div>
                <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontWeight: 600 }}>TÜM BİLDİRİMLER</div>
                {reports.map(r => {
                  const trail = TRAILS.find(t => t.id === r.trail);
                  return (
                    <div key={r.id} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{trail?.name || r.trail}</div>
                        <span style={{ background: COND_COLORS[r.condition] + '22', color: COND_COLORS[r.condition], borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>{r.condition}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{r.date} · {r.segment}</div>
                      {r.note && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>{r.note}</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
