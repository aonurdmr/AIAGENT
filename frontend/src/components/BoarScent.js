import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TIPS = [
  { icon: '💨', t: 'Yön Kontrolu', d: 'Yaban domuzu koku hassasiyeti olağanüstü. Her zaman rüzgara karşı ilerle.' },
  { icon: '🧴', t: 'Koku Giderici', d: 'Koku nötr sprey ve sabun. Yanık odun kokusu doğal maske.' },
  { icon: '👕', t: 'Kıyafet', d: 'Karbon iç astar — kokuyu emerek nötrleştirir. Havalandırma önemli.' },
  { icon: '🌲', t: 'Kozalak ve Çam', d: 'Çam kozalağını ezme ve giysiye sürme — orman kokusuyla uyumlu.' },
  { icon: '🚶', t: 'Yaklaşım Hattı', d: 'Rüzgar yönünü hesapla. Pusun 100m öncesinde koku kontroluna başla.' },
  { icon: '⏱️', t: 'Erken Kurulum', d: 'Koku dağılması için pusua hayvan aktivitesinden 2 saat önce gir.' },
];

const BEHAVIOR = [
  { t: 'Koku izleme', d: 'Burnu yere değdirerek iz sürer. Yiyecek ve tehdit kokusu ayırt eder.' },
  { t: 'Uyarı sesi', d: 'Tehlike: "fff" solunum sesi ve darbeleyerek kaçma. Tehlike uyarısı.' },
  { t: 'Aktif zaman', d: 'Alacakaranlık ve şafak zirve. Tam gündüz hareketi az.' },
  { t: 'Roto noktaları', d: 'Aynı yer ve iz sürekli kullanır — tatlı nokta olur.' },
  { t: 'Sosyal yapı', d: 'Dişi ve yavrular sürüde. Erkek tekli veya küçük grup.' },
];

export default function BoarScent() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tips');

  return (
    <div style={{ background: '#0c0600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐗 Domuz Av Koku Kontrolu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Koku yönetimi · domuz davranışı</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tips','Koku Kontrolu'],['behavior','Davranış']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#180e00', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#180e00', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f9730622' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}

        {tab === 'behavior' && (
          <div style={{ background: '#180e00', borderRadius: 14, padding: 14, border: '1px solid #f9730633' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>🐗 Yaban Domuzu Davranışı</div>
            {BEHAVIOR.map((b, i) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < BEHAVIOR.length-1 ? '1px solid #201200' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fb923c' }}>{b.t}</div>
                <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{b.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
