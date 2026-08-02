import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const ACTIVITIES = [
  { id: 'fishing',  icon: '🎣', label: 'Balıkçılık' },
  { id: 'hunting',  icon: '🏹', label: 'Avcılık' },
  { id: 'camping',  icon: '⛺', label: 'Kamp' },
  { id: 'hiking',   icon: '🥾', label: 'Yürüyüş' },
  { id: 'wildlife', icon: '🦋', label: 'Doğa' },
  { id: 'bird',     icon: '🦅', label: 'Kuş Gözlemi' },
];

const LEVELS = [
  { id: 'baslangic', label: 'Başlangıç', icon: '🌱' },
  { id: 'orta',      label: 'Orta',      icon: '🌿' },
  { id: 'ileri',     label: 'İleri',     icon: '🌲' },
];

const DESTINATIONS = [
  'Sapanca Gölü', 'Abant Gölü', 'Keban Barajı', 'Kaçkar Dağları',
  'Olympos', 'Uludağ', 'Kızılırmak Deltası', 'Mogan Gölü',
  'Tuz Gölü', 'Göreme / Kapadokya',
];

function DayCard({ day, accent }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: '#0d1f0d', border: '1px solid #22c55e18', borderRadius: 14, marginBottom: 12, overflow: 'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: `${accent}20`, border: `1px solid ${accent}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: accent,
          }}>{day.day}</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{day.title}</div>
            {day.spots?.length > 0 && (
              <div style={{ fontSize: 11, color: '#4a7a4a' }}>📍 {day.spots.join(', ')}</div>
            )}
          </div>
        </div>
        <span style={{ color: '#4a7a4a', fontSize: 14 }}>{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 16px 14px', borderTop: '1px solid #22c55e0e' }}>
          {[['🌅', 'Sabah', day.morning], ['☀️', 'Öğlen', day.afternoon], ['🌙', 'Akşam', day.evening]].map(([ic, label, text]) =>
            text ? (
              <div key={label} style={{ marginTop: 10 }}>
                <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600, marginBottom: 3 }}>{ic} {label}</div>
                <div style={{ fontSize: 13, color: '#a0c4a0', lineHeight: 1.6 }}>{text}</div>
              </div>
            ) : null
          )}
          {day.tips?.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: '#4a7a4a', fontWeight: 600, marginBottom: 4 }}>💡 İpuçları</div>
              {day.tips.map((t, i) => (
                <div key={i} style={{ fontSize: 12, color: '#86efac', padding: '3px 0', display: 'flex', gap: 6 }}>
                  <span>›</span><span>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChipList({ items, color }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {items.map((item, i) => (
        <span key={i} style={{
          fontSize: 12, padding: '4px 10px', borderRadius: 20,
          background: `${color}14`, border: `1px solid ${color}28`, color,
        }}>{item}</span>
      ))}
    </div>
  );
}

export default function Planner() {
  const navigate = useNavigate();
  const [step, setStep]         = useState('form'); // form | loading | result
  const [plan, setPlan]         = useState(null);
  const [error, setError]       = useState('');
  const [form, setForm]         = useState({
    destination: '', duration_days: 2, activities: ['fishing'],
    group_size: 2, experience_level: 'orta', notes: '',
  });

  const toggleActivity = (id) => {
    setForm(f => ({
      ...f,
      activities: f.activities.includes(id)
        ? f.activities.filter(a => a !== id)
        : [...f.activities, id],
    }));
  };

  const generate = async () => {
    if (!form.destination.trim()) { setError('Destinasyon girin'); return; }
    if (form.activities.length === 0) { setError('En az bir aktivite seçin'); return; }
    setError(''); setStep('loading');
    try {
      const { data } = await axios.post(`${API}/planner`, form);
      if (data.success) {
        setPlan(data.data);
        setStep('result');
      } else {
        setError(data.error || 'Plan oluşturulamadı');
        setStep('form');
      }
    } catch {
      setError('Sunucu hatası. Lütfen tekrar deneyin.');
      setStep('form');
    }
  };

  if (step === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#040d04' }}>
        <div style={{ fontSize: 48, marginBottom: 16, animation: 'spin 2s linear infinite' }}>🗺️</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Plan hazırlanıyor…</div>
        <div style={{ fontSize: 13, color: '#4a7a4a', textAlign: 'center', maxWidth: 260 }}>
          NVIDIA Llama 3.1 70B ile {form.duration_days} günlük{'\n'}
          {form.destination} planı oluşturuluyor
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (step === 'result' && plan) {
    return (
      <div className="page fade-in">
        <div className="page-header" style={{ position: 'relative' }}>
          <button onClick={() => setStep('form')} style={{
            position: 'absolute', left: 16, top: 54,
            background: 'none', border: 'none', color: '#86efac', fontSize: 13, cursor: 'pointer',
          }}>‹ Yeni Plan</button>
          <h1>🗺️ Seyahat Planın</h1>
          <p>{plan.destination} · {form.duration_days} Gün</p>
        </div>

        <div style={{ padding: '0 16px 100px' }}>
          {/* Overview */}
          {plan.overview && (
            <div className="card-dark" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#4a7a4a', fontWeight: 700, marginBottom: 6 }}>📋 GENEL BAKIŞ</div>
              <div style={{ fontSize: 13, color: '#a8d4a8', lineHeight: 1.7 }}>{plan.overview}</div>
            </div>
          )}

          {/* Quick info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {plan.best_months?.length > 0 && (
              <div className="card-dark">
                <div style={{ fontSize: 10, color: '#4a7a4a', fontWeight: 700, marginBottom: 6 }}>📅 EN İYİ AYLAR</div>
                <div style={{ fontSize: 12, color: '#86efac' }}>{plan.best_months.join(', ')}</div>
              </div>
            )}
            {plan.estimated_cost && (
              <div className="card-dark">
                <div style={{ fontSize: 10, color: '#4a7a4a', fontWeight: 700, marginBottom: 6 }}>💰 MALİYET</div>
                <div style={{ fontSize: 12, color: '#86efac' }}>{plan.estimated_cost}</div>
              </div>
            )}
          </div>

          {/* Day plans */}
          {plan.days?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#4a7a4a', fontWeight: 700, marginBottom: 10, letterSpacing: '.06em' }}>
                GÜN PLANLARI
              </div>
              {plan.days.map(day => (
                <DayCard key={day.day} day={day} accent="#22c55e"/>
              ))}
            </div>
          )}

          {/* Equipment */}
          {plan.equipment?.length > 0 && (
            <div className="card-dark" style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#4a7a4a', fontWeight: 700, marginBottom: 10 }}>🎒 EKİPMAN LİSTESİ</div>
              <ChipList items={plan.equipment} color="#22c55e"/>
            </div>
          )}

          {/* Safety */}
          {plan.safety_notes?.length > 0 && (
            <div className="card-dark" style={{ marginBottom: 12, borderColor: '#f97316' }}>
              <div style={{ fontSize: 12, color: '#f97316', fontWeight: 700, marginBottom: 8 }}>⚠️ GÜVENLİK NOTLARI</div>
              {plan.safety_notes.map((note, i) => (
                <div key={i} style={{ fontSize: 12, color: '#fbbf24', marginBottom: 4, display: 'flex', gap: 6 }}>
                  <span>!</span><span>{note}</span>
                </div>
              ))}
            </div>
          )}

          {/* Regulations */}
          {plan.regulations && (
            <div className="card-dark" style={{ borderColor: '#60a5fa' }}>
              <div style={{ fontSize: 12, color: '#60a5fa', fontWeight: 700, marginBottom: 6 }}>📜 İZİN / RUHSAT</div>
              <div style={{ fontSize: 12, color: '#a0b4c4', lineHeight: 1.6 }}>{plan.regulations}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Form
  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>🗺️ Seyahat Planlamacı</h1>
        <p>AI destekli outdoor gün programı oluştur</p>
      </div>

      <div style={{ padding: '0 16px 100px' }}>
        {/* Destination */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#4a7a4a', fontWeight: 700, marginBottom: 8, letterSpacing: '.06em' }}>
            📍 DESTINASYON
          </div>
          <input
            className="input-field"
            placeholder="Nereye gidiyorsunuz? (örn. Sapanca Gölü)"
            value={form.destination}
            onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {DESTINATIONS.map(d => (
              <button key={d} onClick={() => setForm(f => ({ ...f, destination: d }))} style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 20, cursor: 'pointer',
                background: form.destination === d ? '#22c55e20' : '#0d1f0d',
                border: `1px solid ${form.destination === d ? '#22c55e40' : '#22c55e18'}`,
                color: form.destination === d ? '#86efac' : '#4a7a4a',
              }}>{d}</button>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#4a7a4a', fontWeight: 700, marginBottom: 8, letterSpacing: '.06em' }}>
            🎯 AKTİVİTELER
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {ACTIVITIES.map(a => {
              const on = form.activities.includes(a.id);
              return (
                <button key={a.id} onClick={() => toggleActivity(a.id)} style={{
                  background: on ? '#22c55e18' : '#0d1f0d',
                  border: `1px solid ${on ? '#22c55e40' : '#22c55e18'}`,
                  borderRadius: 12, padding: '10px 8px', cursor: 'pointer', textAlign: 'center',
                  transition: 'all .15s',
                }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{a.icon}</div>
                  <div style={{ fontSize: 11, color: on ? '#86efac' : '#4a7a4a', fontWeight: 600 }}>{a.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration & Group */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: '#4a7a4a', fontWeight: 700, marginBottom: 8, letterSpacing: '.06em' }}>📆 SÜRE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => setForm(f => ({ ...f, duration_days: Math.max(1, f.duration_days - 1) }))} style={{
                width: 32, height: 32, borderRadius: 8, background: '#0d1f0d', border: '1px solid #22c55e22',
                color: '#86efac', fontSize: 18, cursor: 'pointer',
              }}>−</button>
              <span style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>{form.duration_days}</span>
              <button onClick={() => setForm(f => ({ ...f, duration_days: Math.min(7, f.duration_days + 1) }))} style={{
                width: 32, height: 32, borderRadius: 8, background: '#0d1f0d', border: '1px solid #22c55e22',
                color: '#86efac', fontSize: 18, cursor: 'pointer',
              }}>+</button>
            </div>
            <div style={{ fontSize: 11, color: '#4a7a4a', textAlign: 'center', marginTop: 4 }}>Gün</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#4a7a4a', fontWeight: 700, marginBottom: 8, letterSpacing: '.06em' }}>👥 GRUP</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => setForm(f => ({ ...f, group_size: Math.max(1, f.group_size - 1) }))} style={{
                width: 32, height: 32, borderRadius: 8, background: '#0d1f0d', border: '1px solid #22c55e22',
                color: '#86efac', fontSize: 18, cursor: 'pointer',
              }}>−</button>
              <span style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>{form.group_size}</span>
              <button onClick={() => setForm(f => ({ ...f, group_size: Math.min(20, f.group_size + 1) }))} style={{
                width: 32, height: 32, borderRadius: 8, background: '#0d1f0d', border: '1px solid #22c55e22',
                color: '#86efac', fontSize: 18, cursor: 'pointer',
              }}>+</button>
            </div>
            <div style={{ fontSize: 11, color: '#4a7a4a', textAlign: 'center', marginTop: 4 }}>Kişi</div>
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#4a7a4a', fontWeight: 700, marginBottom: 8, letterSpacing: '.06em' }}>
            🎖️ DENEYİM SEVİYESİ
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {LEVELS.map(l => {
              const on = form.experience_level === l.id;
              return (
                <button key={l.id} onClick={() => setForm(f => ({ ...f, experience_level: l.id }))} style={{
                  flex: 1, background: on ? '#22c55e18' : '#0d1f0d',
                  border: `1px solid ${on ? '#22c55e40' : '#22c55e18'}`,
                  borderRadius: 10, padding: '10px 6px', cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 18 }}>{l.icon}</div>
                  <div style={{ fontSize: 11, color: on ? '#86efac' : '#4a7a4a', fontWeight: 600, marginTop: 4 }}>{l.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: '#4a7a4a', fontWeight: 700, marginBottom: 8, letterSpacing: '.06em' }}>
            📝 EKSTRA NOTLAR (isteğe bağlı)
          </div>
          <textarea
            className="input-field"
            placeholder="Özel istekler, kısıtlamalar, bütçe bilgisi…"
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            rows={3}
            style={{ resize: 'none' }}
          />
        </div>

        {error && (
          <div style={{ color: '#fca5a5', fontSize: 13, marginBottom: 12 }}>⚠️ {error}</div>
        )}

        <button className="btn-primary" onClick={generate}>
          🗺️ AI Plan Oluştur
          <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 6 }}>· NVIDIA Llama 3.1</span>
        </button>
      </div>
    </div>
  );
}
