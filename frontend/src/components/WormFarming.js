import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'setup', name: 'Solucan Kutusu Kurulumu', icon: '📦', accent: '#22c55e',
    items: [
      { t: 'Kutu seçimi', d: 'Opak plastik veya ahşap. 30x40x20 cm yeterli. Delik açma: hava için.' },
      { t: 'Zemin hazırlama', d: 'Karbonhidrat bazlı: gazetekagidi + toprak + nem. pH 6-7 arası.' },
      { t: 'Tür seçimi', d: 'Kırmızı solucan (Lumbricus) en iyi yem balığı için. Kaçmaz, aktif.' },
      { t: 'Gölge ve nem', d: 'Doğrudan güneş öldürür. Kutu serin ve nemli tutulmalı — ıslatılmış gazete.' },
    ],
  },
  {
    id: 'feeding', name: 'Besleme & Bakım', icon: '🌱', accent: '#f59e0b',
    items: [
      { t: 'Yiyecek', d: 'Sebze kabuğu, kahve telvesi, ekmek. Et, yağ, soğan YASAK — koku yapar.' },
      { t: 'Beslenme sıklığı', d: 'Haftada bir, az miktarda. Yenilmemiş yem küflenir.' },
      { t: 'Popülasyon', d: '50-100 solucan başlangıç için yeterli. 3 ayda iki katına çıkar.' },
      { t: 'Kış koruması', d: 'Gece 5°C\'nin altına inmesin. Odaya al veya köpük sarın.' },
    ],
  },
  {
    id: 'harvest', name: 'Hasat & Kullanım', icon: '🎣', accent: '#06b6d4',
    items: [
      { t: 'Hasat', d: 'Bir gün aç bırak — temizlenir. Karanlıkta yüzeye çıkar, el ile topla.' },
      { t: 'Saklama', d: 'Balık kutusuna toprakla koy. Buzdolabında 1 hafta yaşar.' },
      { t: 'Kanca', d: 'Solucanı uzunlamasına kancaya geçir. 2-3 cm her delik, kıvırma.' },
      { t: 'Vermikompost', d: 'Solucan atığı mükemmel gübre — bahçe için bonus ürün.' },
    ],
  },
];

export default function WormFarming() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪱 Solucan Yetiştirme</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kutu kurulumu · besleme · yem hasadı</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#0c1208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c1208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0e1a0c' : 'none' }}>
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
