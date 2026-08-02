import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'edible', name: 'Yenilebilir', icon: '🍄', accent: '#f59e0b',
    items: [
      { t: 'Kuzugobegi', d: 'Morchella: konik bal petek yapi. Ilkbaharda. Cig zehirli, pisirmek sart.' },
      { t: 'Orman mantari', d: 'Boletus edulis: kalin sap, acik kahve sapka. Guzel koku. Buyuk degerli.' },
      { t: 'Sezar mantari', d: 'Amanita caesarea: turuncu sapka, sari lameller. Nadir ve cok degerli.' },
      { t: 'Kavak mantari', d: 'Cyclocybe aegerita: kavak kokune yetisir. Nisan-Mayis ve Eylul-Ekim.' },
    ],
  },
  {
    id: 'danger', name: 'Tehlikeli', icon: '☠️', accent: '#dc2626',
    items: [
      { t: 'Olum meleği', d: 'Amanita phalloides: beyaz, zarif, olumcul. Zehir pisirmekle yok olmaz.' },
      { t: 'Sinir sarkaci', d: 'Amanita muscaria: kirmizi sapka, beyaz benekler. Hallusinojen + toksik.' },
      { t: 'Kukuleta mantari', d: 'Galerina marginata: kucuk, kahve. Orman mantarina benzer. Cok toksik.' },
      { t: 'Altin kural', d: 'Emin degilsen yeme! Sarici test, kitap, uzman kontrolu olmadan denerim.' },
    ],
  },
];

export default function WildMushroomID() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060402', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍄 Yabani Mantar Tanıma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yenilebilir · tehlikeli · kurallar</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#0e0a04', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0e0a04', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1a1408' : 'none' }}>
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
