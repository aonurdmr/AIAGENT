import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const TEMPLATES = [
  { id: 'catch',   icon: '🎣', label: 'Balık Avı',    prompt: 'Tür, boy, ağırlık, konum, saat, hava durumu, yem ve not girin:' },
  { id: 'hunt',    icon: '🏹', label: 'Av Gözlemi',   prompt: 'Hayvan türü, saat, konum, hareketleri ve diğer detaylar:' },
  { id: 'bird',    icon: '🦅', label: 'Kuş Gözlemi',  prompt: 'Tür, adet, davranış, habitat ve gözlem süresi:' },
  { id: 'camp',    icon: '⛺', label: 'Kamp Notu',     prompt: 'Konum, hava, tesis durumu, aktivite, tavsiye:' },
  { id: 'plant',   icon: '🌿', label: 'Bitki Notu',   prompt: 'Tür adı, lokasyon, habitat, fenoloji dönemi:' },
  { id: 'free',    icon: '✏️', label: 'Serbest Not',   prompt: 'Aklınızdaki her şeyi yazın...' },
];

const SAVED_KEY = 'field_notes';

function NoteCard({ note, onDelete, onAsk }) {
  const [expanded, setExpanded] = useState(false);
  const t = TEMPLATES.find(x => x.id === note.template) || TEMPLATES[5];
  return (
    <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, marginBottom: 10, border: '1px solid #374151' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 22, marginTop: 2 }}>{t.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              {t.label} · {note.date} {note.time}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => onAsk(note)} style={{ background: '#1e3a5f', border: '1px solid #3b82f6', color: '#60a5fa', borderRadius: 8, padding: '3px 8px', fontSize: 11, cursor: 'pointer' }}>🤖 AI</button>
              <button onClick={() => onDelete(note.id)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 16, cursor: 'pointer', padding: 0 }}>🗑️</button>
            </div>
          </div>
          <p style={{ color: '#f9fafb', fontSize: 13, margin: '6px 0 0', lineHeight: 1.6 }}>
            {expanded ? note.text : note.text.slice(0, 120)}{!expanded && note.text.length > 120 ? '…' : ''}
          </p>
          {note.text.length > 120 && (
            <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 11, cursor: 'pointer', marginTop: 4, padding: 0 }}>
              {expanded ? '▲ Daralt' : '▼ Tümünü gör'}
            </button>
          )}
          {note.aiSummary && (
            <div style={{ background: '#1e3a5f', border: '1px solid #3b82f644', borderRadius: 10, padding: '8px 12px', marginTop: 10 }}>
              <div style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600, marginBottom: 4 }}>🤖 AI Özeti</div>
              <p style={{ color: '#dbeafe', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{note.aiSummary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FieldNotes() {
  const navigate   = useNavigate();
  const { token }  = useAuth();
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]'); } catch { return []; }
  });
  const [template, setTemplate] = useState('free');
  const [text, setText]         = useState('');
  const [loading, setLoading]   = useState(false);
  const [analyzing, setAnalyzing] = useState(null);
  const textRef = useRef(null);

  const saveToLocal = (updated) => {
    setNotes(updated);
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
  };

  const addNote = () => {
    if (!text.trim()) return;
    const now = new Date();
    const newNote = {
      id: Date.now(),
      template,
      text: text.trim(),
      date: now.toLocaleDateString('tr-TR'),
      time: now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      aiSummary: null,
    };
    saveToLocal([newNote, ...notes]);
    setText('');
  };

  const deleteNote = (id) => saveToLocal(notes.filter(n => n.id !== id));

  const askAI = useCallback(async (note) => {
    setAnalyzing(note.id);
    const t = TEMPLATES.find(x => x.id === note.template) || TEMPLATES[5];
    const systemPrompt = `Kullanıcı ${t.label} hakkında saha notu paylaştı. Kısa ve bilgilendirici bir özet çıkar, önemli detayları vurgula ve varsa faydalı bir tavsiye ekle (3-4 cümle maksimum, Türkçe).`;
    try {
      const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
      const resp = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify({ message: note.text, system_prompt: systemPrompt, category: 'general' }),
      });
      if (resp.ok) {
        const data = await resp.json();
        const summary = data.response || data.message || 'Özet alınamadı.';
        saveToLocal(notes.map(n => n.id === note.id ? { ...n, aiSummary: summary } : n));
      }
    } catch (_) {}
    setAnalyzing(null);
  }, [notes, token]);

  const tpl = TEMPLATES.find(x => x.id === template) || TEMPLATES[5];

  const stats = {
    total: notes.length,
    withAI: notes.filter(n => n.aiSummary).length,
    today: notes.filter(n => n.date === new Date().toLocaleDateString('tr-TR')).length,
  };

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>✏️ Saha Notları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hızlı kayıt ve AI özeti</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 16px 16px' }}>
        {[
          { label: 'Toplam', value: stats.total, color: '#3b82f6' },
          { label: 'AI Analiz', value: stats.withAI, color: '#a855f7' },
          { label: 'Bugün', value: stats.today, color: '#22c55e' },
        ].map(s => (
          <div key={s.label} style={{ background: '#1f2937', borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: '1px solid #374151' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>ŞABLON SEÇ</div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
          {TEMPLATES.map(t => (
            <button key={t.id} onClick={() => { setTemplate(t.id); textRef.current?.focus(); }} style={{
              background: template === t.id ? '#22c55e' : '#1f2937',
              color: template === t.id ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: template === t.id ? '#22c55e' : '#374151',
              borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
              whiteSpace: 'nowrap', cursor: 'pointer',
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>{tpl.prompt}</div>
          <textarea
            ref={textRef}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={`${tpl.icon} ${tpl.label} notu...`}
            rows={4}
            style={{
              width: '100%', background: '#111827', border: '1px solid #374151',
              borderRadius: 10, padding: '12px 14px', color: '#f9fafb', fontSize: 14,
              boxSizing: 'border-box', resize: 'none', lineHeight: 1.6,
            }}
          />
          <button onClick={addNote} disabled={!text.trim()} style={{
            width: '100%', background: text.trim() ? '#22c55e' : '#374151',
            color: text.trim() ? '#fff' : '#6b7280', border: 'none',
            borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700,
            cursor: text.trim() ? 'pointer' : 'default', marginTop: 10,
          }}>💾 Kaydet</button>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{notes.length} kayıt</div>
        {notes.map(note => (
          <div key={note.id} style={{ position: 'relative' }}>
            {analyzing === note.id && (
              <div style={{
                position: 'absolute', inset: 0, background: '#1f2937cc', borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
              }}>
                <div style={{ color: '#60a5fa', fontSize: 14 }}>🤖 AI analiz ediyor…</div>
              </div>
            )}
            <NoteCard note={note} onDelete={deleteNote} onAsk={askAI} />
          </div>
        ))}
        {notes.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✏️</div>
            <div>İlk saha notunuzu yazın ve AI'ya analiz ettirin!</div>
          </div>
        )}
      </div>
    </div>
  );
}
