import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'basics', name: 'Arıcılık Temelleri', icon: '🐝', accent: '#f59e0b',
    items: [
      { t: 'Kovan türleri', d: 'Langstroth en yaygın. Modern çerçeve sistemi. Bakım kolaylığı.' },
      { t: 'Kraliçe arı', d: 'Koloni kalbi. Yumurtlama görevi. Değiştirilmesi 2 yılda bir.' },
      { t: 'Oğul yakalama', d: 'İlkbahar: kovan bölünür. Yakın ağaçta grup — boş kovana al.' },
      { t: 'Kış hazırlığı', d: 'Kasım: kapı küçült, yiyecek deposu kontrol et. Nem düşman.' },
    ],
  },
  {
    id: 'harvest', name: 'Bal Hasadı', icon: '🍯', accent: '#22c55e',
    items: [
      { t: 'Hasat zamanı', d: 'Haziran-Temmuz: yaz balı. Eylül: çiçek balı son hasat.' },
      { t: 'Kapak kontrolu', d: 'Petek hücreleri kapanmış ve beyaz: bal olgunlaşmış.' },
      { t: 'Santrifüj', d: 'Çerçeveyi santrifüje koy — merkezkaç bal çeker.' },
      { t: 'Süzme', d: 'İnce süzgeç balmumu kalıntısı giderir. 3 gün dinlendirme.' },
    ],
  },
  {
    id: 'doğa', name: 'Arılık Yeri', icon: '🌸', accent: '#a78bfa',
    items: [
      { t: 'Su kaynağı', d: 'Yakın temiz su şart. Arı 2km uzaktan su taşıyamaz.' },
      { t: 'Çiçek çeşitliliği', d: 'Polifloral bal: meyve bahçesi + yabani çiçek mozaiği.' },
      { t: 'Rüzgar koruması', d: 'Kuzey rüzgar soğutur. Kovana güney-batı bakan konuş.' },
      { t: 'Pestisid', d: 'Tarım ilaçlama döneminde kovanı kapat veya taşı.' },
    ],
  },
];

export default function BeeKeeping() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐝 Doğal Arıcılık</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Arıcılık temelleri · bal hasadı · arılık yeri</div>
      </div>

      <div style={{ background: '#100c00', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f59e0b33' }}>
        <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>🐝 ARICILIK</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye dünyanın en önemli bal üreticilerinden. Anadolu arısı endemik ırk — kültürel miras.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#100c00', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100c00', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1a1400' : 'none' }}>
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
