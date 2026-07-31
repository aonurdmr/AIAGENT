import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 'barinma', label: 'Barınak', icon: '⛺',
    items: [
      { name: 'Çadır', weight: 2500, essential: true },
      { name: 'Uyku tulumu', weight: 1200, essential: true },
      { name: 'Uyku matı / şilte', weight: 400, essential: true },
      { name: 'Bungee ipi', weight: 80, essential: false },
      { name: 'Toprak örtüsü (groundsheet)', weight: 350, essential: false },
    ],
  },
  {
    id: 'mutfak', label: 'Mutfak', icon: '🍳',
    items: [
      { name: 'Kamp ocağı + gaz kartuş', weight: 360, essential: true },
      { name: 'Tencere seti', weight: 600, essential: true },
      { name: 'Çakmak + kibritleri', weight: 30, essential: true },
      { name: 'Su filtresi / arıtma hapı', weight: 100, essential: true },
      { name: 'Yemek takımı (kaşık/çatal/bıçak)', weight: 150, essential: true },
      { name: 'Termos (1L)', weight: 350, essential: false },
      { name: 'Katlanır bardak', weight: 40, essential: false },
    ],
  },
  {
    id: 'giysi', label: 'Giysi', icon: '👕',
    items: [
      { name: 'Yağmurluk / poncho', weight: 300, essential: true },
      { name: 'Termal iç giysi', weight: 250, essential: true },
      { name: 'Yürüyüş botu (ek çift)', weight: 0, essential: true },
      { name: 'Etek/şort (x2)', weight: 300, essential: false },
      { name: 'Polar yelek', weight: 250, essential: false },
      { name: 'Şapka + eldiven', weight: 120, essential: true },
      { name: 'Kalın çorap (x3 çift)', weight: 150, essential: true },
    ],
  },
  {
    id: 'guvenlik', label: 'Güvenlik', icon: '🆘',
    items: [
      { name: 'İlk yardım çantası', weight: 500, essential: true },
      { name: 'Düdük', weight: 20, essential: true },
      { name: 'El feneri + pil', weight: 200, essential: true },
      { name: 'Bıçak (çakı)', weight: 120, essential: true },
      { name: 'Kompas', weight: 80, essential: false },
      { name: 'Powerbank (20000mAh)', weight: 440, essential: false },
      { name: 'Güneş kremi SPF50', weight: 100, essential: true },
    ],
  },
  {
    id: 'avlikci', label: 'Balık / Av', icon: '🎣',
    items: [
      { name: 'Olta takımı + makine', weight: 500, essential: false },
      { name: 'Yem kutusu', weight: 200, essential: false },
      { name: 'Kepçe + kanca seti', weight: 120, essential: false },
      { name: 'Av yelek', weight: 600, essential: false },
      { name: 'Dürbün', weight: 320, essential: false },
      { name: 'Etiket + kimlik kartı', weight: 10, essential: false },
    ],
  },
  {
    id: 'navigasyon', label: 'Navigasyon', icon: '🧭',
    items: [
      { name: 'Topografik harita (basılı)', weight: 60, essential: true },
      { name: 'GPS cihazı', weight: 150, essential: false },
      { name: 'Uydu mesajlaşıcı (SPOT/Garmin)', weight: 100, essential: false },
      { name: 'Kamera + şarj', weight: 400, essential: false },
    ],
  },
];

const LS_KEY = 'gearpack_v1';
function loadChecked() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
}
function saveChecked(val) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(val)); } catch {}
}

