import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AMMO = [
  {
    id: 'shotgun', name: 'Av Tüfeği Mermileri', icon: '🔴', accent: '#ef4444',
    calibers: [
      { cal: '12 Kalibre', use: 'En yaygın — keklik, domuz, su kuşu', shot: 'Saçma #4-#7 küçük av · #00 buck domuz' },
      { cal: '20 Kalibre', use: 'Hafif, az geri tepme — bıldırcın, küçük av', shot: 'Saçma #5-#8 — kısa menzil' },
      { cal: '.410', use: 'Başlangıç · küçük av · çok kısa menzil', shot: 'Saçma #6-#8 — 30m max' },
    ],
    tip: 'Saçma büyüdükçe az pellet ama daha güçlü — küçük av için küçük saçma.',
  },
  {
    id: 'rifle', name: 'Yarı-Otomatik & Tek Atış', icon: '🟡', accent: '#f59e0b',
    calibers: [
      { cal: '.243 Win', use: 'Karaca ve orta av — düz atış, az geri tepme', shot: '100m hassasiyet — başlangıç mermi' },
      { cal: '7mm Rem Mag', use: 'Geyik ve büyük av — uzun menzil', shot: '200-300m etkin mesafe' },
      { cal: '.308 Win', use: 'Çok yönlü — domuz ve geyik', shot: 'Güvenilir, kolay bulunur' },
      { cal: '30-06', use: 'Güçlü — büyük av, dağ keçisi', shot: 'Derin penetrasyon, ağır hayvan' },
    ],
    tip: 'Mermi seçimi hayvanın büyüklüğüne göre — küçük kalibrede büyük av acımasız.',
  },
  {
    id: 'legal', name: 'Yasal Çerçeve', icon: '⚖️', accent: '#a78bfa',
    calibers: [
      { cal: 'Ruhsat zorunlu', use: 'Her mermi türü için silah ruhsatı şart', shot: 'İl Emniyet tarafından verilir' },
      { cal: 'Saçma kurşun yasak', use: 'Bazı sulak alanlarda kurşun saçma yasak', shot: 'Çelik saçma kullan' },
      { cal: 'Mermi limiti', use: 'Tüfekte şarjör kapasitesi kısıtlaması var', shot: 'Av tüfeği max 3 atış şarjör' },
      { cal: 'Nakil kuralı', use: 'Araçta ateşli silah ayrı ve kilitli taşınır', shot: 'Mermi ayrı muhafaza' },
    ],
    tip: 'Av mermi alımı kimlik + ruhsat ibrazıyla yapılır — kayıt tutulur.',
  },
];

export default function AmmunitionGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080508', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎯 Mermi Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Av tüfeği · tüfek kalibre · yasal çerçeve</div>
      </div>

      <div style={{ background: '#140408', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #ef444433' }}>
        <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700 }}>⚖️ YASAL UYARI</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Ateşli silah ve mermi kullanımı yasal düzenlemelere tabidir. Ruhsatsız bulundurmak suçtur. Daima güncel mevzuatı kontrol et.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {AMMO.map(a => {
          const open = sel === a.id;
          return (
            <div key={a.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : a.id)} style={{
                background: '#0e0810', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${a.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e0810', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${a.accent}33`, borderTop: 'none' }}>
                  {a.calibers.map((c, i) => (
                    <div key={i} style={{ marginTop: 10, padding: '8px 10px', background: a.accent + '10', borderRadius: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: a.accent }}>{c.cal}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{c.use}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>📌 {c.shot}</div>
                    </div>
                  ))}
                  <div style={{ background: a.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 10 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {a.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
