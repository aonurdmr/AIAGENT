import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'shelter', name: 'Kış Barınağı', icon: '⛺', accent: '#60a5fa',
    items: [
      { t: 'Dört mevsim çadır', d: 'Rüzgar testi 80+ km/h. Çift katlı, aerodinamik. Kar yükü dayanıklı.' },
      { t: 'Kar bloğu duvarı', d: 'Çadır etrafına kar bloku diz: rüzgar keser, ısı hapseder.' },
      { t: 'Çukur kamp', d: 'Kar içinde çukur kazan: rüzgarın altında kalırsın — +5-10°C avantaj.' },
      { t: 'Quinzhee', d: 'Kar yığını içi oyularak yapılan buz barınak. Kar bağlaşınca kaz.' },
      { t: 'Zemin yalıtımı', d: 'Kar soğuğu alttan girer. 5cm+ uyku yastığı zorunlu.' },
    ],
  },
  {
    id: 'warmth', name: 'Isı Yönetimi', icon: '🔥', accent: '#f97316',
    items: [
      { t: 'Katman sistemi', d: 'Nem atan base · ısı tutan mid · rüzgar-yağmur dış katman.' },
      { t: 'Ayak', d: 'Kar botu + termal iç çorap. Çorap nemlenince değiştir.' },
      { t: 'El ve baş', d: 'Isı yüzde 40 baştan kaybolur. Balaklava şart. Eldivenler yedek.' },
      { t: 'Uyku tulumu', d: '-20°C toleranslı. İçinde ıslak eşya — nefes nem tutar.' },
      { t: 'Kimyasal ısıtıcı', d: 'El ısıtıcı: ekipman kutusu değil, ek korunma.' },
    ],
  },
  {
    id: 'safety', name: 'Güvenlik', icon: '⛑️', accent: '#22c55e',
    items: [
      { t: 'Çığ riski', d: '35-45° eğim: yüksek risk. Çığ güvenlik kursu zorunlu.' },
      { t: 'Kar körlüğü', d: 'UV gözlük olmadan kar yüzeyinde refleksiyon 6+ saatte zarar.' },
      { t: 'Hipotermi', d: 'Titreme durdu, uyku basıyor = ciddi tehlike. Hemen ısıt.' },
      { t: 'Ayak donu', d: 'Ağrı sonrası uyuşma = donma başlangıcı. Kuru ısı uygu.' },
      { t: 'Rota', d: 'Kar fırtınasında iz kaybolur. GPS koordinatları önceden al.' },
    ],
  },
];

export default function WinterCamp() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#04090f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>❄️ Kış Kampı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Barınak · ısı yönetimi · güvenlik</div>
      </div>

      <div style={{ background: '#060e18', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #60a5fa33' }}>
        <div style={{ fontSize: 11, color: '#60a5fa', fontWeight: 700 }}>❄️ KIS KAMPI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Kış kampı donanım ve bilgi olmadan hayati tehlike oluşturur. İlk deneyimi tecrübeli rehberle yap.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#060e18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#060e18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0a1422' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{item.t}</div>
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
