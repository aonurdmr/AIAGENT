import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  { name: 'Büyük Nalburunlu Yarasa', n: 'Rhinolophus ferrumequinum', d: 'Türkiye en büyük Rhinolophus. Mağara ve ahır. Kanat 40 cm.' },
  { name: 'Ortak Pipistrelle', n: 'Pipistrellus pipistrellus', d: 'En yaygın yarasa. Şehirde de yaşar. Böcek avlar akşam üstü.' },
  { name: 'Büyük Fas Yarasa', n: 'Myotis myotis', d: 'Büyük, 45cm kanat. Orman kenarı, mağara yuvası.' },
  { name: 'Uzun Kulak Yarasa', n: 'Plecotus auritus', d: 'Çok uzun kulak. Bahçe ve orman içi. Yavaş uçar.' },
  { name: 'Taş Yarasa', n: 'Eptesicus serotinus', d: 'Büyük, yavaş uçuş. Konutlar ve köprü altı yuva.' },
];

const TIPS = [
  { icon: '🕐', t: 'Gözlem Zamanı', d: 'Günbatımından 20-30 dakika sonra başlar. En yoğun ilk 45 dakika.' },
  { icon: '🎙️', t: 'Bat Dedektörü', d: 'Ultrasonik dedektör: yüksek frekans seslerini duyulur frekansa çevirir.' },
  { icon: '📍', t: 'En İyi Nokta', d: 'Su kaynağı (göl, nehir) kenarı en yüksek aktivite — böcek yoğun.' },
  { icon: '💡', t: 'Işık Tuzağı', d: 'Gece UV lambası böcek çeker — yarasa böceğe gelir. Gözlem için.' },
  { icon: '🦟', t: 'Böcek Takibi', d: 'Zararlı böcek popülasyonunu kontrol ederler — koruma değeri yüksek.' },
  { icon: '🌡️', t: 'Hava Koşulu', d: 'Sıcak ve sakin geceler en iyi. Rüzgarlı veya yağışlı gecede aktivite düşer.' },
];

export default function BatObserve() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tips');

  return (
    <div style={{ background: '#04040e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦇 Yarasa Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · gözlem teknikleri · dedektör kullanımı</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tips','Gözlem İpuçları'],['species','Türler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#6366f1' : '#080818', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#080818', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #6366f122' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#818cf8' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}

        {tab === 'species' && (
          <div style={{ background: '#080818', borderRadius: 14, padding: 14, border: '1px solid #6366f122' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#818cf8', marginBottom: 10 }}>🦇 Türkiye Yarasa Türleri</div>
            {SPECIES.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SPECIES.length-1 ? '1px solid #10101e' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc' }}>{s.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{s.d}</div>
              </div>
            ))}
            <div style={{ background: '#6366f115', borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#d1d5db' }}>Türkiye'de 35+ yarasa türü. Tümü yasal koruma altında — yakalamak yasak.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
