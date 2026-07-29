import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const CATEGORIES = [
  { id: 'fishing',  label: 'Balıkçılık', icon: '🎣' },
  { id: 'hunting',  label: 'Avcılık',    icon: '🏹' },
  { id: 'camping',  label: 'Kamp',        icon: '⛺' },
  { id: 'general',  label: 'Genel',       icon: '🎒' },
];

const CONDITIONS = [
  { id: 'mükemmel', label: 'Mükemmel', color: '#22c55e' },
  { id: 'iyi',      label: 'İyi',      color: '#86efac' },
  { id: 'orta',     label: 'Orta',     color: '#fbbf24' },
  { id: 'kötü',     label: 'Kötü',     color: '#f87171' },
];

const EQUIPMENT_EMOJIS = {
  fishing:  ['🎣', '🪝', '🐟', '🎛️', '🔫'],
  hunting:  ['🏹', '🔫', '🦆', '🐗', '🌿'],
  camping:  ['⛺', '🔦', '🪓', '🔪', '🧭'],
  general:  ['🎒', '🧰', '🔧', '⚙️', '📦'],
};

const PRESET_ITEMS = {
  fishing:  ['Olta Takımı', 'Makara', 'Misina', 'Lure Seti', 'Yem Kutusu', 'Olta Sepeti', 'El Feneri'],
  hunting:  ['Tüfek', 'Dürbün', 'Av Yeleği', 'Çizme', 'Kamuflaj Kıyafet'],
  camping:  ['Çadır', 'Uyku Tulumu', 'Mat', 'Ocak', 'Tencere Seti', 'Rüzgarlık'],
  general:  ['Sırt Çantası', 'Pusula', 'İlk Yardım Seti', 'Su Matarası'],
};

