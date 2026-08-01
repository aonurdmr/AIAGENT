import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SEASONS = [
  {
    id: 'spring', name: 'İlkbahar', icon: '🌱', accent: '#22c55e',
    items: [
      { t: 'Gelincik', d: 'Mart-Nisan: kırmızı çiçek. Yapraklar salataya. Tanenler az — kaynat, su dök.' },
      { t: 'Isırgan otu', d: 'Nisan-Mayıs: eldiven takt. Haslama veya pesto. Demir ve C vitamini zengini.' },
      { t: 'Yabanmersini', d: 'Dağ ormanlarında Mayıs-Haziran. Yeniden taze veya reçel.' },
      { t: 'Mantar mevsimi', d: 'Nisanda yagi mantar. Kesinlikle tanidik mantar topla.' },
    ],
  },
  {
    id: 'summer', name: 'Yaz', icon: '☀️', accent: '#f59e0b',
    items: [
      { t: 'Yabani nane', d: 'Dere kenarlari. Cay ve yemekte. Koku tanima kolaydir.' },
      { t: 'Bogurtlen', d: 'Temmuz-Agustos: dikenli calilarda. Parmak boyaci ama lezzetli.' },
      { t: 'Ahududu', d: 'Yuksek dag ormanlarinda Haziran-Temmuz. Narin — hemen ye.' },
      { t: 'Kusekonmaz', d: 'Ege kiyilarinda yaz. Diken uclari kopar — hasla ya da izgara.' },
    ],
  },
  {
    id: 'autumn', name: 'Sonbahar', icon: '🍂', accent: '#f97316',
    items: [
      { t: 'Kestane', d: 'Ekim-Kasim: en bereketli. Cig veya kizartilmis. Kestane tenceresi Anadolu klasigi.' },
      { t: 'Ahlat', d: 'Yabani armut: kucuk, sert. Pestil ve recel. Kurutulmus kisi erzagi.' },
      { t: 'Alec', d: 'Kucuk kirmizi meyve — alecler. Tanic asit cok, ama recel olur.' },
      { t: 'Mantar zirvesi', d: 'Ekim: guzel mantar sezonu. Islik, kayiskulagi, cin mantari.' },
    ],
  },
];

export default function SeasonalFood() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#050a04', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍃 Mevsimlik Yabani Besinler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ilkbahar · yaz · sonbahar · dogadan toplama</div>
      </div>

      <div style={{ background: '#0a1208', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>⚠️ GUVENLIK</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Sadece tanidigin bitkileri ye. Suphe varsa toplama — bircok zehirli bitki yenilebilire benzer.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SEASONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0a1208', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0a1208', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #0e1a0e' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{item.t}</div>
                      <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