export default function GearPack() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(loadChecked);
  const [catId, setCatId] = useState('barinma');
  const [nights, setNights] = useState(2);
  const [showOnly, setShowOnly] = useState('all');

  const cat = CATEGORIES.find(c => c.id === catId);

  function toggle(key) {
    setChecked(prev => {
      const next = { ...prev, [key]: !prev[key] };
      saveChecked(next);
      return next;
    });
  }

  function resetAll() {
    saveChecked({});
    setChecked({});
  }

  // Weight totals
  let totalWeight = 0;
  let packedWeight = 0;
  CATEGORIES.forEach(c => {
    c.items.forEach(item => {
      const key = `${c.id}::${item.name}`;
      totalWeight += item.weight;
      if (checked[key]) packedWeight += item.weight;
    });
  });

  const totalItems = CATEGORIES.reduce((s, c) => s + c.items.length, 0);
  const packedItems = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((packedItems / totalItems) * 100);

  const filteredItems = cat?.items.filter(item => {
    if (showOnly === 'essential') return item.essential;
    if (showOnly === 'optional') return !item.essential;
    return true;
  }) || [];

  return (
    <div style={{ background: '#111827', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎒 Paket Hazırlama Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kamp ekipmanı listesi ve ağırlık takibi</div>
      </div>

      {/* Progress + weight summary */}
      <div style={{ margin: '0 16px 12px', background: '#1f2937', borderRadius: 14, padding: 14, border: '1px solid #374151' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: '#d1d5db' }}>{packedItems}/{totalItems} eşya hazır</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{pct}%</span>
        </div>
        <div style={{ background: '#374151', borderRadius: 6, height: 8 }}>
          <div style={{ width: `${pct}%`, height: 8, borderRadius: 6, background: pct === 100 ? '#22c55e' : '#3b82f6', transition: 'width 0.3s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#3b82f6' }}>{(packedWeight / 1000).toFixed(1)}</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>Paket (kg)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#9ca3af' }}>{(totalWeight / 1000).toFixed(1)}</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>Toplam (kg)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#f59e0b' }}>{nights}</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>Gece</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#22c55e' }}>{((packedWeight / 1000) / nights).toFixed(1)}</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>kg/gece</div>
          </div>
        </div>
      </div>

      {/* Night selector */}
      <div style={{ margin: '0 16px 10px', background: '#1f2937', borderRadius: 12, padding: '10px 14px', border: '1px solid #374151', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>🌙 Gece sayısı:</span>
        {[1, 2, 3, 5, 7].map(n => (
          <button key={n} onClick={() => setNights(n)} style={{
            background: nights === n ? '#f59e0b' : '#374151', color: nights === n ? '#000' : '#9ca3af',
            border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>{n}</button>
        ))}
      </div>

      {/* Category tabs */}
      <div style={{ padding: '0 16px 10px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {CATEGORIES.map(c => {
          const done = c.items.filter(item => checked[`${c.id}::${item.name}`]).length;
          const total = c.items.length;
          const active = catId === c.id;
          return (
            <button key={c.id} onClick={() => setCatId(c.id)} style={{
              background: active ? '#3b82f6' : '#1f2937', color: active ? '#fff' : '#9ca3af',
              border: '1px solid', borderColor: active ? '#3b82f6' : '#374151',
              borderRadius: 20, padding: '7px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
            }}>{c.icon} {c.label} <span style={{ opacity: 0.7 }}>({done}/{total})</span></button>
          );
        })}
      </div>

      {/* Filter bar */}
      <div style={{ padding: '0 16px 10px', display: 'flex', gap: 8 }}>
        {[['all', 'Tümü'], ['essential', '⭐ Zorunlu'], ['optional', '➕ İsteğe Bağlı']].map(([id, lbl]) => (
          <button key={id} onClick={() => setShowOnly(id)} style={{
            background: showOnly === id ? '#374151' : 'transparent', color: showOnly === id ? '#f9fafb' : '#6b7280',
            border: `1px solid ${showOnly === id ? '#6b7280' : '#374151'}`,
            borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          }}>{lbl}</button>
        ))}
        <button onClick={resetAll} style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid #374151', color: '#6b7280', borderRadius: 8, padding: '6px 10px', fontSize: 11, cursor: 'pointer' }}>
          🔄 Sıfırla
        </button>
      </div>

      {/* Items list */}
      <div style={{ padding: '0 16px' }}>
        {filteredItems.map(item => {
          const key = `${catId}::${item.name}`;
          const isChecked = !!checked[key];
          return (
            <div key={item.name} onClick={() => toggle(key)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', marginBottom: 6, background: isChecked ? '#052e16' : '#1f2937', borderRadius: 12, border: `1px solid ${isChecked ? '#16a34a44' : '#374151'}`, cursor: 'pointer' }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6, border: `2px solid ${isChecked ? '#22c55e' : '#6b7280'}`,
                background: isChecked ? '#22c55e' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {isChecked && <span style={{ color: '#fff', fontSize: 13 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: isChecked ? '#9ca3af' : '#f9fafb', textDecoration: isChecked ? 'line-through' : 'none' }}>
                  {item.name}
                </div>
                {item.essential && (
                  <div style={{ fontSize: 10, color: '#f59e0b', marginTop: 1 }}>⭐ Zorunlu</div>
                )}
              </div>
              {item.weight > 0 && (
                <span style={{ fontSize: 11, color: '#6b7280', flexShrink: 0 }}>{item.weight}g</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
