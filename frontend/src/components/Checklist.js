import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/Toast';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const ACTIVITIES = [
  { id: 'fishing',      icon: '🎣', label: 'Balıkçılık', color: '#3b82f6' },
  { id: 'hunting',      icon: '🏹', label: 'Avcılık',   color: '#ef4444' },
  { id: 'camping',      icon: '⛺', label: 'Kamp',       color: '#22c55e' },
  { id: 'birdwatching', icon: '🦅', label: 'Kuş Gözlemi',color: '#f59e0b' },
];

export default function Checklist() {
  const { user, token } = useAuth();
  const [lists, setLists]       = useState([]);
  const [active, setActive]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [showNew, setShowNew]   = useState(false);
  const [newItem, setNewItem]   = useState('');
  const [form, setForm] = useState({ name: '', activity: 'fishing', use_template: true });

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const load = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    try {
      const { data } = await axios.get(`${API}/checklists`, { headers: authHeader });
      setLists(data);
      if (data.length && !active) setActive(data[0]);
    } catch { }
    setLoading(false);
  }, [user, token]);

  useEffect(() => { load(); }, [load]);

  const createList = async () => {
    if (!form.name.trim()) { toast('Liste adı boş olamaz', 'warning'); return; }
    try {
      const { data } = await axios.post(`${API}/checklists`, form, { headers: authHeader });
      setLists(prev => [data, ...prev]);
      setActive(data);
      setShowNew(false);
      setForm({ name: '', activity: 'fishing', use_template: true });
      toast('Kontrol listesi oluşturuldu ✓');
    } catch { toast('Hata oluştu', 'error'); }
  };

  const deleteList = async (id) => {
    if (!window.confirm('Liste silinsin mi?')) return;
    await axios.delete(`${API}/checklists/${id}`, { headers: authHeader });
    setLists(prev => prev.filter(l => l.id !== id));
    if (active?.id === id) setActive(null);
    toast('Liste silindi', 'info');
  };

  const toggleItem = async (itemId) => {
    if (!active) return;
    const updated = active.items.map(it =>
      it.id === itemId ? { ...it, checked: !it.checked } : it
    );
    const updatedList = { ...active, items: updated };
    setActive(updatedList);
    setLists(prev => prev.map(l => l.id === active.id ? updatedList : l));
    await axios.put(`${API}/checklists/${active.id}/items`, { items: updated }, { headers: authHeader });
  };

  const addItem = async () => {
    if (!newItem.trim() || !active) return;
    const { data: item } = await axios.post(`${API}/checklists/${active.id}/items`, { text: newItem }, { headers: authHeader });
    const updated = { ...active, items: [...active.items, item] };
    setActive(updated);
    setLists(prev => prev.map(l => l.id === active.id ? updated : l));
    setNewItem('');
  };

  const actConfig = (id) => ACTIVITIES.find(a => a.id === id) || ACTIVITIES[0];
  const checkedCount = active ? active.items.filter(i => i.checked).length : 0;
  const totalCount   = active ? active.items.length : 0;
  const pct = totalCount ? (checkedCount / totalCount) * 100 : 0;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>✅ Kontrol Listesi</h1>
            <p>Seyahat öncesi ekipman hazırlığı</p>
          </div>
          {user && (
            <button className="btn-primary" style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }}
              onClick={() => setShowNew(true)}>+ Liste</button>
          )}
        </div>
      </div>

      {!user ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--t-mute)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <div>Kontrol listeleri için giriş yapın</div>
        </div>
      ) : loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div className="spinner" />
        </div>
      ) : (
        <div style={{ padding: '12px 16px' }}>

          {/* List tabs */}
          {lists.length > 0 && (
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 14 }}>
              {lists.map(l => {
                const cfg = actConfig(l.activity);
                const done = l.items.filter(i => i.checked).length;
                const isActive = active?.id === l.id;
                return (
                  <button key={l.id} onClick={() => setActive(l)} style={{
                    padding: '8px 12px', borderRadius: 12, whiteSpace: 'nowrap', cursor: 'pointer',
                    background: isActive ? 'var(--a-glow)' : 'var(--s2)',
                    border: isActive ? '1px solid var(--border-lg)' : '1px solid var(--border)',
                    color: isActive ? 'var(--a-light)' : 'var(--t-mute)',
                    fontSize: 12, fontWeight: 600, transition: 'all .2s', textAlign: 'left',
                  }}>
                    <div>{cfg.icon} {l.name}</div>
                    <div style={{ fontSize: 10, opacity: .7, marginTop: 2 }}>{done}/{l.items.length}</div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Active checklist */}
          {active ? (
            <>
              {/* Progress */}
              <div className="card" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>
                      {actConfig(active.activity).icon} {active.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--t-mute)', marginTop: 2 }}>
                      {checkedCount}/{totalCount} hazır
                    </div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: pct === 100 ? '#22c55e' : 'var(--a-light)' }}>
                    {Math.round(pct)}%
                  </div>
                </div>
                <div style={{ height: 6, background: 'var(--s3)', borderRadius: 3 }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    background: pct === 100 ? '#22c55e' : 'var(--a-base)',
                    width: `${pct}%`, transition: 'width .4s ease',
                    boxShadow: pct === 100 ? '0 0 8px rgba(34,197,94,.5)' : 'none',
                  }} />
                </div>
                {pct === 100 && (
                  <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: '#22c55e', fontWeight: 700 }}>
                    🎉 Tüm ekipman hazır! İyi avlar!
                  </div>
                )}
              </div>

              {/* Items */}
              <div style={{ marginBottom: 14 }}>
                {active.items.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '11px 0', borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      background: item.checked ? '#22c55e' : 'var(--s3)',
                      border: `1.5px solid ${item.checked ? '#22c55e' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .2s',
                    }}>
                      {item.checked && <span style={{ color: '#fff', fontSize: 13, lineHeight: 1 }}>✓</span>}
                    </div>
                    <span style={{
                      fontSize: 13, color: item.checked ? 'var(--t-mute)' : '#fff',
                      textDecoration: item.checked ? 'line-through' : 'none',
                      transition: 'all .2s',
                    }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Add item */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input className="input-field" placeholder="Ekipman ekle…" value={newItem}
                  onChange={e => setNewItem(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addItem()} />
                <button className="btn-primary" style={{ width: 'auto', padding: '0 16px', fontSize: 13 }}
                  onClick={addItem}>+</button>
              </div>

              <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', color: '#ef4444', borderColor: '#ef444430', marginTop: 8, marginBottom: 14 }}
                onClick={() => deleteList(active.id)}>
                🗑️ Listeyi Sil
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t-mute)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
              <div style={{ fontSize: 14, marginBottom: 4 }}>Henüz liste yok</div>
              <div style={{ fontSize: 12 }}>+ Liste ile seyahat hazırlığı başlat</div>
            </div>
          )}
        </div>
      )}

      {/* New list modal */}
      {showNew && (
        <div style={{
          position: 'fixed', inset: 0, background: '#000a', zIndex: 200,
          display: 'flex', alignItems: 'flex-end',
        }} onClick={() => setShowNew(false)}>
          <div style={{
            background: '#122212', borderRadius: '20px 20px 0 0',
            padding: 20, width: '100%', maxWidth: 430, margin: '0 auto',
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>📝 Yeni Liste</h3>

            <input className="input-field" placeholder="Liste adı (ör. Sapanca Balık Turu)" value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              style={{ marginBottom: 12 }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 12 }}>
              {ACTIVITIES.map(a => (
                <button key={a.id} onClick={() => setForm(p => ({ ...p, activity: a.id }))} style={{
                  padding: '10px 8px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                  background: form.activity === a.id ? a.color + '20' : 'var(--s1)',
                  border: `1px solid ${form.activity === a.id ? a.color : 'var(--border)'}`,
                  color: form.activity === a.id ? a.color : 'var(--t-mute)',
                  fontSize: 13, fontWeight: 600,
                }}>
                  {a.icon} {a.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <button onClick={() => setForm(p => ({ ...p, use_template: !p.use_template }))} style={{
                width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: form.use_template ? '#22c55e' : 'var(--s3)',
                position: 'relative', transition: 'background .2s',
              }}>
                <div style={{
                  position: 'absolute', top: 2, left: form.use_template ? 17 : 2,
                  width: 16, height: 16, borderRadius: '50%', background: '#fff',
                  transition: 'left .2s',
                }} />
              </button>
              <span style={{ fontSize: 12, color: 'var(--t-mid)' }}>Şablonu kullan ({ACTIVITIES.find(a => a.id === form.activity)?.label})</span>
            </div>

            <button className="btn-primary" onClick={createList}>Oluştur</button>
            <button className="btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
              onClick={() => setShowNew(false)}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
}
