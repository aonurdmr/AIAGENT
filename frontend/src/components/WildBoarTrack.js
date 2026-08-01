import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'signs', name: 'İzler & İşaretler', icon: '🐾', accent: '#f97316',
    items: [
      { t: 'Ayak izi', d: 'Iki ayrı toynak: yuvarlak, 4-6 cm. Sert zemin izler belirgindir, camurda net.' },
      { t: 'Kazi yeri', d: 'Kazilmis toprak parcasi: domuz koke arar. Taze kazi = aktif bolge.' },
      { t: 'Surtunme yeri', d: 'Agac kabiligi cikarılmis: domuz agaca surtunur, kil ve camur birakir.' },
      { t: 'Yuva alani', d: 'Dal ve yaprak yigini: domuz sogrugun dis kenarlarda yuva olusturur.' },
    ],
  },
  {
    id: 'behavior', name: 'Davranış', icon: '🐗', accent: '#dc2626',
    items: [
      { t: 'Sabah akşam', d: 'Domuz alacakaranlıkta hareketlenir. Gece beslenir, gunduz gizlenir.' },
      { t: 'Su kaynaği', d: 'Yakin su var mı? Domuz gunluk su icmek zorundadir. Kaynak = iz odagi.' },
      { t: 'Koruyucu tepki', d: 'Yavrusuyla dis: cok tehlikeli. Yavru gorursen uzak dur, agaca cik.' },
      { t: 'Koku hassasiyeti', d: 'Domuz koku alir ama gorme zayif. Ruzgar yukarida, koku asagi ver.' },
    ],
  },
];

export default function WildBoarTrack() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐗 Yaban Domuzu Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İzler · davranış · güvenlik</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#120800', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#120800', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1e1000' : 'none' }}>
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
