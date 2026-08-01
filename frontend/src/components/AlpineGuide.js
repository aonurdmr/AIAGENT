import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'zones', name: 'İklim Kuşakları', icon: '🏔️', accent: '#60a5fa',
    desc: 'Yükseklikle değişen bitki ve fauna',
    items: [
      { t: '0-800m (Ova)', d: 'Meşe ve karışık orman. Yaban domuzu, tilki, karaca. Keklik ve bıldırcın.' },
      { t: '800-1500m (Yayla)', d: 'Çam ve göknar ormanı. Geyik, alageyik, yaban domuzu. Alabalık dereleri.' },
      { t: '1500-2000m (Alt Alp)', d: 'Çalılık ve fundalık mozaiği. Dağ keçisi başlar. Hava oksijeni yüzde 80.' },
      { t: '2000-2800m (Alp)', d: 'Alp çayırı. Dağ keçisi ve yaban koyunu. Karakartal yuvalama alanı.' },
      { t: '2800m+ (Subalp)', d: 'Kayalık. Dağ Keçisi zirve yakını. Az bitki, yoğun UV, kar geç erir.' },
    ],
  },
  {
    id: 'wildlife', name: 'Yüksek Dağ Yaban Hayatı', icon: '🐐', accent: '#22c55e',
    items: [
      { t: 'Dağ Keçisi (Bezoar)', d: 'Türkiye endemik. Toroslar ve Doğu Anadolu kayalık. Sabah kayalıkta.' },
      { t: 'Yaban Koyunu (Urial)', d: 'Doğu Türkiye. Kayalık yamaç. Sürü halinde, çok çekingen.' },
      { t: 'Karakartal', d: 'Alp ve subalp. 2m kanat, planör. Yuva kayalıkta, çok hassas.' },
      { t: 'Akbaba Kuşları', d: 'Kızıl ve Kara akbaba yüksek topografyada termal arar.' },
      { t: 'Boz Ayı', d: 'Doğu Anadolu dağları. Kaçınır ama karşılaşılabilir — gürültü yap.' },
    ],
  },
  {
    id: 'safety', name: 'Yüksek Dağ Güvenliği', icon: '⛑️', accent: '#f97316',
    items: [
      { t: 'Yükseklik hastalığı', d: '2500m üstü baş ağrısı, bulantı: inen inen — erken iniş şart.' },
      { t: 'AMS belirtisi', d: 'AMS (akut dağ hastalığı): baş ağrısı + bulantı + halsizlik.' },
      { t: 'İniş kuralı', d: 'İyileşmeden yükselme yasak — 500m in, iyileşince çık.' },
      { t: 'Aklimizasyon', d: '1500m üstü her gün 300m çık, gece düşük kal (klimize et).' },
      { t: 'UV korunması', d: '2000m üstü UV 2 kat: SPF50+ ve UV gözlük zorunlu.' },
      { t: 'Isı kaybı', d: 'Rüzgar soğutma 2000m üstü kritik — rüzgarsız katman şart.' },
    ],
  },
  {
    id: 'gear', name: 'Alp Ekipmanı', icon: '🎒', accent: '#a78bfa',
    items: [
      { t: 'Dağ yürüyüş botu', d: 'Bilek destekli, sert taban, kayaya tutunur. Termal iç astar.' },
      { t: 'Trekking sopaları', d: 'İniş yükünü yüzde 25 azaltır. Kardaki dengeyi artırır.' },
      { t: 'Kışlık çadır', d: 'Dört mevsim 2000m üstü için: rüzgar testi 80 km/h.' },
      { t: 'Islak soğuk koruma', d: 'Merino base layer: ıslanınca ısıtır, sentetikten üstün.' },
      { t: 'Harita ve pusula', d: 'GPS şarjı biter: kağıt harita ve pusula yedek zorunlu.' },
      { t: 'Acil kit', d: 'Termal battaniye, elastik sarg, hipotermi tulumu, ilaç — hepsini taşı.' },
    ],
  },
];

export default function AlpineGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#06080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏔️ Yüksek Dağ Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İklim kuşakları · alp yaban hayatı · güvenlik · ekipman</div>
      </div>

      <div style={{ background: '#0a0e18', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #60a5fa33' }}>
        <div style={{ fontSize: 11, color: '#60a5fa', fontWeight: 700 }}>⛑️ ALTIN KURAL</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Dağ hava durumu öngörülmez. Plan A ile birlikte Plan B ve C hazır olsun. Ego bırak, dönme cesaretini kullan.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0a0e18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    {s.desc && <div style={{ fontSize: 11, color: '#6b7280' }}>{s.desc}</div>}
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a0e18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #10121e' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{item.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
