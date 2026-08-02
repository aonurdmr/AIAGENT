import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'species', name: 'Türler & Habitat', icon: '🐟', accent: '#06b6d4',
    items: [
      { t: 'Orkinos (Thunnus thynnus)', d: 'Devasa göçmen balık. Akdeniz\'de yaz, Karadeniz\'de ilkbahar. 200-400 kg.' },
      { t: 'Torik (Thunnus alalunga)', d: 'Küçük tuna türü. Ege ve Akdeniz. Ticari ve sportif değer.' },
      { t: 'Palamut (Sarda sarda)', d: 'Hızlı, okul halinde. İstanbul Bogazı Ekim-Kasım patlaması.' },
      { t: 'Derinlik', d: 'Tuna yüzeyden 100m derinliğe kadar. Termoklin altı tercih eder.' },
    ],
  },
  {
    id: 'methods', name: 'Avlanma Yöntemleri', icon: '🎣', accent: '#3b82f6',
    items: [
      { t: 'Troll yemi', d: 'Renkli suni yem veya gerçek balık. 6-12 knot hız. Uzun olta 30-50m.' },
      { t: 'Canlı yem', d: 'Hamsi veya sardalye: denize bırak, tuna koşar. Chum (kıyılmış yem) çeker.' },
      { t: 'Jigging', d: 'Ağır metal jig: 100-300g. Dikey jig derin su palamutunda etkili.' },
      { t: 'Donanım', d: 'En az 80lb test. Büyük makaraya 400m+ 80lb PE misina. Güçlü kanca.' },
    ],
  },
  {
    id: 'tips', name: 'Av Teknikleri', icon: '🌊', accent: '#a78bfa',
    items: [
      { t: 'Kuş takibi', d: 'Martılar üstte dönüyorsa, alta bakın. Tuna okul sürer, kuşlar dalışa girer.' },
      { t: 'Termokline', d: 'Su sıcaklık farkı katmanı — tuna bu sınırda beslenir. Sonar kullan.' },
      { t: 'Kıyı vs Açık deniz', d: 'Palamut: bogazlar, koylar. Orkinos: açık deniz, 20+ mil.' },
      { t: 'Mevzuat', d: 'Orkinos kotaları var — lisans ve kota kontrol et. Yasal av miktarını aşma.' },
    ],
  },
];

export default function TunaGuide() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c18', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Orkinos & Palamut Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · troll · jigging · açık deniz</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#04121e', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#04121e', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081c2e' : 'none' }}>
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
