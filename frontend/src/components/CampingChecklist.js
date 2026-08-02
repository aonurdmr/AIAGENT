import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'camping_checklist';

const DEFAULT_ITEMS = [
  // Barınak
  { id: 1, cat: 'Barınak', label: 'Çadır (+ çiviler ve kazıklar)', checked: false, priority: 'Zorunlu' },
  { id: 2, cat: 'Barınak', label: 'Uyku tulumu', checked: false, priority: 'Zorunlu' },
  { id: 3, cat: 'Barınak', label: 'Uyku pedi / şişme mat', checked: false, priority: 'Zorunlu' },
  { id: 4, cat: 'Barınak', label: 'Tarp / yağmur örtüsü', checked: false, priority: 'Önerilen' },
  // Giysi
  { id: 5, cat: 'Giysi', label: 'Su geçirmez mont', checked: false, priority: 'Zorunlu' },
  { id: 6, cat: 'Giysi', label: 'Termal iç giysi', checked: false, priority: 'Önerilen' },
  { id: 7, cat: 'Giysi', label: 'Yürüyüş botu', checked: false, priority: 'Zorunlu' },
  { id: 8, cat: 'Giysi', label: 'Yedek çorap (x3)', checked: false, priority: 'Önerilen' },
  { id: 9, cat: 'Giysi', label: 'Eldiven ve bere', checked: false, priority: 'Önerilen' },
  // Yemek
  { id: 10, cat: 'Yemek', label: 'Kamp ocağı + gaz kartuşu', checked: false, priority: 'Zorunlu' },
  { id: 11, cat: 'Yemek', label: 'Tencere / pişirme seti', checked: false, priority: 'Zorunlu' },
  { id: 12, cat: 'Yemek', label: 'Çatal, kaşık, bıçak', checked: false, priority: 'Zorunlu' },
  { id: 13, cat: 'Yemek', label: 'Çöp torbası', checked: false, priority: 'Zorunlu' },
  { id: 14, cat: 'Yemek', label: 'Yiyecek & atıştırmalıklar', checked: false, priority: 'Zorunlu' },
  // Su
  { id: 15, cat: 'Su', label: 'Su (2L/kişi/gün)', checked: false, priority: 'Zorunlu' },
  { id: 16, cat: 'Su', label: 'Su filtresi / arıtma tableti', checked: false, priority: 'Önerilen' },
  { id: 17, cat: 'Su', label: 'Termos', checked: false, priority: 'Önerilen' },
  // Sağlık & Güvenlik
  { id: 18, cat: 'Sağlık', label: 'İlk yardım çantası', checked: false, priority: 'Zorunlu' },
  { id: 19, cat: 'Sağlık', label: 'Güneş kremi (SPF50)', checked: false, priority: 'Zorunlu' },
  { id: 20, cat: 'Sağlık', label: 'Böcek kovucu', checked: false, priority: 'Önerilen' },
  { id: 21, cat: 'Sağlık', label: 'Kişisel ilaçlar', checked: false, priority: 'Zorunlu' },
  // Araç & Gereç
  { id: 22, cat: 'Araç', label: 'Baş feneri + yedek pil', checked: false, priority: 'Zorunlu' },
  { id: 23, cat: 'Araç', label: 'Çakmaklık / ateşleyici', checked: false, priority: 'Zorunlu' },
  { id: 24, cat: 'Araç', label: 'Kamp bıçağı / çakı', checked: false, priority: 'Önerilen' },
  { id: 25, cat: 'Araç', label: 'Harita + pusula', checked: false, priority: 'Önerilen' },
  { id: 26, cat: 'Araç', label: 'Tamir kiti (bant, ip)', checked: false, priority: 'Önerilen' },
  // Hijyen
  { id: 27, cat: 'Hijyen', label: 'Tuvalet kağıdı & kürek', checked: false, priority: 'Zorunlu' },
  { id: 28, cat: 'Hijyen', label: 'El dezenfektanı', checked: false, priority: 'Önerilen' },
  { id: 29, cat: 'Hijyen', label: 'Biyolojik sabun', checked: false, priority: 'Önerilen' },
  { id: 30, cat: 'Hijyen', label: 'Tuvalet torbası', checked: false, priority: 'Önerilen' },
];

const CATS = ['Tümü', 'Barınak', 'Giysi', 'Yemek', 'Su', 'Sağlık', 'Araç', 'Hijyen'];
const PRIO_COLORS = { Zorunlu: '#ef4444', Önerilen: '#f59e0b' };

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULT_ITEMS; } catch { return DEFAULT_ITEMS; }
}

