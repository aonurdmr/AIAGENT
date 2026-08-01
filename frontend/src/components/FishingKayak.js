import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'setup', name: 'Kayak Kurulumu', icon: '🛶', accent: '#06b6d4',
    items: [
      { t: 'Kayak seçimi', d: 'Sit-on-top: balıkçılık için ideal. Geniş gövde = denge. 3-3.5m uzunluk.' },
      { t: 'Rod holder', d: 'Arka ve yan rod tutucu. Aktif sürüş sırasında ellerini serbest bırak.' },
      { t: 'Sonar montajı', d: 'Küçük sonar kayağa adapte edilir. Pil kutu su geçirmez olmalı.' },
      { t: 'Can yeleği', d: 'Kayakçıya özel slim fit can yeleği. Yayak hareket kısıtlamamalı.' },
    ],
  },
  {
    id: 'technique', name: 'Kayakta Balıkçılık', icon: '🎣', accent: '#22c55e',
    items: [
      { t: 'Ancore', d: 'Dip ankoru veya sürüklenme çapası (drift sock). Akıntıda sabit kal.' },
      { t: 'Atış açısı', d: 'Kayak yan hareketli. Ata, küreği sabitle, sonra kayıkla döndür — geniş açı.' },
      { t: 'Büyük balık', d: 'Güçlü balık kayağı çeker — exciting ama dikkatli. Fren uygula, yorultur.' },
      { t: 'Puro dönmesi', d: 'Yanına kayık gelmeden balığı kancadan çıkarma. Dikkatli denge.' },
    ],
  },
  {
    id: 'safety', name: 'Güvenlik', icon: '⛑️', accent: '#f97316',
    items: [
      { t: 'VHF telsiz', d: 'Denizde VHF kanal 16 açık tut. Cep telefonu suda işe yaramaz.' },
      { t: 'Hava durumu', d: 'Rüzgar 3 Beaufort üstü kayak çıkartma: DUR. Akıntıya karşı gitme.' },
      { t: 'Filo', d: 'Yalnız kayakla denize çıkma. Minimum 2 kayak, birbirini görmeli.' },
      { t: 'Kurtarma', d: 'Su girişi: kayağa dön, bacaklar içeri, süz. Pratik yap — denizde değil.' },
    ],
  },
];

export default function FishingKayak() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🛶 Kayaktan Balıkçılık</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kayak kurulumu · teknikler · güvenlik</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#04121e', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#04121e', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081c2c' : 'none' }}>
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
