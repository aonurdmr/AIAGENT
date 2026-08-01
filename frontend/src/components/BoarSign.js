import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SIGNS = [
  { name: 'Ayak izi', d: '2 yarık tırnak: ön 5-7 cm. Bataklıkta net. Gidis yönü: arka ayak öne basar.' },
  { name: 'Sürtünme ağacı', d: 'Kabuğu soyulmuş veya kara çamurlu ağaç gövdesi. 50-90 cm yükseklik.' },
  { name: 'Kazma izleri', d: 'Toprak çevrilmiş, kökler kazılmış — yiyecek arama. Taze mi, bayatmış mı?' },
  { name: 'Yuvalama', d: 'Düz yaprak-dal yatağı, çukurda. Dişi domuz yavrulaması için kullanır.' },
  { name: 'Dışkı', d: 'Silindirik, belirgin. Meşe palamut ve mısır kalıntısı varsa bölge aktif.' },
  { name: 'Geçiş yolu', d: 'Düzenli iz: saz, çalı, dere kıyısı. Her gece aynı rotayı kullanır.' },
];

const TIPS = [
  { icon: '🌙', t: 'Gece hareketleri', d: 'Domuz gece avcısı. Alacakaranlık ve şafak: geçiş anları.' },
  { icon: '💨', t: 'Koku takibi', d: 'Rüzgarı arkana al. Domuzun burnu inanılmaz — 300m koku alır.' },
  { icon: '🌧️', t: 'Yağmur sonrası', d: 'Islak toprak en taze izleri gösterir. Yağmur öncesi aktiflik artar.' },
  { icon: '🌰', t: 'Mevsim', d: 'Sonbahar meşelik: palamut zamanı — en yoğun beslenme, en çok iz.' },
];

export default function BoarSign() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signs');

  return (
    <div style={{ background: '#0a0602', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐗 Domuz İzi Okuma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yaban domuzu takibi · iz tipleri · davranış</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['signs','İzler'],['tips','Teknikler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#120c04', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'signs' && (
          <div style={{ background: '#120c04', borderRadius: 14, padding: 14, border: '1px solid #f9731633' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>🐗 İz Türleri</div>
            {SIGNS.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SIGNS.length-1 ? '1px solid #1e1208' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fb923c' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#120c04', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f9731622' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
