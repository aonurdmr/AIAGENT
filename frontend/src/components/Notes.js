import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/Toast';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const QUICK_TAGS = ['balık', 'av', 'kamp', 'hava', 'ekipman', 'konum', 'tür', 'ipucu'];

const TAG_COLORS = {
  balık: '#3b82f6', av: '#ef4444', kamp: '#22c55e', hava: '#38bdf8',
  ekipman: '#f59e0b', konum: '#8b5cf6', tür: '#34d399', ipucu: '#f97316',
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'az önce';
  if (diff < 3600) return `${Math.floor(diff / 60)}dk`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}sa`;
  return `${Math.floor(diff / 86400)}g`;
}

export default function Notes() {
  const { user, token } = useAuth();
  const [notes, setNotes]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch]     = useState('');
  const [editNote, setEditNote] = useState(null);
  const [form, setForm] = useState({ content: '', tags: [], location_name: '', lat: 0, lng: 0 });

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const load = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    try {
      const { data } = await axios.get(`${API}/notes`, { headers: authHeader });
      setNotes(data);
    } catch { }
    setLoading(false);
  }, [user, token]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => {
    setEditNote(null);
    setForm({ content: '', tags: [], location_name: '', lat: 0, lng: 0 });
    setShowForm(true);
  };

  const openEdit = (note) => {
    setEditNote(note);
    setForm({ content: note.content, tags: note.tags || [], location_name: note.location_name || '', lat: note.lat || 0, lng: note.lng || 0 });
    setShowForm(true);
  };

  const submit = async () => {
    if (!form.content.trim()) { toast('Not içeriği boş olamaz', 'warning'); return; }
    try {
      if (editNote) {
        const { data } = await axios.put(`${API}/notes/${editNote.id}`, form, { headers: authHeader });
        setNotes(prev => prev.map(n => n.id === editNote.id ? data : n));
        toast('Not güncellendi ✓');
      } else {
        const { data } = await axios.post(`${API}/notes`, form, { headers: authHeader });
        setNotes(prev => [data, ...prev]);
        toast('Not kaydedildi ✓');
      }
    } catch { toast('Hata oluştu', 'error'); }
    setShowForm(false);
  };

  const deleteNote = async (id) => {
    if (!window.confirm('Not silinsin mi?')) return;
    await axios.delete(`${API}/notes/${id}`, { headers: authHeader });
    setNotes(prev => prev.filter(n => n.id !== id));
    toast('Not silindi', 'info');
  };

  const togglePin = async (id) => {
    const { data } = await axios.patch(`${API}/notes/${id}/pin`, {}, { headers: authHeader });
    setNotes(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, pinned: data.pinned } : n);
      return [...updated.filter(n => n.pinned), ...updated.filter(n => !n.pinned)];
    });
  };

  const toggleTag = (tag) => {
    setForm(p => ({
      ...p,
      tags: p.tags.includes(tag) ? p.tags.filter(t => t !== tag) : [...p.tags, tag],
    }));
  };

  const filtered = notes.filter(n =>
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    (n.location_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (n.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>📓 Hızlı Notlar</h1>
            <p>{notes.length} not kaydedildi</p>
          </div>
          {user && (
            <button className="btn-primary" style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }}
              onClick={openNew}>+ Not</button>
          )}
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>

        {!user ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--t-mute)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📓</div>
            <div style={{ fontSize: 14 }}>Notlarını görmek için giriş yapın</div>
          </div>
        ) : (
          <>
            {/* Search */}
            <input className="input-field" placeholder="🔍 Notlarda ara…" value={search}
              onChange={e => setSearch(e.target.value)} style={{ marginBottom: 14 }} />

            {/* Quick tag filters */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 14 }}>
              {QUICK_TAGS.map(tag => (
                <button key={tag} onClick={() => setSearch(search === tag ? '' : tag)} style={{
                  padding: '4px 12px', borderRadius: 20, whiteSpace: 'nowrap', cursor: 'pointer',
                  background: search === tag ? (TAG_COLORS[tag] + '30') : 'var(--s2)',
                  border: `1px solid ${search === tag ? TAG_COLORS[tag] : 'var(--border)'}`,
                  color: search === tag ? TAG_COLORS[tag] : 'var(--t-mute)',
                  fontSize: 11, fontWeight: 600, transition: 'all .2s',
                }}>#{tag}</button>
              ))}
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
                <div className="spinner" />
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t-mute)' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
                <div style={{ fontSize: 14, marginBottom: 4 }}>
                  {search ? 'Arama sonucu bulunamadı' : 'Henüz not yok'}
                </div>
                {!search && <div style={{ fontSize: 12 }}>+ Not butonu ile hızlıca not al</div>}
              </div>
            ) : (
              filtered.map(note => (
                <div key={note.id} style={{
                  background: note.pinned ? 'rgba(251,191,36,.06)' : 'var(--s2)',
                  border: `1px solid ${note.pinned ? 'rgba(251,191,36,.2)' : 'var(--border)'}`,
                  borderRadius: 14, padding: 14, marginBottom: 8,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ fontSize: 13, color: '#fff', lineHeight: 1.5, flex: 1, whiteSpace: 'pre-wrap' }}>
                      {note.content}
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginLeft: 8 }}>
                      <button onClick={() => togglePin(note.id)} style={{
                        background: 'none', border: 'none', cursor: 'pointer', fontSize: 14,
                        color: note.pinned ? '#fbbf24' : 'var(--t-mute)',
                        transition: 'color .2s',
                      }}>📌</button>
                      <button onClick={() => openEdit(note)} style={{
                        background: 'none', border: 'none', cursor: 'pointer', fontSize: 14,
                        color: 'var(--t-mute)',
                      }}>✏️</button>
                      <button onClick={() => deleteNote(note.id)} style={{
                        background: 'none', border: 'none', cursor: 'pointer', fontSize: 14,
                        color: 'var(--t-mute)',
                      }}>🗑️</button>
                    </div>
                  </div>

                  {(note.tags || []).length > 0 && (
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
                      {note.tags.map(t => (
                        <span key={t} style={{
                          fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                          background: (TAG_COLORS[t] || '#8b5cf6') + '20',
                          color: TAG_COLORS[t] || '#a78bfa',
                          border: `1px solid ${(TAG_COLORS[t] || '#8b5cf6')}30`,
                        }}>#{t}</span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--t-mute)', marginTop: 4 }}>
                    {note.location_name && <span>📍 {note.location_name}</span>}
                    <span style={{ marginLeft: 'auto' }}>{timeAgo(note.created_at)}</span>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: '#000a', zIndex: 200,
          display: 'flex', alignItems: 'flex-end', overflowY: 'auto',
        }} onClick={() => setShowForm(false)}>
          <div style={{
            background: '#122212', borderRadius: '20px 20px 0 0',
            padding: 20, width: '100%', maxWidth: 430, margin: '0 auto',
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>
              {editNote ? '✏️ Notu Düzenle' : '📝 Yeni Not'}
            </h3>

            <textarea className="input-field" placeholder="Notunu buraya yaz…" value={form.content}
              onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
              style={{ minHeight: 100, marginBottom: 12 }} />

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: 'var(--t-mute)', display: 'block', marginBottom: 6 }}>Etiketler</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {QUICK_TAGS.map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)} style={{
                    padding: '4px 10px', borderRadius: 20, cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    background: form.tags.includes(tag) ? (TAG_COLORS[tag] + '30') : 'var(--s1)',
                    border: `1px solid ${form.tags.includes(tag) ? TAG_COLORS[tag] : 'var(--border)'}`,
                    color: form.tags.includes(tag) ? TAG_COLORS[tag] : 'var(--t-mute)',
                    transition: 'all .2s',
                  }}>#{tag}</button>
                ))}
              </div>
            </div>

            <input className="input-field" placeholder="📍 Konum (opsiyonel)" value={form.location_name}
              onChange={e => setForm(p => ({ ...p, location_name: e.target.value }))}
              style={{ marginBottom: 14 }} />

            <button className="btn-primary" onClick={submit}>
              {editNote ? 'Güncelle' : '✓ Kaydet'}
            </button>
            <button className="btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
              onClick={() => setShowForm(false)}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
}
