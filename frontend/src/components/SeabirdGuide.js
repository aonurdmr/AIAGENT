import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BIRDS = [
  { name: 'Karabatak', n: 'Phalacrocorax carbo', d: 'Balık avcısı. Dalmadan sonra kanat kurutur. Kıyı ve nehir.' },
  { name: 'Büyük Martı', n: 'Larus cachinnans', d: 'Türkiye kıyısında hakim tür. Fırsatçı — her şeyi yer.' },
  { name: 'Karasevich', n: 'Larus melanocephalus', d: 'Yazın siyah başlı. Akdeniz kışlak. Gözlemlenmesi zor.' },
  { name: 'Dalgıç Kuşu', n: 'Gavia arctica', d: 'Kuzey göçmen. Kış Ege ve Marmara. Derin dalıcı.' },
  { name: 'Şeytan Kuşu', n: 'Puffinus yelkouan', d: 'Akdeniz endemik. Dalgada kayan uçuş. Koloni yuvası.' },
  { name: 'Avrupakırlangıcı', n: 'Sterna hirundo', d: 'Yaz kıyısı. Zarif dalış. Küçük balık avı. Göçmen.' },
];

const TIPS = [
  { icon: '🌊', t: 'Kıyı Noktası', d: 'Rüzgara açık burunda martı ve karabatak yoğunluğu.' },
  { icon: '🔭', t: 'Deniz Gözlemi', d: 'Denge sorunlu — tekne güvertesinde dürbünü vücuda daya.' },
  { icon: '🌅', t: 'Işık Zamanı', d: 'Sabah erken ve akşam: deniz kuşu balık peşinde zirve aktif.' },
  { icon: '🌬️', t: 'Rüzgar Etkisi', d: 'Güçlü poyraz kıyıya nadir türleri sürebilir — fırtına sonrası bak.' },
];

export default function SeabirdGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('birds');

  return (
    <div style={{ background: '#020a12', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦅 Deniz Kuşları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · habitat · gözlem teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['birds','Türler'],['tips','Gözlem']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#04101a', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'birds' && (
          <div style={{ background: '#04101a', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>🌊 Deniz Kuşu Türleri</div>
            {BIRDS.map((b, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < BIRDS.length-1 ? '1px solid #08141e' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#22d3ee' }}>{b.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{b.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{b.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#04101a', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #06b6d422' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#06b6d4' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
