import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TIPS = [
  { icon: '🌡️', t: 'Termal nedir', d: 'Sicak hava yukselen sutunlar. Yirtici kuslar ve planorlar bunu kullanir.' },
  { icon: '⏰', t: 'Olusma zamani', d: 'Gunes topraği isitinca baslir — genellikle saat 10-11. Akim 15-17 arasi en guclu.' },
  { icon: '🏔️', t: 'Arazi ozelligi', d: 'Koyu toprak ve kaya yuzeyler hizli isinir — termal dogurur. Suya yakin soguktur.' },
  { icon: '🦅', t: 'Kus takibi', d: 'Kartal ve sungur dairesel suzerken termal var demektir — konum isaretlenir.' },
  { icon: '💨', t: 'Av avantaji', d: 'Ruzgar yonunu anlamak icin termal kullan — koku yayan hava akimini bilmek kritik.' },
  { icon: '🌲', t: 'Ormanda termal', d: 'Aciklik ve korulugun sinirinda termal guclu. Geyik ve yabani hayvan gecis noktasi.' },
];

const SIGNS = [
  { name: 'Toz sutunu', d: 'Kuru gunlerde ince toz kolu — termal baslangicindan yukselir. Hava akimini gosterir.' },
  { name: 'Bulut tabanı', d: 'Kumulus tabani termal tavanidir. Hayvan aktivitesi o yukseklik altinda.' },
  { name: 'Deneyim', d: 'Arazi termalleri tanimak pratik ister. Ruzgarli kuzey: dogal termal az. Guney yuz: fazla.' },
];

export default function ThermalHunting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tips');

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌡️ Termal Akımlar & Avcilik</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Hava dinamikleri · kus takibi · ruzgar avantaji</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tips','Termal Bilgisi'],['signs','Isaretler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f97316' : '#120800', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#120800', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #f9731622' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}

        {tab === 'signs' && (
          <div style={{ background: '#120800', borderRadius: 14, padding: 14, border: '1px solid #f9731633' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>🔍 Termal Isaretleri</div>
            {SIGNS.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < SIGNS.length-1 ? '1px solid #1e1000' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fb923c' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{s.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
