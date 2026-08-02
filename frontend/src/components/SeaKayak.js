import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'gear', name: 'Ekipman', icon: '🛶', accent: '#06b6d4',
    items: [
      { t: 'Sea kayak', d: 'Uzun (5-6m), dar, hızlı. Açık deniz ve uzun mesafe için.' },
      { t: 'Kürek', d: 'Çift yüzlü, feather açısı ayarlı. 210-230cm. Hafif karbon.' },
      { t: 'Deniz yelegi (PFD)', d: 'Onaylı, kırmızı, reflektif. Asla çıkarma — kapanma riski.' },
      { t: 'İletişim', d: 'VHF telsiz su geçirmez kılıf ile. Kanal 16 acil.' },
      { t: 'Bilge pompası', d: 'Kokpit su doldurursa. Sünger yedek.' },
    ],
  },
  {
    id: 'skills', name: 'Teknikler', icon: '🌊', accent: '#22c55e',
    items: [
      { t: 'Eskimo rulosu', d: 'Devrilme kurtarması. Temel beceri: antrenman havuzunda önce.' },
      { t: 'Wet exit', d: 'Kontrolsüz çıkış. Paniksiz — nefes tut, kayak bel bağı aç.' },
      { t: 'Kürek tekniği', d: 'Gövde rotasyonu — kol değil gövde güc. Omuz sakatlanması önle.' },
      { t: 'Dalgalanma', d: 'Dalganın arkasından git. Önünden değil — sürükleme riski.' },
      { t: 'Rüzgar yönetimi', d: 'Yan rüzgar dönüş etkisi yapar. Küreği yatay tut.' },
    ],
  },
  {
    id: 'safety', name: 'Güvenlik', icon: '⛑️', accent: '#f97316',
    items: [
      { t: 'Rota planı', d: 'Başlamadan önce biri bilsin: nereye, ne zaman, ne zaman dön.' },
      { t: 'Hava', d: 'Rüzgar 4+ Beaufort: başlama. Deniz durumu saatlik değişir.' },
      { t: 'Tek kayak', d: 'Asla yalnız çıkma açık denize. Minimum 2 kayak.' },
      { t: 'Sahil bandı', d: 'Kıyı bandında kal — kayalığa karşı tampon oluştur.' },
      { t: 'Hipotermiyere karşı', d: 'Drysuit: su sicakligi 15C altı için zorunlu.' },
    ],
  },
];

export default function SeaKayak() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🛶 Deniz Kayangu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman · teknikler · güvenlik</div>
      </div>

      <div style={{ background: '#030e18', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>🛶 DENİZ KAYANGU</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Deniz kayangu yanlış hava koşullarında tehlikelidir. Mutlaka eğitim al ve deneyimli ile başla.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#030e18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#030e18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #06121e' : 'none' }}>
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