export default function Equipment() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [filterCat, setFilterCat]   = useState('all');
  const [form, setForm] = useState({
    name: '', category: 'fishing', brand: '', model_name: '',
    condition: 'iyi', purchase_date: '', notes: '', emoji: '🎣',
  });

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/equipment`, { headers: authHeader });
      setItems(data);
    } catch { setItems([]); }
    setLoading(false);
  }

  function openForm(item = null) {
    if (item) {
      setForm({ name: item.name, category: item.category, brand: item.brand || '',
        model_name: item.model_name || '', condition: item.condition || 'iyi',
        purchase_date: item.purchase_date || '', notes: item.notes || '', emoji: item.emoji || '🎒' });
      setEditItem(item);
    } else {
      setForm({ name: '', category: 'fishing', brand: '', model_name: '',
        condition: 'iyi', purchase_date: '', notes: '', emoji: '🎣' });
      setEditItem(null);
    }
    setShowForm(true);
  }

  async function saveItem() {
    if (!form.name.trim()) return;
    try {
      if (editItem) {
        await axios.put(`${API}/equipment/${editItem.id}`, form, { headers: authHeader });
      } else {
        await axios.post(`${API}/equipment`, form, { headers: authHeader });
      }
      setShowForm(false);
      await fetchItems();
    } catch (e) { console.error(e); }
  }

  async function deleteItem(id) {
    if (!window.confirm('Ekipmanı silmek istiyor musunuz?')) return;
    try {
      await axios.delete(`${API}/equipment/${id}`, { headers: authHeader });
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (e) { console.error(e); }
  }

  const filtered = filterCat === 'all' ? items : items.filter(i => i.category === filterCat);
  const condColor = c => CONDITIONS.find(x => x.id === c)?.color || '#86efac';

  const catStats = CATEGORIES.map(cat => ({
    ...cat,
    count: items.filter(i => i.category === cat.id).length,
  }));

  if (!user) {
    return (
      <div className="page fade-in">
        <div className="page-header">
          <h1>🎒 Ekipman Takibi</h1>
          <p className="sub">Outdoor ekipmanlarını yönet</p>
        </div>
        <div style={{ padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <div style={{ color: 'var(--t-mid)', marginBottom: 16 }}>Ekipmanlarını takip etmek için giriş yapmalısın.</div>
          <button className="btn-primary" onClick={() => navigate('/giris')}>Giriş Yap</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>🎒 Ekipman Takibi</h1>
        <p className="sub">{items.length} ekipman kayıtlı</p>
        <button className="btn-primary" style={{ marginTop: 10 }} onClick={() => openForm()}>
          + Ekipman Ekle
        </button>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 14 }}>
          {catStats.map(cat => (
            <div key={cat.id} className="stat-card" onClick={() => setFilterCat(cat.id === filterCat ? 'all' : cat.id)}
              style={{ cursor: 'pointer', border: filterCat === cat.id ? '1px solid var(--accent)' : undefined }}>
              <div className="num">{cat.icon}</div>
              <div style={{ fontWeight: 800, color: 'var(--accent)', fontSize: 16 }}>{cat.count}</div>
              <div className="label" style={{ fontSize: 9 }}>{cat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="filter-tabs" style={{ marginBottom: 14 }}>
          <button className={`filter-tab ${filterCat === 'all' ? 'active' : ''}`} onClick={() => setFilterCat('all')}>
            🎒 Tümü
          </button>
          {CATEGORIES.map(c => (
            <button key={c.id} className={`filter-tab ${filterCat === c.id ? 'active' : ''}`}
              onClick={() => setFilterCat(c.id)}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Items */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--t-mute)' }}>Yükleniyor…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--t-mute)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎒</div>
            <div>Henüz ekipman eklenmedi.</div>
            <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => openForm()}>
              İlk Ekipmanı Ekle
            </button>
          </div>
        ) : (
          filtered.map(item => (
            <div key={item.id} className="card" style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: 'var(--s3)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{item.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{item.name}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openForm(item)} style={{
                        background: 'none', border: 'none', color: 'var(--a-light)', cursor: 'pointer', fontSize: 14,
                      }}>✏️</button>
                      <button onClick={() => deleteItem(item.id)} style={{
                        background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 14,
                      }}>🗑️</button>
                    </div>
                  </div>
                  {(item.brand || item.model_name) && (
                    <div style={{ fontSize: 12, color: 'var(--t-mute)', marginTop: 2 }}>
                      {[item.brand, item.model_name].filter(Boolean).join(' · ')}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                      background: condColor(item.condition) + '18',
                      border: `1px solid ${condColor(item.condition)}30`,
                      color: condColor(item.condition),
                    }}>{item.condition?.toUpperCase()}</span>
                    <span style={{
                      fontSize: 10, padding: '2px 8px', borderRadius: 20,
                      background: 'var(--s3)', color: 'var(--t-mute)', border: '1px solid var(--border)',
                    }}>{CATEGORIES.find(c => c.id === item.category)?.icon} {CATEGORIES.find(c => c.id === item.category)?.label}</span>
                  </div>
                  {item.notes && (
                    <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 6, lineHeight: 1.5 }}>
                      {item.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)',
          zIndex: 200, display: 'flex', alignItems: 'flex-end',
        }} onClick={() => setShowForm(false)}>
          <div style={{
            background: 'var(--s1)', borderRadius: '20px 20px 0 0',
            width: '100%', maxWidth: 430, margin: '0 auto',
            padding: '20px 20px 40px', maxHeight: '85vh', overflowY: 'auto',
            border: '1px solid var(--border)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{editItem ? '✏️ Ekipmanı Düzenle' : '+ Ekipman Ekle'}</div>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: 'var(--t-mute)', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>

            {/* Emoji picker */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 6 }}>İkon</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(EQUIPMENT_EMOJIS[form.category] || EQUIPMENT_EMOJIS.general).map(em => (
                  <button key={em} onClick={() => setForm(f => ({ ...f, emoji: em }))} style={{
                    width: 40, height: 40, borderRadius: 10, fontSize: 20,
                    background: form.emoji === em ? 'var(--a-glow)' : 'var(--s2)',
                    border: form.emoji === em ? '1px solid var(--accent)' : '1px solid var(--border)',
                    cursor: 'pointer',
                  }}>{em}</button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 6 }}>Kategori</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => {
                    setForm(f => ({
                      ...f, category: c.id,
                      emoji: EQUIPMENT_EMOJIS[c.id]?.[0] || '🎒',
                    }));
                  }} style={{
                    padding: '8px 4px', borderRadius: 10, fontSize: 11, fontWeight: 600,
                    background: form.category === c.id ? 'var(--a-glow)' : 'var(--s2)',
                    border: form.category === c.id ? '1px solid var(--accent)' : '1px solid var(--border)',
                    color: form.category === c.id ? 'var(--a-light)' : 'var(--t-mute)', cursor: 'pointer',
                  }}>
                    {c.icon}<br />{c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick presets */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 6 }}>Hızlı Seçim</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(PRESET_ITEMS[form.category] || []).map(preset => (
                  <button key={preset} onClick={() => setForm(f => ({ ...f, name: preset }))} style={{
                    padding: '4px 10px', borderRadius: 20, fontSize: 11,
                    background: form.name === preset ? 'var(--a-glow)' : 'var(--s3)',
                    border: form.name === preset ? '1px solid var(--accent)' : '1px solid var(--border)',
                    color: 'var(--t-mid)', cursor: 'pointer',
                  }}>{preset}</button>
                ))}
              </div>
            </div>

            {/* Name */}
            <input className="ai-input" placeholder="Ekipman adı *" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={{ marginBottom: 10 }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
              <input className="ai-input" placeholder="Marka" value={form.brand}
                onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
              <input className="ai-input" placeholder="Model" value={form.model_name}
                onChange={e => setForm(f => ({ ...f, model_name: e.target.value }))} />
            </div>

            {/* Condition */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 6 }}>Durum</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                {CONDITIONS.map(c => (
                  <button key={c.id} onClick={() => setForm(f => ({ ...f, condition: c.id }))} style={{
                    padding: '6px 4px', borderRadius: 8, fontSize: 10, fontWeight: 700,
                    background: form.condition === c.id ? c.color + '22' : 'var(--s2)',
                    border: form.condition === c.id ? `1px solid ${c.color}` : '1px solid var(--border)',
                    color: form.condition === c.id ? c.color : 'var(--t-mute)', cursor: 'pointer',
                  }}>{c.label}</button>
                ))}
              </div>
            </div>

            <input className="ai-input" placeholder="Satın alma tarihi" type="date" value={form.purchase_date}
              onChange={e => setForm(f => ({ ...f, purchase_date: e.target.value }))}
              style={{ marginBottom: 10 }} />

            <textarea className="ai-input" placeholder="Notlar…" rows={3} value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              style={{ resize: 'none', marginBottom: 14 }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button className="btn-ghost" onClick={() => setShowForm(false)}>İptal</button>
              <button className="btn-primary" onClick={saveItem}>
                {editItem ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
