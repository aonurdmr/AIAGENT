import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    id: 'types', name: 'Yapay Resif Türleri', icon: '🪸', accent: '#06b6d4',
    items: [
      { t: 'Beton blok', d: 'En yaygın. Ucuz, dayanıklı. Balık barınma ve yumurtlama alanı.' },
      { t: 'Batık gemi', d: 'Büyük yapı — çok çeşit balık. Dalgıç ve olta için ideal.' },
      { t: 'Tetrapodd', d: 'Betondan 4 kollu yapı. Akıntıya dayanıklı, uzun ömür.' },
      { t: 'Doğal taş yığını', d: 'Kıyı yakını. Kefalide, lüfer ve çipura barınma noktası.' },
      { t: 'Lastik yığını', d: 'Eski teknik — çevresel sorun var. Artık tercih edilmiyor.' },
    ],
  },
  {
    id: 'fish', name: 'Hedef Balık Türleri', icon: '🐟', accent: '#22c55e',
    items: [
      { t: 'Çipura', d: 'Resif kenarında avlanır. Akşam ve sabah zirve. Canlı karides yem.' },
      { t: 'Levrek', d: 'Yapı altında durur. Balık yemi ve minnow jig etkili.' },
      { t: 'Lahoz (Grouper)', d: 'Derinlik resifi. 20-50m arası. Canlı yem zorunlu.' },
      { t: 'İskorpit', d: 'Dip ve resif köşesi. Zehirli diken dikkat — eldivenle tutma.' },
      { t: 'Sarıkuyruk', d: 'Açık deniz resifi. Hızlı akıntıda. Mavi-beyaz jig.' },
    ],
  },
  {
    id: 'tech', name: 'Olta Teknikleri', icon: '🎣', accent: '#f97316',
    items: [
      { t: 'Dip olta', d: 'Ağırlık dibe, yem resif üstünde. Çipura ve levrek için klasik.' },
      { t: 'Jig', d: 'Metal jig resif çevresinde düşür-kaldır. Sarıkuyruk ve lahoz.' },
      { t: 'Dropshot', d: 'Ağırlık dip, yem su ortasında. İskorpit ve çipura zirve.' },
      { t: 'Canlı yem', d: 'Fener balığı veya karides. Lahoz için en etkili.' },
      { t: 'Trol', d: 'Resif kenarında yavaş trol. Yapı üstüne takılma riski var.' },
    ],
  },
  {
    id: 'locate', name: 'Resif Bulma', icon: '📍', accent: '#a78bfa',
    items: [
      { t: 'Echo sounder', d: 'Derinlik izi resif yapısını gösterir — sivri yükselmeler.' },
      { t: 'GPS koordinatlar', d: 'Türkiye Denizcilik koor defteri veya yerel balıkçıdan öğren.' },
      { t: 'Renk değişimi', d: 'Su rengi açık maviden koyu maviye — resif olabilir.' },
      { t: 'Kuş aktivitesi', d: 'Martı yoğunluğu yüzey balık — altında derin resif olabilir.' },
    ],
  },
];

export default function ArtificialReef() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪸 Yapay Resif Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Resif türleri · hedef balıklar · olta teknikleri · resif bulma</div>
      </div>

      <div style={{ background: '#030e14', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #06b6d433' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontWeight: 700 }}>🪸 YAPAY REİF</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Yapay resifler balık biyokütlesini 10 kat artırabilir. Yakın kıyı resiflerinde sabah-akşam en yüksek aktivite.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SECTIONS.map(s => {
          const open = sel === s.id;
          return (
            <div key={s.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : s.id)} style={{
                background: '#030e14', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${s.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#030e14', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${s.accent}33`, borderTop: 'none' }}>
                  {s.items.map((item, i) => (
                    <div key={i} style={{ marginTop: i === 0 ? 10 : 8, paddingTop: i === 0 ? 0 : 8, borderTop: i > 0 ? '1px solid #07141a' : 'none' }}>
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
