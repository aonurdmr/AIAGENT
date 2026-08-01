import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  {
    id: 'compass', name: 'Pusula Kullanımı', icon: '🧭', accent: '#f59e0b',
    items: [
      { t: 'Kuzey bulma', d: 'Manyetik kuzey ile gerçek kuzey farklı. Türkiye\'de sapma 3-5 derece doğu.' },
      { t: 'Resim alma', d: 'Haritayı kuzeyine döndür, pusulayla hedefi al, 3 resim kesişimi = nokta.' },
      { t: 'Arazi uyumu', d: 'Tepe, vadi, dere, yol — haritadaki şekle bak, arazide eşleştir.' },
      { t: 'Pusula kalibrasyonu', d: 'Metal ve elektronik cihazlardan 30cm uzak tut. Yanlış sonuç verir.' },
    ],
  },
  {
    id: 'topo', name: 'Topografik Harita', icon: '🗺️', accent: '#3b82f6',
    items: [
      { t: 'Eş yükselti eğrileri', d: 'Birbirine yakın çizgiler = dik eğim. Geniş aralık = yatay arazi.' },
      { t: 'Ölçek', d: '1:25.000 = her cm = 250m gerçek mesafe. Trekking için ideal ölçek.' },
      { t: 'Su unsurları', d: 'Mavi çizgiler: dere ve nehirler. V şekli: vadi (sivri uç yukarı = tepe). ' },
      { t: 'Renk kodu', d: 'Yeşil: ağaçlık. Beyaz: açık arazi. Kahve: arazi şekli. Mavi: su.' },
    ],
  },
  {
    id: 'natural', name: 'Doğal Yön Bulma', icon: '⭐', accent: '#a78bfa',
    items: [
      { t: 'Güneş kadranı', d: 'Çubuğu dik dik. Gölge ucu + 15dk sonra ikinci nokta. Bisektör = güney.' },
      { t: 'Kutup yıldızı', d: 'Büyük Ayı sonundaki 2 yıldızı 5x uzat. Kutup Yıldızı = kuzey.' },
      { t: 'Yosun ve ağaç', d: 'Kuzey yüzü daha yosunlu. Ağaç büyümesi güneyde daha yoğun.' },
      { t: 'Akıntı yönü', d: 'Dağlarda su genellikle kuzeyden güneye akar — ama her zaman değil.' },
    ],
  },
];

export default function LandNavigation() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧭 Arazi Navigasyonu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Pusula · topografik harita · doğal yön bulma</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map(t => {
          const open = sel === t.id;
          return (
            <div key={t.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : t.id)} style={{
                background: '#0e1208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${t.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{t.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e1208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${t.accent}33`, borderTop: 'none' }}>
                  {t.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #141a0e' : 'none' }}>
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
