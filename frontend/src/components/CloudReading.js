import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CLOUDS = [
  { name: 'Kümülüs', d: 'Yüksek, kabarık beyaz bulut. İyi hava işareti. Koyulaşırsa yağmur yakın.' },
  { name: 'Kümülonimbus', d: 'Dev kabarık fırtına bulutu. Defalarca çevrilmiş kule — hemen sığınak bul.' },
  { name: 'Sirüs', d: 'Tüy gibi ince, yüksek. 24-48 saat içinde hava değişimi sinyali.' },
  { name: 'Stratus', d: 'Alçak, gri tabaka — çiseleme veya sis. Görüş düşer, serinler.' },
  { name: 'Altokümülüs', d: 'Dalgalı orta katman. "Koyun bulutu" — nemli hava, fırtına gelebilir.' },
];

const SIGNS = [
  { icon: '🌅', t: 'Kırmızı akşam', d: 'Akşam kırmızı gökyüzü: ertesi gün güzel hava. Sabah kırmızı: dikkat, fırtına.' },
  { icon: '💨', t: 'Rüzgar yönü', d: 'Batıdan gelen rüzgar temiz hava. Güneyden gelen ısı ve yağmur getirir.' },
  { icon: '🌡️', t: 'Barometre', d: 'Basınç düşüyorsa: kötü hava geliyor. Yükseliyorsa: hava açılıyor.' },
  { icon: '🐦', t: 'Kuş davranışı', d: 'Kuşlar alçak uçuyorsa yağmur yakın. Yüksek uçuş iyi hava işareti.' },
  { icon: '🌿', t: 'Bitki sinyalleri', d: 'Yonca yaprakları kapanıyorsa nem artıyor. Çiçek kokusu yoğunlaşıyorsa yağmur öncesi.' },
];

export default function CloudReading() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('clouds');

  return (
    <div style={{ background: '#060a10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>☁️ Bulut Okuma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Doğa meteorolojisi · bulut tipleri · hava işaretleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['clouds','Bulutlar'],['signs','Doğa İşaretleri']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#60a5fa' : '#0c1420', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'clouds' && (
          <div style={{ background: '#0c1420', borderRadius: 14, padding: 14, border: '1px solid #60a5fa33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa', marginBottom: 10 }}>☁️ Bulut Tipleri</div>
            {CLOUDS.map((c, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < CLOUDS.length-1 ? '1px solid #101c2c' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#93c5fd' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{c.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'signs' && SIGNS.map((s, i) => (
          <div key={i} style={{ background: '#0c1420', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #60a5fa22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>{s.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{s.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
