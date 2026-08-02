import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CASTS = [
  {
    id: 'overhead', name: 'Üst Atış (Overhead)', icon: '🎣', accent: '#06b6d4',
    skill: 'Temel — başlangıç noktası',
    steps: [
      '10-2 hareketi: saat 10 ile 2 arası kol salınımı',
      'Geri atışta hattı gerdikçe ileriye at',
      'Bilek kırma yasaklı — dirsek ve omuz hareketi',
      '30 derecelik açıyla hat suya iner',
      'Mend (hat kıvrımı): sürüklenmeyi geciktir',
    ],
    tip: 'Metronom kuralı: at, say 1-2, geri al, at. Ritim kritik.',
  },
  {
    id: 'roll', name: 'Rulo Atış (Roll Cast)', icon: '🌀', accent: '#22c55e',
    skill: 'Orta — dar alan ve ormanda',
    steps: [
      'Hat önde suda — geri atmadan tek hareket',
      'Kolu yavaşça yükselt — hat D şekli alsın',
      'Ani ve güçlü öne at — D açılır, hat uçar',
      'Arkasında ağaç olan nehirde tek seçenek',
      'Mevcut hatı kaldırmak için de kullanılır',
    ],
    tip: 'Dar orman deresinde tek kullanılabilir teknik. Mutlaka öğren.',
  },
  {
    id: 'double', name: 'Çift El Spey Atış', icon: '💪', accent: '#f59e0b',
    skill: 'İleri — uzun mesafe ve büyük nehir',
    steps: [
      'Sweep: geri harekette yay çiz — sol tarafa',
      'D loop oluştur: hat sol tarafta asılı kalır',
      'İleriye güçlü it — 20m+ mesafe mümkün',
      'Salmon ve büyük alabalık için standart teknik',
      'Rüzgara karşı atışta da etkili',
    ],
    tip: 'Çift el: rüzgara karşı + uzun mesafe + büyük sinek için şart.',
  },
];

const SINEK_TIPLERI = [
  { type: 'Kuru Sinek', season: 'Mayıs-Eylül', depth: 'Yüzey', target: 'Alabalık, kefal' },
  { type: 'Nimf', season: 'Yıl boyu', depth: 'Orta-dip', target: 'Alabalık, chub' },
  { type: 'Streamer', season: 'İlkbahar-sonbahar', depth: 'Dip', target: 'Büyük alabalık, levrek' },
  { type: 'Emerger', season: 'Şafak vakti', depth: 'Yüzey altı', target: 'Seçici alabalık' },
];

export default function FlyCastingGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('casts');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020a0f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎣 Sinek Atış Teknikleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Üst atış · rulo · spey — sinek oltası casting</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['casts','Atış Teknikleri'],['flies','Sinek Tipleri']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#060e16', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'casts' && CASTS.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#060e16', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{c.skill}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#060e16', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 TEKNİK</div>
                  {c.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>{i+1}. {s}</div>)}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {c.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'flies' && (
          <div style={{ background: '#060e16', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🪰 Sinek Tipi & Mevsim</div>
            {SINEK_TIPLERI.map((f, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SINEK_TIPLERI.length-1 ? '1px solid #0a1e2e' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#67e8f9' }}>{f.type}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>📅 {f.season}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>📏 {f.depth}</div>
                </div>
                <div style={{ fontSize: 11, color: '#06b6d4', marginTop: 2 }}>🐟 {f.target}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
