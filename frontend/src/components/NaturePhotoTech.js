import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TECHNIQUES = [
  {
    id: 'light', name: 'Işık Kullanımı', icon: '🌅', accent: '#f59e0b',
    desc: 'Doğa fotoğrafının en kritik unsuru',
    tips: [
      'Altın saat: güneş doğuşu/batışından 1 saat — yumuşak sıcak ışık',
      'Mavi saat: gün batımından 20 dk sonra — dramatik tonlar',
      'Bulutlu gün = doğal difüzör — hayvan portresinde ideal',
      'Sert öğlen güneşi: doğrudan hayvan fotoğrafı için olumsuz',
      'Arka ışıkta yaban hayatı: siluet ve tüy detayı eşsiz',
    ],
    settings: 'ISO 100-400 (altın saat), f/5.6-8 (tüm alan netliği), 1/500s+ (hareket)',
    tip: 'Işığı takip et — sabah batı yüze bak, öğleden sonra doğu yüze bak.',
  },
  {
    id: 'birds', name: 'Kuş Fotoğrafçılığı', icon: '🦅', accent: '#22c55e',
    desc: 'Hız ve uzaklık kombinasyonu',
    tips: [
      '400mm+ lens — güvenli mesafeden detay',
      'Autofocus: sürekli takip modu (AI Servo / AF-C)',
      'Patlama modu: saniyede 10+ kare — geçiş anı yakala',
      'Su yüzeyini arka plan kullan — doğal gök yansıması',
      'Sabah sisi: martı ve balıkçıl için dramatik sahne',
    ],
    settings: 'ISO 800-3200, f/5.6, 1/1000-2000s — kanat hareketi dondur',
    tip: 'Kuşun göz hizasına iş ve — üstten çekim natüralist değil, hâkim görünür.',
  },
  {
    id: 'macro', name: 'Makro Böcek & Çiçek', icon: '🦋', accent: '#a78bfa',
    desc: 'Küçük dünyanın büyük dramı',
    tips: [
      'Sabah çiğ: böcekler hareketsiz — makro altın vakit',
      'Tripod zorunlu — 1:1 oranında titreşim görünür',
      'Doğal ışık tercihi — flaş sert gölge yapar',
      'Diyafram f/11-16: yeterli alan derinliği',
      'Arka planı sade tut — pikseli sil, konuyu ön plana çek',
    ],
    settings: 'ISO 200, f/11-16, 1/200s, dedikasyonlu makro lens 100mm',
    tip: 'Çiçeğin aynı yüksekliğine in — gözlem seviyesi fotoğraf her zaman kazanır.',
  },
  {
    id: 'wildlife', name: 'Yaban Hayatı Davranışı', icon: '🦌', accent: '#ef4444',
    desc: 'Davranışı öngör, anı yakala',
    tips: [
      'Hayvanın davranışını öğren — beslenme, uyku, aktif saatler',
      'Önceden konumlan — hayvanın gelmesini bekle',
      'Kıyafet rengi: çevreyle uyumlu, parlak kaçın',
      'Yavaş ve sessiz hareket — koku aşağı tutun',
      'Dolu pil + boş SD kart — kritik an hazırlığı',
    ],
    settings: 'ISO 1600-6400 gündüz ortamı, f/4-5.6, 1/500s+',
    tip: 'En iyi fotoğraflar bekleyenden gelir, kovalayandan değil.',
  },
];

const GEAR = [
  { icon: '📷', item: 'Gövde', detail: 'Tam çerçeve veya APS-C crop — wildlife için hız ve dinamik aralık kritik' },
  { icon: '🔭', item: 'Lens', detail: '100-400mm zoom veya 500mm prime — doğa için uzun odak şart' },
  { icon: '🔧', item: 'Tripod/Monopod', detail: 'Karbon fiber — ağırlık azalır, sürdürülebilir alan kullanımı' },
  { icon: '🎒', item: 'Çanta', detail: 'Lowepro/Think Tank omuz çantası — hızlı erişim, saha dayanımlı' },
  { icon: '💾', item: 'SD Kart', detail: 'UHS-II 300MB/s+ — burst modu için zorunlu hız' },
  { icon: '🔋', item: 'Batarya', detail: 'En az 2 yedek — soğukta kapasite düşer' },
];

export default function NaturePhotoTech() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('techniques');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#0a0a0e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>📸 Doğa Fotoğrafı Teknik</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 teknik · ışık, kuş, makro, yaban hayatı</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['techniques','Teknikler'],['gear','Ekipman']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#12121a', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'techniques' && TECHNIQUES.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#12121a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#12121a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>📋 TEKNIKLER</div>
                  {t.tips.map((tip, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 4 }}>• {tip}</div>)}
                  <div style={{ background: '#1a1a25', borderRadius: 8, padding: '6px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 700, marginBottom: 2 }}>⚙️ AYARLAR</div>
                    <div style={{ fontSize: 11, color: '#d1d5db', fontFamily: 'monospace' }}>{t.settings}</div>
                  </div>
                  <div style={{ background: t.accent + '15', borderRadius: 8, padding: '6px 10px', marginTop: 4 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {t.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'gear' && (
          <div style={{ background: '#12121a', borderRadius: 14, padding: 14, border: '1px solid #f59e0b22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🎒 Doğa Fotoğrafı Ekipmanı</div>
            {GEAR.map((g, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < GEAR.length-1 ? '1px solid #1c1c28' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{g.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fcd34d' }}>{g.item}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{g.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
