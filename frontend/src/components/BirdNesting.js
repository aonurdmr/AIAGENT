import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NESTS = [
  { name: 'Kupa yuvasi', d: 'Yuvarlak, derinlikli kupa. Incirkusu, bultbul. Dal catisi veya cali.' },
  { name: 'Kovuk yuva', d: 'Agac kovugu. Agackakan deler, sonra baskasi kullanir. Baykus, ispinoz.' },
  { name: 'Yer yuvasi', d: 'Cimendeki cukur. Keklik, buldircin, agac incirkusu. Dikkatli yuruy.' },
  { name: 'Sutun yuva', d: 'Leylekler yuksek yerleri sever. Ayni sene yine donerler — sadakat.' },
  { name: 'Su yuvasi', d: 'Batagan ve kisiyer: sazda yuzey yuvasi. Su cikis bozulursa yuva bozulur.' },
];

const TIPS = [
  { icon: '📅', t: 'Kuluçka dönemi', d: 'Mart-Haziran: ana kuluçka. Bu dönemde yuva yakinina yaklaşma, stres olur.' },
  { icon: '🔭', t: 'Uzaktan gözlem', d: 'Durbun kullan. Yakinlasma: ebeveyn kacabilir, yuva terk edilebilir.' },
  { icon: '📸', t: 'Fotografcilik', d: 'Gizli pusu + telephoto. 5m altina inme. Yumurta donmaya karsi hassas.' },
  { icon: '🌿', t: 'Yuva tespiti', d: 'Kuslar yiyecek tasirsa yuvaya bakar. Toprak, tuy, kil getirenler yuvacidir.' },
  { icon: '⚖️', t: 'Yasal koruma', d: 'Turkiye mevzuati: kus yuvasi bosaltmak veya yok etmek yasak.' },
];

export default function BirdNesting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('nests');

  return (
    <div style={{ background: '#040a06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐦 Kus Yuvasi Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yuva tipleri · gozlem etighi · koruma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['nests','Yuva Tipleri'],['tips','Gozlem']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0a120c', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'nests' && (
          <div style={{ background: '#0a120c', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🐦 Yuva Cesitleri</div>
            {NESTS.map((n, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < NESTS.length-1 ? '1px solid #101a12' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#86efac' }}>{n.name}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{n.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0a120c', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #22c55e22' }}>
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
