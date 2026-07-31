import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ROUTES = [
  {
    id: 'bosphorus', name: 'İstanbul Boğazı Koridoru', icon: '🌉', accent: '#06b6d4',
    type: 'Darboğaz geçiş',
    peak: 'Eylül-Ekim (güney göç), Mart-Nisan (kuzey)',
    species: ['Leylekler — günde 10.000+', 'Balık kartalı ve güvercin kartalı', 'Arı şahinleri (Pernis apivorus)', 'Küçük ötücüler — akşam geçişi'],
    hotspot: 'Çamlıca tepesi, Büyükçekmece, Göksu',
    count: '500.000+ birey yıllık',
    tip: 'Ekim ilk haftası güney göç zirvesi — sabah 09-11 en yoğun saat. Teleskop getir.',
  },
  {
    id: 'eastern', name: 'Doğu Anadolu Güzergahı', icon: '🏔️', accent: '#22c55e',
    type: 'İç rota',
    peak: 'Eylül-Kasım',
    species: ['Turna (Grus grus) — büyük sürüler', 'Kaz türleri', 'Ördek sürüleri', 'Kazayağı kartalı'],
    hotspot: 'Iğdır ovası, Ağrı, Van Gölü kıyısı',
    count: '100.000+ turna yıllık',
    tip: 'Iğdır\'da ekim ortası turna süprüntüsü — dünyanın nadir göç manzarasından biri.',
  },
  {
    id: 'aegean', name: 'Ege Kıyı Koridoru', icon: '🌊', accent: '#a78bfa',
    type: 'Kıyı rotası',
    peak: 'Nisan-Mayıs ve Eylül',
    species: ['Martı türleri', 'Karabatak ve kaşıkçılar', 'Flamingolar', 'Deniz güvercinleri'],
    hotspot: 'Gediz Deltası (İzmir), Büyük Menderes, Kuş Cenneti (Manyas)',
    count: '200.000+ birey yıllık',
    tip: 'İzmir Gediz Deltası Türkiye\'nin en önemli kuş gözlem alanı — martı çoğulluğu şaşırtıcı.',
  },
  {
    id: 'black_sea', name: 'Karadeniz Kıyısı', icon: '🌲', accent: '#f97316',
    type: 'Orman koridoru',
    peak: 'Nisan-Mayıs',
    species: ['Ötücüler — bülbül, drozlar', 'Ormanlık kuşlar — ağaçkakan', 'Arı kuşu', 'Kırlangıçlar'],
    hotspot: 'Trabzon-Rize orman kuşağı, Artvin',
    count: 'Milyonlarca küçük ötücü',
    tip: 'Karadeniz ormanları bahar göçünde Türkiye\'nin en zengin ötücü geçişine sahiptir.',
  },
];

const KEY_SPECIES = [
  { icon: '🦩', name: 'Leylek', peak: 'Ağustos-Eylül', route: 'Boğaz + İç Anadolu', wintering: 'Afrika' },
  { icon: '🦅', name: 'Arı Şahini', peak: 'Eylül', route: 'Boğaz öncelikli', wintering: 'Batı Afrika' },
  { icon: '🦢', name: 'Turna', peak: 'Ekim-Kasım', route: 'Doğu Anadolu', wintering: 'Sudan, Etiyopya' },
  { icon: '🦩', name: 'Flamingo', peak: 'Ocak-Şubat & Nisan', route: 'Ege-Akdeniz', wintering: 'Sultan Sazlığı' },
  { icon: '🐦', name: 'Bıldırcın', peak: 'Ağustos-Eylül', route: 'Trakya kıyısı', wintering: 'Afrika' },
  { icon: '🦆', name: 'Yeşilbaş', peak: 'Ekim-Kasım', route: 'Göllerle güney', wintering: 'Ege delta & Akdeniz' },
];

export default function BirdMigrationMap() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('routes');
  const [sel, setSel] = useState(null);

  return (
    <div style={{ background: '#060e0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐦 Kuş Göçü Haritası</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>4 güzergah · Türkiye geçiş koridorları & tepe noktalar</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {[['routes','Güzergahlar'],['species','Türler']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#0b1610', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'routes' && ROUTES.map(r => {
          const open = sel === r.id;
          return (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div onClick={() => setSel(open ? null : r.id)} style={{
                background: '#0b1610', borderRadius: open ? '12px 12px 0 0' : 12,
                padding: '14px 16px', border: `1px solid ${r.accent}33`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{r.type} · {r.peak}</div>
                  </div>
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700 }}>{r.count}</div>
                </div>
              </div>
              {open && (
                <div style={{ background: '#0b1610', borderRadius: '0 0 12px 12px', padding: '0 16px 14px', border: `1px solid ${r.accent}33`, borderTop: 'none' }}>
                  <div style={{ fontSize: 11, color: r.accent, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>🐦 TÜRLER</div>
                  {r.species.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#d1d5db', marginBottom: 3 }}>• {s}</div>)}
                  <div style={{ fontSize: 12, marginTop: 8 }}><span style={{ color: '#f59e0b', fontWeight: 600 }}>📍 Sıcak Nokta: </span><span style={{ color: '#d1d5db' }}>{r.hotspot}</span></div>
                  <div style={{ background: r.accent + '15', borderRadius: 8, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#d1d5db' }}>💡 {r.tip}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab === 'species' && (
          <div style={{ background: '#0b1610', borderRadius: 14, padding: 14, border: '1px solid #22c55e22' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>🗓️ Tepe Göç Türleri & Zamanlaması</div>
            {KEY_SPECIES.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < KEY_SPECIES.length-1 ? '1px solid #162018' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#22c55e' }}>⏰ {s.peak}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>🛣️ {s.route}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>❄️ {s.wintering}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
