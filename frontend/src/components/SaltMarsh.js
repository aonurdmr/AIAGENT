import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WILDLIFE = [
  { name: 'Saz Bülbülü', n: 'Acrocephalus arundinaceus', d: 'Sazlık içi. Güçlü ses ama gizli. Yaz göçmeni.' },
  { name: 'Bataklık Baykuşu', n: 'Asio flammeus', d: 'Gündüz aktif. Alandaki oluk ve çukurlarda. Göç geçişi.' },
  { name: 'Küçük Balaban', n: 'Ixobrychus minutus', d: 'Küçük, gizli balıkçıl. Saz içinde bekleme. Çok nadir görülür.' },
  { name: 'Su Samuru', n: 'Lutra lutra', d: 'Nehir ve bataklık. Gece aktif. Koruma altında. Balık avlar.' },
  { name: 'Yılan Balığı', n: 'Anguilla anguilla', d: 'Bataklık kanallarında. Gece hareketi. Uzun ömürlü.' },
];

const TIPS = [
  { icon: '🌾', t: 'Sazlık Kenarı', d: 'Açık su-saz sınırı en aktif alan. Sabah sabah gözlem.' },
  { icon: '🚣', t: 'Sessiz Tekne', d: 'Yavaş kürekle sazlık kenarı dolaşma — hayvanlar az ürker.' },
  { icon: '👂', t: 'Ses Dinleme', d: 'Saz bülbülü ve küçük balaban sese göre daha kolay bulunur.' },
  { icon: '🌡️', t: 'Mevsim', d: 'İlkbahar-yaz: yuvalayanlar aktif. Kış: kışlakçı türler.' },
];

export default function SaltMarsh() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('wildlife');

  return (
    <div style={{ background: '#040e08', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌾 Bataklık Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Sazlık yaban hayatı · gözlem teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['wildlife','Yaban Hayatı'],['tips','Gözlem']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#081408', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'wildlife' && (
          <div style={{ background: '#081408', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🌾 Bataklık Canlıları</div>
            {WILDLIFE.map((w, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < WILDLIFE.length-1 ? '1px solid #0e1a0e' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{w.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{w.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{w.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#081408', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #22c55e22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
