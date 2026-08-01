import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'approach', name: 'Hayvana Yaklaşma', icon: '🐾', accent: '#f59e0b',
    desc: 'Kaçırmadan 20m içine girme',
    tips: [
      'Rüzgar sana karşı — kokunun hayvan tarafına gitmesi önlenir',
      'Yavaş hareket — 1 adım, dur, bekle — 1 adım',
      'Hayvanın görüş kenarına yaklaş — frontal değil',
      'Doğal engel kullan: taş, ağaç, çalı',
      '20m altı: fotoğraf mümkün. 10m: nadir fırsat.',
    ],
    gear: 'Uzun lens (400mm+) hayvan stresi yaratmaz',
  },
  {
    id: 'lighting', name: 'Işık & Zaman', icon: '🌅', accent: '#ef4444',
    desc: 'Altın saat fotoğrafçılığı',
    tips: [
      'Altın saat: gündoğumu + 1 saat, günbatımı - 1 saat',
      'Yan ışık: hacim ve doku — saçtüy detayı ortaya çıkar',
      'Arka ışık: rim light efekti — siluet ve halo',
      'Bulutlu gün: yumuşak ışık — gözler parlak',
      'Gece: ISO 3200+ · f/2.8 · şalter 1/500s+',
    ],
    gear: 'Tripod gece ve alacakaranlıkta şart',
  },
  {
    id: 'settings', name: 'Kamera Ayarları', icon: '📷', accent: '#22c55e',
    desc: 'Hareket dondurmak için doğru ayar',
    tips: [
      'Enstantane: kuş uçuşu 1/2000s · yürüyen hayvan 1/500s',
      'ISO: mümkün düşük — yüksek ISO gürültü getirir',
      'Diyafram: f/4-f/6.3 — background bulanıklaşır',
      'Sürekli AF: hayvan takibi için zorunlu',
      'RAW çek — gözün beyaz dengesi sonra ayarlanır',
    ],
    gear: '70-200mm f/2.8 veya 100-400mm f/4.5 — iki vazgeçilmez',
  },
  {
    id: 'ethics', name: 'Etik Fotoğrafçılık', icon: '🌿', accent: '#a78bfa',
    desc: 'Hayvana zarar vermeden çekim',
    tips: [
      'Hayvanı strese sokma — kaçmaya başlarsa geri çekil',
      'Yuva ve yavrulara yaklaşma — anne terk eder',
      'Flash hayvan gözüne zarar verir — gece çekimde dikkat',
      'Yemleme ile çekme — doğal davranışı değiştirir',
      'Çekime odaklanırken çevreye dikkat — tehlike anında uyar',
    ],
    gear: 'Gizlenme çadırı (hide) — hayvanı sıfır stresle yaklaşma',
  },
];

export default function WildlifePhoto() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060808', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📷 Yaban Hayatı Fotoğrafçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yaklaşma · ışık · kamera ayarı · etik</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#0e1010', borderRadius: open ? '12px 12px 0 0' : 12,
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
                <div style={{ background: '#0e1010', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 TEKNİK</div>
                  {t.tips.map((tip, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {tip}</div>)}
                  <div style={{ fontSize: 12, marginTop: 6 }}><span style={{ color: '#9ca3af', fontWeight: 600 }}>⚙️ Ekipman: </span><span style={{ color: '#d1d5db' }}>{t.gear}</span></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
