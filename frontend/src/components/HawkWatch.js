import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIES = [
  { name: 'Şahin (Accipiter nisus)', d: 'Orman içi avcı. Hızlı çırpışlar + kısa kayış. Dişi erkekten büyük.' },
  { name: 'Kartal (Aquila chrysaetos)', d: 'Altın kartal: uzun kanat, yavaş süzülme. Dağlık alanlar. Türkiye\'de nadir.' },
  { name: 'Kızıl Şahin (Buteo buteo)', d: 'En yaygın yırtıcı kuş. Kalın, yuvarlak kanat. Termalde çokça döner.' },
  { name: 'Atmaca (Accipiter gentilis)', d: 'Büyük şahin. Ormanda daldan dala sürat avı. Kekliği tabanlar.' },
  { name: 'Doğan (Falco peregrinus)', d: 'Dünya\'nın en hızlı kuşu. Dalış anında 300+ km/s. Kaya ve yapı kovuğu.' },
];

const TIPS = [
  { icon: '🌬️', t: 'Termal akımlar', d: 'Öğlen saatleri termal yükselir — yırtıcılar eforsuz süzülür. En iyi gözlem 11-15 arası.' },
  { icon: '🏔️', t: 'Geçiş noktaları', d: 'Boğaz ve dağ geçitleri göç rotası. Eylül-Ekim: Bosphorus gözlem rekoru.' },
  { icon: '🔭', t: 'Donanım', d: 'Durbun: 8x42 veya 10x42. Teleskop 20-60x hedef tespiti için.' },
  { icon: '📍', t: 'Gözlem yeri', d: 'Rüzgara karşı, yüksek tepe. Kuşlar rüzgara dönük uçar — önünüze gelir.' },
  { icon: '📸', t: 'Fotoğraf', d: 'Süzülme anı sabit — çekim kolay. Dalış anı: burst modu, 1/2000s.' },
];

export default function HawkWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');

  return (
    <div style={{ background: '#060804', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦅 Yırtıcı Kuş Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · tanıma · gözlem teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['species','Türler'],['tips','Teknikler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#0e1006', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'species' && (
          <div style={{ background: '#0e1006', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🦅 Türkiye Yırtıcı Kuşları</div>
            {SPECIES.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SPECIES.length-1 ? '1px solid #181602' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0e1006', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f59e0b22' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
