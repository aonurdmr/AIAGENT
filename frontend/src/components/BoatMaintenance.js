import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'engine', name: 'Motor Bakımı', icon: '⚙️', accent: '#f97316',
    items: [
      { t: 'Yağ değişimi', d: 'Her sezon veya 100 saat. 4 zamanlı dıştan takma için.' },
      { t: 'Yakıt filtresi', d: 'Her 2 sezonda değiştir. Kirli filtre motor durmasına neden.' },
      { t: 'Pervanesi', d: 'Hasar kontrolu her av öncesi. Çarpma, perde veya göçük.' },
      { t: 'Soğutma sistemi', d: 'Termostat ve su pompası 3 yılda kontrol. Aşırı ısınma stop.' },
      { t: 'Kış depolama', d: 'Yakıt boşalt veya stabilizatör. Motor tuzlu su ile yıka.' },
    ],
  },
  {
    id: 'hull', name: 'Tekne Gövdesi', icon: '🛥️', accent: '#06b6d4',
    items: [
      { t: 'Fiberglas', d: 'Oksidasyonu önle: wax ve polish yılda 2 kez.' },
      { t: 'Alüminyum', d: 'Galvanik korozyon riski: farklı metal teması önle.' },
      { t: 'Anti-fouling', d: 'Deniz altı boya her sezon. Alg ve midye tutunmayı engeller.' },
      { t: 'Bağlantı noktaları', d: 'Paslanmaz vida ve somun kontrolu. Tuzlu su paslandırır.' },
    ],
  },
  {
    id: 'safety', name: 'Güvenlik Ekipmanı', icon: '⛑️', accent: '#22c55e',
    items: [
      { t: 'Can yeleği sayımı', d: 'Her kişi için onaylı can yeleği. Raf ömrü kontrolu.' },
      { t: 'Yangın söndürücü', d: 'Her 2 yılda dolum veya değişim. Motora erişilebilir yer.' },
      { t: 'Sinyal ekipmanı', d: 'Firar fişeği tarihi kontrol. VHF batarya şarj.' },
      { t: 'Dümeni', d: 'Hidrolik direksiyon yağ seviyesi ve sızıntı kontrolu.' },
    ],
  },
];

export default function BoatMaintenance() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🛥️ Tekne Bakımı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Motor · gövde · güvenlik ekipmanı</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#04101a', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#04101a', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081520' : 'none' }}>
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
