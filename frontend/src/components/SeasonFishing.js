import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SEASONS_F = [
  {
    id: 'spring', name: 'İlkbahar', icon: '🌸', accent: '#22c55e',
    period: 'Mart – Mayıs',
    species: [
      { fish: 'Sazan', tip: 'Yumurtlama öncesi agresif beslenme — sığ ve ılık alan' },
      { fish: 'Levrek', tip: 'Yuvalama bölgesi — sığ kumlu zemin, kıyı yakını' },
      { fish: 'Alabalık', tip: 'Yüksek aktivite — akıntılı dere ve nehir' },
    ],
    water: 'Su 10-18°C — balık sığ alanlara çıkıyor',
    tip: 'İlkbahar: yılın en aktif dönemi. Her sabah sığ alanlara git.',
  },
  {
    id: 'summer', name: 'Yaz', icon: '☀️', accent: '#f59e0b',
    period: 'Haziran – Ağustos',
    species: [
      { fish: 'Sazan', tip: 'Sabah 5-8 ve akşam 18-21 arası — gün ortası derin' },
      { fish: 'Levrek', tip: 'Gece avcısı — karanlıkta ışıklı yem dene' },
      { fish: 'Kefal', tip: 'Kıyı boyunca sürü halinde — ekmek hamuru' },
    ],
    water: 'Su 22-28°C — balık sabah ve akşam aktif, öğle derin',
    tip: 'Yaz öğlesi: balık derine iner. Öğleden sonra 3+ metre derinliği dene.',
  },
  {
    id: 'autumn', name: 'Sonbahar', icon: '🍂', accent: '#f97316',
    period: 'Eylül – Kasım',
    species: [
      { fish: 'Sazan', tip: 'Kış öncesi yiyecek depolama — gün boyu aktif' },
      { fish: 'Turna', tip: 'Agresif yem arama — büyük yapay yem' },
      { fish: 'Levrek', tip: 'Sürü halinde avlanma — köpükli su yakını' },
    ],
    water: 'Su 12-18°C — sazan ve turna için altın dönem',
    tip: 'Sonbahar sazan: tüm gün su yüzeyinde yem arar — en kolay dönem.',
  },
  {
    id: 'winter', name: 'Kış', icon: '❄️', accent: '#60a5fa',
    period: 'Aralık – Şubat',
    species: [
      { fish: 'Sazan', tip: 'En derin nokta — sabah güneşli saatlerde minimal hareket' },
      { fish: 'Turna', tip: 'Kış aktivitesi az ama büyük örnekler yakalanır' },
      { fish: 'Buz balıkçılığı', tip: 'Donmuş göllerde jig ile alabalık ve levrek' },
    ],
    water: 'Su 4-8°C — yavaş sindirim, az yem gerektirir',
    tip: 'Kış sazan: sabah 10-14 arası en aktif. Ağır rig ve az yem kullan.',
  },
];

export default function SeasonFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📅 Mevsimlik Balık Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İlkbahar · yaz · sonbahar · kış — tür ve strateji</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SEASONS_F.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#060e18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{s.period}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#060e18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: s.accent, fontWeight: 700, marginTop: 10, marginBottom: 6 }}>🐟 HEDEF TÜRLER</div>
                  {s.species.map((sp, i) => (
                    <div key={i} style={{ marginBottom: 6, padding: '6px 8px', background: s.accent + '10', borderRadius: 6 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{sp.fish}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 1 }}>{sp.tip}</div>
                    </div>
                  ))}
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>🌡️ Su durumu: </span><span style={{ color: '#d1d5db' }}>{s.water}</span></div>
                  <div style={{ background: s.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {s.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
