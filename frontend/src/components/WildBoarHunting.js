import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'behavior', name: 'Davranış ve Aktivite', icon: '🐗', accent: '#f97316',
    items: [
      { t: 'Günlük ritim', d: 'Alacakaranlık ve şafak zirvesi. Öğle dinlenmesi. Gece gezisi.' },
      { t: 'Yiyecek arama', d: 'Meşe palamut, kök, kurtçuk. Toprak eşeler — iz bırakır.' },
      { t: 'Çamur banyosu', d: 'Asalak korunma. Islak toprak kaba yüzey — bölgede iz bırakır.' },
      { t: 'Sosyal yapı', d: 'Dişi ve yavrular sürüde. Erkek yalnız veya küçük grup.' },
      { t: 'Uyarı sesi', d: 'Tehlike: huff sesi. Kaçma anında yavru cırtı sesi.' },
    ],
  },
  {
    id: 'tactics', name: 'Av Taktikleri', icon: '🎯', accent: '#22c55e',
    items: [
      { t: 'Eşeleme yeri avı', d: 'Taze eşeleme noktasında bekle — gece geri döner.' },
      { t: 'Mısır sahası kenarı', d: 'Mısır ve buğday tarlası kenarı yemlenme sahası.' },
      { t: 'Gürültülü avlak', d: 'Koordineli sürme: baskı grubu-pusu grubu.' },
      { t: 'Yem noktası', d: 'Mısır yığını — Türkiye mevzuatı kontrol et, bölgeye göre değişir.' },
    ],
  },
  {
    id: 'safety', name: 'Güvenlik', icon: '⛑️', accent: '#60a5fa',
    items: [
      { t: 'Yaralı domuz', d: 'Köşeye sıkışmış yaralı domuz tehlikelidir. Yaklaşma.' },
      { t: 'Dişi ve yavrular', d: 'Yavrusu olan dişi saldırgan. Güvenli mesafe koru.' },
      { t: 'Sürme avı', d: 'Haberleşme şart. Ateşleme alanı önceden belirlenmeli.' },
      { t: 'Atış açısı', d: 'Yana ve yukarı ateşleme yasak. Güvenli hedef arkası zorunlu.' },
    ],
  },
];

export default function WildBoarHunting() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐗 Yaban Domuzu Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Davranış · taktikler · güvenlik</div>
      </div>

      <div style={{ background: '#100800', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #f9730633' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>🐗 YABAN DOMUZU</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye'de yaban domuzu avı lisansı ve bölge izni gerektirir. Zararlandırma iznini yerel tarım müdürlüğünden al.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#100800', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#100800', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1c1000' : 'none' }}>
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
