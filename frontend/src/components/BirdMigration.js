import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MONTHS_TR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

const BIRDS = [
  {
    name: 'Leylek', icon: '🦢', accent: '#f9fafb',
    arrival: [2, 3], departure: [8, 9],
    route: 'Bosphorus Geçiş Koridoru',
    peak: 'Eylül',
    obs: ['Süleymaniye Tepesi', 'Çamlıca', 'Karacabey Ovası'],
    tips: 'Eylül ayında İstanbul Boğazı üzerinden milyonlarca leylek geçer. Çamlıca tepesinden en iyi izleme.',
    count: '250.000+/gün (Eylül)'
  },
  {
    name: 'Turna', icon: '🦅', accent: '#06b6d4',
    arrival: [9, 10], departure: [3, 4],
    route: 'İç Anadolu Ovalarından Güneye',
    peak: 'Kasım',
    obs: ['Bolu Göleti', 'Sultan Sazlığı', 'Akyatan'],
    tips: 'Kasım ayında büyük gruplar halinde güneye iner. Sultan Sazlığı önemli konaklama noktası.',
    count: '50.000-100.000 (sezon)'
  },
  {
    name: 'Kızıl Şahin', icon: '🦉', accent: '#f59e0b',
    arrival: [2, 3], departure: [9, 10],
    route: 'Boğaz + Çanakkale Koridoru',
    peak: 'Nisan',
    obs: ['Çanakkale Boğazı', 'İstanbul Boğazı', 'Karaburun'],
    tips: 'Yırtıcı kuş göçünün zirvesi Nisan. Kıyı boyunca güneye inen hava akımlarını kullanır.',
    count: '5.000-15.000 (Nisan)'
  },
  {
    name: 'Kırlangıç', icon: '🐦', accent: '#22c55e',
    arrival: [3, 4], departure: [8, 9],
    route: 'Tüm Türkiye',
    peak: 'Nisan',
    obs: ['Her yer — şehir dahil'],
    tips: 'İlk kırlangıç görülmesi baharın habercisi. Şehirlere köy evlerinden önce gelir.',
    count: 'Milyonlarca (tüm Türkiye)'
  },
  {
    name: 'Bıldırcın', icon: '🦆', accent: '#a855f7',
    arrival: [4, 5], departure: [9, 10],
    route: 'Ege & Trakya Tarım Alanları',
    peak: 'Mayıs-Eylül',
    obs: ['Trakya tarlaları', 'Ege ovaları', 'Marmara kıyıları'],
    tips: 'Tarım alanlarında geceleri uçar. Ses tanıma ile daha kolay tespit edilir.',
    count: '500.000+ (sezon)'
  },
  {
    name: 'Flamingo', icon: '🦩', accent: '#f97316',
    arrival: [12, 1, 2], departure: [5, 6],
    route: 'Tuz Gölü & Güney Sahilleri',
    peak: 'Şubat',
    obs: ['Tuz Gölü', 'Çukurova', 'Gediz Deltası'],
    tips: 'Tuz Gölü Türkiye\'nin en büyük flamingo üreme kolonisi. Şubat-Mayıs izleme için en iyi.',
    count: '12.000-15.000 (Tuz Gölü)'
  },
  {
    name: 'Karabatık', icon: '🦆', accent: '#374151',
    arrival: [10, 11], departure: [3, 4],
    route: 'Karadeniz Kıyıları',
    peak: 'Aralık',
    obs: ['İstanbul kıyıları', 'Saros Körfezi', 'Çanakkale'],
    tips: 'Kış aylarında balıkçı tekneleri arkasında sık görülür. Sualtı avcılığı ustası.',
    count: '200.000+ (kış)'
  },
  {
    name: 'Pelikan', icon: '🦅', accent: '#38bdf8',
    arrival: [3, 4], departure: [10, 11],
    route: 'Marmara & Ege Deltalar',
    peak: 'Nisan',
    obs: ['Kuscenneti Milli Parkı', 'Gediz Deltası', 'Manyas Gölü'],
    tips: 'Manyas Gölü pelikanlar için kritik üreme alanı. Büyük gruplar halinde V formasyonunda uçar.',
    count: '1.000-3.000 (üreme)'
  },
];

const LS_LOG_KEY = 'bird_obs_log_v1';
function loadLog() { try { return JSON.parse(localStorage.getItem(LS_LOG_KEY)) || []; } catch { return []; } }
function saveLog(v) { try { localStorage.setItem(LS_LOG_KEY, JSON.stringify(v)); } catch {} }

function isPresent(bird) {
  const m = new Date().getMonth();
  const arr = bird.arrival;
  const dep = bird.departure;
  if (arr[arr.length - 1] <= dep[0]) {
    return m >= arr[0] && m <= dep[dep.length - 1];
  }
  return m >= arr[0] || m <= dep[dep.length - 1];
}

