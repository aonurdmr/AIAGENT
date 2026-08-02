import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'core', name: 'Avcılık Etiği Temelleri', icon: '⚖️', accent: '#f97316',
    items: [
      { t: 'Fair Chase', d: 'Hayvanın kaçma şansı olmalı. Avantajsız avlanma sportif değil.' },
      { t: 'Hızlı öldürme', d: 'Tek atışla temiz ölüm hedefi — acı çektirme kabul edilemez.' },
      { t: 'Kota ve limit', d: 'Kota koyulmuşsa sebep var. Limiti aşma, başkasını da caydır.' },
      { t: 'Habitat saygısı', d: 'Av sahası önümüzdeki nesle bırakılmalı. Tahrip etme.' },
      { t: 'Kullanma', d: 'Avlanan hayvanın tamamını kullan — et, deri, kemik. Çöp olmaz.' },
    ],
  },
  {
    id: 'social', name: 'Toplumsal Sorumluluk', icon: '🤝', accent: '#22c55e',
    items: [
      { t: 'Kaçak avlanmaya dur', d: 'Kaçak avcı gördüğünde sessiz kalma — ihbar et.' },
      { t: 'Yeni avcılara rehberlik', d: 'Tecrübeli avcının görevi doğru etiği aktarmak.' },
      { t: 'Tarla izni', d: 'Özel mülkte izin al — yasal ve etik yükümlülük.' },
      { t: 'Halkla ilişkiler', d: 'Avcılık imajı hepimize aittir. Negatif davranıştan kaçın.' },
    ],
  },
  {
    id: 'conservation', name: 'Koruma Katkısı', icon: '🌿', accent: '#60a5fa',
    items: [
      { t: 'Habitat geliştirme', d: 'Av sahaların bakımına katıl — yaban hayatı için.' },
      { t: 'Veri katkısı', d: 'Av kaydını iletmek, popülasyon takibine katkı sağlar.' },
      { t: 'Kaçak avcılık fonu', d: 'Lisans parası koruma projelerine gider — ödemeyi es geçme.' },
      { t: 'Yabancı tür', d: 'İstilacı tür görürsen bildir. Kontrollü avcılık biyodiversiteyi korur.' },
    ],
  },
];

export default function HuntingEthicsAdv() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>⚖️ Avcılık Etiği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Fair chase · toplumsal sorumluluk · koruma</div>
      </div>

      <div style={{ background: '#0a1008', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f9730633' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>⚖️ ETİK AVCI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Avcılık bir ayrıcalık, hak değil. Her avcı gelecek nesillere bu ayrıcalığı bırakmakla yükümlüdür.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#0a1008', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1008', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #141e12' : 'none' }}>
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
