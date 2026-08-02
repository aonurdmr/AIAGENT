import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BLANK_ENTRY = { date: '', location: '', species: '', length: '', weight: '', bait: '', weather: '', water: '', notes: '' };

export default function FishingJournal() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ ...BLANK_ENTRY });
  const [view, setView] = useState('list'); // list | add | detail
  const [selIdx, setSelIdx] = useState(null);

  useEffect(() => {
    try { const s = localStorage.getItem('fishingJournal'); if (s) setEntries(JSON.parse(s)); } catch {}
  }, []);

  const save = (arr) => {
    setEntries(arr);
    try { localStorage.setItem('fishingJournal', JSON.stringify(arr)); } catch {}
  };

  const addEntry = () => {
    if (!form.date || !form.species) return;
    const next = [{ ...form, id: Date.now() }, ...entries];
    save(next);
    setForm({ ...BLANK_ENTRY });
    setView('list');
  };

  const deleteEntry = (id) => {
    save(entries.filter(e => e.id !== id));
    setView('list');
  };

  const stats = {
    total: entries.length,
    species: [...new Set(entries.map(e => e.species).filter(Boolean))].length,
    biggest: entries.reduce((best, e) => parseFloat(e.length) > (parseFloat(best?.length) || 0) ? e : best, null),
  };

  if (view === 'add') return (
    <div style={{ background: '#050d10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 20, fontWeight: 700 }}>➕ Yeni Kayıt</div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {[['date','Tarih','date'],['location','Konum','text'],['species','Tür','text'],['length','Boy (cm)','number'],['weight','Ağırlık (gr)','number'],['bait','Yem','text'],['weather','Hava','text'],['water','Su durumu','text']].map(([k,l,t]) => (
          <div key={k} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>{l}</div>
            <input type={t} value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))}
              style={{ width: '100%', background: '#0d1820', border: '1px solid #1e4060', borderRadius: 8, padding: '8px 12px', color: '#f9fafb', fontSize: 13, boxSizing: 'border-box' }} />
          </div>
        ))}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>Notlar</div>
          <textarea value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} rows={3}
            style={{ width: '100%', background: '#0d1820', border: '1px solid #1e4060', borderRadius: 8, padding: '8px 12px', color: '#f9fafb', fontSize: 13, boxSizing: 'border-box', resize: 'none' }} />
        </div>
        <button onClick={addEntry} style={{ width: '100%', padding: 12, background: '#06b6d4', borderRadius: 10, border: 'none', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Kaydet</button>
      </div>
    </div>
  );

  if (view === 'detail' && selIdx !== null) {
    const e = entries[selIdx];
    return (
      <div style={{ background: '#050d10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
        <div style={{ padding: '20px 16px 12px' }}>
          <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
          <div style={{ fontSize: 20, fontWeight: 700 }}>🐟 {e.species || 'Kayıt'}</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>{e.date} · {e.location}</div>
        </div>
        <div style={{ padding: '0 16px' }}>
          <div style={{ background: '#0d1820', borderRadius: 14, padding: 16, border: '1px solid #06b6d433' }}>
            {[['📏 Boy', `${e.length} cm`], ['⚖️ Ağırlık', `${e.weight} gr`], ['🪱 Yem', e.bait], ['🌤️ Hava', e.weather], ['💧 Su', e.water]].map(([l, v]) => v && (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #0d2030' }}>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{l}</span>
                <span style={{ fontSize: 12, color: '#f9fafb', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            {e.notes && <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 4 }}>{e.notes}</div>}
          </div>
          <button onClick={() => deleteEntry(e.id)} style={{ width: '100%', padding: 12, background: '#1a0a0a', border: '1px solid #ef444433', borderRadius: 10, color: '#ef4444', fontWeight: 600, fontSize: 13, cursor: 'pointer', marginTop: 16 }}>🗑️ Kaydı Sil</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#050d10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>📔 Balıkçı Günlüğü</div>
          <button onClick={() => setView('add')} style={{ background: '#06b6d4', border: 'none', borderRadius: 20, padding: '6px 14px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>+ Ekle</button>
        </div>
      </div>

      <div style={{ padding: '0 16px', marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[['🎣', 'Toplam', stats.total], ['🐟', 'Tür', stats.species], ['📏', 'En Büyük', stats.biggest ? `${stats.biggest.length}cm` : '-']].map(([ic, l, v]) => (
            <div key={l} style={{ background: '#0d1820', borderRadius: 10, padding: '10px 12px', textAlign: 'center', border: '1px solid #06b6d422' }}>
              <div style={{ fontSize: 20 }}>{ic}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#06b6d4' }}>{v}</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {entries.length === 0 ? (
          <div style={{ background: '#0d1820', borderRadius: 14, padding: 40, textAlign: 'center', border: '1px solid #0d3040' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎣</div>
            <div style={{ fontSize: 14, color: '#6b7280' }}>Henüz kayıt yok</div>
            <div style={{ fontSize: 12, color: '#4b5563', marginTop: 4 }}>İlk avını eklemek için + Ekle'ye bas</div>
          </div>
        ) : entries.map((e, i) => (
          <div key={e.id} onClick={() => { setSelIdx(i); setView('detail'); }} style={{
            background: '#0d1820', borderRadius: 12, padding: '12px 14px', border: '1px solid #1e4060', marginBottom: 8, cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{e.species || 'Bilinmeyen tür'}</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>{e.date} · {e.location}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              {e.length && <div style={{ fontSize: 13, color: '#06b6d4', fontWeight: 700 }}>{e.length} cm</div>}
              {e.weight && <div style={{ fontSize: 11, color: '#9ca3af' }}>{e.weight} gr</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