export default function BirdMigration() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('calendar');
  const [sel, setSel] = useState(null);
  const [log, setLog] = useState(loadLog);
  const [logForm, setLogForm] = useState({ species: BIRDS[0].name, count: '1', location: '', date: new Date().toISOString().slice(0, 10), note: '' });

  const now = new Date().getMonth();
  const presentBirds = BIRDS.filter(isPresent);

  function addLog() {
    if (!logForm.species || !logForm.location) return;
    const next = [{ ...logForm, id: Date.now() }, ...log];
    saveLog(next);
    setLog(next);
    setLogForm(v => ({ ...v, location: '', note: '' }));
  }

  function delLog(id) {
    const next = log.filter(l => l.id !== id);
    saveLog(next);
    setLog(next);
  }

  const INPUT = { background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '9px 11px', fontSize: 13, width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦅 Kuş Göç Takvimi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>8 tür · göç dönemi, rota ve gözlem noktaları</div>
      </div>

      {/* Present now banner */}
      {presentBirds.length > 0 && (
        <div style={{ margin: '0 16px 12px', background: '#052e16', borderRadius: 12, padding: 12, border: '1px solid #16a34a44', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 24 }}>🟢</div>
          <div>
            <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>ŞU AN TÜRKİYE'DE</div>
            <div style={{ fontSize: 12, color: '#d1d5db' }}>{presentBirds.map(b => b.name).join(', ')}</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[['calendar', '📅 Takvim'], ['species', '🦢 Türler'], ['log', '📓 Gözlem Defteri']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, background: tab === id ? '#3b82f6' : '#1f2937', color: tab === id ? '#fff' : '#9ca3af',
            border: '1px solid', borderColor: tab === id ? '#3b82f6' : '#374151',
            borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'calendar' && (
          <div>
            {BIRDS.map((b, i) => {
              const present = isPresent(b);
              return (
                <div key={i} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: `1px solid ${present ? '#16a34a44' : '#374151'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 22 }}>{b.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#f9fafb' }}>{b.name}</div>
                        <div style={{ fontSize: 10, color: '#6b7280' }}>Zirve: {b.peak}</div>
                      </div>
                    </div>
                    {present && <span style={{ background: '#052e16', color: '#22c55e', border: '1px solid #16a34a44', borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>Burada</span>}
                  </div>
                  {/* Month bar */}
                  <div style={{ display: 'flex', gap: 2 }}>
                    {MONTHS_TR.map((m, mi) => {
                      const arr = b.arrival;
                      const dep = b.departure;
                      let active = false;
                      if (arr[arr.length - 1] <= dep[0]) {
                        active = mi >= arr[0] && mi <= dep[dep.length - 1];
                      } else {
                        active = mi >= arr[0] || mi <= dep[dep.length - 1];
                      }
                      const cur = mi === now;
                      return (
                        <div key={mi} style={{
                          flex: 1, height: 20, borderRadius: 3,
                          background: cur && active ? b.accent : cur ? '#374151' : active ? b.accent + '99' : '#374151',
                          border: cur ? '1px solid ' + (active ? b.accent : '#6b7280') : 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: 7, color: active ? '#fff' : '#6b7280', fontWeight: cur ? 700 : 400 }}>{m[0]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'species' && (
          <div>
            {BIRDS.map((b, i) => (
              <div key={i}>
                <div onClick={() => setSel(sel === i ? null : i)}
                  style={{ background: '#1f2937', borderRadius: 12, padding: '14px 16px', marginBottom: sel === i ? 0 : 8, border: `1px solid ${b.accent}33`, cursor: 'pointer', borderRadius: sel === i ? '12px 12px 0 0' : 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 26 }}>{b.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>{b.name}</div>
                        <div style={{ fontSize: 11, color: '#6b7280' }}>{b.count}</div>
                      </div>
                    </div>
                    <span style={{ color: '#6b7280' }}>{sel === i ? '▲' : '▼'}</span>
                  </div>
                </div>
                {sel === i && (
                  <div style={{ background: '#1f2937', padding: '0 16px 14px', marginBottom: 8, borderRadius: '0 0 12px 12px', border: `1px solid ${b.accent}33`, borderTop: 'none' }}>
                    <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, marginBottom: 12 }}>{b.tips}</div>
                    <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, marginBottom: 6 }}>📍 GÖZLEM NOKTALARI</div>
                    {b.obs.map((o, oi) => (
                      <div key={oi} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {o}</div>
                    ))}
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>🗺️ Rota: <span style={{ color: '#d1d5db' }}>{b.route}</span></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'log' && (
          <div>
            <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 10 }}>+ YENİ GÖZLEM</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Tür</div>
                  <select value={logForm.species} onChange={e => setLogForm(v => ({ ...v, species: e.target.value }))} style={INPUT}>
                    {BIRDS.map(b => <option key={b.name}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Adet</div>
                  <input type="number" value={logForm.count} onChange={e => setLogForm(v => ({ ...v, count: e.target.value }))} style={INPUT} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Tarih</div>
                  <input type="date" value={logForm.date} onChange={e => setLogForm(v => ({ ...v, date: e.target.value }))} style={INPUT} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 3 }}>Konum</div>
                  <input value={logForm.location} onChange={e => setLogForm(v => ({ ...v, location: e.target.value }))} style={INPUT} placeholder="İstanbul Boğazı..." />
                </div>
              </div>
              <input value={logForm.note} onChange={e => setLogForm(v => ({ ...v, note: e.target.value }))} style={{ ...INPUT, marginBottom: 10 }} placeholder="Not (isteğe bağlı)..." />
              <button onClick={addLog} style={{ width: '100%', background: '#3b82f6', border: 'none', color: '#fff', borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                ✓ Kaydet
              </button>
            </div>

            {log.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 30, color: '#6b7280' }}>
                <div style={{ fontSize: 36 }}>📓</div>
                <div style={{ marginTop: 8, fontSize: 13 }}>Henüz gözlem yok</div>
              </div>
            ) : log.map(l => (
              <div key={l.id} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb' }}>🦅 {l.species} × {l.count}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{l.date} · {l.location}</div>
                  {l.note && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3, fontStyle: 'italic' }}>{l.note}</div>}
                </div>
                <button onClick={() => delLog(l.id)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 16, cursor: 'pointer', flexShrink: 0 }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
