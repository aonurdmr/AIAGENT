import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TIDES = [
  {
    id: 'types', name: 'Gelgit Tipleri', icon: '🌊', accent: '#06b6d4',
    desc: 'Yükselen ve alçalan su — balık aktivitesi',
    details: [
      'Yüksek gelgit (High tide): su doluyor — balık sığ alanlara girer',
      'Alçak gelgit (Low tide): su çekiliyor — kayalık ve dip açılır',
      'Yükselen su (Flood): balık beslenme modunda — en iyi pencere',
      'Alçalan su (Ebb): besin sürüklenir — predatör aktif',
      'Durgun su (Slack): hareket yok — aktivite en az',
    ],
    tip: 'Yükselen su + şafak = deniz balıkçısının altın formülü.',
  },
  {
    id: 'fishing', name: 'Gelgit & Balık', icon: '🎣', accent: '#3b82f6',
    desc: 'Hangi gelgit fazında ne tutulur',
    details: [
      'Levrek: yükselen suda kayalık ve kıyı yakını — yem akıntıda',
      'Çipura: yüksek gelgit sonrası düşerken — dip kayalık',
      'İstavrit sürüsü: akıntıda besin takibi — yükselen su',
      'Kefal: gelgit havuzlarında — alçak su + güneş',
      'Kalamar: gece yüksek gelgit — ışık + yüzey',
    ],
    tip: 'Yerel gelgit tablosunu indir — Türkiye için DHMİ uygulaması.',
  },
  {
    id: 'reading', name: 'Gelgit Okuma', icon: '📊', accent: '#a78bfa',
    desc: 'Tabloyu ve işaretleri anlama',
    details: [
      'MHWS: ortalama yüksek su — standart referans',
      'Chart datum: haritada sıfır noktası — en alçak su',
      'Spring tide: dolunay ve yeni ayda max fark — güçlü akıntı',
      'Neap tide: ilk ve son dördün — minimum fark, sakin akıntı',
      'Saatlik tablo: her 6 saatte bir tam gelgit değişimi',
    ],
    tip: 'Spring tide: en güçlü akıntı = en çok besin taşıma = en iyi av.',
  },
];

const SPOTS = [
  { type: 'Kayalık kıyı', best: 'Yükselen su', reason: 'Kayaların üstü sular — balık giriyor' },
  { type: 'Kumlu plaj', best: 'Alçalan su', reason: 'Yengeç ve solucan açılır' },
  { type: 'Nehir ağzı', best: 'Yükselen su', reason: 'Tuzlu-tatlı buluşması aktif' },
  { type: 'Körfez & koy', best: 'Yükselen + zirve', reason: 'Kapalı alan doluyor, balık kapılı' },
];

export default function TideGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tides');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Gelgit Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Gelgit tipleri · balık aktivitesi · en iyi spot seçimi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tides','Gelgit'],['spots','Spot Seçimi']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#060e18', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tides' && TIDES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#060e18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#060e18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 DETAY</div>
                  {t.details.map((d, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {d}</div>)}
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'spots' && (
          <div style={{ background: '#060e18', borderRadius: 14, padding: 14, border: '1px solid #06b6d422' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>📍 Spot Bazlı Gelgit Stratejisi</div>
            {SPOTS.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SPOTS.length-1 ? '1px solid #0a1e2e' : 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#67e8f9', marginBottom: 2 }}>{s.type}</div>
                <div style={{ fontSize: 12, color: '#06b6d4', marginBottom: 2 }}>⏰ En iyi: {s.best}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.reason}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
