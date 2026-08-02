import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LS_KEY = 'nature_journal_v1';
function load() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; } }
function save(v) { try { localStorage.setItem(LS_KEY, JSON.stringify(v)); } catch {} }

const MOODS = ['😊', '🤩', '😌', '😐', '😔'];
const TAGS = ['Balıkçılık', 'Avlanma', 'Kamp', 'Kuş Gözlemi', 'Yürüyüş', 'Bitki', 'Böcek', 'Mantar', 'Yıldız', 'Fotoğraf', 'Diğer'];
const WEATHERS = ['☀️', '⛅', '🌤️', '☁️', '🌧️', '⛈️', '❄️', '💨'];

const PROMPTS = [
  'Bugün doğada dikkatimi çeken en ilginç şey neydi?',
  'Sesler: Hangi kuş seslerini duydum? Rüzgar, su sesi vardı mı?',
  'Koku ve dokular: Toprak, çiçek, deniz kokusu fark ettim mi?',
  'Bu alanı en son ne zaman ziyaret ettim ve değişmiş mi?',
  'Bir hayvan gördüm mü? Ne yapıyordu?',
  'Hava ve ışık bugün avı/doğayı nasıl etkiledi?',
  'Tekrar gelmek istediğim bir nokta var mı?',
  'Bu deneyimden ne öğrendim?',
];

