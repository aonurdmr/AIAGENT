import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MAP_CONCEPTS = [
  {
    id: 'contour', name: 'İzohips & Yükseklik', icon: '🏔️', accent: '#a78bfa',
    desc: 'Topografik haritanın temeli',
    rules: [
      'Her izohips aynı yüksekliği temsil eder — üst üste binmez',
      'Sık çizgiler = dik yamaç / seyrek çizgiler = düz alan',
      'V şekli nehir yatağına işaret eder (sivri uç yukarı = tepe sırtı)',
      'Kapalı halka = tepe veya çukur — tırtıklar varsa çukur',
      '1:25000 haritada aralık 10m, 1:50000 haritada 20m',
    ],
    practical: 'Kampı kurmadan önce haritada izohipsleri oku — sel yatağı ve dik yamaç tuzakları',
  },
  {
    id: 'symbols', name: 'Harita İşaretleri', icon: '🗺️', accent: '#22c55e',
    desc: 'Standart topografi semboller',
    rules: [
      'Mavi = su (nehir, göl, bataklık)',
      'Yeşil = bitki örtüsü (orman, çalılık)',
      'Kahverengi = izohips ve yükseklik',
      'Siyah = yapay (yol, köprü, bina)',
      'Kırmızı = özel (sınır, tehlike bölgesi)',
    ],
    practical: 'Mavi semboller su kaynaklarını gösterir — kamp için 50m uzakta kur',
  },
  {
    id: 'scale', name: 'Ölçek & Mesafe', icon: '📏', accent: '#f59e0b',
    desc: 'Haritadan gerçek mesafe hesabı',
    rules: [
      '1:25000 → 1cm haritada = 250m gerçekte',
      '1:50000 → 1cm haritada = 500m gerçekte',
      'Pusula ile harita üstünde açı ölç — doğrultu belirle',
      'Naismith kuralı: 5km/saat + her 300m yükseliş için 1 saat ekle',
      'İzohips atlayan mesafe gerçek mesafeden %20-40 daha uzun',
    ],
    practical: 'Bir gün için 15-20km plan yap — arazi 10km\'ye indirir',
  },
  {
    id: 'grid', name: 'Grid & Koordinat', icon: '📐', accent: '#06b6d4',
    desc: 'Konumu tam olarak belirtme',
    rules: [
      'UTM koordinatı: Zone + Easting + Northing (6 haneli)',
      'Enlem/boylam: GPS için + ondalık derece formatı',
      'Grid north ≠ Manyetik north — pusula sapmasını hesapla',
      'Türkiye: UTM Zone 35N (batı) ve 36N (doğu)',
      '8 haneli grid referansı 10m hassasiyette',
    ],
    practical: 'Acil durumda koordinatını söyle: 112 operatörü GPS konumunu sorar',
  },
];

const COMPASS_SKILLS = [
  { icon: '🧭', skill: 'Kuzeyi Bul', steps: ['Pusulayı yatay tut', 'Kırmızı iğne Kuzey\'e işaret eder', 'Haritayı kuzey ile hizala', 'Grid north sapmasını uygula (Türkiye: 1-3°)'] },
  { icon: '📐', skill: 'Doğrultu Al', steps: ['A noktasından B\'ye gitmek için: haritada doğrultu çiz', 'Pusulayı üstüne koy, derece oku', 'Arazi yürüyüşünde o dereceyi tut', 'Her 500m kontrol — sapma olabilir'] },
  { icon: '🗻', skill: 'Triangülasyon', steps: ['2 tanıdık noktayı belirle (tepe, köy)', 'Her birine doğrultu al', 'Haritada o doğrultuları çiz', 'Kesişme noktası = konumun'] },
];

export default function MapReading() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('map');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#06080f', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧭 Harita & Pusula</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Topografi harita okuma · izohips · koordinat · triangülasyon</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['map','Harita'],['compass','Pusula']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#a78bfa' : '#0c0e18', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'map' && MAP_CONCEPTS.map(c => {
          const open = sel === c.id;
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : c.id)} style={{
                background: '#0c0e18', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${c.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{c.desc}</div>
                  </div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0c0e18', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${c.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>📋 KURALLAR</div>
                  {c.rules.map((r, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {r}</div>)}
                  <div style={{ background: c.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>🏕️ {c.practical}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'compass' && (
          <div style={{ background: '#0c0e18', borderRadius: 14, padding: 14, border: '1px solid #a78bfa22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 12 }}>🧭 Pusula Becerileri</div>
            {COMPASS_SKILLS.map((s, i) => (
              <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < COMPASS_SKILLS.length-1 ? '1px solid #181a28' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#c4b5fd' }}>{s.skill}</div>
                </div>
                {s.steps.map((step, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700, width: 18, flexShrink: 0 }}>{j+1}.</div>
                    <div style={{ fontSize: 12, color: '#d1d5db' }}>{step}</div>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ background: '#a78bfa15', borderRadius: 8, padding: '8px 10px', marginTop: 4 }}>
              <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 GPS telefon boşalır — pusula her zaman yanında olsun. Manyetik kuzey ile harita kuzeyinin farkını öğren.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
