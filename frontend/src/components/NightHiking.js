import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TIPS = [
  { icon: '🔦', t: 'Aydinlatma', d: 'Kafa lambasi + yedek pil sart. Renk: kirmizi mod gece gorusunu korur.' },
  { icon: '🗺️', t: 'Rota hazirlik', d: 'Gunduz rotayi gez veya haritayi ezberlef. Gece belirsiz detaylar kaybolur.' },
  { icon: '👥', t: 'Grup genisliğI', d: 'Min 3 kisi. Kaza aninda biri kalir, biri yardim almaya gider.' },
  { icon: '🐾', t: 'Yaban hayati', d: 'Kurtlar ve ayilar gece aktif. Ses cikar, grup ol, yalniz deyilsin.' },
  { icon: '🌡️', t: 'Sicaklik dususu', d: 'Dagda gece 10-15 derece soguyor. Fazladan katman al, ruzgara karsi.' },
  { icon: '📱', t: 'Iletisim', d: 'Sefer rotasini birinde birak. Telefon batarya tam. Saat ve donus planla.' },
];

const GEAR = [
  { t: 'Kafa lambasi', d: '300+ lumen. Ekstra pil veya sarjli. Su gecirmez.' },
  { t: 'Yedek el feneri', d: 'Kucuk, cebe girer. Kafa lambasi bozulursa yedek.' },
  { t: 'Gece giyim', d: 'Sicak katman + yagmurluk. Gece nem artar, soguk hisseder.' },
  { t: 'Ilk yardim', d: 'Gece yaralanma riski artar. Temel sargı malzemesi.' },
];

export default function NightHiking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tips');

  return (
    <div style={{ background: '#04040e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌙 Gece Yuruyusu</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Guvenlik · aydinlatma · ekipman · hazirlik</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['tips','Guvenlik'],['gear','Ekipman']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#6366f1' : '#0c0c1e', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'tips' && TIPS.map((t, i) => (
          <div key={i} style={{ background: '#0c0c1e', borderRadius: 12, padding: '12px 16px', marginBottom: 8, border: '1px solid #6366f122' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#818cf8' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}

        {tab === 'gear' && (
          <div style={{ background: '#0c0c1e', borderRadius: 14, padding: 14, border: '1px solid #6366f133' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#818cf8', marginBottom: 10 }}>🎒 Gece Trekking Ekipmani</div>
            {GEAR.map((g, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < GEAR.length-1 ? '1px solid #14142e' : 'none' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc' }}>{g.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{g.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