export default function NatureJournal() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(load);
  const [tab, setTab] = useState('entries');
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', body: '', location: '', mood: '😊', weather: '☀️', tags: [], date: new Date().toISOString().slice(0, 10) });
  const [searchQ, setSearchQ] = useState('');
  const [promptIdx, setPromptIdx] = useState(0);

  function startNew() {
    setEditId('new');
    setForm({ title: '', body: '', location: '', mood: '😊', weather: '☀️', tags: [], date: new Date().toISOString().slice(0, 10) });
    setTab('write');
  }

  function editEntry(e) {
    setEditId(e.id);
    setForm({ title: e.title, body: e.body, location: e.location || '', mood: e.mood || '😊', weather: e.weather || '☀️', tags: e.tags || [], date: e.date });
    setTab('write');
  }

  function saveEntry() {
    if (!form.title.trim() && !form.body.trim()) return;
    let next;
    if (editId === 'new') {
      next = [{ ...form, id: Date.now() }, ...entries];
    } else {
      next = entries.map(e => e.id === editId ? { ...form, id: e.id } : e);
    }
    save(next);
    setEntries(next);
    setEditId(null);
    setTab('entries');
  }

  function deleteEntry(id) {
    const next = entries.filter(e => e.id !== id);
    save(next);
    setEntries(next);
  }

  function toggleTag(t) {
    setForm(v => ({ ...v, tags: v.tags.includes(t) ? v.tags.filter(x => x !== t) : [...v.tags, t] }));
  }

  const filtered = entries.filter(e =>
    !searchQ || e.title?.toLowerCase().includes(searchQ.toLowerCase()) ||
    e.body?.toLowerCase().includes(searchQ.toLowerCase()) ||
    e.location?.toLowerCase().includes(searchQ.toLowerCase()) ||
    e.tags?.some(t => t.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const INPUT = { background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 8, padding: '9px 11px', fontSize: 13, width: '100%', boxSizing: 'border-box' };

  if (tab === 'write') {
    return (
      <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
        <div style={{ padding: '20px 16px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => { setTab('entries'); setEditId(null); }} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer' }}>←</button>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{editId === 'new' ? '📝 Yeni Giriş' : '✏️ Düzenle'}</div>
        </div>

        <div style={{ padding: '0 16px' }}>
          {/* Prompt helper */}
          <div style={{ background: '#1f293799', borderRadius: 10, padding: '10px 12px', marginBottom: 10, border: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 11, color: '#9ca3af', flex: 1 }}>💡 {PROMPTS[promptIdx]}</div>
            <button onClick={() => setPromptIdx((promptIdx + 1) % PROMPTS.length)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>↻</button>
          </div>

          <input value={form.title} onChange={e => setForm(v => ({ ...v, title: e.target.value }))} style={{ ...INPUT, marginBottom: 10, fontWeight: 600, fontSize: 15 }} placeholder="Başlık..." />

          <textarea value={form.body} onChange={e => setForm(v => ({ ...v, body: e.target.value }))} style={{ ...INPUT, marginBottom: 10, minHeight: 160, resize: 'vertical', lineHeight: 1.7 }} placeholder="Günlüğüne yaz..." />

          <input value={form.location} onChange={e => setForm(v => ({ ...v, location: e.target.value }))} style={{ ...INPUT, marginBottom: 10 }} placeholder="Konum (örn: Büyükçekmece Gölü kıyısı)..." />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Tarih</div>
              <input type="date" value={form.date} onChange={e => setForm(v => ({ ...v, date: e.target.value }))} style={INPUT} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Duygu Durumu</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {MOODS.map(m => (
                  <button key={m} onClick={() => setForm(v => ({ ...v, mood: m }))} style={{ background: form.mood === m ? '#374151' : 'transparent', border: `1px solid ${form.mood === m ? '#6b7280' : 'transparent'}`, borderRadius: 6, padding: 6, fontSize: 18, cursor: 'pointer' }}>{m}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>Hava</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {WEATHERS.map(w => (
                <button key={w} onClick={() => setForm(v => ({ ...v, weather: w }))} style={{ background: form.weather === w ? '#374151' : 'transparent', border: `1px solid ${form.weather === w ? '#6b7280' : 'transparent'}`, borderRadius: 6, padding: '4px 6px', fontSize: 20, cursor: 'pointer' }}>{w}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 6 }}>Etiketler</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {TAGS.map(t => (
                <button key={t} onClick={() => toggleTag(t)} style={{
                  background: form.tags.includes(t) ? '#22c55e22' : 'transparent',
                  color: form.tags.includes(t) ? '#22c55e' : '#6b7280',
                  border: `1px solid ${form.tags.includes(t) ? '#22c55e' : '#374151'}`,
                  borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                }}>{t}</button>
              ))}
            </div>
          </div>

          <button onClick={saveEntry} style={{ width: '100%', background: '#22c55e', border: 'none', color: '#fff', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            💾 Kaydet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>📓 Doğa Günlüğüm</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>{entries.length} giriş · kişisel kayıtlar</div>
          </div>
          <button onClick={startNew} style={{ background: '#22c55e', border: 'none', color: '#fff', borderRadius: 12, padding: '10px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Yeni</button>
        </div>
      </div>

      {entries.length > 0 && (
        <div style={{ padding: '0 16px 12px' }}>
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ background: '#1f2937', border: '1px solid #374151', color: '#f9fafb', borderRadius: 10, padding: '10px 14px', fontSize: 13, width: '100%', boxSizing: 'border-box' }} placeholder="🔍 Günlükte ara..." />
        </div>
      )}

      <div style={{ padding: '0 16px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48, color: '#6b7280' }}>
            <div style={{ fontSize: 52 }}>📓</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 12, color: '#9ca3af' }}>Henüz giriş yok</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Doğa deneyimlerini yazmaya başla</div>
            <button onClick={startNew} style={{ background: '#22c55e', border: 'none', color: '#fff', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 16 }}>İlk Günlük Girişini Yaz</button>
          </div>
        ) : filtered.map(e => (
          <div key={e.id} style={{ background: '#1f2937', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f9fafb', marginBottom: 2 }}>
                  {e.mood} {e.title || 'Başlıksız Giriş'}
                </div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>
                  {e.date} {e.weather && `· ${e.weather}`} {e.location && `· 📍 ${e.location}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
                <button onClick={() => editEntry(e)} style={{ background: 'none', border: '1px solid #374151', borderRadius: 8, padding: '4px 8px', fontSize: 12, color: '#9ca3af', cursor: 'pointer' }}>✏️</button>
                <button onClick={() => deleteEntry(e.id)} style={{ background: 'none', border: '1px solid #374151', borderRadius: 8, padding: '4px 8px', fontSize: 12, color: '#ef4444', cursor: 'pointer' }}>🗑️</button>
              </div>
            </div>
            {e.body && (
              <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, marginTop: 6, marginBottom: e.tags?.length ? 8 : 0 }}>
                {e.body.length > 150 ? e.body.slice(0, 150) + '…' : e.body}
              </div>
            )}
            {e.tags?.length > 0 && (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {e.tags.map(t => (
                  <span key={t} style={{ background: '#22c55e15', color: '#22c55e', borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
