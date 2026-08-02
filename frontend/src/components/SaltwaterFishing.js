import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'spots', name: 'Alanlar & Mevsim', icon: '🌊', accent: '#06b6d4',
    items: [
      { t: 'Akdeniz', d: 'Yaz: çipura, levrek, barbun. Kis: kolyoz, palamut. Su berrak, kaya dipli.' },
      { t: 'Ege kıyısı', d: 'Koy agizlari, ada gecitleri: orfoz, iskorpit, cipura. Sıg ve derin.' },
      { t: 'Karadeniz', d: 'Palamut, lüfer, kefal. Akıntı güçlü: ağır sinker ve güçlü donanım gerek.' },
      { t: 'Marmara', d: 'Torik ve cupra: Boğaz gecisi. Mevsim değişimleri hızlı ve belirgin.' },
    ],
  },
  {
    id: 'method', name: 'Teknikler', icon: '🎣', accent: '#3b82f6',
    items: [
      { t: 'Dip olta', d: 'Sahil ve tekne. Sinker + rig. Karides, kalamar, midye yem.' },
      { t: 'Jig balıkçılığı', d: 'Metal jig: palamut, orkinos, levrek. Dikey jig ritmik şekilde.' },
      { t: 'Live bait', d: 'Canli yem: en dogal sunum. Istavrit ve hamsi büyük balik icin.' },
      { t: 'Trolling', d: 'Tekne hızında sürükleme: torik ve ton için. 4-8 knot hız.' },
    ],
  },
  {
    id: 'tackle', name: 'Donanim', icon: '⚙️', accent: '#a78bfa',
    items: [
      { t: 'Deniz kamisi', d: '2.1-3m, orta-sert aksiyon. Tuz ortamina dayanikli bileşen.' },
      { t: 'Makara', d: '4000-6000 numara. Tuz sonrası dur, acik su ile dur, yag.' },
      { t: 'Misina', d: 'PE 1.5-3 braid. Fluorocarbon lider 25-40 lb. Tuze dayanıklı baglantılar.' },
      { t: 'Kancalar', d: 'Tuzlu suda pas hizlı. Paslanmaz celik veya tin-coated kanca.' },
    ],
  },
];

export default function SaltwaterFishing() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Tuzlu Su Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Alanlar · teknikler · donanım</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#041018', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#041018', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #081828' : 'none' }}>
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
