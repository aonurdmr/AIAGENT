import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'site', name: 'Yer Seçimi', icon: '📍', accent: '#22c55e',
    items: [
      { t: 'Düzlük', d: 'Hafif eğimli kuzey-güney (su dreni). Çukurdan kaçın — gece soğuğu birikir.' },
      { t: 'Rüzgar koruması', d: 'Büyük kaya veya çalı yönünde kur — rüzgar ısı kaybının ana nedeni.' },
      { t: 'Su kaynağı', d: 'Su kaynağından 60m uzak — hem LNT, hem sığ sel riski önleme.' },
      { t: 'Ağaç mesafesi', d: 'Ölü dal ve kuru ağaç altına kurma. Rüzgarda düşer.' },
      { t: 'Vadi tabanı', d: 'Sislenir, soğur ve nem toplanır — biraz yukarı tercih et.' },
    ],
  },
  {
    id: 'setup', name: 'Çadır Kurulumu', icon: '⛺', accent: '#60a5fa',
    items: [
      { t: 'Havasız kurma', d: 'Kapıyı rüzgara karşı yönelt. Yağmur kapısı yukarı.' },
      { t: 'Kanca çekme', d: 'Her kancayı 45° açıyla çek. Tarla çivisini tam sok.' },
      { t: 'Toprak tespit', d: 'Yumuşak kum/kar: kanca yerine dalı L şeklinde göm.' },
      { t: 'Nem bariyeri', d: 'Zemin örtüsü (footprint) çadır tabanının ıslanmasını engeller.' },
      { t: 'Havalandırma', d: 'Yoğuşma önleme: iç çadır dış kabuğa değmesin.' },
    ],
  },
  {
    id: 'leave', name: 'LNT — İz Bırakma', icon: '🌿', accent: '#f97316',
    items: [
      { t: 'Renk seç', d: 'Toprak veya çevreyle uyumlu renk. Dikkat çekici kırmızı çadır yanlış.' },
      { t: 'Iz izle', d: 'Kayada veya kumda yürü, bitki topluluğu üstünden değil.' },
      { t: 'Ateş', d: 'Mevcut ateş halkasını kullan — yoksa küçük fener ocağı tercih et.' },
      { t: 'Atık', d: 'Her şey torbayla çık. Gömülü atık 1-30 yılda parçalanır.' },
      { t: 'Çiçek ve bitki', d: 'Hiçbir şeyi alma — makro fotoğraf, daha iyi bir anı.' },
    ],
  },
];

export default function WildCamping() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#040a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏕️ Vahşi Doğa Kampı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yer seçimi · çadır kurulumu · LNT prensipleri</div>
      </div>

      <div style={{ background: '#081008', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🏕️ VAHSİ KAMP</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye orman kanununda vahşi kamp izin gerektirebilir. Milli park ve koruma alanlarında yasak kontrol et.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#081008', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#081008', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0e1a0e' : 'none' }}>
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
