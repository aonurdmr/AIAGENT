import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BEAUFORT = [
  { scale: 0, name: 'Sakin', speed: '0-1 km/s', desc: 'Duman düz yükselir', fishing: 'Mükemmel — yüzey sakin, balık aktif', hunting: 'İdeal — koku yönetimi kolay' },
  { scale: 1, name: 'Hafif esinti', speed: '1-5 km/s', desc: 'Duman hafif eğilir', fishing: 'Çok iyi — minimal dalgalanma', hunting: 'Çok iyi — ince koku taşıması' },
  { scale: 2, name: 'Hafif meltem', speed: '6-11 km/s', desc: 'Yapraklar hışırdar', fishing: 'İyi — yüzey yem atar', hunting: 'İyi — kokuyu dağıtır az' },
  { scale: 3, name: 'Orta meltem', speed: '12-19 km/s', desc: 'Küçük dallar sallanır', fishing: 'Orta — mayadroğu zor', hunting: 'Dikkat — koku yayılır' },
  { scale: 4, name: 'Kuvvetli meltem', speed: '20-28 km/s', desc: 'Küçük ağaçlar sallanır', fishing: 'Zor — olta sürüklenir', hunting: 'Zor — koku kontrolü kaybolur' },
  { scale: 5, name: 'Sert meltem', speed: '29-38 km/s', desc: 'Büyük dallar sallanır', fishing: 'Çok zor — yüzey fishing imkansız', hunting: 'Çok zor — hayvan sığınak arar' },
  { scale: 6, name: 'Kuvvetli rüzgar', speed: '39-49 km/s', desc: 'Ağaçlar sallanır', fishing: 'Dur — tehlikeli açık su', hunting: 'Dur — hayvanlar hareketsiz' },
];

const WIND_SIGNS = [
  { icon: '🌿', sign: 'Yaprak hareketi yönü', meaning: 'Rüzgar yönü — avda daima rüzgarı yüzünüze alın, hayvan aşağı yönde' },
  { icon: '💧', sign: 'Su yüzeyi kırışıklığı', meaning: 'Hafif rüzgar balığı aktive eder — yüzey yemi için ideal zaman' },
  { icon: '🌊', sign: 'Dalga yönü ve boyu', meaning: 'Kıyı direkleri ve burgaçlar yem balığı toplar — büyük balık takip eder' },
  { icon: '☁️', sign: 'Bulut hareketi', meaning: 'Hava değişim habercisi — doğu bulutları yaklaşan yağış' },
  { icon: '🐦', sign: 'Kuş uçuş davranışı', meaning: 'Alçak uçuş = düşük basınç, yağmur gelir. Yüksek süzülme = stabil hava' },
  { icon: '🌡️', sign: 'Ani sıcaklık düşüşü', meaning: 'Soğuk cephe geçişi — balık derine iner, av hayvanleri saklanır' },
];

const DIRECTIONS = [
  { dir: 'Kuzey', angle: '↑', fishing: 'Soğuk hava — balık yavaşlar, derin yem', hunting: 'İyi — hayvanlar ileri hareket eder' },
  { dir: 'Güney', angle: '↓', fishing: 'Sıcak hava — yüzey beslenme, sabah erken', hunting: 'Kötü — koku aşağı gider, hayvan kaçar' },
  { dir: 'Doğu', angle: '→', fishing: 'Değişken — yağmur öncesi en aktif dönem', hunting: 'İyi — koku yana gider' },
  { dir: 'Batı', angle: '←', fishing: 'Hava değişimi — yağmur sonrası iyi', hunting: 'Çok iyi — rüzgarı önde tut' },
];

export default function WindReading() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('beaufort');
  const [selScale, setSelScale] = useState(null);

  return (
    <div style={{ background: '#060a14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>💨 Rüzgar & Hava Okuma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Beaufort skalası · rüzgar yönleri · doğa işaretleri</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['beaufort','Beaufort'],['signs','İşaretler'],['directions','Yönler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#3b82f6' : '#0a1020', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 12
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'beaufort' && (
          <>
            <div style={{ background: '#0a1020', borderRadius: 10, padding: '10px 14px', marginBottom: 12, border: '1px solid #3b82f633' }}>
              <div style={{ fontSize: 11, color: '#3b82f6', fontWeight: 700 }}>💡 BEAUFORT SKALASI</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>0-12 arası rüzgar kuvvet ölçeği. Balıkçılık ve av için 0-3 ideal, 4+ zor, 6+ tehlikeli.</div>
            </div>
            {BEAUFORT.map(b => {
              const open = selScale === b.scale;
              const color = b.scale <= 2 ? '#22c55e' : b.scale <= 4 ? '#fbbf24' : '#ef4444';
              return (
                <div key={b.scale} style={{ marginBottom: 6 }}>
                  <div onClick={() => setSelScale(open ? null : b.scale)} style={{
                    background: '#0a1020', borderRadius: open ? '10px 10px 0 0' : 10,
                    padding: '11px 14px', border: `1px solid ${color}33`, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{ background: color, borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#fff', flexShrink: 0 }}>{b.scale}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>{b.speed} · {b.desc}</div>
                    </div>
                    <div style={{ fontSize: 10, color: color, fontWeight: 700 }}>{b.scale <= 2 ? 'İDEAL' : b.scale <= 4 ? 'ORTA' : 'ZOR'}</div>
                  </div>
                  {open && (
                    <div style={{ background: '#0a1020', borderRadius: '0 0 10px 10px', padding: '8px 14px 12px', border: `1px solid ${color}33`, borderTop: 'none' }}>
                      <div style={{ fontSize: 12, marginBottom: 4 }}><span style={{ color: '#06b6d4', fontWeight: 600 }}>🐟 Balıkçılık: </span><span style={{ color: '#d1d5db' }}>{b.fishing}</span></div>
                      <div style={{ fontSize: 12 }}><span style={{ color: '#f97316', fontWeight: 600 }}>🏹 Av: </span><span style={{ color: '#d1d5db' }}>{b.hunting}</span></div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {tab === 'signs' && (
          <div style={{ background: '#0a1020', borderRadius: 14, padding: 14, border: '1px solid #3b82f622' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', marginBottom: 10 }}>🌿 Doğada Hava İşaretleri</div>
            {WIND_SIGNS.map((s, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < WIND_SIGNS.length-1 ? '1px solid #111a2e' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#93c5fd' }}>{s.sign}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3, lineHeight: 1.5 }}>{s.meaning}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'directions' && (
          <>
            {DIRECTIONS.map((d, i) => (
              <div key={i} style={{ background: '#0a1020', borderRadius: 12, padding: '12px 14px', border: '1px solid #3b82f622', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>{d.angle}</span>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{d.dir} Rüzgarı</div>
                </div>
                <div style={{ fontSize: 12, marginBottom: 4 }}><span style={{ color: '#06b6d4', fontWeight: 600 }}>🐟 </span><span style={{ color: '#d1d5db' }}>{d.fishing}</span></div>
                <div style={{ fontSize: 12 }}><span style={{ color: '#f97316', fontWeight: 600 }}>🏹 </span><span style={{ color: '#d1d5db' }}>{d.hunting}</span></div>
              </div>
            ))}
            <div style={{ background: '#1a1010', borderRadius: 10, padding: '10px 14px', marginTop: 4, border: '1px solid #ef444433' }}>
              <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, marginBottom: 3 }}>⚠️ ALTIN KURAL</div>
              <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5 }}>Avda daima rüzgarı önünüze alın — hayvan kokuyu rüzgar yönünde alır. Balıkçılıkta rüzgar yönü akıntı yaratır, yem balığı toplar.</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
