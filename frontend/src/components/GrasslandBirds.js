import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BIRDS = [
  { name: 'Bozkirlak', n: 'Melanocorypha calandra', d: 'Bozkir simgesi. Güçlü ses. Kışın sürü halinde. Yazda ayrı bölge.' },
  { name: 'Kaya Kekliği', n: 'Alectoris chukar', d: 'Kayalık bozkir. Sürü halinde. Sabah ötüşü belirgin. Avcılık hedefi.' },
  { name: 'Bıldırcın', n: 'Coturnix coturnix', d: 'Göçmen. Bozkir ve tahıl tarlası. Küçük, yere yakın. Ses ile bulunur.' },
  { name: 'Çalı Kuşu', n: 'Saxicola torquata', d: 'Bozkir çalısında tüner. Siyah-kestane. Böcek avlar. Yıl boyu.' },
  { name: 'Kızılkuyruk', n: 'Phoenicurus ochruros', d: 'Kaya ve duvar. Turuncu kuyruk sallama. Yaz göçmeni.' },
  { name: 'Küçük Kerkenez', n: 'Falco naumanni', d: 'Koloni halinde yuvalama. Bozkir böcek avcısı. Mavi başlı erkek.' },
];

const TIPS = [
  { icon: '🌅', t: 'Erken Sabah', d: 'Güneş doğarken ötme zirvesi. Bıldırcın ve keklik 30 dakika aktif.' },
  { icon: '🌿', t: 'Habitata Bak', d: 'Tahrip edilmemiş bozkir — tarım alanı değil. Habitat kalitesi belirleyici.' },
  { icon: '🔭', t: 'Uzaktan Gözlem', d: 'Bozkir açık alan — dürbünle geniş tarama. 8x42 idealdir.' },
  { icon: '🌡️', t: 'Mevsim', d: 'Nisan-Mayıs: göçmen geliş. Haziran-Temmuz: yavru. Kış: sürü.' },
  { icon: '🎙️', t: 'Ses Kimliği', d: 'Bozkirlak sesi çok zengin. Bıldırcın "git-git-git" ritmi belirgin.' },
];

export default function GrasslandBirds() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('birds');

  return (
    <div style={{ background: '#080a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌾 Bozkir Kuşları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · habitat · gözlem teknikleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['birds','Türler'],['tips','Gözlem']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#0e100a', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'birds' && (
          <div style={{ background: '#0e100a', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>🌾 Bozkir Kuş Türleri</div>
            {BIRDS.map((b, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < BIRDS.length-1 ? '1px solid #141608' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24' }}>{b.name}</div>
                <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginBottom: 2 }}>{b.n}</div>
                <div style={{ fontSize: 12, color: '#d1d5db' }}>{b.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0e100a', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f59e0b22' }}>
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