export default function CampingChecklist() {
  const navigate = useNavigate();
  const [items, setItems]   = useState(load);
  const [cat, setCat]       = useState('Tümü');
  const [newLabel, setNewLabel] = useState('');
  const [newCat, setNewCat]   = useState('Araç');
  const [adding, setAdding]   = useState(false);

  const save = useCallback((updated) => {
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const toggle = useCallback((id) => {
    save(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  }, [items, save]);

  const deleteItem = (id) => save(items.filter(i => i.id !== id));

  const addItem = () => {
    if (!newLabel.trim()) return;
    const next = { id: Date.now(), cat: newCat, label: newLabel.trim(), checked: false, priority: 'Önerilen' };
    save([...items, next]);
    setNewLabel('');
    setAdding(false);
  };

  const resetAll = () => save(DEFAULT_ITEMS);
  const checkAll = () => save(items.map(i => ({ ...i, checked: true })));

  const visible = cat === 'Tümü' ? items : items.filter(i => i.cat === cat);
  const totalChecked = visible.filter(i => i.checked).length;
  const pct = visible.length ? Math.round((totalChecked / visible.length) * 100) : 0;
  const allChecked = visible.length > 0 && visible.every(i => i.checked);

  const groupedByCat = CATS.slice(1).map(c => ({
    cat: c,
    items: items.filter(i => i.cat === c),
    done: items.filter(i => i.cat === c && i.checked).length,
  })).filter(g => g.items.length > 0);

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⛺ Kamp Listesi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>30 madde · kişiselleştirilebilir hazırlık listesi</div>
      </div>

      {/* Progress */}
      <div style={{ margin: '0 16px 14px', background: '#1f2937', borderRadius: 16, padding: '14px 18px', border: '1px solid #374151' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>HAZIRLIK DURUMU</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: pct === 100 ? '#22c55e' : '#f9fafb' }}>{pct}%</div>
          </div>
          <div style={{ fontSize: 36 }}>{pct === 100 ? '✅' : pct > 50 ? '🏕️' : '📋'}</div>
        </div>
        <div style={{ background: '#374151', borderRadius: 8, height: 8, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? '#22c55e' : 'linear-gradient(90deg,#3b82f6,#22c55e)', borderRadius: 8, transition: 'width 0.5s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#6b7280' }}>
          <span>{totalChecked}/{visible.length} tamamlandı</span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={checkAll} style={{ background: 'none', border: 'none', color: '#22c55e', cursor: 'pointer', fontSize: 11, padding: 0 }}>Hepsini işaretle</button>
            <button onClick={resetAll} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 11, padding: 0 }}>Sıfırla</button>
          </div>
        </div>
      </div>

      {/* Category mini-summary */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {CATS.map(c => {
          const g = groupedByCat.find(g => g.cat === c);
          const done = g ? g.done : 0;
          const total = g ? g.items.length : items.length;
          const doneCount = c === 'Tümü' ? items.filter(i => i.checked).length : done;
          const totalCount = c === 'Tümü' ? items.length : total;
          const isActive = cat === c;
          return (
            <button key={c} onClick={() => setCat(c)} style={{
              background: isActive ? '#3b82f6' : '#1f2937',
              color: isActive ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: isActive ? '#3b82f6' : '#374151',
              borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600,
              whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0,
            }}>
              {c} <span style={{ opacity: 0.7 }}>({doneCount}/{totalCount})</span>
            </button>
          );
        })}
      </div>

      {/* Items */}
      <div style={{ padding: '0 16px' }}>
        {visible.map(item => (
          <div key={item.id} style={{
            background: item.checked ? '#14532d' : '#1f2937',
            borderRadius: 12, padding: '12px 14px', marginBottom: 8,
            border: `1px solid ${item.checked ? '#22c55e44' : '#374151'}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <button onClick={() => toggle(item.id)} style={{
              width: 24, height: 24, borderRadius: 6, border: `2px solid ${item.checked ? '#22c55e' : '#374151'}`,
              background: item.checked ? '#22c55e' : 'transparent', cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff',
            }}>{item.checked ? '✓' : ''}</button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: item.checked ? '#86efac' : '#f9fafb', textDecoration: item.checked ? 'line-through' : 'none' }}>{item.label}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 10, color: '#6b7280' }}>{item.cat}</span>
                <span style={{ fontSize: 10, color: PRIO_COLORS[item.priority] || '#6b7280', fontWeight: 600 }}>· {item.priority}</span>
              </div>
            </div>
            <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', color: '#4b5563', fontSize: 16, cursor: 'pointer', padding: 4 }}>🗑️</button>
          </div>
        ))}
      </div>

      {/* Add item */}
      {adding ? (
        <div style={{ margin: '12px 16px', background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
          <input value={newLabel} onChange={e => setNewLabel(e.target.value)}
            placeholder="Madde açıklaması…"
            style={{ width: '100%', boxSizing: 'border-box', background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 10, padding: '10px 12px', fontSize: 14, marginBottom: 10 }}
          />
          <select value={newCat} onChange={e => setNewCat(e.target.value)}
            style={{ width: '100%', background: '#111827', border: '1px solid #374151', color: '#f9fafb', borderRadius: 10, padding: '10px 12px', fontSize: 14, marginBottom: 10 }}>
            {CATS.slice(1).map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={addItem} style={{ flex: 1, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Ekle</button>
            <button onClick={() => setAdding(false)} style={{ background: '#374151', color: '#9ca3af', border: 'none', borderRadius: 10, padding: 12, fontSize: 14, cursor: 'pointer' }}>İptal</button>
          </div>
        </div>
      ) : (
        <div style={{ padding: '12px 16px' }}>
          <button onClick={() => setAdding(true)} style={{ width: '100%', background: '#1f2937', color: '#9ca3af', border: '2px dashed #374151', borderRadius: 12, padding: 14, fontSize: 14, cursor: 'pointer' }}>
            ➕ Yeni madde ekle
          </button>
        </div>
      )}

      {/* All done banner */}
      {allChecked && visible.length > 0 && (
        <div style={{ margin: '8px 16px', background: '#14532d', borderRadius: 14, padding: '16px 18px', border: '1px solid #22c55e44', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🏕️</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#86efac' }}>Hazırsınız! İyi kamplar!</div>
        </div>
      )}
    </div>
  );
}
