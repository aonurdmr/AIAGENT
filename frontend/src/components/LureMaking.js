import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LURES = [
  {
    id: 'streamer', name: 'El Yapimi Streamer', icon: '🪶', accent: '#f97316',
    items: [
      { t: 'Malzeme', d: 'Kanca (4-8 no), olta ipi, tuy ve sintetik lif, metal boncuk goz.' },
      { t: 'Sari teknigi', d: 'Boncuk gozden baslayarak arkaya dog. Tuy ve ipek lif kat kat sar.' },
      { t: 'Renk secimi', d: 'Temiz suda koyu renkler. Bulanik suda parlak — sari, turuncu, kirmizi.' },
      { t: 'Test', d: 'Havuzda yuzme testini gec. Dogal hareket: kuyrugun titremesi kritik.' },
    ],
  },
  {
    id: 'spoon', name: 'Teneke Kasik', icon: '🥄', accent: '#06b6d4',
    items: [
      { t: 'Malzeme', d: 'Teneke kutu veya aluminim folyo. Makas, kesici, kanca, halka, pense.' },
      { t: 'Sekil', d: 'Oval, buyuk ucu dar. 3-5cm uzunluk salmonidler icin ideal.' },
      { t: 'Parlaklik', d: 'Cilalanmis yuz + mat arka. Dondurmek icin dogrusal cekim yap.' },
      { t: 'Kanat buku', d: 'Hafif buk yuzey = daha fazla titreme = daha fazla cikis.' },
    ],
  },
  {
    id: 'jig', name: 'Kil Veya Resin Jig', icon: '🎨', accent: '#a78bfa',
    items: [
      { t: 'Hacim', d: 'Kursum veya cink icin kalip gerekir. Baslangic: hazir hacim + renklendirme.' },
      { t: 'Boyama', d: 'Akrilik boya: cok katmanli. Son katman: clear kaplama — dayaniklilik.' },
      { t: 'Goz takimi', d: 'Gercekci goz stickeri veya cam boncuk — av tetikleyici detay.' },
      { t: 'Kanca', d: 'Treble (uclu) veya tek kanca. Treble daha cok kavrar, tek kolayca cikartilir.' },
    ],
  },
];

export default function LureMaking() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🎨 El Yapimi Sahte Yem</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Streamer · teneke kasik · jig yapimi</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {LURES.map(l => {
          const open = sel === l.id;
          return (
            <div key={l.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : l.id)} style={{
                background: '#120800', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${l.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{l.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{l.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#120800', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${l.accent}33`, borderTop: 'none' }}>
                  {l.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #1c1000' : 'none' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: l.accent }}>{item.t}</div>
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
